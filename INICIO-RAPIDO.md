# 🚀 GUÍA DE INICIO RÁPIDO - Para principiantes

## ⚡ Configuración en 10 minutos

### PASO 1: Preparar Firebase (5 min)

1. **Ir a Firebase Console**
   - Abre: https://console.firebase.google.com/
   - Login con tu cuenta de Google

2. **Crear proyecto**
   - Clic en "Agregar proyecto"
   - Nombre: "dietario-taxi"
   - Desactiva Analytics
   - Clic "Crear proyecto"

3. **Configurar Authentication**
   - Menú lateral → "Authentication"
   - Clic "Comenzar"
   - Pestaña "Sign-in method"
   - Habilita "Correo electrónico/contraseña"
   - (Opcional) Habilita "Google"

4. **Configurar Firestore**
   - Menú lateral → "Firestore Database"
   - Clic "Crear base de datos"
   - Selecciona "Comenzar en modo de prueba"
   - Elige ubicación: "europe-west1" (o la más cercana)
   - Clic "Habilitar"

5. **Copiar credenciales**
   - Clic en el icono ⚙️ (configuración)
   - Scroll down hasta "Tus apps"
   - Clic en icono `</>` (web)
   - Nombre de app: "dietario-web"
   - Clic "Registrar app"
   - **COPIA TODO EL BLOQUE `firebaseConfig`**

6. **Aplicar reglas de seguridad**
   - En Firestore Database → Pestaña "Reglas"
   - Borra todo
   - Copia y pega esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null 
                        && request.auth.uid == userId;
      
      match /dietario/{document=**} {
        allow read, write: if request.auth != null 
                          && request.auth.uid == userId;
      }
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
   - Clic "Publicar"
   - ✅ ¡Firebase listo!

---

### PASO 2: Instalar el proyecto (3 min)

1. **Abrir terminal/consola** en la carpeta del proyecto

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear archivo .env**
   - Copia el archivo `.env.example` y renómbralo a `.env`
   - O en terminal:
   
   **Windows:**
   ```bash
   copy .env.example .env
   ```
   
   **Mac/Linux:**
   ```bash
   cp .env.example .env
   ```

4. **Editar .env** con tus credenciales de Firebase
   - Abre el archivo `.env` con cualquier editor de texto
   - Pega tus valores:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY_AQUI
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

### PASO 3: ¡Ejecutar! (1 min)

```bash
npm run dev
```

✅ La app se abrirá automáticamente en `http://localhost:3000`

---

## 🎯 Primeros Pasos en la App

1. **Regístrate**
   - Clic en "Regístrate"
   - Introduce email y contraseña
   - Clic "Registrarse"

2. **Introduce tu primer ingreso**
   - Selecciona la fecha de hoy
   - Introduce una cantidad (ej: 85.50)
   - Clic "Introducir"

3. **Explora las vistas**
   - Menú hamburguesa (☰) → Ver otras secciones
   - Semanal: totales por semana
   - Mensual: totales por mes
   - etc.

---

## 📱 Crear APK (Opcional)

### Si ya tienes Android Studio instalado:

```bash
# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Inicializar
npx cap init

# Responde:
# - App name: Dietario Taxi
# - App ID: com.tudominio.dietariotaxi

# 3. Añadir Android
npx cap add android

# 4. Compilar
npm run build
npx cap sync android

# 5. Abrir en Android Studio
npx cap open android

# 6. En Android Studio:
# Build → Generate Signed Bundle / APK → APK
```

---

## ❓ Problemas Comunes

### "npm: command not found"
**Solución**: Instala Node.js desde https://nodejs.org/

### "Firebase App already exists"
**Solución**: Recarga la página (F5)

### "Permission denied" en Firestore
**Solución**: Verifica que copiaste bien las reglas de seguridad y las publicaste

### Las variables de entorno no funcionan
**Solución**: 
1. Asegúrate que el archivo se llame exactamente `.env` (no `.env.txt`)
2. Todas las variables empiezan con `VITE_`
3. Reinicia el servidor (`Ctrl+C` y luego `npm run dev`)

---

## 📞 Soporte

Si tienes problemas:
1. Revisa el archivo `README.md` completo
2. Verifica que seguiste todos los pasos
3. Contacta al desarrollador

---

## ✅ Checklist de Configuración

- [ ] Proyecto de Firebase creado
- [ ] Authentication habilitado
- [ ] Firestore Database creado
- [ ] Reglas de seguridad aplicadas
- [ ] Credenciales copiadas
- [ ] `npm install` ejecutado
- [ ] Archivo `.env` creado
- [ ] Variables de entorno configuradas
- [ ] `npm run dev` funciona
- [ ] Puedo registrarme y login
- [ ] Puedo guardar datos

---

**¡Listo! Ya tienes tu app funcionando** 🎉
