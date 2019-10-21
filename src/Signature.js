
const nacl = require('libsodium-wrappers');

let keypair = null;

(async () => {
  await nacl.ready;
  keypair = nacl.crypto_sign_keypair();
})();

async function verifyingKey(){
  await nacl.ready;
  return keypair.publicKey;
}

async function sign(msg){
  await nacl.ready;
  return nacl.crypto_sign(msg, keypair.privateKey);
}

module.exports.verifyingKey = verifyingKey;
module.exports.sign = sign;
