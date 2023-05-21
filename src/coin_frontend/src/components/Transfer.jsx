import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { canisterId, createActor } from "../../../declarations/coin_backend";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  
  async function handleClick() {
    setShouldDisplay(true);
    setHidden(true);
    setDisable(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisable(false);
    setShouldDisplay(false);
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
    <div className="white window">
        <fieldset style={{justifyContent: "center", alignItems: "center"}}>
          <legend>To Account:</legend>
          <ul style={{justifyContent: "center", alignItems: "center"}}>
            <li style={{justifyContent: "center", alignItems: "center"}}>
              <input
                style={{justifyContent: "center", alignItems: "center"}}
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset style={{justifyContent: "center", alignItems: "center"}}>
          <legend>Amount:</legend>
          <ul style={{justifyContent: "center", alignItems: "center"}}>
            <li style={{ justifyContent: "center", alignItems: "center"}}>
              <input
                style={{ justifyContent: "center", alignItems: "center"}}
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick} 
          disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
        <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{ display: shouldDisplay ? "inline-block" : "none" }} className="loader">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
