// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Doctor {
    address owner;

    struct doctor {
        string doctor_name;
        string doctor_specialisation;
        uint256 doctor_contact;
        string doctor_address;
    }
    mapping(uint256 => doctor) doctorList;

    constructor() { //can be only called by the hospital
        owner = 0xd4d7a69AfF0960ed5f1F313Ba97D397315671990; //address of contract which deployed hospital contract
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
    
    function store_doctor_details(uint16 doctor_id,string memory _name,string memory _specialisation,uint _contact,string memory _address) public isOwner{
        doctorList[doctor_id] = doctor(_name,_specialisation,_contact,_address);
    }
    
    function retreive_doctor_details(uint16 doctor_id) public view returns(string memory,string memory,uint,string memory){
       doctor memory d = doctorList[doctor_id];
        return(d.doctor_name,d.doctor_specialisation,d.doctor_contact,d.doctor_address);
    }
}
