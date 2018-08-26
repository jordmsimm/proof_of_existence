var Existence = artifacts.require("./Existence.sol");

contract('Existence', function(accounts) {

it("...should return the owner of the contract", function() {
  //Retuns the owners address of the existence contract
  //Makes sure ownership contract is importerd and used corectly
    return Existence.deployed().then(function(instance) {
        existenceInstance = instance;
        return existenceInstance.owner.call();
    }).then(function(storedData) {
        assert.equal(storedData, accounts[0], "The owner is inccorect.");
    });
});
 
it("...should tansfer ownership to different account", function() {
    //Transfers ownership of the contract to another address
    //Makes sure ownership contract is importerd and used corectly
    return Existence.deployed().then(function(instance) {
      existenceInstance = instance;
      return existenceInstance.transferOwnership(accounts[1], {from: accounts[0]});
    }).then(function() {
        return existenceInstance.owner.call();
    }).then(function(storedData) {
        console.log(storedData)
      assert.equal(storedData, accounts[1], "The owner should be account 2.");
    });
  });

  it("...should store the value hash QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsNUs7.", function() {
    //Makes sure that users can store ipfs hash correctly
    return Existence.deployed().then(function(instance) {
      existenceInstance = instance;
      return existenceInstance.addExistence("QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsNUs7", {from: accounts[0]});
    }).then(function() {
      return existenceInstance.getSingleExistanceHash(0,{from:accounts[0]});
    }).then(function(storedData) {
      assert.equal(storedData[0], "QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsNUs7", "The hash was not stored.");
    });
  });

  it("...should return the value 1", function() {
    // Used to test if users can query total number of existences
    return Existence.deployed().then(function(instance) {
      existenceInstance = instance;
      return existenceInstance.getTotalExistences({from:accounts[0]});
    }).then(function(storedData) {
      assert.equal(storedData, 1, "The value is not 1");
    });
  });

  it("...should not store the value hash QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsN.", function() {
    //Used to test data integrity
    return Existence.deployed().then(function(instance) {
      existenceInstance = instance;
      return existenceInstance.addExistence("QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsN", {from: accounts[0]});
    }).then(function(r) {
        assert(false, 'storing inccorrect has should have failed');
    },
    function(e) {
        assert(true, 'the inccorect hash threw and exception');
     });
  });

  it("...should set emergengy stop", function() {
    //Used to make sure emergency logic works correctly
    return Existence.deployed().then(function(instance) {
      existenceInstance = instance;
      return existenceInstance.toggleEStop( {from: accounts[0]});
    }).then(function() {
      return existenceInstance.addExistence("QmVAka4j65NpsFenYc4fn3KS1sryBw1n9GwYvUcgFsNUs7", {from: accounts[0]});
    }).then(function(r) {
        assert(false, 'Emergency stop logic stopped transaction');
    },
    function(e) {
        assert(true, 'Emergency stop should have threw exception');
     });
  });

  

});