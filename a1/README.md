# Follow those Steps to Deploy Token and Liquid Mining Contract

## 1 Deploy reward token -- NXFToken.sol
After depoly, you will get the Token contract address.

## 2 Deploy MasterChef contract, MasterChef.sol
Note: this step will need those parameters：
1. Token contract address: the token contract address from step1
2. Developer's address: your wallet address
3. Reward amout per block: 1000000000000000000 (just for example, here is 1 token per block, e.g. 1*10**18)
4. startBlock: the start block number, can go to the block explorer [https://testnet.bscscan.com/](https://testnet.bscscan.com/)to find the recent block number. for example, 28231930
5. bonusEndBlock: for example: 38231930
   
After deploy, you will get the MasterChef's contractg address.

## 3 Transfer the ownership of NXFT to MasterChef:
Just call the "transferOwnership" of NXFT token, set the parameter to the address of MasterChef from step 2.

## 4 Deloy Liquid Pool Token -- lpNXFToken.sol
After deploy, you will get the lpNXFToken's contract address.

## 5 Approve lpNXFToken to MasterChef
In order to meke the liquid mining contract can spend the lpNXFToken, we'll need use approve the lpNXFToken to MasterChef:
Parameters example:
1. spender: MasterChef's Address from step 2;
2. amount: 1000000000000000000000 (1000Token, 1000*10**18)

## 6 Invoke MasterChef's "Add" function to create a liquid pool
Parameters example:
1. allocPoint: 100;
2. lpToken: the address of lpNXFToken from step 4;
3. withUpdate: true
   
## 7 Invode MasterChef's "deposit" and "withdraw" to interact with the contract
For example:
deposit：300 Token(300000000000000000000)
after a while, 
withdraw: 100 Token(100000000000000000000)

and check you wallet, you will find the lpNXFToken amount and the NXFT token amount will change after those actions.


Useful links: 
1. https://docs.sushi.com/docs/Products/Sushiswap/Liquidity%20Pools
2. https://testnet.bscscan.com/
3. https://github.com/OpenZeppelin/openzeppelin-contracts
4. https://github.com/sushiswap/sushiswap
5. https://docs.bnbchain.org/docs/issue-BEP20/
