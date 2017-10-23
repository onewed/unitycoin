# Unity Coin
In the interests of public disclosure and security, we're pleased to present the [Unity Coin][unity coin] token and crowdsale contracts.

![Unity Coin](unitycoin-logo.png)

Built on the Ethereum blockchain, the main purpose and function of Unity Coin will be as a fungible medium of exchange for goods and services in the wedding industry. Collaborators and contributors within the Unity ecosystem will receive rewards through Unity Rewards for value-added actions.

Ultimately, the governance of Unity Coin will be decentralized, and facilitated by the Unity Coin Foundation.

~Visit the [Unity Coin ICO site][unity coin] for more information on the presale and primary crowdsale details.~

Our crowdsale has been postphoned until 2018. Thank you to everyone interested and excited in our vision.

## Contracts
Please see the [contracts/](contracts) directory.

## Bounty Program
~We want your input! If you're interested, please see the [Unity Coin bounty program][bounty program] for participation details and instructions.~

Our crowdsale has been postphoned until 2018. All bug bounty submissions already received (thank you!) will be included for consideration at that time. We will be reviewing our bounty reward structure at that time as well, due to feedback received.

## Overview
There are two primary contracts: `UnityToken.sol` (ERC-20 compliant token) and `UnitySale.sol` (the crowdsale contract). Additionally, there is a simple shared interface defined in `IRefundHandler.sol` that allows `UnityToken` and `UnitySale` to communicate refund requests and exchange wei contributions for received tokens. This refund mechanism will be triggered in the event that our sale goals are not met.

### UnityToken
Deriving from OpenZeppelin's ERC-20 compliant base contracts, `UnityToken` has the same core functionality the Ethereum ecosystem has come to expect, with minor modifications:
1. Upon initial deployment, the token has no `symbol` or `name` set; it is set via `ownerSetVisible()`
1. Token transfers are disabled until after the crowdsales are successfully completed, at which point the token will be 'activated' via `ownerActivateToken()`
1. To ensure that contributors receive their tokens during the sale, the ability to `ownerSetOverride()` addresses has been added (allows override addresses to use `transfer()`)
1. In the event that refunds are enabled in the sale contract, token holders can exchange their tokens for ether by calling the `claimRefund()` method

### UnitySale
While not directly deriving from existing crowdsale contracts, `UnitySale` is based on the simplest combination of [OpenZeppelin code][openzeppelin], other successful crowdsale contracts, [best practices][best practices], as well as [security considerations][security concerns]. `UnitySale` functionality includes:
1. Flexible deployment options allows multiple sale scenarios (presale + primary ICO)
1. Time-based tranche discounting
1. Minimum ether goal restriction (optional)
1. Minimum and maximum individual contribution restrictions
1. Emergency break/pause functionality
1. Ability to enable refunds (in the case where minimum ether goal was not met)
1. Ability to transfer wei to beneficiary (after sale end and if optional min goal has been met)
1. Ability to recover (transfer) unsold tokens
1. Contributions via contract default/fallback function for user simplicity

## Develop
Contracts are written in [Solidity][solidity] and tested using [Truffle][truffle] and [testrpc][testrpc]. ERC20-related and other base contracts sourced from [OpenZeppelin.org][openzeppelin].

### Dependencies
```bash
# Install Truffle, testrpc, and dependency packages:
$ npm install
```

### Test
```bash
# Initialize a testrpc instance in one terminal tab
$ node_modules/.bin/testrpc

# This will run the contract tests using truffle
$ node_modules/.bin/truffle test
```
**Note that there is an [outstanding testrpc issue][testrpc bug 390]** which, until fixed and released, will cause some tests to fail; it is related to the `testrpc` `evm_increaseTime` operation and its interaction with `testrpc` snapshot/revert behaviour. A [custom `testrpc` build][testrpc custom build workaround] can be made that addresses this problem in the meantime.

## Build
For easy deployment via Mist, simply concatenate all contracts using [`solidity_flattener`][solidity flattener].
```
solidity_flattener --solc-paths "zeppelin-solidity=<absolute path to your files>/node_modules/zeppelin-solidity" contracts/UnityToken.sol > UnifiedUnityToken.sol
solidity_flattener --solc-paths "zeppelin-solidity=<absolute path to your files>/node_modules/zeppelin-solidity" contracts/UnitySale.sol > UnifiedUnitySale.sol
```
Use the concatenated contracts in these 'unified' .sol files to deploy in [Mist][mist]. Note that these 'unified' files are also useful when [verifying your contract on Etherscan.io][etherscan verifycontract].

[unity coin]: https://www.unitycoin.onewed.com/
[ethereum]: https://www.ethereum.org/
[openzeppelin]: https://openzeppelin.org/
[solidity]: https://solidity.readthedocs.io/
[truffle]: http://truffleframework.com/
[testrpc]: https://github.com/ethereumjs/testrpc
[mist]: https://github.com/ethereum/mist
[solidity flattener]: https://github.com/BlockCatIO/solidity-flattener
[testrpc bug 390]: https://github.com/ethereumjs/testrpc/issues/390
[testrpc custom build workaround]: https://github.com/ethereumjs/testrpc/issues/390#issuecomment-336917098
[best practices]: http://solidity.readthedocs.io/en/develop/common-patterns.html
[security concerns]: http://solidity.readthedocs.io/en/develop/security-considerations.html
[etherscan verifycontract]: https://etherscan.io/verifyContract
[bounty program]: https://www.onewed.com/unitycoin-bounty-program/
[unitycoin whitepaper]: https://www.onewed.com/unitycoin-whitepaper/
