# 🏢 Portal de Control - Asistencia, Nómina y Finanzas Multi-Sucursal

Sistema web integral de gestión empresarial con control de asistencia por geofencing GPS, liquidación de haberes, anticipos/prestamos amortizados, consumos fiados y **módulo Render Anti-Sleep 24/7 activo**.

---

## 🚀 Características Principales

1. **Gestión Multi-Sucursal Total**:
   * Selección de sucursal de trabajo al iniciar sesión.
   * Aisle completo de información (nómina de trabajadores, registros de asistencia, finanzas, vales y turnos mensuales por sucursal).
   * Menú desplegable en la barra superior para cambiar de sucursal en tiempo real.
   * Creación de nuevas sucursales con coordenadas GPS y radio de cobertura.

2. **Sistema Anti-Suspensión para Render (24/7 Keep-Alive)**:
   * Servidor Express backend con ciclo automático de auto-ping cada 3 minutos a `/api/keep-alive`.
   * Monitor interactivo con contador de heartbeats, prueba de latencia en vivo y registros.
   * URL de webhook lista para vincular a UptimeRobot o Cron-Job.org.

3. **Control de Asistencia con Geocerca GPS**:
   * Marcaje de entrada/salida contrastado en tiempo real con las coordenadas de la sucursal activa.
   * Detección de atrasos e indicadores de horas trabajadas.

4. **Finanzas y Vales Laborales**:
   * Descuadres de caja, quincenas, bonos y feriados.
   * Consumos fiados con límite mensual configurable de $50.000 CLP.
   * Préstamos con cálculo de cuotas y amortización gradual.

5. **Calendario y Malla de Turnos Mensuales**:
   * Cuadrícula de planificación horaria por trabajador y sucursal.

---

## 💻 Requisitos Previos

* **Node.js**: `v18.0.0` o superior
* **npm**: `v9.0.0` o superior

---

## 🛠️ Instalación y Uso Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/fellasmarket/Asist-Cont.git
   cd Asist-Cont
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar entorno de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir en el navegador: `http://localhost:3000`

---

## 🌐 Despliegue en Render

Este proyecto incluye el archivo `render.yaml` de infraestructura como código. Para desplegarlo en Render:

1. Crea un nuevo **Web Service** en Render y conecta tu repositorio de GitHub `Asist-Cont`.
2. Configura los siguientes parámetros:

| Parámetro | Valor |
| :--- | :--- |
| **Environment / Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

3. Haz clic en **Deploy**. El servidor iniciará de inmediato y mantendrá la instancia despierta las 24 horas del día.

---

## 🔑 Credenciales de Acceso por Defecto

* **Administrador**:
  * Usuario: `Javier Olate`
  * Clave: `Fellhonpm`

* **Desarrollador Visor**:
  * Usuario: `igmuller2026`
  * Clave: `Alarcon17`

* **Empleado (Sucursal Central)**:
  * Usuario: `sofia.m`
  * Clave: `trabajador1`

* **Empleado (Sucursal Providencia)**:
  * Usuario: `carlos.f`
  * Clave: `trabajador2`

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
