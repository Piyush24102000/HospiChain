import Hospital_navbar from "./Hospital_navbar"
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Web3 from "web3";
import { examine_abi, examine_address } from "../data";
import styles from '../styles/Home.module.css'

export default function Examine_details() {
    const [account, setAccount] = useState();
    const [id, setid] = useState();
    const [id1, setid1] = useState();
    const [dates, setdate] = useState();
    const [blood, setblood] = useState();
    const [urine, seturine] = useState();
    const [lab, setlab] = useState();
    const [built, setbuilt] = useState();
    const [nour, setnour] = useState();
    const [eyes, seteyes] = useState();
    const [tongue, settongue] = useState();
    const [pulse, setpulse] = useState();
    const [bp, setbp] = useState();
    const [temp, settemp] = useState();
    const [respi, setrespi] = useState();
    const [cvs, setcvs] = useState();
    const [cns, setcns] = useState();
    const [rs, setrs] = useState();
    const [abd, setabd] = useState();

    ////////Pinata section///////
    const [ecg, setecg] = useState();
    const [fileImg, setFileImg] = useState(null);
    const getecg = (e) => {
        setFileImg(e.target.files[0]);
    }
    const [mri, setmri] = useState();
    const [fileImg1, setFileImg1] = useState(null);
    const getmri = (e) => {
        setFileImg1(e.target.files[0]);
    }
    const [ct, setct] = useState();
    const [fileImg2, setFileImg2] = useState(null);
    const getct = (e) => {
        setFileImg2(e.target.files[0]);
    }
    const [xray, setxray] = useState();
    const [fileImg3, setFileImg3] = useState(null);
    const getxray = (e) => {
        setFileImg3(e.target.files[0]);
    }
    ////////////////////////////
    const getabd = (e) => {
        setabd(e.target.value);
    }
    const getrs = (e) => {
        setrs(e.target.value);
    }
    const getcns = (e) => {
        setcns(e.target.value);
    }

    const getcvs = (e) => {
        setcvs(e.target.value);
    }
    const getrespi = (e) => {
        setrespi(e.target.value);
    }
    const gettemp = (e) => {
        settemp(e.target.value);
    }
    const getbp = (e) => {
        setbp(e.target.value);
    }
    const getpulse = (e) => {
        setpulse(e.target.value);
    }
    const gettongue = (e) => {
        settongue(e.target.value);
    }
    const geteyes = (e) => {
        seteyes(e.target.value);
    }
    const getnour = (e) => {
        setnour(e.target.value);
    }
    const getbuilt = (e) => {
        setbuilt(e.target.value);
    }
    const getlab = (e) => {
        setlab(e.target.value);
    }
    const getid = (e) => {
        setid(e.target.value);
    }
    const getdates = (e) => {
        setdate(e.target.value);
    }
    const getid1 = (e) => {
        setid1(e.target.value);
    }
    const getblood = (e) => {
        setblood(e.target.value);
    }
    const geturine = (e) => {
        seturine(e.target.value);
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
    const prev_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(examine_abi, examine_address);
            await myContract.methods.previous_reports(id, dates).send({ from: account });

        } catch (error) {
            console.log(error)
        }
    }
    /////////////////////
    const inv_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(examine_abi, examine_address);
            await myContract.methods.investigations(id1, blood, urine, ecg, mri, ct, xray, lab).send({ from: account });
            await myContract.methods.general_examine(id1, built, nour, eyes, tongue, pulse, bp, temp, respi).send({ from: account });
            await myContract.methods.sys_examine(id1, cvs, cns, rs, abd).send({ from: account });

        } catch (error) {
            console.log(error);
        }
    }
    ////////////Pinata Ipfs section///////////
    const funcecg = async () => {

        if (fileImg) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_KEY}`,
                        'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                console.log("ecg is" + { ImgHash });
                setecg(`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`)

            } catch (error) {
                console.log(error)
            }
        }
    }
    const funcmri = async () => {

        if (fileImg1) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg1);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_KEY}`,
                        'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash1 = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash1);
                setmri(`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`)

            } catch (error) {
                console.log(error)
            }
        }
    }
    const funcctscan = async () => {

        if (fileImg2) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg2);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_KEY}`,
                        'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash2 = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash2);
                setct(`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`)

            } catch (error) {
                console.log(error)
            }
        }
    }
    const funcxray = async () => {

        if (fileImg3) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg3);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_KEY}`,
                        'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash3 = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash3);
                setxray(`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`)

            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className={styles.bg}>

            <title>Examine Details</title>
            <Hospital_navbar />
            <h1><u>Fill Patient Report Data</u></h1> &nbsp;
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
            {/*  */}

            <div className="form-group ml-3">
                <h2><b>Investigations</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Enter Record Id:</label>&nbsp;&nbsp;
                <input type="text" onChange={getid1}></input>
                <div className="form-group ml-3">
                    <small id="emailHelp" class="form-text text-muted">Example: 1-28102000 Use - in RecordId and date </small>
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Blood Test:</label>&nbsp;
                <input type="text" onChange={getblood}></input>
            </div>
            <div className="form-group ml-3">
                <label>Urine Test:</label>&nbsp;
                <input type="text" onChange={geturine}></input>
            </div>
            <div className="form-group ml-3">
                <label>ECG: </label>&nbsp;
                <input type="file" onChange={getecg} required/>
                <button type='button' onClick={funcecg} >Upload ECG</button>
            </div>
            <div className="form-group ml-3">
                <label>MRI Scan: </label>&nbsp;
                <input type="file" onChange={getmri} required/>
                <button type='button' onClick={funcmri} >Upload MRI</button>
            </div>
            <div className="form-group ml-3">
                <label>CT scan: </label>&nbsp;
                <input type="file" onChange={getct} required/>
                <button type='button' onClick={funcctscan} >Upload CTScan</button>

            </div>
            <div className="form-group ml-3">
                <label>X-ray: </label>&nbsp;
                <input type="file" onChange={getxray} required/>
                <button type='button' onClick={funcxray} >Upload Xray</button>

            </div>
            <div className="form-group ml-3">
                <label>Lab test(if any) </label>&nbsp;
                <input type="text" onChange={getlab}></input>
            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>General Examination</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>Built:</label>&nbsp;
                <input type="text" onChange={getbuilt}></input>

            </div>
            <div className="form-group ml-3">
                <label>Nourishment:</label>&nbsp;
                <input type="text" onChange={getnour}></input>

            </div>
            <div className="form-group ml-3">
                <label>Eyes: </label>&nbsp;
                <input type="text" onChange={geteyes}></input>

            </div>
            <div className="form-group ml-3">
                <label>Tongue: </label>&nbsp;
                <input type="text" onChange={gettongue}></input>

            </div>
            <div className="form-group ml-3">
                <label>Pulse: </label>&nbsp;
                <input type="text" onChange={getpulse} placeholder="Number"></input>

            </div>
            <div className="form-group ml-3">
                <label>Blood Pressure: </label>&nbsp;
                <input type="text" onChange={getbp}></input>

            </div>
            <div className="form-group ml-3">
                <label>Temperature: </label>&nbsp;
                <input type="text" onChange={gettemp} placeholder="Number"></input>

            </div>
            <div className="form-group ml-3">
                <label>Respsiratory Rate: </label>&nbsp;
                <input type="text" onChange={getrespi} placeholder="Number"></input>

            </div>
            {/*  */}
            <div className="form-group ml-3">
                <h2><b>Systematic Examination</b></h2>
            </div>
            <div className="form-group ml-3">
                <label>CVS:</label>&nbsp;
                <input type="text" onChange={getcvs}></input>

            </div>
            <div className="form-group ml-3">
                <label>CNS:</label>&nbsp;
                <input type="text" onChange={getcns}></input>

            </div>
            <div className="form-group ml-3">
                <label>RS: </label>&nbsp;
                <input type="text" onChange={getrs}></input>

            </div>
            <div className="form-group ml-3">
                <label>Abdomen:  </label>&nbsp;
                <input type="text" onChange={getabd}></input>

            </div>
            <div className="form-group ml-3">
                <button type="button" onClick={inv_details} className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}