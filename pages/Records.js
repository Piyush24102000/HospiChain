import Hospital_navbar from "./Hospital_navbar";
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Web3 from "web3";
import { records_abi, records_address } from "../data";
import styles from '../styles/Home.module.css'


export default function Records() {
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
    ///////////////////////////////////
    const [id, setid] = useState();
    const [insu, setinsu] = useState();
    const [poli, setpoli] = useState();
    const [insurer, setinsurer] = useState();
    const [type, settype] = useState();
    const [limit, setlimit] = useState();
    const [comp, setcomp] = useState();
    const [dura, setdura] = useState();
    const [fam, setfam] = useState();
    const [pers, setpers] = useState();
    const [drug, setdrug] = useState();
    const [diag, setdiag] = useState();
    const [presc, setpresc] = useState();
    const [treat, settreat] = useState();
    const [date, setdate] = useState();
    const [doc, setdoc] = useState();
    const [hos, sethos] = useState();
    const [disc, setdisc] = useState();
    const [fol, setfol] = useState();
    //const[date1,setprevdates] = useState();

    const getid = (e) => {
        setid(e.target.value);
    }

    const get_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(records_abi, records_address);
            var getinsu = await myContract.methods.get_insurance(id).call();
            var preillness = await myContract.methods.get_present_illness(id).call()
            var pastillness = await myContract.methods.get_past_illness(id).call();
            var diag = await myContract.methods.get_func_diagnosis(id).call();
            var treat = await myContract.methods.get_treatment_summary(id).call();
            setinsu(getinsu[0]);
            setpoli(getinsu[1]);
            setinsurer(getinsu[2]);
            settype(getinsu[3]);
            setlimit(getinsu[4]);
            ////////////////////
            setcomp(preillness[0]);
            setdura(preillness[1]);
            ////////////////////
            setfam(pastillness[0]);
            setpers(pastillness[1]);
            setdrug(pastillness[2]);
            ////////////////////
            setdiag(diag[0]);
            setpresc(diag[1]);
            ////////////////////
            settreat(treat[0]);
            setdate(treat[1]);
            setdoc(treat[2]);
            sethos(treat[3]);
            setdisc(treat[4]);
            setfol(treat[5]);
        } catch (error) {
            console.log(err)
        }
    }
    return (
    <div className={styles.bg}>
            <title>Patient Medical Record</title>
            <Hospital_navbar />
            <h3>To update details of Patient Medical Record <Link href="./Record_details"><a>Click Here</a></Link> </h3>
            <h3>To check Patient Past history(dates)<Link href="./Dates"><a> Click Here</a></Link> </h3>
            &nbsp;

            <div className="form-group ml-3">
                <h2><b>Patient Medical Record Details</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Enter Record Id: id-date</label>&nbsp;&nbsp;
                <input type="text" onChange={getid} ></input> &nbsp; &nbsp;
                <button type="button" onClick={get_details} className="btn btn-secondary">Get Details </button>
                <div className="form-group ml-3">
                    <small id="emailHelp" class="form-text text-muted">Example: 1-28102000 Use - in PatientId and date </small>
                </div>
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Insurance Details</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Is Insurance applicable?: {insu}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Policy Number: {poli}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Insurer: {insurer}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Policy Type: {type}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Policy Limit: {limit}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <h2><b>Present illness Details</b></h2>
            </div>

            <div className="form-group ml-3">
                <label>Complaints: {comp}</label>&nbsp;&nbsp;
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <label>Duration: {dura}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <h2><b>Past illness Details</b></h2>
            </div>

            <div className="form-group ml-3">
                <label>Family History: {fam}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Personal History: {pers}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Drug History: {drug}</label>&nbsp;&nbsp;
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Diagnosis Details</b></h2>
            </div>

            <div className="form-group ml-3">
                <label>Diagnosis Summary: {diag}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Prescription: {presc}</label>&nbsp;&nbsp;
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Treatment Summary</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Treatment: {treat}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Date of Treatment: {date}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Treated Doctor Id: {doc}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Treated Hospital Id: {hos}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Discharge: {disc}</label>&nbsp;&nbsp;
            </div>
            <div className="form-group ml-3">
                <label>Follow Up: {fol}</label>&nbsp;&nbsp;
            </div>
        </div>
    )
}