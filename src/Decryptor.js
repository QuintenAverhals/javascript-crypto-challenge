const _sodium = require('libsodium-wrappers');
let myKey;


exports.setKey = async function(key)
{
    myKey = key;
}

exports.decrypt = async function(ciphertext, nonce)
{
    if (myKey == null){
        throw 'no key';
	}
	await _sodium.ready;
    return _sodium.crypto_secretbox_open_easy(ciphertext, nonce, myKey);
}
