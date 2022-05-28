// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BLSToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }


    /*
    * @author Nico Serrano
    * @notice Mints/Sends ERC20 tokens to a specified wallet
    * @dev Function added to follow Jake's test contract
    * @param to Address to send minted tokens
    * @param amount Quantity of tokens to be sent
    */
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}