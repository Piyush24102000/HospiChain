import Hospital_navbar from "./Hospital_navbar";
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Web3 from "web3";
import { patient_abi, patient_address } from "../data";
import styles from '../styles/Home.module.css'


export default function Patient() {
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
    const [gender, setgender] = useState();
    const [height, setheight] = useState();
    const [weight, setweight] = useState();
    const [address, setaddress] = useState();
    const [phone, setphone] = useState();
    const [email, setemail] = useState();
    const [date, setdate] = useState();
    /////////////////////////////////////
    const[attid,setattid] = useState();
    const [attname, setattname] = useState();
    const [attrel, setattrel] = useState();
    const [attphone, setattphone] = useState();

    const getid = (e) => {
        setid(e.target.value);
    }
    const getname = (e) => {
        setname(e.target.value);
    }
    const getage = (e) => {
        setage(e.target.value);
    }
    const getgender = (e) => {
        setgender(e.target.value);
    }
    const getheight = (e) => {
        setheight(e.target.value);
    }
    const getweight = (e) => {
        setweight(e.target.value)
    }
    const getaddress = (e) => {
        setaddress(e.target.value)
    }
    const getphone = (e) => {
        setphone(e.target.value)
    }
    const getemail = (e) => {
        setemail(e.target.value);
    }
    const getdate = (e) => {
        setdate(e.target.value)
    }
    //////////////////////////
    const getattid = (e) => {
        setattid(e.target.value);
    }
    const getattname = (e) => {
        setattname(e.target.value);
    }
    const getattrel = (e) => {
        setattrel(e.target.value)
    }
    const getattphone = (e) => {
        setattphone(e.target.value);
    }
    const add_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(patient_abi, patient_address);
            await myContract.methods.store_patient_details(id, name, age, gender, height, weight, address, phone, email, date).send({ from: account });
            await myContract.methods.store_attendant_details(attid, attname, attrel, attphone).send({ from: account });

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className={styles.bg}>

            <title>Patient Details</title>
            <Hospital_navbar />
            <h1><u>Patient Registration</u></h1>
            <form>

                <div className="form-group ml-3">
                    <h2>Register Patient</h2>
                    <label>Patient Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getid}  ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Patient Name:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getname} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Age:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getage} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Gender:</label>&nbsp;
                    <input type="text" onChange={getgender} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Height:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getheight} ></input> &nbsp;
                    <label>(Feets.inches)</label>
                </div>
                <div className="form-group ml-3">
                    <label>Weight:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getweight} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Address:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getaddress} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Contact:</label>&nbsp;
                    <input type="text" onChange={getphone} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Email:</label>&nbsp;
                    <input type="text" onChange={getemail} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Date:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdate} ></input> &nbsp;
                    <label>(ddmmyyyy)</label>
                </div>
                {/* ///////Attendats here/////// */}
                <div className="form-group ml-3">
                    <h2> Patient's Attendant Details</h2>
                    <label>Patient Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getattid}  ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Attendant Name:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getattname} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Attendant Relation:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getattrel} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Attendant Contact:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getattphone} ></input>
                </div>


                <div className="form-group ml-3">
                    <button type="button" onClick={add_details} className="btn btn-primary">Register</button>
                </div>
            </form>
            <h3>To get details of Patient  <Link href="./Patient_details"><a>Click Here</a></Link></h3>


        </div>
    )
}