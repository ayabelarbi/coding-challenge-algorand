const express = require('express');
const algosdk = require('algosdk');
const cors = require('cors');
const app = express();

const token = 'a'.repeat(64);
const port = 8080;
const portAlgo = 4001; 
const server = 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});

//Accepting an Algorand address
let watcherList = [];
app.post('/watcher', (req, res) => {
   const address = req.body.address;

  try {
    if(algosdk.isValidAddress(address)) {
      watcherList.push(address);
      res.send('Address added to watcher list');
    } else {
      throw new Error('Invalid address');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get('/watcher', (req, res) => {
  res.json(watcherList);
});


//Periodically checking the state of the accounts and logging notification
let previousBalances = {};
function periodicStateCheck() {

  setInterval(async () => {
    for (const address of watcherList) {
      const algodClient = new algosdk.Algodv2(token, server, portAlgo);
    
      try {
        const response = await algodClient.accountInformation(address).do(); 
        const accountBalance = response.amount;

        console.log(`Account balance of ${address} : ${accountBalance} microAlgos`);

      // If the balance has changed since the last query, notify " new balance: ${accountBalance} microAlgos"
      if (previousBalances[address] !== undefined && previousBalances[address] !== accountBalance) {
        console.log(`New balance for account ${address}: ${accountBalance} microAlgos`);
      }

      // Update the previous balance
      previousBalances[address] = accountBalance;

      } catch (error) {
        console.error(`Error checking state for account ${address}: ${error}`);
      }
    }
  }, 6000); // 60 seconds interval
 }
periodicStateCheck();


// Listing tracked accounts and their balances
app.get('/accounts', async (req, res) => {
  // Create an object to store the account information
  let accountInfo = {};
 
  // Loop through the watcher list
  for (const address of watcherList) {
    const algodClient = new algosdk.Algodv2(token, server, portAlgo);
 
    try {
      const response = await algodClient.accountInformation(address).do();
      accountInfo[address] = response;
    } catch (error) {
      console.error(`Error getting account information for address ${address}: ${error}`);
    }
  }
 
  // Send the account information as a JSON response
  res.json(accountInfo);
 });