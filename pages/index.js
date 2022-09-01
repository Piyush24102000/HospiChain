import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar'
import { hospital_abi, hospital_address } from "../data";
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Web3 from "web3";

export default function Home() {
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
  ///////////////////////////////////////
  const [id, setidInput] = useState();
  const [name, setnameInput] = useState();
  const [address, setaddressInput] = useState();
  const [spec, setspecInput] = useState();

  const idInput = (event) => {
    setidInput(event.target.value);
  }
  const nameInput = (event) => {
    setnameInput(event.target.value);
  }
  const addressInput = (event) => {
    setaddressInput(event.target.value);
  }
  const specInput = (event) => {
    setspecInput(event.target.value);
  }
  const add_details = async () => { //Add details function
    try {
      const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
      var myContract = new web3.eth.Contract(hospital_abi, hospital_address);
      await myContract.methods.store_hospital_details(id, name, address, spec).send({ from: account })

    } catch (error) {
      console.log(error)
    }
  }
  return (

    <div className={styles.bg}>
     
    {/* <video autoPlay loop muted plays-inline="true" className={styles.backVideo}  >
      <source src = "/caud.mp4" type='video/mp4'/>
    </video> */}
      <Navbar />&nbsp;
      <h1><u>Hospital Registration</u> </h1>
      &nbsp;
      <form>

        <div className="form-group ml-3">
          <h2>Register Hospital</h2>
          <label>Hospital Id:</label>&nbsp;&nbsp;
          <input type="text" onChange={idInput} ></input>
        </div>

        <div className="form-group ml-3">
          <label>Hospital Name:</label>&nbsp;&nbsp;
          <input type="text" onChange={nameInput}></input>
        </div>

        <div className="form-group ml-3">
          <label>Hospital Address:</label>&nbsp;&nbsp;
          <input type="text" onChange={addressInput} ></input>
        </div>

        <div className="form-group ml-3">
          <label>Hospital Specification:</label>&nbsp;&nbsp;
          <input type="text" onChange={specInput} ></input>
        </div>

        <div className="form-group ml-3">
          <button onClick={add_details} type="button" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <h3>To get details of hospital  <Link href="./Hospital_details"><a>Click Here</a></Link></h3>

    </div>
  )
}
