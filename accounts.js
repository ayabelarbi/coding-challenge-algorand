const algosdk = require('algosdk');

async function main() {

    // Generate account for demo purposes and API testing
    const generatedAccount = algosdk.generateAccount();
    const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);
    console.log(`My address: ${generatedAccount.addr}`);
    console.log(`My passphrase: ${passphrase}`);
  
}


main(); 

