const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");
require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, investor]) => {

    let token, ethSwap

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        await token.transfer(ethSwap.address, tokens('1000000'));
    })

    describe('Token deployment', async () => {
        it('contract has a name', async () => {

            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {

            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instance Exchange')
        })

        it('contract has token', async () => {
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async () => {
        let result
        before(async () => {
            // Purchase tokens before each examples
            result = await ethSwap.buyTokens({ from: investor, value: tokens('1') })
        })
        it('Allows users to instanly purchase tokens from ethSwap for a fixed price', async () => {
            // check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            // check ethswapp balance after purchase
            let ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1'))

            const event = result.logs[0].args;
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
            // console.log(result.logs[0].args);
        })
    })

    describe('sellTokens()', async () => {
        let result
        before(async () => {
            await token.approve(ethSwap.address, tokens('100'), { from: investor })
            // Purchase tokens before each examples
            result = await ethSwap.sellTokens(tokens('100'), { from: investor })
        })
        it('Allows users to instanly sell tokens from ethSwap for a fixed price', async () => {
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('0'))

            // check ethswapp balance after sell
            let ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('0'))

            const event = result.logs[0].args;
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
            // console.log(result.logs[0].args);

            // Failure ; can't sell more token if he has not
            await ethSwap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
        })
    })
})