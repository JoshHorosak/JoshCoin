import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor Token {

  let owner : Principal = Principal.fromText("sgbbw-dynnt-iuc7e-vm4gz-2e4cs-eefyl-bdiep-7pnax-eggkh-5sibl-zae");
  let totalSupply : Nat = 1000000000000000;
  let symbol : Text = "JoshCoin";

  private type Transaction = {
    sender: Principal;
    receiver: Principal;
    time: Int;
    hash: Nat32;
    amount: Nat;
  };

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  private var claimList = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  private var transactionHistory = HashMap.HashMap<Principal, Buffer.Buffer<Transaction>>(1, Principal.equal, Principal.hash);
  private var coin_backend_ID = Principal.fromText("b3mek-diaaa-aaaam-abm7a-cai");
  
  // list of principals for the faucet claimList will be a more suitable structure

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

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 100;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "You already Claimed!";
    }
  };

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      let addHistory : Text = await addTransaction(msg.caller, to, amount);

      return "Success";
    } else {
      return "Insufficient Funds"
    }
  };

  private func addTransaction(owner: Principal, receiver: Principal, amount: Nat) : async Text {
    let history : Buffer.Buffer<Transaction> = switch (transactionHistory.get(coin_backend_ID)) {
      case null Buffer.Buffer<Transaction>(1);
      case (?result) result;
    };
    let time = Time.now();
    let timeText = Int.toText(time);
    let ownerText = Principal.toText(owner);
    let receiverText = Principal.toText(receiver);
    let preHashText = timeText # ownerText # receiverText; 
    let hash = Text.hash(preHashText);
    let newTransaction : Transaction = {
     sender = owner;
     receiver = receiver;
     time = time;
     amount = amount;
     hash = hash;
    };
    history.add(newTransaction);
    transactionHistory.put(coin_backend_ID, history);
    
    return "Success";
  };

  public query func getTransactions() : async [Transaction] {
     let history : Buffer.Buffer<Transaction> = switch (transactionHistory.get(coin_backend_ID)) {
      case null Buffer.Buffer<Transaction>(1);
      case (?result) result;
    };
    let array = Buffer.toArray<Transaction>(history);
    return array;
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


