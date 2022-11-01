const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

const getTokens = async () => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey("AVyZTBb5tWvSAAQMEqVr6WpgKc9rbkvQYuYfBL9YVUR1"),
            {
                programId: new PublicKey(TOKEN_PROGRAM),
            }
        );
        
        const nonZeroAccounts = tokenAccounts?.value?.filter(
            (obj) => obj.account.data.parsed.info.tokenAmount.uiAmount > 0
        );

        // let mapAccountData = nonZeroAccounts.map((obj) => obj.account.data);
        let mapAccountData = nonZeroAccounts.map((obj) => obj.account.data.parsed.info);

        console.log(mapAccountData);

        // console.log(nonZeroAccounts);

        // console.log(tokenAccounts);
    } catch (err) {
        console.log(err);
    }
}

getTokens();