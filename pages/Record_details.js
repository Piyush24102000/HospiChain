import Hospital_navbar from "./Hospital_navbar";
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Web3 from "web3";
import { records_abi, records_address } from "../data";
import styles from '../styles/Home.module.css'


export default function Record_details() {
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
    const [dates, setdate] = useState();
    const [appli, setappli] = useState();
    const [polinumber, setpolinum] = useState();
    const [insurer, setinsurer] = useState();
    const [politype, setpolitype] = useState();
    const [polilimit, setpolilimit] = useState();
    const [complaints, setcomplaint] = useState();
    const [duration, setduration] = useState();
    const [personal, setpersonal] = useState();
    const [family, setfamily] = useState();
    const [drugs, setdrugs] = useState();
    const [diag, setdiag] = useState();
    const [pres, setpres] = useState();
    const [treat, settreat] = useState();
    const [datetreat, setdatetreat] = useState();
    const [docid, setdocid] = useState();
    const [hosid, sethosid] = useState();
    const [disc, setdisc] = useState();
    const [follow, setfollow] = useState();
    const [id1, setid1] = useState();

    const getid = (e) => {
        setid(e.target.value);
    }
    const getid1 = (e) => {
        setid1(e.target.value);
    }
    const getdates = (e) => {
        setdate(e.target.value);
    }
    const getappli = (e) => {
        setappli(e.target.value);
    }
    const getpolinum = (e) => {
        setpolinum(e.target.value);
    }
    const getinsurer = (e) => {
        setinsurer(e.target.value);
    }
    const getpolitype = (e) => {
        setpolitype(e.target.value);
    }
    const getpolilimit = (e) => {
        setpolilimit(e.target.value);
    }
    const getcomplaint = (e) => {
        setcomplaint(e.target.value);
    }
    const getduration = (e) => {
        setduration(e.target.value);
    }
    const getfamily = (e) => {
        setfamily(e.target.value);
    }
    const getpersonal = (e) => {
        setpersonal(e.target.value);
    }
    const getdrugs = (e) => {
        setdrugs(e.target.value);
    }
    const getdiag = (e) => {
        setdiag(e.target.value);
    }
    const getpres = (e) => {
        setpres(e.target.value);
    }////////////////////////

    const gettreat = (e) => {
        settreat(e.target.value);
    }
    const getdatetreat = (e) => {
        setdatetreat(e.target.value);
    }
    const getdocid = (e) => {
        setdocid(e.target.value);
    }
    const gethosid = (e) => {
        sethosid(e.target.value);
    }
    const getdisc = (e) => {
        setdisc(e.target.value);
    }
    const getfollow = (e) => {
        setfollow(e.target.value);
    }
    const prev_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(records_abi, records_address);
            await myContract.methods.previous_dates(id, dates).send({ from: account });

        } catch (error) {
            console.log(error)
        }
    }
    const insu_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(records_abi, records_address);
            //await myContract.methods.medical_record(id).send({ from: account });
            var batch = new web3.eth.BatchRequest()

            batch.add(await myContract.methods.insurance_details(id1, appli, polinumber, insurer, politype, polilimit).send({ from: account }));
            batch.add(await myContract.methods.present_illness(id1, complaints, duration).send({ from: account }));
            batch.add(await myContract.methods.past_illness(id1, family, personal, drugs).send({ from: account }));
            batch.add(await myContract.methods.func_diagnosis(id1, diag, pres).send({ from: account }));
            batch.add(await myContract.methods.treatment_summary(id1, treat, datetreat, docid, hosid, disc, follow).send({ from: account }));
            batch.execute();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.bg}>

            <title>Medical Records</title>
            <Hospital_navbar />
            <h1><u>Fill Patient Medical Record</u></h1> &nbsp;
            <form>

                <div className="form-group ml-3">
                    <h2><b>Enter Patient Id and Date</b></h2>
                    <label>Patient Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getid}  ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Date:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdates} ></input>
                    <div className="form-group ml-3">
                        <small id="emailHelp" class="form-text text-muted"> Use DDMMYYYY format </small>
                    </div>
                </div>
                <div className="form-group ml-3">
                    <button type="button" onClick={prev_details} className="btn btn-primary">Submit (id,date) </button>
                </div>
            </form>
            <form>
                <div className="form-group ml-3">
                    <h2><b>Insurance Details</b></h2>
                </div>
                <div className="form-group ml-3">
                    <label>Enter Record Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getid1}  ></input>
                    <div className="form-group ml-3">
                        <small id="emailHelp" class="form-text text-muted">Example: 1-28102000 Use - in PatientId and date </small>
                    </div>
                </div>
                <div className="form-group ml-3">
                    <label>Is Insurance applicable?</label>&nbsp;&nbsp;
                    <input type="text" onChange={getappli} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Policy Number:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getpolinum} ></input>
                    <div className="form-group ml-3">
                        <small id="emailHelp" class="form-text text-muted">Use 0 if no policy </small>
                    </div>
                </div>
                <div className="form-group ml-3">
                    <label>Insurer:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getinsurer}  ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Policy Type:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getpolitype} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Policy Limit:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getpolilimit} ></input>
                </div>
                <div className="form-group ml-3">
                    <h2><b>Present illness Details</b></h2>
                </div>

                <div className="form-group ml-3">
                    <label>Complaints:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getcomplaint} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Duration:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getduration} ></input>
                </div>
                <div className="form-group ml-3">
                    <h2><b>Past illness Details</b></h2>
                </div>

                <div className="form-group ml-3">
                    <label>Family History:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getfamily} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Personal History:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getpersonal} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Drug History:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdrugs} ></input>
                </div>
                <div className="form-group ml-3">
                    <h2><b>Diagnosis Details</b></h2>
                </div>

                <div className="form-group ml-3">
                    <label>Diagnosis Summary:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdiag} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Prescription:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getpres}  ></input>
                </div>
                <div className="form-group ml-3">
                    <h2><b>Treatment Summary</b></h2>
                </div>

                <div className="form-group ml-3">
                    <label>Treatment:</label>&nbsp;&nbsp;
                    <input type="text" onChange={gettreat}  ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Date of Treatment:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdatetreat} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Treated Doctor Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdocid} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Treated Hospital Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={gethosid} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Discharge:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getdisc} ></input>
                </div>
                <div className="form-group ml-3">
                    <label>Follow Up:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getfollow} ></input>
                </div>
                <div className="form-group ml-3">
                    <button type="button" onClick={insu_details} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}