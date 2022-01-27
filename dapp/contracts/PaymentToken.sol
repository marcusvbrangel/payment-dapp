// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaymentToken is ERC20 {

    address public owner;

    constructor() ERC20("Payment Token", "PAY") {

      owner = msg.sender;

      _mint(msg.sender, 100000 * 10**18);

    }

    function mint(address to, uint256 amount) external {

      require(msg.sender == owner, "Only owner can mint");

      _mint(to, amount);

    }

}
