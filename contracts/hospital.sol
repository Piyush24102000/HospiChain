// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Hospital {
    address owner;
    struct hospital {
        string hospital_name;
        string hospital_address;
        string hospital_specification;
    }
    mapping(uint256 => hospital) hospitallist;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;

    }
    function store_hospital_details(uint hospital_id,string memory _hospital_name,string memory _hospital_address,string memory _hospital_spec) public isOwner{
        hospitallist[hospital_id] = hospital(_hospital_name,_hospital_address,_hospital_spec);

    }
    function retrieve_hospital_details(uint hospital_id) public view returns(string memory,string memory,string memory){
        hospital memory h = hospitallist[hospital_id];
        return(h.hospital_name,h.hospital_address,h.hospital_specification);
    }
}
