import React from "react";
import { useState } from "react";
import { Principal } from '@dfinity/principal';
import { coin_backend } from "../../../declarations/coin_backend";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [shouldDisplay, setShouldDisplay] = useState(false);

  
  async function handleClick() {
    // console.log(inputValue);
    setShouldDisplay(true);
    const principal = Principal.fromText(inputValue);
    const balance = await coin_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await coin_backend.getSymbol());
    setHidden(false);
    setShouldDisplay(false);
  }


  return (
   <div style={{display: "flex", justifyContent: "center"}}>
    <div className="white window">
      <div className="transfer">
      <label>Check address balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter an Address"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      </div>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      </div>
      <p hidden={isHidden}>This account has a balance of {balanceResult} 🪙 {cryptoSymbol}.</p>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
  </div>
  );
}

export default Balance;
