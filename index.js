const { 
    Connection,
    PublicKey,
    Account,
    connectionApiUrl,
    Transaction,
    Keypair,
    LAMPORD_PER_SOL,
} = require("@solana/web3.js");

const myKeys = new Keypair();
const pubKey = new PublicKey(myKeys._keypair.publicKey).toString();
const privKey = myKeys._keypair.secretKey;
console.log(pubKey)
console.log(privKey);