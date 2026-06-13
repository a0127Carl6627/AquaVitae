# AquaVitae

Frontend del sistema de gestión hídrica AquaVitae, desarrollado con React 19 y Storybook 10. Incluye un dashboard ejecutivo, simulación hídrica y análisis de alternativas de ubicación para plantas industriales.

---

## Tecnologías

- React 19
- Storybook 10
- Recharts (gráficas)
- React-Leaflet (mapas coropléticos)
- Firebase Authentication
- Firebase Hosting (producción)

---

## Requisitos previos

- [Node.js 18+](https://nodejs.org/)
- npm 9+
- [firebase-tools](https://firebase.google.com/docs/cli) (solo para despliegue)

---

## Instalación

```bash
git clone https://github.com/a0127Carl6627/AquaVitae.git
cd AquaVitae
git checkout develop
git pull origin develop
cd aquavitae
npm install
```

---

## Variables de entorno

Crea un archivo `.env.local` en la carpeta `aquavitae/` para desarrollo local:

```env
REACT_APP_API_BASE=http://localhost:8080
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

Para producción ya existe `.env.production` apuntando al backend en Cloud Run.

> El backend local debe estar corriendo en `http://localhost:8080` (ver repositorio AquaVitaeBack).

---

## Correr en desarrollo

```bash
npm start
```

La app queda disponible en `http://localhost:3000` con hot reload.

---

## Correr Storybook

```bash
npm run storybook
```

Storybook queda disponible en `http://localhost:6006`. Incluye todos los componentes organizados por historia de usuario.

---

## Páginas disponibles

| Página                    | Ruta interna   | Descripción                                                         |
| ------------------------- | -------------- | ------------------------------------------------------------------- |
| Login                     | —              | Autenticación con Firebase                                          |
| Dashboard                 | `dashboard`    | Resumen ejecutivo: mapa de riesgo, KPIs, alertas, evolución hídrica |
| Simulación Hídrica        | `simulacion`   | KPIs, proyección 90 días, escenario de recuperación                 |
| Alternativas de Ubicación | `alternativas` | Banner de alerta, mapa, tabla de costos, factores evaluados         |

---

## Usuarios de prueba

Para acceder al sistema en el entorno de desarrollo o producción se pueden usar las siguientes cuentas de prueba:

| Rol           | Correo              | Contraseña     |
| ------------- | ------------------- | -------------- |
| Administrador | `admin@aqua.com`    | `45UdRwAqe9mu` |
| Director      | `director@aqua.com` | `kZufrMOuD#$g` |

---

## Estructura del proyecto

```
aquavitae/src/
├── components/          # Componentes reutilizables (Sidebar, Login)
├── pages/               # Páginas principales conectadas al backend
│   ├── DashboardInicio.jsx
│   ├── SimulacionPage.jsx
│   └── AlternativasPage.jsx
├── services/
│   └── aquavitaeApi.js  # Funciones de consumo de la API
├── stories/             # Componentes de Storybook (UI library)
├── lib/
│   └── firebase.js      # Configuración de Firebase Auth
└── App.js               # Enrutamiento principal
```

---

## Despliegue en Firebase Hosting

### Requisitos

- Tener `firebase-tools` instalado: `npm install -g firebase-tools`
- Estar autenticado: `firebase login`
- Tener acceso al proyecto `aquavitaeback`

### Pasos

```bash
# 1. Construir el bundle de producción
npm run build

# 2. Desplegar a Firebase Hosting
firebase deploy --only hosting --project=aquavitaeback
```

La app queda disponible en:
`https://aquavitae-app.web.app`

---

## Conexión con el backend

El frontend consume la API del backend en Cloud Run:

```
https://aquavitae-backend-1005047638592.us-central1.run.app
```

Esta URL está configurada en `.env.production`. Para desarrollo local apunta a `http://localhost:8080`.
