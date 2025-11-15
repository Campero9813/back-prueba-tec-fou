const dotenv = require('dotenv');

//Cargamos variables de Entorno
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    publicKeyPath: process.env.PUBLIC_KEY_PATH || './keys/public_key.pem',
    privateKeyPath: process.env.PRIVATE_KEY_PATH || './keys/private_key.pem'
}

//Validacion de Claves
if(!config.publicKeyPath || !config.privateKeyPath){
    throw new Error('No se configuro las rutas en el .env');
}

module.exports = config;