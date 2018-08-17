pragma solidity ^0.4.23;

import "./Ownable.sol";
//import "./zeppelin/ownership/Ownable.sol";
contract Existence is Ownable{
    
    mapping (address =>ExistenceOwner) existenceOwner;
    struct ExistenceOwner {
        uint totalExistences;
        string allExistencesHash;
        mapping(uint => Existance) existences;
    }
    
    
    struct Existance{
        uint id;
        string hash;
        uint dateTimestamp;
    }


    function addExistence(  string _existencesHash) public {
        
        //this function updates the hash for all existances stored on ipfs
        bytes memory inputLength = bytes(_existencesHash);
        require(inputLength.length == 46 );
        uint _totalExistences = existenceOwner[msg.sender].totalExistences;
      
        existenceOwner[msg.sender].existences[_totalExistences].hash = _existencesHash;
        existenceOwner[msg.sender].existences[_totalExistences].dateTimestamp= now;
        existenceOwner[msg.sender].totalExistences = _totalExistences + 1;
     }    
   

     function updateExistenceHash( string _allExistencesHash) public {
        bytes memory inputLength = bytes(_allExistencesHash);
        require(inputLength.length == 46 );
        existenceOwner[msg.sender].allExistencesHash = _allExistencesHash;
     }
     
     function getTotalExistences() view returns (uint totalExistences){
        return existenceOwner[msg.sender].totalExistences;
     }

     function getAllExistenceHash() view returns (string allExistencesHash){
        return existenceOwner[msg.sender].allExistencesHash;
     }
     
     function getUserInformation() view returns (string _ipfsHash, uint totalExistences){
         return(
             existenceOwner[msg.sender].allExistencesHash,
             existenceOwner[msg.sender].totalExistences
             );
     }
     
     function getSingleExistanceHash(uint _id) view returns (uint id, string _ipfsHash, uint dateTimestamp){
         return(
             existenceOwner[msg.sender].existences[_id].id,
             existenceOwner[msg.sender].existences[_id].hash,
             existenceOwner[msg.sender].existences[_id].dateTimestamp
             );
     }
    
    
    
    
}