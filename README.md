# INNOMOTOR Agenda 🔧

Agenda fiscal y de recordatorios para **INNOMOTOR SOLUTIONS SL** (B22503429).  
PWA con alarmas acústicas, notificaciones push y funcionamiento offline.

---

## Funcionalidades

- **Alarmas acústicas** que suenan hasta que confirmes (pitidos que no paran)
- **Notificaciones push** del sistema operativo (aunque tengas la app cerrada)
- **Funciona offline** — una vez instalada, no necesita internet
- **Instalable** en el móvil como una app nativa
- **Avisos configurables** — 5 días antes, 1 día antes, el mismo día
- **Gestión de tareas** — añadir, completar, organizar por urgencia
- **Modo oscuro** automático

---

## Cómo desplegar en Vercel

### Paso 1: Crear cuenta en GitHub
1. Ve a https://github.com y crea una cuenta (gratis)
2. Haz clic en **"New repository"** (botón verde)
3. Nombre: `innomotor-agenda`
4. Marca **"Public"**
5. Haz clic en **"Create repository"**

### Paso 2: Subir los archivos
**Opción fácil (desde el navegador):**
1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra TODOS los archivos de esta carpeta (index.html, app.js, style.css, sw.js, manifest.json, vercel.json, y la carpeta icons/)
3. Haz clic en **"Commit changes"**

**Opción terminal (si tienes git instalado):**
```bash
cd innomotor-agenda
git init
git add .
git commit -m "INNOMOTOR Agenda v1"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/innomotor-agenda.git
git push -u origin main
```

### Paso 3: Desplegar en Vercel
1. Ve a https://vercel.com y crea una cuenta con tu GitHub
2. Haz clic en **"Add New" → "Project"**
3. Selecciona el repositorio `innomotor-agenda`
4. **Framework Preset**: selecciona `Other`
5. Haz clic en **"Deploy"**
6. En 30 segundos tendrás tu URL: `https://innomotor-agenda.vercel.app`

### Paso 4: Instalar en el móvil
1. Abre la URL de Vercel en el navegador del móvil (Chrome en Android, Safari en iPhone)
2. **Android**: aparecerá un banner "Añadir a pantalla de inicio" → toca "Instalar"
3. **iPhone**: toca el botón compartir (⬆️) → "Añadir a pantalla de inicio"
4. ¡Listo! La app funciona como una app nativa

---

## Estructura de archivos

```
innomotor-agenda/
├── index.html        ← Página principal
├── app.js            ← Lógica de la aplicación
├── style.css         ← Estilos (con modo oscuro)
├── sw.js             ← Service Worker (offline + notificaciones)
├── manifest.json     ← Configuración PWA
├── vercel.json       ← Configuración de Vercel
├── icons/
│   ├── icon-192.png  ← Icono pequeño
│   └── icon-512.png  ← Icono grande
└── README.md         ← Este archivo
```

---

## Plazos fiscales precargados

| Fecha | Modelo | Importe |
|-------|--------|---------|
| 15 jul 2026 | Liquidación Alemania | ~2.650€ |
| 20 jul 2026 | Modelo 303, 130, 115 Q2 | 228€ |
| 20 oct 2026 | Modelo 303, 130, 115 Q3 | 228€ |
| 20 ene 2027 | Modelo 303, 130, 115 Q4 | 228€ |
| 30 ene 2027 | Modelo 390 anual | — |

---

*Creado con Claude para Pablo Ramos Benlloch — INNOMOTOR SOLUTIONS SL*
