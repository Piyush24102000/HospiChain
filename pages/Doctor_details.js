import Hospital_navbar from "./Hospital_navbar"
import { doctor_abi, doctor_address } from "../data";
import { useState } from 'react';
import Web3 from 'web3';
import styles from '../styles/Home.module.css'

export default function Doctor_details() {
    const[id,setId] = useState();
    const[name,setName] = useState();
    const[spec,setSpec] = useState();
    const[phone,setPhone] = useState();
    const[addr,setAddr] = useState();
    
    const getId = (e) => {
        setId(e.target.value)
    }
    const fetch_data = async() => {
        const web3 = new Web3(Web3.givenProvider||"https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
        var myContract = new web3.eth.Contract(doctor_abi, doctor_address);
        const result = await myContract.methods.retreive_doctor_details(id).call();
        setName(result[0]);
        setSpec(result[1]);
        setPhone(result[2]);
        setAddr(result[3]);
    }
    return (
        <div className={styles.bg}>

            <title>Doctor Details</title>
            <Hospital_navbar />
            <h1>Display Doctor Details</h1>&nbsp;

            <div className="form-group ml-3">
                <h2>Doctor Details</h2>
                <label>Doctor Id:</label>&nbsp;&nbsp;
                <input type="text" onChange={getId} ></input> &nbsp; &nbsp;
                <button type="button" className="btn btn-secondary" onClick={fetch_data}>Get Details</button>
            </div>

            <div className="form-group ml-3">
                <label>Doctor Name: <b>{name}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Doctor Specialization: <b>{spec}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Doctor Contact Number: <b>{phone}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Doctor Address: <b>{addr}</b></label>&nbsp;&nbsp;
            </div>


        </div>
    )
}