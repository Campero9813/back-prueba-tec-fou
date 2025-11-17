const express = require('express');
const router = express.Router();
const encryptionController = require('../controllers/encryptionController');

//Middleware para rutas
router.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

//Rutas
router.post('/encrypt', encryptionController.encryptText);
router.post('/decrypt', encryptionController.decryptText);
router.get('/public-key', encryptionController.getPublicKey);
router.get('/health', encryptionController.healtCheck);

//Ruta inicio
router.get('/', (req, res) => {
    res.json({
        message: 'Servicio de Encriptacion',
        version: '0.0.1',
        endpoints: {
            'POST /encrypt': 'Encriptar texto',
            'POST /decrypt': 'Desencriptar exto',
            'GET /public-key': 'Obtener Llave Publica',
            'GET /healt': 'Estado del servicio',
        },
        algorithm: 'RSA/EBC/PKCS1_OAEP_PADDING',
        ancoding: 'UTF-8',
        note: 'Usamos PKCS1_OAEP_PADDING para compatibilidad con Node.js Moderno'
    })
})

module.exports = router