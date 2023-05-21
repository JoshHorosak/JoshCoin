import React, { useState, useEffect } from "react";
import { coin_backend } from "../../../declarations/coin_backend";
import { Principal } from '@dfinity/principal';

function Footer() {
    const [fundBalance, setFundBalance] = useState();
    const [shouldDisplay, setShouldDisplay] = useState(false);
  
    async function getFundBalance() {
      setShouldDisplay(true);
      const text = "xxqzv-yhjmg-hgohm-aladw-mjtfc-mm5gb-fsrqc-dkfkg-325mm-ag3jk-4qe";
      const principal = Principal.fromText(text);
      console.log(principal);
      const retrievedBalance = await coin_backend.balanceOf(principal);
      console.log(retrievedBalance);
      setFundBalance(String(retrievedBalance));
      setShouldDisplay(false);
    }
  
    useEffect(() => {
      getFundBalance();
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
      <div className="white window">
        <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
    <fieldset>
      <div><label style={{textAlign: "center"}}><a className="emoji">🇯</a> Dev Fund Balance:</label></div>
      <br></br>
      <div><label style={{textAlign: "center"}}>🪙 {fundBalance} JoshCoins</label></div>
      <br></br>
      <div><label style={{textAlign: "center"}}>Fund Address:
      <br></br>
      <br></br>
      xxqzv-yhjmg-hgohm-aladw-mjtfc-mm5gb-fsrqc-dkfkg-325mm-ag3jk-4qe </label></div>
      </fieldset>
      </div>
      </div>
    );
}

export default Footer;