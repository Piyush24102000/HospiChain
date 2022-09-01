import Hospital_navbar from "./Hospital_navbar"
import { useState, useEffect } from 'react';
import Web3 from "web3";
import { examine_abi, examine_address } from "../data";
import styles from '../styles/Home.module.css'

export default function Dates_reports() {
    const [date1, setprevdates] = useState();
    const [id, setid] = useState();
    var arr = [];

    const getid = (e) => {
        setid(e.target.value);
    }
    /////////////////////////////////////////
    ////values////
    for (let key in date1) {
        let value;
        value = date1[key];
        arr.push(value);
    }
    var j;
    var k;
    j = Object.values(arr);
    k = j.reverse();
    //console.log(k)
    //////Keys/////
    var x;
    var y;
    x = (Object.keys(arr));
    y = x.sort().reverse()
    //console.log(y);

    /////////////////////////////////////////
    const date_details = async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/b872867c696e4b2f9405f4161e2c2973"); /////Change this to provider
            var myContract = new web3.eth.Contract(examine_abi, examine_address);
            var prevdates = await myContract.methods.get_previous_reports(id).call();
            setprevdates(prevdates);


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.bg}>

            <Hospital_navbar />
            <div className="form-group ml-3">

                <div className="form-group ml-3">
                    <h2><b>Previous dates of Reports</b></h2>
                    <label>Patient Id:</label>&nbsp;&nbsp;
                    <input type="text" onChange={getid} ></input>
                </div>
                <div className="form-group ml-2"> &nbsp;
                    <button type="button" onClick={date_details} className="btn btn-primary">Get Details </button> &nbsp;&nbsp;

                </div>

                <div className="form-group ml-4">
                    <div class="row">
                        <div class="column">
                            <h2>Index</h2>
                            {y.map(i => (
                                <p>{i}</p>
                            ))}
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="column" >
                            <h2>Dates</h2>
                            {k.map(d => (
                                <p>{d}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            </div>
        </div>
    )
}