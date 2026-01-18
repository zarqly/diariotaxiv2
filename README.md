# 🚕 Dietario Taxi - Versión Refactorizada 2.0

Aplicación web profesional para gestión de ingresos diarios de taxistas, completamente refactorizada con las mejores prácticas de React y Firebase.

## 🎯 Características Principales

- ✅ **Autenticación segura** con Email/Password y Google
- ✅ **Vista diaria** con restricción de fechas futuras
- ✅ **Vista semanal** con navegación inteligente
- ✅ **Vista mensual** con selector de mes/año
- ✅ **Vista anual** con totales por mes
- ✅ **Vista total** con histórico completo
- ✅ **Vista personalizada** con rango de fechas
- ✅ **Backup y restauración** de datos
- ✅ **Sincronización en tiempo real** con Firebase
- ✅ **Diseño responsivo** para móviles y tablets

## 🏗️ Arquitectura del Proyecto

```
dietario-taxi-refactored/
├── src/
│   ├── components/          # Componentes UI
│   │   ├── LoginScreen.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── DailyView.jsx
│   │   ├── WeeklyView.jsx
│   │   ├── MonthlyView.jsx
│   │   ├── AnnualView.jsx
│   │   ├── TotalView.jsx
│   │   ├── CustomView.jsx
│   │   └── SettingsView.jsx
│   │
│   ├── hooks/               # Custom Hooks
│   │   ├── useAuth.js      # Gestión de autenticación
│   │   └── useData.js      # Gestión de datos con useReducer
│   │
│   ├── services/            # Servicios externos
│   │   └── firebaseService.js
│   │
│   ├── utils/               # Funciones de utilidad
│   │   └── dateUtils.js
│   │
│   ├── config/              # Configuración
│   │   └── firebase.js
│   │
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
│
├── public/                  # Archivos estáticos
├── .env.example            # Template de variables de entorno
├── firestore.rules         # Reglas de seguridad de Firestore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Instalación Paso a Paso

### 1. Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Firebase (gratis)
- Terminal / Línea de comandos

### 2. Configurar Firebase

#### a) Crear proyecto en Firebase:
1. Ve a https://console.firebase.google.com/
2. Clic en "Crear un proyecto"
3. Nombre: `dietario-taxi` (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Clic en "Crear proyecto"

#### b) Habilitar autenticación:
1. En el menú lateral → "Authentication"
2. Clic en "Comenzar"
3. Habilita "Correo electrónico/contraseña"
4. Habilita "Google" (opcional)

#### c) Crear base de datos Firestore:
1. En el menú lateral → "Firestore Database"
2. Clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba"
4. Selecciona una ubicación cercana (ej: europe-west1)

#### d) Obtener configuración:
1. En configuración del proyecto (icono ⚙️)
2. En "Tus apps" → Clic en el icono de web `</>`
3. Registra la app con nombre: `dietario-taxi-web`
4. **COPIA** los valores de `firebaseConfig`

#### e) Aplicar reglas de seguridad:
1. En Firestore Database → pestaña "Reglas"
2. **Copia y pega** el contenido del archivo `firestore.rules`
3. Clic en "Publicar"

### 3. Instalar el Proyecto

```bash
# 1. Descomprime el proyecto (o clona desde git)
cd dietario-taxi-refactored

# 2. Instalar dependencias
npm install

# 3. Crear archivo de variables de entorno
cp .env.example .env

