const TodoList = artifacts.require("./Todo_list.sol");

module.exports = function (deployer) {
  deployer.deploy(TodoList);
};
