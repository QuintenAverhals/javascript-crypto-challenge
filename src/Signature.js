const _sodium = require('libsodium-wrappers');
let myKey;


beforeAll(async() => {
    await _sodium.ready;
    myKey = _sodium.crypto_sign_keypair();
});

exports.sign = async function(msg){
    return _sodium.crypto_sign(msg, myKey.privateKey);
}

exports.verifyingKey = async function(){
    return myKey.publicKey;
}
