# Blockchain Data Processing

A simple API that processes a given `JSON` file with blockchain transactions and exposes a RESTful API that provides historical data from the file.

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [nodeJS](https://nodejs.org/en/)

## Install and Run

Run `npm install` in both folders:

- `services/api-gateway`
- `services/service-processor`

Then run **in the root folder**:

- `make build`

If you prefer you can run the `docker` command directly:

- `docker-compose -f compose/docker.compose-api-gateway.yml -f compose/docker.compose-service-processor.yml up --build`

**Seeds can take up to a few minutes**

```
processor_1     | Using environment "development".
processor_1     | == 20210219050109-seed-transactions: migrating =======
processor_1     | == 20210219050109-seed-transactions: migrated (58.400s)
processor_1     | 
processor_1     | == 20210222235221-seed-ledger: migrating =======
processor_1     | == 20210222235221-seed-ledger: migrated (15.787s)
```

## API

The api docs are given as a postman collection [here](./docs/blockchain_data.postman_collection.json).

- `base URL` `http://localhost:4000/v1.0/`

## Get Balance by Account

`GET http://localhost:4000/v1.0/processor/accounts/:account/balance?token=tokenAddress`

## Get Average or Median Token Transfer

`GET http://localhost:4000/v1.0/processor/tokens/:token?type=average|median`

## Get Account with Highest Token Balance

`GET http://localhost:4000/v1.0/processor/accounts/highestBalance?token=tokenAddress`

## Get Account with Most Token Transfers

`GET http://localhost:4000/v1.0/processor/accounts/mostTransfers?token=tokenAddress`

## Data Input

The input data is in the format;

```json
[
  {
    "token": "0x1985365e9f78359a9b6ad760e32412f4a445e862",
    "sender": "0xba689c3300de6e96db9be8162916bb4101a3f3af",
    "recipient": "0x47e90247f88f7ceef320120bd4fa3efa54024888",
    "value": 10000000000000000000,
    "timestamp": 1532200326
  }
]
```
where:
- `token` The token being transferred
​- `sender`​ The account that sent the tokens ​
- `recipient` The account that received the tokens ​
- `value` How many tokens were sent
- `timestamp​` When the transfer happened in epoch time seconds

Sample file [here](./docs/token_transfers.json)