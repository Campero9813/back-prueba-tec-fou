const cryptoUtils = require('../utils/encryptUtils');

const encryptText = (req, res) => {
    try {
        let textoToEncrypt;

        //Formatos de entrda
        if(typeof req.body === 'string'){
            textoToEncrypt = req.body;
        }else if(req.body.text) {
            textoToEncrypt = req.body.text
        }else {
            return res.status(400).json({
                error: 'Se requiere texto para encriptar',
                usage: 'Enviar texto plano o JSON: {"text": "Prueba1998"}'
            });
        }
        if(!textoToEncrypt || textoToEncrypt.trim() === ''){
            return res.status(400).json({error: 'El texto no puede estar vacio'})
        }

        //Encriptado Nativo
        const encrypted = cryptoUtils.encryptRSA(textoToEncrypt);

        res.json({
            original: textoToEncrypt,
            encrypted: encrypted,
            algorithm: 'RSA/EBC/PKCS1Padding',
            encoding: 'UTF-8',
            format: 'base64',
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Error en encriptar el texto', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message
        });
    }
}

const decryptText = (req, res) => {
    try {
        let encryptedText;

        //Formatos de entrada
        if (typeof req.body === 'string') {
            encryptText = req.body
        } else if(req.body.encrypted) {
            encryptText = req.body.encrypted;
        } else {
            return res.status(400).json({
                error: 'Se requiere un texto encriptado para desencriptar',
                usage: 'Enviar como texto base64 o JSON: {"encrypted": "UHJ1ZWJhMTk5OA=="}'
            })
        }

        if (!necryptedText || encryptedText.trim() === '') {
            return res.status(400).json({
                error: 'El texto encriptado no puede estar vacio'
            })
        }

        //Desencriptar nativo
        const decrypted = cryptoUtils.decryptRSA(encryptText);

        res.json({
            encrypted: encryptedText,
            decrypted: decrypted,
            algorithm: 'RSA/ECB/PKCS1Padding',
            encoding: 'UTF-8',
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Error en decryptText', error)
        res.status(500).json({
            error: 'Error al desencriptar',
            message: error.message
        })
    }
}


const getPublicKey = (req, res) => {
    try {
        const publicKey = cryptoUtils.getPublicKey();
        res.setHeader('Content-Type', 'application/x-pem-file');
        res.send(publicKey);
    } catch (error) {
        console.error('Error en getPublicKey', error);
        res.status(500).json({
            error: 'Error al obtener llave publica',
            message: error.message
        })
    }
}

//Revisar que el servicio este funcionando
const healtCheck = (req, res) => {
    const keyStatus = cryptoUtils.verifyKeys();

    res.json({
        status: 'OK',
        service: 'Servicio de Encriptado RSA',
        keys: keyStatus ? 'OK' : 'ERROR',
        timestamp: new Date().toISOString(),
        endpoint: {
            encrypt: 'POST /encrypt',
            decrypt: 'POST /decrypt',
            healt: 'GET /health',
            publicKey: 'GET /public-key'
        }
    })
}

module.exports = {
    encryptText,
    decryptText,
    getPublicKey,
    healtCheck
}