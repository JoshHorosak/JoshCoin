import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import Footer from "./Footer";

function App(props) {

  return (
    <div id="screen">
      <Header userPrincipal={props.loggedInPrincipal}/>
      <Faucet userPrincipal={props.loggedInPrincipal}/>
      <Transfer />
      <Balance />
      <Footer />
    </div>
  );
}

export default App;