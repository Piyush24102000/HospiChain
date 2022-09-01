// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Patient {
    address owner;
    struct patient {
        string patient_name;
        uint256 age;
        string gender;
        string height;
        uint256 weight;
        string patient_address;
        uint256 phone_no;
        string email_id;
        uint256 date;
    }
    struct attendant {
        uint256 patient_id;
        string attendant_name;
        string attendant_relation;
        uint256 attendant_phn_no;
    }

    mapping(uint256 => patient) patientList;
    mapping(uint256 => attendant) attendantList;

    constructor() {
        owner = 0xd4d7a69AfF0960ed5f1F313Ba97D397315671990;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    function store_patient_details(
        uint256 patient_id,
        string memory _patient_name,
        uint256 _age,
        string memory _gender,
        string memory _height,
        uint256 _weight,
        string memory _patient_address,
        uint256 _phone_no,
        string memory _email_id,
        uint256 _date
    ) public isOwner {
        patientList[patient_id] = patient(
            _patient_name,
            _age,
            _gender,
            _height,
            _weight,
            _patient_address,
            _phone_no,
            _email_id,
            _date
        );
    }

    function store_attendant_details(
        uint256 patient_id,
        string memory _attendant_name,
        string memory _attendant_relation,
        uint256 _attendant_phn_no
    ) public isOwner {
        attendantList[patient_id] = attendant(
            patient_id,
            _attendant_name,
            _attendant_relation,
            _attendant_phn_no
        );
    }

    function retreive_patient_details(uint256 patient_id)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        patient memory p = patientList[patient_id];
        return (
            p.patient_name,
            p.age,
            p.gender,
            p.height,
            p.weight,
            p.patient_address,
            p.phone_no,
            p.email_id,
            p.date
        );
    }

    function retreive_attendant_details(uint256 patient_id)
        public
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        attendant memory a = attendantList[patient_id];
        return(a.attendant_name,a.attendant_relation,a.attendant_phn_no);    
    }
}
