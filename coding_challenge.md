# Coding Challenge: Algorand Account Watcher

As part of this process, we would like you to complete a coding challenge that demonstrates your skills in developing applications and learn a bit about algorand. This challenge involves creating a simple application and/or service that interacts with the Algorand node API.

## Requirements

Your task is to develop a REST API that allows users to add Algorand account addresses to a "watcher" list. 

The application should have the following features:

1. Accepting an Algorand address: Create a REST API endpoint that accepts an Algorand account address and adds it to the watcher list.

2. Periodic state check: Implement a mechanism that periodically, at every 60 seconds, check the state of each account in the watcher list. This check should determine if the account's state has changed since the last query.

3. Logging notifications: Whenever a change in the balance of a watched account is detected, log a notification. This notification should provide relevant details about the account and its state change.

4. Listing tracked accounts and their states: Create a REST API endpoint that lists all the tracked accounts and their current states.

## Implementation

When completing this coding challenge, keep in mind that we do not expect a fully fledge production-ready system, but all design & implementation decisions will be considered. So things like unit tests, configurability, documentation, ease of use, deployability, a well-structured codebase, etc; all will be taken into account. 


## Resource

- [algonode.io](https://algonode.io/) (use testnet)
- Relevant endpoint: [Account Information](https://app.swaggerhub.com/apis/algonode/algod-rest_api/0.0.1#/public/AccountInformation)

## Delivery
- Github repository with the code
