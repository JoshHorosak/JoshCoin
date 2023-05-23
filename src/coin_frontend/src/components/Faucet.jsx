import React, { useState, useEffect } from "react";
import { canisterId, createActor } from "../../../declarations/coin_backend";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';
import { coin_backend } from "../../../declarations/coin_backend";


function Faucet(props) {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Acquire JoshCoins!");
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [shouldDisplayComponent, setshouldDisplayComponent] = useState(true);
  
  async function handleClick(event) {
    setShouldDisplay(true);
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setText(result);
    setShouldDisplay(false);
  }

  async function loadComponent() {
    const claimedAlready = await coin_backend.balanceOf(Principal.fromText(props.userPrincipal));
    console.log(claimedAlready);
    if (claimedAlready > 1) {
      setshouldDisplayComponent(true);
    } else if (claimedAlready = 0) {
      setshouldDisplayComponent(false);
    }
  }
  
  useEffect(() => {
    loadComponent();
  }, []);

  
  return (
    <div style={{ display: shouldDisplayComponent ? "flex" : "none", justifyContent: "center"}}>
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free coins here! Claim 100 JoshCoin to your address!
        ⬇️ 
        <br></br>
        <br></br>
        {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
    </div>
    </div>
  );
}

export default Faucet;
