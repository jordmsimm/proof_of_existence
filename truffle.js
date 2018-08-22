module.exports = {
  networks:{
    development:{
        host: "127.0.0.1",
        port:"8545",
        network_id: "*"
    },
    rinkeby: {
        host: "localhost", // Connect to geth on the specified
        port: 8545,
        from: "0x6d8cad9f9b6d2a5ce8b982cd606f73de035d8db5", // default address to use for any transaction Truffle makes during migrations
        network_id: 4,
        //gas: 4612388 // Gas limit used for deploys
      }
}
};