# 4. Editar .env con tus credenciales de Firebase
nano .env  # o usa tu editor favorito
```

#### Contenido del archivo `.env`:
```env
VITE_FIREBASE_API_KEY=AIza...........................
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`

### 5. Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📱 Crear APK con Capacitor

### 1. Instalar Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

Responde:
- App name: `Dietario Taxi`
- App ID: `com.tudominio.dietariotaxi`
- Directory: (presiona Enter)

### 2. Añadir plataforma Android

```bash
npm install @capacitor/android
npx cap add android
```

### 3. Compilar y copiar archivos

```bash
npm run build
npx cap copy android
npx cap sync android
```

### 4. Abrir en Android Studio

```bash
npx cap open android
```

### 5. Generar APK en Android Studio

1. En Android Studio → Build → Generate Signed Bundle / APK
2. Selecciona "APK"
3. Crea un keystore nuevo (o usa uno existente)
4. Completa los datos
5. Selecciona "release"
6. Espera a que se genere el APK

El APK estará en:
`android/app/release/app-release.apk`

## 🔒 Seguridad Implementada

### ✅ Variables de Entorno
Las credenciales de Firebase están en `.env` (no se suben a Git)

### ✅ Reglas de Firestore
```javascript
// Solo usuarios autenticados pueden acceder
// Solo pueden ver/editar sus propios datos
allow read, write: if request.auth != null 
                  && request.auth.uid == userId;
```

### ✅ Validación en Cliente
- Fechas futuras bloqueadas
- Inputs validados
- Autenticación obligatoria

## 🎨 Mejoras Implementadas vs Versión Anterior

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Arquitectura** | 1 archivo de 1000+ líneas | 15+ archivos modulares |
| **Estado** | 15+ useState | useReducer centralizado |
| **Firebase** | SDK compat (deprecado) | SDK modular v10 |
| **Seguridad** | API keys expuestas | Variables de entorno |
| **Firestore** | Sin reglas | Reglas estrictas |
| **Hooks** | Lógica en componentes | Custom hooks reutilizables |
| **Servicios** | Mezclado con UI | Servicios separados |
| **Utilidades** | Funciones repetidas | Utilidades centralizadas |
| **Mantenibilidad** | Difícil | Fácil |
| **Testing** | Imposible | Preparado |

## 📝 Uso de la Aplicación

### Registro/Login
1. Abre la aplicación
2. Registra un usuario con email/contraseña
3. O usa "Continuar con Google"

### Vista Diaria
1. Selecciona una fecha (máximo hoy)
2. Introduce la cantidad del día
3. Ver, editar o eliminar

### Vista Semanal
- Navega entre semanas
- No puedes avanzar a semanas futuras

### Vista Mensual
- Selecciona mes y año
- Solo años hasta el actual

### Vista Anual
- Selecciona el año
- Ve totales por mes

### Backup
1. Ve a "Ajustes"
2. "Crear Copia de Seguridad" → Descarga JSON
3. "Restaurar" → Sube el JSON

## 🐛 Solución de Problemas

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
**Solución**: Recarga la página

### Error: "Missing or insufficient permissions"
**Solución**: Verifica que las reglas de Firestore estén publicadas correctamente

### Error: Variables de entorno no definidas
**Solución**: 
1. Asegúrate de tener el archivo `.env`
2. Las variables deben empezar con `VITE_`
3. Reinicia el servidor de desarrollo

### El APK no funciona
**Solución**:
1. Verifica que `npm run build` se ejecutó sin errores
2. Ejecuta `npx cap sync android`
3. Limpia el proyecto en Android Studio: Build → Clean Project

## 📚 Tecnologías Utilizadas

- **React 18** - Framework UI
- **Vite 5** - Build tool
- **Firebase 10** - Backend (Auth + Firestore)
- **Tailwind CSS 3** - Estilos
- **Lucide React** - Iconos
- **Capacitor** - Compilación a móvil

## 🤝 Contribuir

Este proyecto es de código abierto. Siéntete libre de:
- Reportar bugs
- Sugerir mejoras
- Hacer fork y crear pull requests

## 📄 Licencia

MIT License - Libre para usar en proyectos personales y comerciales

## 👨‍💻 Autor

Creado con ❤️ por Claude AI

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al desarrollador.

**Última actualización**: Enero 2026
**Versión**: 2.0.0
