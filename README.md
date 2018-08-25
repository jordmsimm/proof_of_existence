# proof_of_existence
A decentralized application used for storing different types of media and data for evidence of its existence at a given time.
### Development Tools ###
  * [ganache-cli](https://github.com/trufflesuite/ganache-cli)
  * [truffle](https://github.com/trufflesuite/truffle)
  * [metamask](https://metamask.io/)
  * [uport](https://www.uport.me/)

### Interact with rinkeby and uport ###
The smart contracts are deployed on the rinkeby network and the artifacts are in the build folder. To interact with the dApp, use the uPort mobile app. To start the dApp use the commands below.

Install dependencies:
  ```shell
  npm install
  ```
  
Run dev server:
```shell
  npm run start
```

View app at: 
```shell
  localhost:3000
```

Then, use the uPort mobile app to sign in and add existences.

  
### Interact with ganache and metamask ###
Install dependencies:
  ```shell
  npm install
  ```
  
Start ganache:
  ```shell
  ganache-cli
  ```
Compile contracts:
```shell
  truffle compile
```

Migrate contracts to ganache:
```shell
  truffle migrate
```

Run dev server:
```shell
  npm run start
```

View app at: 
```shell
  localhost:3000
```

### Run contract tests using ganache ###
Start ganache:
  ```shell
  ganache-cli
  ```

Run tests:
```shell
  truffle test
```

