import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Buffer "mo:base/Iter";

actor Token {

  let owner : Principal = Principal.fromText("sgbbw-dynnt-iuc7e-vm4gz-2e4cs-eefyl-bdiep-7pnax-eggkh-5sibl-zae");
  let totalSupply : Nat = 1000000000000000;
  let symbol : Text = "JoshCoin";

  private type TransactionsList = {
    buffer : [Transactions];
  };

  private type Transactions = {
    sender: Principal;
    receiver: Principal;
    date: Text;
    amount: Nat;
  };

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  private var claimList = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  private var transactions = HashMap.HashMap<Principal, TransactionsList>(1, Principal.equal, Principal.hash);
  private var canisterPrincipalID = Principal.fromActor(Token);

  if (balances.size() < 1) {
      balances.put(owner, totalSupply);
  };
    
  public query func balanceOf(who: Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return balance;
  };

  public query func getTransactions() : async TransactionsList {


    let theTransactionList: TransactionsList = switch (transactions.get(canisterPrincipalID)) {
      case null;
      case (?result) result;
    };
    return theTransactionList;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 100;
      let result = await transfer(msg.caller, amount);
      claimList.put(msg.caller, 1);
      return result;
    } else {
      return "You already Claimed!";
    }
  };

  public query func getClaimListValue(who : Principal) : async Nat {
    let claimListed : Nat = switch (claimList.get(who)) {
      case null 0;
      case (?result) result;
    };
    return claimListed;
  };

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance >= amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient Funds"
    }
    
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

};


