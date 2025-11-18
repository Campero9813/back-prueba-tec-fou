const cryptoUtils = require('./utils/encryptUtils');

// Prueba con OAEP
function testEncryptionDecryption() {
  console.log('Probando encriptación/desencriptación con OAEP...\n');
  
  const testText = "prueba1998";
  
  try {
    // Mostrar texto original
    console.log('Texto original:', testText);
    
    // Mostrar base64 simple (solo para referencia)
    const simpleBase64 = Buffer.from(testText, 'utf8').toString('base64');
    console.log('Base64 simple (NO encriptación):', simpleBase64);
    
    // Encriptar con RSA
    console.log('\nEncriptando con RSA...');
    const encrypted = cryptoUtils.encryptRSAWithNodeRSA(testText);
    console.log('Texto encriptado (base64):', encrypted);
    console.log('Longitud del texto encriptado:', encrypted.length, 'caracteres base64');
    
    // Desencriptar
    console.log('\nDesencriptando...');
    const decrypted = cryptoUtils.decryptRSAWithNodeRSA(encrypted);
    console.log('Texto desencriptado:', decrypted);
    
    // Verificar
    if (testText === decrypted) {
      console.log('\nPrueba Exitosammente con RSA El texto se encriptó y desencriptó correctamente.');
      console.log('   Algoritmo: RSA/ECB/PKCS1_OAEP_PADDING');
      console.log('   Hash: SHA-256');
    } else {
      console.log('\n¡Error, El texto desencriptado no coincide con el original.');
      console.log('   Esperado:', testText);
      console.log('   Obtenido:', decrypted);
    }
    
  } catch (error) {
    console.error('\nError en la prueba:', error.message);
    
    // Intentar con node-rsa como fallback
    console.log('\n Intentando con node-rsa...');
    try {
      const encrypted = cryptoUtils.encryptRSAWithNodeRSA(testText);
      const decrypted = cryptoUtils.decryptRSAWithNodeRSA(encrypted);
      
      if (testText === decrypted) {
        console.log('Prueba Exitosa con node-rsa');
      } else {
        console.log('Prueba Fallida con node-rsa ');
      }
    } catch (error2) {
      console.error('Error con node-rsa:', error2.message);
    }
  }
}

testEncryptionDecryption();