# Backend PruebaTecFOU

## Despliegue local del servicio de encriptacion/desencriptacion con Node JS

Paso 1: Descargamos el proyecto

Paso 2: Cambiamos a la rama 'master'

```bash
git checkout master
```

Paso 3: Instalamos Dependencias de Node

```bash
npm install
```

Paso 4: Generamos las claves para que funcione correctamente el servicio
```bash
node generate-keys
```
Esto crear un par de llaves publicas y privadas .pem para el uso de este servicio

Paso 5: Ejecutamos el proyecto

```bash
npm start
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running tests

Puedes ejecutar este comando para visualiza runas pruebas sencillas de los componentes creados como, el service, el input-component, y el app principal

```bash
ng test
```


