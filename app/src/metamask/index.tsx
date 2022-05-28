import React, { Component } from 'react';
import { ethers } from "ethers";


declare let window:any

interface Wallet {
    selectedAddress: string,
    balance: string,
    tokenName: string,
    tokenBalance: Number,
}

class Metamask extends Component<{}, Wallet> {
  constructor(props: any) {
    super(props);

    this.state = {
        selectedAddress: '',
        balance: '',
        tokenName: '',
        tokenBalance: 0,
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balanceRaw = await provider.getBalance(accounts[0]);
    const balance = ethers.utils.formatEther(balanceRaw);

    const abi = new ethers.utils.Interface(process.env.REACT_APP_ABI!)
    const ERC20Contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS!, abi, provider);
    const tokenName = await ERC20Contract.name();
    const tokenBalance = await ERC20Contract.balanceOf(accounts[0]);

    this.setState({ selectedAddress: accounts[0], balance, tokenName, tokenBalance })
  }

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <button onClick={() => this.connectToMetamask()}>Connect to Metamask</button>
      )
    } else {
      return (
        <div>
          <p>Hello {this.state.selectedAddress}</p>
          <p>You have {this.state.balance} ETH</p>
          <p>You have  {String(this.state.tokenBalance)} {this.state.tokenName} ERC20 tokens</p>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderMetamask()}
      </div>
    )
  }
}

export default Metamask;