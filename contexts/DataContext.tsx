declare let window: any;

import React, { createContext, useContext, useState, useProviderData } from "react";
import Web3 from "web3";
import PaymentToken from "../dapp/artifacts/dapp/contracts/PaymentToken.sol";

interface DataContextProps {

  account: string;
  loading: boolean;
  balance: number;

  loadWallet: () => Promise<void>;

  sendPayment: ({
    amount,
    toAddress,
  }: {
    amount: any;
    toAddress: any;
  }) => Promise<any>;

}

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider: React.FC = ({ children }) => {

  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;

}

export const useData = () => useContext<DataContextProps | null>(DataContext);


export const useProviderDatax = () => {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<string>();
  const [paymentToken, setPaymentToken] = useState<any>();
  const [balance, setBalance] = useState<number>();

  const loadWallet = async () => {

    if (window.ethereum) {

      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();

      const web3 = window.web3;

      let allAccounts = await web3.eth.getAccounts();

      setAccount(allAccounts[0]);



      const paymentTokenData = PaymentToken.networks["80001"];

      if (paymentTokenData) {

        let paymentTokenInstance = new web3.eth.Contract(
          PaymentToken.abi,
          paymentTokenData.address          
        );

        setPaymentToken(paymentTokenInstance);

        let bal = await paymentTokenInstance.methods.balanceOf(allAccounts[0]).call();

        setBalance(bal);

      } else {

        window.alert("Testnet not found");

      }

      setLoading(false);

    } else {

      window.alert("Non Eth browser detected. Please consider using Metamask.");

    }   

  };

  const sendPayment = async ({ amount, toAddress }) => {

    try {
      
      const amountInWei = window.web3.utils.toWei(amount, "ether");

      let bal = await paymentToken.methods.balanceOf(account).call();

      if (bal < amountInWei) {

        return "You don't have enough balance";

      }

      const txHash = await paymentToken.methods.transfer(toAddress, amountInWei).send({ from: account });
      
      bal = await paymentToken.methods.balanceOf(account).call();

      setBalance(bal);

      return "Payment success";


    } catch (error) {
      
      return error.message;

    }


  };


  return {

    account,
    loading,
    loadWallet,
    sendPayment,
    balance,  

  };


};

