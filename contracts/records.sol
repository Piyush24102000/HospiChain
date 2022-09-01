// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Records is ERC721 {
    address owner;
    mapping(string => insurance) insurancelist;
    mapping(string => history) patienthistory;
    mapping(string => past) pasthistory;
    mapping(string => diag) diagnosis;
    mapping(string => treat) treatment;
    mapping(uint256 => prev) prevdates;
    mapping(uint256 => patient) patientlist;
    mapping(uint => data) dates; 

    struct data{
    string[] date;   
    }
    struct patient {
        string patient_id;
    }
    struct prev {
        uint256 patient_id;
        string previous;
    }
    struct insurance {
        string patient_id;
        string applicable;
        uint64 policy_no;
        string insurer;
        string policy_type;
        string policy_limit;
    }

    struct history {
        string patient_id;
        string complaints;
        string duration;
    }
    struct past {
        string patient_id;
        string family_history;
        string personal_history;
        string drug_history;
    }
    struct diag {
        string patient_id;
        string diag_summary;
        string prescription;
    }
    struct treat {
        string treatment;
        string date_treatment;
        uint256 doctor_id;
        uint256 hospital_id;
        string discharge;
        string follow_up;
    }

    constructor() ERC721("HospiChain", "HC") {
        owner = 0xd4d7a69AfF0960ed5f1F313Ba97D397315671990;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");

        _;
    }

    ////ERCs functions////
    function namedecl() public view returns (string memory) {
        return name();
    }
    function symboldecl() public view returns (string memory) {
        return symbol();
    }


    // function medical_record(uint patient_id) public{
    //     _mint(msg.sender, patient_id);
    //     patientlist[patient_id] = patient(patient_id);
    // }


     function previous_dates(uint id, string memory x) public {
        dates[id].date.push(x);

    }
   function get_previous_dates(uint id) public view returns(string[] memory ){
        data memory d = dates[id];
        return d.date;
    }


    function insurance_details(string memory patient_id,string memory _applicable,uint64 _policy_no,string memory _insurer,string memory _policy_type,string memory _policy_limit)public isOwner {
            insurancelist[patient_id] = insurance(patient_id,_applicable,_policy_no,_insurer,_policy_type,_policy_limit);
    }
    function get_insurance(string memory  patient_id)public view returns (string memory,uint64,string memory,string memory,string memory){
        insurance memory i = insurancelist[patient_id];
        return(i.applicable,i.policy_no,i.insurer,i.policy_type,i.policy_limit);
    } 

    
    function present_illness(string memory  patient_id,string memory _complaints,string memory _duration)public isOwner {
        patienthistory[patient_id] = history(patient_id,_complaints,_duration);
    }
    function get_present_illness(string memory  patient_id)public view returns (string memory,string memory){
        history memory hi = patienthistory[patient_id];
        return(hi.complaints,hi.duration);
    }
    

    function past_illness(string memory  patient_id,string memory _family_history,string memory _personal_history,string memory _drug_history)public isOwner {
        pasthistory[patient_id] = past(patient_id,_family_history,_personal_history,_drug_history);

    }
     function get_past_illness(string memory  patient_id)public view returns (string memory,string memory,string memory){
        past memory pa = pasthistory[patient_id];
        return(pa.family_history,pa.personal_history,pa.drug_history);
    }

    
    function func_diagnosis(string memory  patient_id,string memory _diag_summary,string memory _prescription)public isOwner {
        diagnosis[patient_id] = diag(patient_id,_diag_summary,_prescription);

    }
    function get_func_diagnosis(string memory  patient_id)public view returns (string memory,string memory){
        diag memory d = diagnosis[patient_id];
        return(d.diag_summary,d.prescription);
    }


    function treatment_summary(string memory  patient_id,string memory _treatment,string memory _date_treatment,uint256 _doctor_id,uint256 _hospital_id,string memory _discharge,string memory _follow_up)public isOwner {
        treatment[patient_id] = treat(_treatment,_date_treatment,_doctor_id,_hospital_id,_discharge,_follow_up);
    }
    function get_treatment_summary(string memory  patient_id)public view returns (string memory,string memory,uint256,uint256,string memory,string memory){
        treat memory tr = treatment[patient_id];
        return(tr.treatment,tr.date_treatment,tr.doctor_id,tr.hospital_id,tr.discharge,tr.follow_up);
    }

}
