const libsodium = require('libsodium-wrappers');
let serverPublicKey, clientPublicKey, serverPrivateKey;
let rx, tx;


async function init()
{
    await libsodium.ready;

    const keypair = libsodium.crypto_kx_keypair();

    serverPrivateKey = keypair.privateKey;
    serverPublicKey = keypair.publicKey;
}


async function ServerPublicKey()
{
    await init();

    return serverPublicKey;
}
module.exports.serverPublicKey = ServerPublicKey;


function SetClientPublicKey(publicKey)
{
    if(publicKey != null && (typeof(clientPublicKey) == 'undefined') || clientPublicKey == null || clientPublicKey == publicKey)
    {
        clientPublicKey = publicKey;
    } else
    throw "client public key already set";
}
module.exports.setClientPublicKey = SetClientPublicKey;


function decrypt(ciphertext, nonce)
{
    const sharedKeys = libsodium.crypto_kx_server_session_keys(serverPublicKey, serverPrivateKey, clientPublicKey);

    return libsodium.crypto_secretbox_open_easy(ciphertext, nonce, sharedKeys.sharedRx);
}
module.exports.decrypt = decrypt;


function encrypt(msg)
{
    const sharedKeys = libsodium.crypto_kx_server_session_keys(serverPublicKey, serverPrivateKey, clientPublicKey);
    var nonce = libsodium.randombytes_buf(libsodium.crypto_secretbox_NONCEBYTES);
    var ciphertext = libsodium.crypto_secretbox_easy(msg, nonce, sharedKeys.sharedTx);

    return{ciphertext, nonce};
}
module.exports.encrypt = encrypt;
