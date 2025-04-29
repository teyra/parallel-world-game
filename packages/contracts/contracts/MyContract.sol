// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    string private message;

    // 构造函数，初始化消息
    constructor() {
        message = "Hello from the contract!";
    }

    // 返回固定字符串
    function fund() public pure returns (string memory) {
        return "Fund method called!";
    }

    // 设置消息
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    // 获取消息
    function getMessage() public view returns (string memory) {
        return message;
    }
}
