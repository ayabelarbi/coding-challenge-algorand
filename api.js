const express = require("express");
const algosdk = require("algosdk");
const cors = require("cors");
const app = express();

const token = "a".repeat(64);
const port = 8080;
const portAlgo = 4001;
const server = "http://localhost";

const algodClient = new algosdk.Algodv2(token, server, portAlgo);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Accepting an Algorand address
let watcherList = [];
app.post("/watcher", (req, res) => {
  const address = req.body.address;

  try {
    if (algosdk.isValidAddress(address)) {
      watcherList.push(address);
      res.send("Address added to watcher list");
    } else {
      throw new Error("Invalid address");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get("/watcher", (req, res) => {
  res.json(watcherList);
});



//Periodically checking the state of the accounts and logging notification
let lastKnownStates = {};
function periodicStateCheck() {
  setInterval(async () => {
    let i = 0; 
    for (const address of watcherList ) {

      try {
        i++; 
        const info = await algodClient.accountInformation(address).do();
        const currentState = info;

        if (JSON.stringify(currentState) !== JSON.stringify(lastKnownStates[address])) {
          console.log(`State of account ${address} has changed.`);
          lastKnownStates[address] = currentState;
        } else {
          console.log(`No change in state of account ${address}.`);
        }

        // Check if the balance has changed
       if (lastKnownStates[address] && lastKnownStates[address].amount !== currentState.amount) {
        console.log(`New balance for account ${address}: ${currentState.amount} microAlgos`);
      }


      
        // Update the previous balance
        lastKnownStates[address] = currentState;
      } catch (error) {
        console.error(`Error checking state for account ${address}: ${error}`);
      }
    }
  }, 60000); // 60 seconds interval
}
periodicStateCheck();



// Listing tracked accounts and their balances
app.get("/accounts", async (req, res) => {
  let accounts = [];
 
  for (const address of watcherList) {
    try {
      const info = await algodClient.accountInformation(address).do();
      accounts.push({
        address: address,
        state: info
      });
    } catch (error) {
      console.error(`Error checking state for account ${address}: ${error}`);
    }
  }
 
  res.json(accounts);
 });