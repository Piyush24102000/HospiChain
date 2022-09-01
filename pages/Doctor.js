import Hospital_navbar from "./Hospital_navbar"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Web3 from "web3";
import { doctor_abi, doctor_address } from "../data"
import styles from '../styles/Home.module.css'

export default function Doctor() {
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
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [spec, setSpec] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();

    const addId = (event) => {
        setId(event.target.value);
    }
    const addName = (event) => {
        setName(event.target.value);
    }
    const addSpec = (event) => {
        setSpec(event.target.value);
    }
    const addContact = (event) => {
        setContact(event.target.value);
    }
    const addAddress = (event) => {
        setAddress(event.target.value);
    }

    const add_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(doctor_abi, doctor_address);
            await myContract.methods.store_doctor_details(id, name, spec, contact, address).send({ from: account })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.bg}>

            <title>Doctor Registration</title>
            <Hospital_navbar />
            <h1><u>Doctor Registration</u> </h1>
            &nbsp;
            <form>

                <div className="form-group ml-3">
                    <h2>Register Doctor</h2>
                    <label>Doctor Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={addId}  ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Doctor Name:</label>&nbsp;&nbsp;
                    <input type="text" onChange={addName} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Doctor Specialization:</label>&nbsp;&nbsp;
                    <input type="text" onChange={addSpec} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Doctor Contact Number:</label>&nbsp;&nbsp;
                    <input type="text" onChange={addContact} ></input>
                </div>

                <div className="form-group ml-3">
                    <label>Doctor Address:</label>&nbsp;&nbsp;
                    <input type="text" onChange={addAddress} ></input>
                </div>

                <div className="form-group ml-3">
                    <button type="button" onClick={add_details} className="btn btn-primary">Register</button>
                </div>
            </form>
            <h3>To get details of Doctor  <Link href="./Doctor_details"><a>Click Here</a></Link></h3>

        </div>
    )
}