import Hospital_navbar from './Hospital_navbar'
import { hospital_abi, hospital_address } from "../data";
import { useState } from 'react';
import Web3 from 'web3';
import styles from '../styles/Home.module.css'

export default function Hospital_details() {

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [spec, setSpec] = useState();
    const[id,setId] = useState();

    const getId = (event) =>{
        setId(event.target.value);
    }
    const fetchData = async () => {
        const web3 = new Web3(Web3.givenProvider||"https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
        var myContract = new web3.eth.Contract(hospital_abi, hospital_address);
        const result = await myContract.methods.retrieve_hospital_details(id).call();
        setName(result[0]);
        setAddress(result[1]);
        setSpec(result[2]);
    }

    return (
        <div className={styles.bg}>

            <title>Hospital Details</title>
            <Hospital_navbar /> &nbsp;
            <h1>Display Hospital Details</h1>&nbsp;

            <div className="form-group ml-3">
                <h2>Hospital Details</h2>
                <label>Hospital Id:</label>&nbsp;&nbsp;
                <input type="text" onChange={getId}  ></input> &nbsp; &nbsp;
                <button onClick={fetchData} type="button" className="btn btn-secondary">Submit</button>
            </div>

            <div className="form-group ml-3">
                <label>Hospital Name: <b>{name}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Hospital Address: <b>{address}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Hospital Specification: <b>{spec}</b></label>&nbsp;&nbsp;
            </div>


        </div>
    )
}