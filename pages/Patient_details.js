import Hospital_navbar from "./Hospital_navbar";
import Web3 from "web3";
import { patient_abi, patient_address } from "../data";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'


export default function Patient_details() {
    const [account, setAccount] = useState();

    useEffect(() => {
        const loadMetamask = async () => {
            if (window.ethereum) {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setAccount(account);
            }
            else {
                console.alert("Non-Ethereum browser detected. Please install MetaMask")
            }
        }
        loadMetamask();

    }, [])
    /////////////////////////////////////
    const [id, setid] = useState();
    const [name, setname] = useState();
    const [age, setage] = useState();
    const [gender, setGender] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [date, setDate] = useState();
    const [attname, setattname] = useState();
    const [attphone, setattphone] = useState();
    const [attrel, setattrel] = useState();

    const getid = (e) => {
        setid(e.target.value);
    }
    const add_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(patient_abi, patient_address);
            var result = await myContract.methods.retreive_patient_details(id).call();
            var attend = await myContract.methods.retreive_attendant_details(id).call();
            setname(result[0]);
            setage(result[1]);
            setGender(result[2]);
            setHeight(result[3]);
            setWeight(result[4]);
            setAddress(result[5]);
            setPhone(result[6]);
            setEmail(result[7]);
            setDate(result[8]);

            setattname(attend[0]);
            setattrel(attend[1]);
            setattphone(attend[2]);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.bg}>

            <title>Patient Details</title>
            <Hospital_navbar />
            <h1>Display Patient Details</h1>&nbsp;

            <div className="form-group ml-3">
                <label>Enter Patient Id:</label>&nbsp;&nbsp;
                <input type="text" onChange={getid} ></input> &nbsp; &nbsp;
                <button type="button" onClick={add_details} className="btn btn-secondary" >Get Details</button>

                <h2>Patient Details-</h2>
            </div>
            <div className="form-group ml-3">
                <label>Patient Name: <b>{name}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Age: <b>{age}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Gender: <b>{gender}</b></label>&nbsp;&nbsp;
            </div>

            <div className="form-group ml-3">
                <label>Height(in Ft): <b>{height}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Weight: <b>{weight}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Address: <b>{address}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Contact: <b>{phone}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Email: <b>{email}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Birth Date: <b>{date}</b></label>&nbsp;&nbsp;
            </div>

            <h2>&nbsp;Attendant Details-</h2>
            <div className="form-group ml-3">
                <label>Attendant Name: <b>{attname}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Attendant Relation: <b>{attrel}</b></label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Attendant Contact: <b>{attphone}</b></label>&nbsp;&nbsp;
            </div>
        </div>

    )
}