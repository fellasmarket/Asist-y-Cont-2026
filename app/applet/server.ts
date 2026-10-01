import express from 'express';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Keep-Alive & Health Check Endpoints for Render
let pingCount = 0;
let lastPingTime = new Date().toISOString();

app.get('/api/keep-alive', (req, res) => {
  pingCount++;
  lastPingTime = new Date().toISOString();
  res.json({
    status: 'active',
    message: 'Sistema Render Anti-Suspensión Activo 24/7',
    timestamp: lastPingTime,
    uptimeSeconds: Math.floor(process.uptime()),
    pingCount: pingCount,
    serverTime: new Date().toLocaleString('es-CL')
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Self-ping heartbeat loop every 3 minutes (180,000 ms) to keep Render service warm 24/7
setInterval(() => {
  http.get(`http://127.0.0.1:${PORT}/api/keep-alive`, (res) => {
    res.on('data', () => {}); // Consume response stream
  }).on('error', (err) => {
    console.log('Self-ping heartbeat check:', err.message);
  });
}, 180000);

async function startServer() {
  const distIndexPath = path.resolve(__dirname, 'dist', 'index.html');
  const hasDist = fs.existsSync(distIndexPath);

  if (process.env.NODE_ENV === 'production' || hasDist) {
    // Production static serving from dist or root
    const staticDir = hasDist ? path.resolve(__dirname, 'dist') : __dirname;
    const targetHtml = hasDist ? distIndexPath : path.resolve(__dirname, 'index.html');
    
    app.use(express.static(staticDir));
    app.get('*', (req, res) => {
      res.sendFile(targetHtml);
    });
  } else {
    // Development mode with Vite middleware
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
      });

      app.use(vite.middlewares);

      app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = `<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`;
          const indexPath = path.resolve(__dirname, 'index.html');
          if (fs.existsSync(indexPath)) {
            template = fs.readFileSync(indexPath, 'utf-8');
            template = await vite.transformIndexHtml(url, template);
          }
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e: any) {
          vite.ssrFixStacktrace(e);
          next(e);
        }
      });
    } catch (e) {
      // Fallback
      app.use(express.static(__dirname));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`[RENDER KEEP-ALIVE SERVER] Server active on port ${PORT}`);
  });
}

startServer();
