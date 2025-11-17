const express = require('express');
const config = require ('./config/env');
const encryptionRoutes = require('./routes/encryptionRutes');
const cryptoUtils = require('./utils/encryptUtils');

const app = express()
const PORT = config.port

//Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.text({ limit: '10mb' }))

// Usar el prefijo de API
app.use(config.apiPrefix, encryptionRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect(config.apiPrefix);
});

//Rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.originalUrl} no existe`,
        availableEndpoints: {
            [`POST ${config.apiPrefix/encrypt}`]: 'Encriptar Texto',
            [`POST ${config.apiPrefix/decrypt}`]: 'Encriptar Texto',
            [`GET ${config.apiPrefix/healt}`]: 'Encriptar Texto',
            [`GET ${config.apiPrefix/public-key}`]: 'Encriptar Texto',
        }
    })
})


//Manejo de errores global
app.use((error, req, res, next) => {
    console.error('Error global:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: config.nodeEnv === 'development' ? error.message: 'Algo salio mal'
    })
})


//Verificacion de llaves antes de iniciar 
if (!cryptoUtils.verifyKeys()) {
    console.error('Error: Las llaves no funcionan correctamente')
    console.error('Genera de nuevo las llaves con : "npm run generate-keys"')
    process.exit(1)
}

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${PORT}`);
    console.log('\n Enpoints Disponibles');
    console.log(`POST ${api.apiPrefix}/encrypt - Encriptar`);
    console.log(`POST ${api.apiPrefix}/decrypt - Desencriptar`);
    console.log(`GET ${api.apiPrefix}/healt - Estado del servicio`);
    console.log(`GET ${api.apiPrefix}/public-key - Obtener Llave Publica`);
})

module.exports = app;