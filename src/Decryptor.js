const sodium = require('libsodium-wrappers');
let key = null;

function setkey(setKey){
    key = setKey;
}

function decrypt(ciphertext, nonce){
    if (key==null){
        throw 'no key';
    }else{
        return sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    }
}

module.exports.decrypt = decrypt;
module.exports.setKey = setkey;
