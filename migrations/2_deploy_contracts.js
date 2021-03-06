const SafeMath = artifacts.require('zeppelin-solidity/contracts/math/SafeMath.sol');
const Ownable = artifacts.require('zeppelin-solidity/contracts/math/Ownable.sol');
const UnityToken = artifacts.require("./UnityToken.sol");
const UnitySale = artifacts.require("./UnitySale.sol");

const BigNumber = require('bignumber.js');

module.exports = (deployer, network, accounts) => {
    let totalSupply, minimumGoal, minimumContribution, maximumContribution, deployAddress, start, hours, isPresale, discounts;
    if (network === 'development') {
        deployAddress = accounts[0];
        totalSupply = new BigNumber(4 * 10**9 * 10**18); //
        minimumGoal = new BigNumber(2 * 10**18); // 2 ETH in wei
        minimumContribution = new BigNumber(0.1 * 10**18); // 0.1 ETH in wei;
        maximumContribution = new BigNumber(0.5 * 10**18); // 0.5 ETH in wei;
        start = Math.ceil((new Date()).getTime() / 1000);
        isPresale = true;
        hours = 120; // 5 days in hours
        discounts = [
            48, 25,  // first 48 hours, 25% discount
            72, 15  // next 72 hours, 15% discount
        ];
    }

    deployer.deploy(SafeMath, {from: deployAddress});
    deployer.deploy(Ownable, {from: deployAddress});

    deployer.link(Ownable, [UnityToken, UnitySale], {from: deployAddress});
    deployer.link(SafeMath, [UnityToken, UnitySale], {from: deployAddress});

    deployer.deploy(UnityToken, totalSupply, {from: deployAddress}).then(() => {
        return deployer.deploy(UnitySale,
            UnityToken.address,
            isPresale,
            new BigNumber(minimumGoal),
            new BigNumber(minimumContribution),
            new BigNumber(maximumContribution),
            new BigNumber(start),
            new BigNumber(hours),
            discounts.map(v => new BigNumber(v)),
            {from: deployAddress});
    });
};
