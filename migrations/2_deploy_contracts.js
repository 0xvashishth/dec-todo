const TodoList = artifacts.require("TodoList");
// const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
    // Deploy TodoList
    await deployer.deploy(TodoList);

};
