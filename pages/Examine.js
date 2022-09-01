import Hospital_navbar from "./Hospital_navbar";
import Link from "next/link";
import Web3 from "web3";
import { examine_abi, examine_address } from "../data";
import { useState,useEffect } from "react";
import styles from '../styles/Home.module.css'

//PatientExamine == details and examine_details == examine.js
export default function Examine() {

  const[blood,setblood] = useState();
  const[urine,seturine] = useState();
  const[ecg,setecg] = useState();
  const[mri,setmri] = useState();
  const[ct,setct] = useState();
  const[xray,setx] = useState();
  const[lab,setlab] = useState();
  const[built,setbuilt] = useState();
  const[nou,setnou] = useState();
  const[eyes,seteyes] = useState();
  const[tongue,settong] = useState();
  const[pul,setpul] = useState();
  const[bp,setbp] = useState();
  const[temp,settemp] = useState();
  const[resp,setresp] = useState();
  const[cvs,setcvs] = useState();
  const[cns,setcns] = useState();
  const[rs,setrs] = useState();
  const[abd,setabd] = useState();
  const[account,setAccount] = useState();
  const[id1,setid1] = useState();
  const getid1 = (e) => {
    setid1(e.target.value);
  }
  
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
    const get_details = async() => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(examine_abi, examine_address);
            var inv = await myContract.methods.get_investigations(id1).call();
            var gen = await myContract.methods.get_general_examine(id1).call();
            var sys = await myContract.methods.get_sys_examine(id1).call();
           
            setblood(inv[0]);
            seturine(inv[1]);
            setecg(inv[2]);
            setmri(inv[3]);
            setct(inv[4]);
            setx(inv[5]);
            setlab(inv[6]);

            setbuilt(gen[0]);
            setnou(gen[1]);
            seteyes(gen[2]);
            settong(gen[3]);
            setpul(gen[4]);
            setbp(gen[5]);
            settemp(gen[6]);
            setresp(gen[7]);

            setcvs(sys[0]);
            setcns(sys[1]);
            setrs(sys[2]);
            setabd(sys[3]);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={styles.bg}>

            <title>Examine Records</title>
            <Hospital_navbar />
            <h3>To update details of Patient Examine Reports <Link href="./Examine_details"><a>Click Here</a></Link> </h3>
            <h3>To check Patient Past <i><b>Reports</b></i> history(dates)<Link href="./Dates_reports"><a> Click Here</a></Link> </h3>

            &nbsp;
            <div className="form-group ml-3">
                <h2><b>Patient Medical Report Details</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Enter Record Id: id-date</label>&nbsp;&nbsp;
                <input type="text" onChange={getid1} ></input> &nbsp; &nbsp;
                <button type="button" onClick={get_details}  className="btn btn-secondary">Get Details </button>
                <div className="form-group ml-3">
                    <small id="emailHelp" class="form-text text-muted">Example: 1-28102000 Use - in PatientId and date </small>
                </div>
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Investigations</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Blood Test: {blood}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Urine Test: {urine}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>ECG:<a href = {ecg} target="_blank" >Get ECG</a> </label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>MRI Scan:<a href = {mri} target="_blank">Get MRI</a> </label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>CT scan: <a href = {ct} target="_blank">Get CT</a> </label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>X-ray: <a href = {xray} target="_blank">Get XRay</a> </label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Lab test(if any): {lab} </label>&nbsp;
            </div>
           {/*  */}
           <div className="form-group ml-3">
                <h2><b>General Examination</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Built: {built}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Nourishment: {nou}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Eyes: {eyes}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Tongue: {tongue}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Pulse: {pul}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Blood Pressure: {bp}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Temperature: {temp}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Respsiratory Rate: {resp}</label>&nbsp;
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Systematic Examination</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>CVS: {cvs}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>CNS: {cns}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>RS: {rs}</label>&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Abdomen: {abd}</label>&nbsp;
            </div>
           
        </div>
    )
}