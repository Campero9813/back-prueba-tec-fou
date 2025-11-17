const crypto = require('crypto');
const fs  = require('fs');
const NodeRSA = require('node-rsa');
const config = require('../config/env');

//Cargar llaves
const publicKey = fs.readFileSync(config.publicKeyPath, 'utf8');
const privateKey = fs.readFileSync(config.privateKeyPath, 'utf8');

//Funcion para encriptar RSA/ECB/PKCS1 con crypto nativo de Node JS
function encryptRSA(text){
    try{
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(text, 'utf8')
        );
        return encrypted.toString('base64');
    }catch (error){
        throw new Error(`Error al Encriptar: ${error.message}`);
    }
}


//Funcion Alternativa para encriptar con RSA
function encryptRSAWithNodeRSA(text) {
  try {
    const key = new NodeRSA(publicKey, 'pkcs1-public-pem', {
      encryptionScheme: 'pkcs1_oaep' 
    });
    
    return key.encrypt(text, 'base64', 'utf8');
  } catch (error) {
    throw new Error(`Error en encriptación: ${error.message}`);
  }
}

//Funcion para desencriptar crypto nativo de node
function decryptRSA(encryptedBase64){
    try {
        const decrypted = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(encryptedBase64, 'base64')
    );
    return decrypted.toString('utf8');
    } catch (error) {
        throw new Error(`Error al desencriptar: ${error.message}`)
    }
}


//Funcion alternativa para desencriptar con rsa
function decryptRSAWithNodeRSA(encryptedBase64) {
  try {
    const key = new NodeRSA(privateKey, 'pkcs1-private-pem', {
      encryptionScheme: 'pkcs1_oaep'  // Cambiado a OAEP
    });
    
    return key.decrypt(encryptedBase64, 'utf8');
  } catch (error) {
    throw new Error(`Error en desencriptación: ${error.message}`);
  }
}

//Funcion para obtener la llave publica
function getPublicKey(){
    return publicKey;
}


//VErificar llaves cargadas
function verifyKeys(){
    try {
        const testText= "test";
        const encrypted = encryptRSA(testText);
        const decrypted = encryptRSA(encrypted);

        return testText === decrypted;
    } catch (error) {
        console.error('Error al verificar las llaves', error.message);

        try {
            const testText = 'test'
            const encrypted = encryptRSAWithNodeRSA(testText);
            const decrypted = decryptRSAWithNodeRSA(encrypted)
            return testText === decrypted;
        } catch (error2) {
            return false;    
        }        
    }
}

module.exports = {
    encryptRSA,
    decryptRSA,
    encryptRSAWithNodeRSA,
    decryptRSAWithNodeRSA,
    getPublicKey,
    verifyKeys,
    publicKey,
    privateKey
}