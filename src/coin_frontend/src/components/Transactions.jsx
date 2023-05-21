import React, { useState, useEffect } from "react";
import { coin_backend } from "../../../declarations/coin_backend";
import { Principal } from '@dfinity/principal';


function Transactions(props) {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [balance, setBalance] = useState(); 


  async function getTransactionList() {
    
  }

  useEffect(() => {
    getTransactionList();
  }, []);

  return (
    <>
    <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
      <div className="blue window" id="logo">
        <div>

         </div>
      </div>
    </>
  );
}

export default Transactions;