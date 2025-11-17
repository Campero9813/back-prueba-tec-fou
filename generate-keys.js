const fs = require('fs')
const crypto = require('crypto')

//Generacion de claves
const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
})

//Guardar llaves en archivos
fs.writeFileSync(config.publicKeyPath, publicKey)
fs.writeFileSync(config.privateKeyPath, privateKey)

console.log('Llaves creadas con exito');
console.log(` - config.publicKeyPath`);
console.log(` - config.privateKeyPath`);
console.log('\n Llave Publica: ');
console.log(publicKey);
console.log('\n Llave Privada: ');
console.log(privateKey)
