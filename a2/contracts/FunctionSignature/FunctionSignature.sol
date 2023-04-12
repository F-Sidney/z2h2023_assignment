// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "hardhat/console.sol";

contract FunctionSignature {
    function getCallData() public pure returns (bytes memory) {
        bytes memory data = abi.encodeWithSignature("initialize(uint256)", 1);
        return data;
    }
}
