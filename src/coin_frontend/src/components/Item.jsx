import React from "react";
import { Principal } from '@dfinity/principal';

function Item(props) {

    return (
          <div style={{ overflow: "hidden", display: "flex", justifyContent: "center"}}>
            <fieldset>
                <h5 style={{margin:"5px"}}>Transaction ID: </h5>
                <h6 style={{margin:"5px"}}>{props.hash}</h6>
                <br></br>
                <h5 style={{margin:"5px"}}>Sender: </h5>
                <h6 style={{margin:"5px"}}>{props.sender.toString()}</h6>
                <br></br>
                <h5 style={{margin:"5px"}}>Receiver:</h5>
                <h6 style={{margin:"5px"}}>{props.receiver.toString()}</h6>
                <br></br>
                <h5 style={{margin:"5px"}}>TimeStamp:</h5>
                <h6 style={{margin:"5px"}}> {String(props.time)}</h6>
                <br></br>
                <h5 style={{margin:"5px"}}>JoshCoin: 🪙 {String(props.amount)}</h5>
            </fieldset>
          </div>
    );
}

export default Item;