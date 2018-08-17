var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var ExistenceStorage = artifacts.require("./Existence.sol");
var OwnableStorage = artifacts.require("./Ownable.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ExistenceStorage);
  deployer.deploy(OwnableStorage);
};


