import React, { useState, useEffect } from "react";
import { coin_backend } from "../../../declarations/coin_backend";
import { Principal } from '@dfinity/principal';
import Item from "./Item";

function Transactions() {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [list, setList] = useState(); 

  async function createTransactionList() {
    setShouldDisplay(true);
    let newList = await coin_backend.getTransactions();
    console.log(newList);
    let listArray = Array.from(newList);
    listArray.reverse();
    if (newList != undefined) {
    setList(
      listArray.map(({sender, receiver, time, hash, amount}) => (
        <Item sender={sender} receiver={receiver} time={time} hash={hash} amount={amount} />
      ))
    );
   }
   setShouldDisplay(false);
  }

  useEffect(() => {
    createTransactionList();
  }, []);
  
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{display: "inline", justifyContent: "center"}} className="blue window" id="logo">
        <a style={{display: "flex", textAlign: "center"}} className="emoji">🇯</a>
        <h3 style={{display: "flex", textAlign: "center"}}>Transaction History</h3>
        <h6 style={{margin: "5px", display: "flex", textAlign: "center"}}>Make a transaction and refresh the page to see it appear below!</h6>
        <div style={{ display: shouldDisplay ? "inline" : "none" }} className="loader">
          </div>
          <div class="itemconfiguration">
            {list}
        </div>
      </div>
      </div>
  );
}

export default Transactions;