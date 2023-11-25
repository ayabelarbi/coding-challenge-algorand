## Language Used

### Creation of the REST API

This project is developed using JavaScript with Node.js and Express.js.

### Testing the API

I utilized the REST Client extension in Visual Studio Code for API testing. The file named 'api.http' serves as the test file for the API.

## How It Works

### Setup - Algod node setting

To initiate the node, navigate to the `./sandbox` directory and execute the command `./sandbox up dev`. This sets up a local network.

Accounts are generated through the sandbox. To test the fluctuation of the account balance, transactions are sent from one account to another using the following command:

`./sandbox goal clerk send -a 123456789 -f <account1> -t <account2>`

Replace `<account1>` and `<account2>` with the addresses of the accounts you want to use for the transaction.

### Test Accounts Configuration

The sandbox network is configured with several pre-allocated accounts for testing. The configuration is defined in a JSON file (genesis.json) with the following structure:

- `alloc`: An array of account objects, each with the following properties:
  - `addr`: The address of the account.
  - `comment`: A comment describing the purpose of the account.
  - `state`: The initial state of the account, including the balance (`algo`), online status (`onl`), and other properties related to voting.

Here are the test accounts:

1. `RewardsPool`: An account with address `7777777777777777777777777777777777777777777777777774MSJUVU` and an initial balance of 100,000 Algos.

2. `FeeSink`: An account with address `A7NMWS3NT3IUDMLVO26ULGXGIIOUQ3ND2TXSER6EBGRZNOBOUIQXHIBGDE` and an initial balance of 100,000 Algos.

3. `Wallet1`: An account with address `N6CJ5SQBNGXE4P4PGUSQQEFHDJE6E33C7SLDJ354GYIDK5STIPMR3BLE6E` and an initial balance of 4,000,000,000,000,000 Algos.

4. `Wallet2`: An account with address `BGW4JZMGQT56GCMK5ACT5MJP25SOYQEMU35KIOMFSKQTJTSIU3CCQEE2YQ` and an initial balance of 4,000,000,000,000,000 Algos.

5. `Wallet3`: An account with address `JRYKGHGPKWHS6ICOWCIQPBM4KS4Z7S4MNG3NCYYXX727IC7UJFQESEWY4E` and an initial balance of 2,000,000,000,000,000 Algos.

These accounts are used to test the fluctuation of account balances by sending transactions from one account to another.

### Adding Funds, Removing Funds 

The funds in the wallet are already present. To test whether the account state has changed or not, I send funds from one account to another. Then we will be able to see the changes. 
