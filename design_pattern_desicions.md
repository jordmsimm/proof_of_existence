# Design Pattern Decisions #
  For my contract design all of the main application logic is in 1 main contract. I also implemented the Ownable contract from Zepplin for contract ownership. The existence contract stores media and data for 1 "existence" on IPFS in JSON format. The hash of all this data is then stored on the blockchain along with a timestamp to prove the existence of the data at a given point in time. Circuit breaker logic was added to the function that stores data on the blockchain. I wanted to leave functions avaialble to query data if needed.

