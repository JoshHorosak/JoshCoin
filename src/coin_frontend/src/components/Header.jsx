import React, { useState, useEffect } from "react";
import { coin_backend } from "../../../declarations/coin_backend";
import { Principal } from '@dfinity/principal';


function Header(props) {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [balance, setBalance] = useState(); 

  async function getFundBalance() {
    setShouldDisplay(true);
    const retrieveBalance = await coin_backend.balanceOf(Principal.fromText(props.userPrincipal));
    setBalance(String(retrieveBalance));
    console.log(balance);
    setShouldDisplay(false);
    
  }

  useEffect(() => {
    getFundBalance();
  }, []);

  return (
    <>
    <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
    <header>
      <div className="blue window" id="logo">
        <div className="emoji">
        <h1 style={{fontSize: "75px"}}>
          🇯
        </h1>
        </div>
        <h6 style={{textAlign: "center"}}>Balance: 🪙{balance} </h6>
      </div>
    </header>
    </>
  );
}

export default Header;
