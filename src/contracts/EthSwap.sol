pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instance Exchange";
    Token public token;
    uint256 public rate = 100; // 1 ether  = 100 DApp

    event TokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokenSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // Redemption rate = no. of tokens they receive for 1 ether
        // Amount of ethereum * redemptiom rate
        // Calculate of number of tokens to buy
        uint256 tokenAmount = msg.value * rate;

        // Require ethswap as enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Tranfer token to user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokenPurchased((msg.sender), address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public {
        //  user can't sell more token than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of ether to redeem
        uint256 etherAmount = _amount / rate;

        // Require ethswap as enough tokens
        require(address(this).balance >= etherAmount);

        // Perform sell
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit an event
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
}
