const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const request = require("request");

const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

const getTokenDetails = async () => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey("DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo"),
            {
                programId: new PublicKey(TOKEN_PROGRAM),
            }
        );

        const nonZeroAccounts = tokenAccounts?.value?.filter(
            (obj) => obj.account.data.parsed.into.tokenAmount.uiAmount > 0
        );

        const url = 'https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json';

        request.get({
            url: url,
            json: true,
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                // data is already parsed as JSON:
                for (adrss of data.tokens) {
                    for (acct of nonZeroAccounts) {
                        if (adrss.address == acct.account.data.parsed.info.mint) {
                            console.log(`The token ${address.symbol} exists and has balance ${acct.account.data.parsed.info.tokenAmount.uiAmount}`);
                        }
                    }
                }
            }
        })
    } catch (err) {
        console.log(err);
    };

}

getTokenDetails();