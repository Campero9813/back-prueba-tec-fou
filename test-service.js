const cryptoUtils = require('./utils/encryptUtils')

//Prueba de funciones
function testEncryptionDecryption(){
    console.log('Probando encriptacion/desencriptacion...\n')

    const testText = 'Prueba1998'

    try {
        //Encriptar
        console.log('Texto recibido:', testText)
        const encrypted = cryptoUtils.encryptRSA(testText)
        console.log('Texto encriptado correctamente(base64)', encrypted)

        //Desencriptar
        const decrypted = cryptoUtils.decryptRSA(encrypted)
        console.log('Texto Desencriptado: ', decrypted)

        //Validacion
        if (textTest === decrypted) {
            console.log('\n Encriptacion y Desencriptacion correcta')
        }else{
             console.log('Hubo un error, no coinciden los textos')
        }
    } catch (error) {
        console.error('Error en la prueba', error.message);
    }
}

testEncryptionDecryption();