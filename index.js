const { 
    Connection,
    PublicKey,
    Account,
    connectionApiUrl,
    Transaction,
    Keypair,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
} = require("@solana/web3.js");

const myKeys = new Keypair();
const pubKey = new PublicKey(myKeys._keypair.publicKey).toString();
const privKey = myKeys._keypair.secretKey;
// console.log(pubKey);
// console.log(privKey);

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privKey);
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        const myWalletBalance = walletBalance / 1000000000;
        const myWalletAddress = myWallet.publicKey.toString();

        console.log(`Wallet address is ${myWalletAddress} and balance is ${myWalletBalance} SOL`);
    } catch (err) {
        console.log(err);
    }
}

const requestAirdrop = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privKey);
        const airdropSignatureRequest = await connection.requestAirdrop(new PublicKey(myWallet.publicKey), 1 * LAMPORTS_PER_SOL);

        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: airdropSignatureRequest,
        });
    } catch (err) {
        console.log(err);
    }
}

const main = async () => {
    console.log("Before Airdrop:");
    await getWalletBalance();
    await requestAirdrop();

    console.log("After Airdrop:");
    await getWalletBalance();
}

main();