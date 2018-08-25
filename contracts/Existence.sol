pragma solidity ^0.4.23;

import "./Ownable.sol";
//import "../installed_contracts/zeppelin/contracts/ownership/Ownable.sol";
/** @title Existence. */
contract Existence is Ownable{
    mapping (address =>ExistenceOwner) existenceOwner;
    struct ExistenceOwner {
        uint totalExistences;
        mapping(uint => Existance) existences;
    }
    bool eStop;
    
    struct Existance{
        uint id;
        string hash;
        uint dateTimestamp;
    }
    
    event LogCreateExistence(address indexed _from, string _hash);
    
    constructor(){
        eStop = false;
    }
    
    modifier isStopped() {
        require(eStop != true);
        _;
     }
    
      /** @dev Allows owner to toggle emergency stop functionality*/
     function toggleEStop() public onlyOwner{
          eStop = !eStop;
     }
      
      /** @dev Adds new ipfs hash to existence wwner mapping
      * @param _existenceHash Hash of data stored on ipfs
      */
    function addExistence(  string _existenceHash)  public isStopped{
        //check to make sure hash is valid
        bytes memory inputLength = bytes(_existenceHash);
        require(inputLength.length == 46 );

        //get total existences for user
        uint _totalExistences = existenceOwner[msg.sender].totalExistences;
        
        //save data & timestamp to verify the time the data was saved on ipfs
        existenceOwner[msg.sender].existences[_totalExistences].hash = _existenceHash;
        existenceOwner[msg.sender].existences[_totalExistences].dateTimestamp= now;
        existenceOwner[msg.sender].totalExistences = _totalExistences + 1;
        emit LogCreateExistence(msg.sender, _existenceHash);
     }    
     
      /** @dev Returns total existences a user has stored
      * @return totalExistences Number of existences.
      */
     function getTotalExistences() view returns (uint totalExistences){
        return existenceOwner[msg.sender].totalExistences;
     }
     
     /** @dev Returns a single ipfs has with timestamp
      * @param _id Id of ipfs hash
      * @return ipfsHash IPFS hash containing media & data.
      * @return dateTimestamp Timestamp when data was first stored.
      */
     function getSingleExistanceHash(uint _id) view returns ( string _ipfsHash, uint dateTimestamp){
         return(
             existenceOwner[msg.sender].existences[_id].hash,
             existenceOwner[msg.sender].existences[_id].dateTimestamp
             );
     }
    
    
    
    
}