// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract examine {
    address owner;
    mapping(string => tests) patienttests;
    mapping(string => scan) scantests;
    mapping(string => system) systemexamine;
    mapping(uint => data) dates; 

    struct data{
    string[] date;   
    }
    struct tests {
        string patient_id;
        string blood_test;
        string urine_test;
        string ecg;
        string mri_scan;
        string ct_scan;
        string xray;
        string lab_test;
    }
    struct scan {
        string patient_id;
        string built;
        string nouirishment;
        string eyes;
        string tongue;
        uint64 pulse;
        string blood_pressure;
        uint64 temp;
        uint64 respiratory_rate;
    }
    struct system {
        string patient_id;
        string cns;
        string cvs;
        string rs;
        string abdomen;
    }
    constructor(){
        owner = 0xd4d7a69AfF0960ed5f1F313Ba97D397315671990;
    }
     modifier isOwner() {

         require(msg.sender == owner, "Access is not allowed");

         _;

     }
    function previous_reports(uint id, string memory x) public {
    dates[id].date.push(x);

    }
   function get_previous_reports(uint id) public view returns(string[] memory ){
        data memory d = dates[id];
        return d.date;
    }

    function investigations(string memory patient_id,string memory _blood_test,string memory _urine_test,string memory _ecg,string memory _mri_scan,string memory _ct_scan,string memory _xray,string memory _lab_test)public isOwner {
        patienttests[patient_id] = tests(patient_id,_blood_test,_urine_test,_ecg,_mri_scan,_ct_scan,_xray,_lab_test) ;
    }
    function get_investigations(string memory patient_id)public view returns (string memory,string memory,string memory,string memory,string memory,string memory,string memory){
        tests memory t = patienttests[patient_id];
        return (t.blood_test,t.urine_test,t.ecg,t.mri_scan,t.ct_scan,t.xray,t.lab_test);
    }


    function general_examine(string memory patient_id,string memory _built,string memory _nouirishment,string memory _eyes,string memory _tongue,uint64 _pulse,string memory _blood_pressure,uint64 _temp,uint64 _respiratory_rate)public isOwner {
        scantests[patient_id] = scan(patient_id,_built,_nouirishment,_eyes,_tongue,_pulse,_blood_pressure,_temp,_respiratory_rate);
    }
    function get_general_examine(string memory patient_id)public view returns (string memory,string memory,string memory,string memory,uint64,string memory,uint64,uint64){
        scan memory s = scantests[patient_id];
        return (s.built,s.nouirishment,s.eyes,s.tongue,s.pulse,s.blood_pressure,s.temp,s.respiratory_rate);
    }   

    
    function sys_examine(string memory patient_id,string memory _cvs,string memory _cns,string memory _rs,string memory _abdomen)public isOwner {
        systemexamine[patient_id] = system(patient_id,_cvs,_cns,_rs,_abdomen);
    }
    function get_sys_examine(string memory patient_id)public view returns (string memory,string memory,string memory,string memory){
        system memory sys = systemexamine[patient_id];
        return(sys.cvs,sys.cns,sys.rs,sys.abdomen);
    }
    
}
