# Here are the detailed log of my operations
## 1. Install hardhat use NPM

```bat
d:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2>npx hardhat
Need to install the following packages:
  hardhat@2.13.0
Ok to proceed? (y) y
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.13.0

√ What do you want to do? · Create a TypeScript project
√ Hardhat project root: · d:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2
√ Do you want to add a .gitignore? (Y/n) · y
√ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y

You need to install these dependencies to run the sample project:
  npm install --save-dev "hardhat@^2.13.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"

Project created

See the README.md file for some example tasks you can run

Give Hardhat a star on Github if you're enjoying it!

     https://github.com/NomicFoundation/hardhat

d:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2>
```

## 2. NPM install  openzeppelin, dotenv, etherscan, etc.
```bat
npm install @openzeppelin/contracts
npm install dotenv
npm install hardhat-deploy
npm install --save-dev @nomiclabs/hardhat-etherscan
```

## 3. Create Admin Proxy Contract -- NXFProxyAdmin.sol
## 4. Create Implementation Contract V1 -- copy NXFImpl_V1.sol.bak to NXFImpl.sol
Note: The Proxy Contract -- NXFProxy.sol is just for learning and understanding the 
mechanism, we'll use the openzepplin's TransparentUpgradeableProxy
## 5. Comment the import tasks line in file 'hardhat.config.ts', because it will cause the project compile fail,
```ts
// import "./tasks";
```
## 6. use command to compile the project:
```bash
npx hardhat clean
npx hardhat compile
```
## 7. Uncomment the import tasks line in file 'hardhat.config.ts',  
```ts
import "./tasks";
```

## 8. use command 'npx hardhat node' to startup localhost network;
```bash
npx hardhat node
```

## 9. Use the tasks to interact with the contract
```bash
npx hardhat getVersion --network localhost
```
version:  1

```bash
npx hardhat getValue --network localhost  
```
value:  1

```bash
npx hardhat setValue --value 20 --network localhost
```

the output is something like this:
```bash
tx:  {
  to: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { value: "33733" },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x81c788a6808e8993f53935bb8db938ed3349dba7e04ac45ca8842fd1793db1d4',
  transactionHash: '0xd13133ed6b45b082e2e2e1356504a6594d59fcd86e297ae1936fda5f301134e0',
  logs: [],
  blockNumber: 4,
  type: 2,
  byzantium: true,
  events: []
}
currentValue:  20
```

## 10. Upgrade the logic contract,
copy the content of "NXFImpl_V2.sol.bak" to the file "NXFImpl.sol",
deploy the new version with following command:
```bash
npx hardhat deploy --network localhost --tags NXFImpl
```

## 11. Use the tasks to interact with the contract again
```bash
npx hardhat getVersion --network localhost
```
version:  2

```bash
npx hardhat getValue --network localhost     
```
value:  20

```bash
npx hardhat setValue --value 20 --network localhost
```
...
currentValue:  30

```bash
npx hardhat getValue --network localhost     
```
value:  30

```bash
npx hardhat getValueV2 --network localhost     
```
valueV2:  0


## 12. Deploy to testnet and Verify the contract
Note: maybe need to use proxy to connect to the chainnet,
set the proxy in the .env file

Depoly the Proxy、Admin and Logic(NXFImpl V1) contract:
```bash
npx hardhat deploy --network bnbtest --tags NXFProxyAdmin
npx hardhat deploy --network bnbtest --tags NXFImpl
```

the output of deploy "NXFProxyAdmin":
```bash
Deploying ProxyAdmin with account: 0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723
deploying "NXFProxyAdmin" (tx: 0xa8ba3691e05047eba295da804ad35bcc186888de7bd5ea8441c9df4f589e1912)...: deployed at 0x7e751122c05600FEe73508A5128BdA44b53FB640 with 440363 gas
ProxyAdmin deployed to: 0x7e751122c05600FEe73508A5128BdA44b53FB640 , network name: bnbtest
```

The first deployment of "NXFImpl", deployed v2 version by mistake, output as follows:
```bash
Deploying NXFImpl with account: 0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723
reusing "NXFProxyAdmin" at 0x7e751122c05600FEe73508A5128BdA44b53FB640
deploying "NXFImpl_Implementation" (tx: 0x4585d9d48defea2ee33f90a693d68b16a05660ef7c0e5dc701e065ea7bcc8ede)...: deployed at 0xdC83e2e52e9b8a624863C6C9949481116d19aC50 with 203779 gas
deploying "NXFImpl_Proxy" (tx: 0xb495b608b8c08fafd741bc753c04cd1ba4280bd34ef29d5b52b1aae725a48cb4)...: deployed at 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C with 641499 gas
Proxy deployed to: 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C
Implementation deployed to: 0xdC83e2e52e9b8a624863C6C9949481116d19aC50
```

change NXFImpl back to v1 and redeploy, the output：
```bash
npx hardhat deploy --network bnbtest --tags NXFImpl
Generating typings for: 1 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 26 typings!
Compiled 1 Solidity file successfully
Deploying NXFImpl with account: 0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723
reusing "NXFProxyAdmin" at 0x7e751122c05600FEe73508A5128BdA44b53FB640
deploying "NXFImpl_Implementation" (tx: 0x75718fe06249e8ec385d4cd5c961aae21c2a70884907043fb4824a04ce673e53)...: deployed at 0xabAAE28B7a18cA30225834523808Edcad34de8d7 with 134035 gas
executing NXFProxyAdmin.upgrade (tx: 0x41d7b23f8c33b762d65dbdb6574201453cb32f4fc61588628c64bc6f08261453) ...: performed with 33809 gas
Proxy deployed to: 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C
Implementation deployed to: 0xabAAE28B7a18cA30225834523808Edcad34de8d7
```

interact with the v1 version contract:
```bash
npx hardhat getVersion --network bnbtest
npx hardhat getValue --network bnbtest
npx hardhat setValue --value 20 --network bnbtest 
```

the output of setValue:
```bash
tx:  {
  to: '0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C',
  from: '0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723',
  contractAddress: null,
  transactionIndex: 1,
  gasUsed: BigNumber { value: "29233" },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x12ed37618069aeda9fca0aa9ebba496f8332ac4796e9a7e0b2eb0889da1c74d6',
  transactionHash: '0xf23e704f1154938020843518a8cdad9e7595d0aa9e81bac6eaf80eb4e488afa5',
  logs: [],
  blockNumber: 28831824,
  confirmations: 1,
  cumulativeGasUsed: BigNumber { value: "82147" },
  effectiveGasPrice: BigNumber { value: "20000000000" },
  status: 1,
  type: 0,
  byzantium: true,
  events: []
}
currentValue:  20
```

Change the NXFImpl.sol to V2 version and depoly the new contract:
```bash
npx hardhat deploy --network bnbtest --tags NXFImpl
```

the output:
```bash
Generating typings for: 1 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 26 typings!
Compiled 1 Solidity file successfully
Deploying NXFImpl with account: 0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723
reusing "NXFProxyAdmin" at 0x7e751122c05600FEe73508A5128BdA44b53FB640
deploying "NXFImpl_Implementation" (tx: 0xaaf5460b7201a9e03b2704f9cc63455091f0bbb6b42e1bbf4d78093ce5fc72dd)...: deployed at 0xBeeB2994F1C3d7fdAB33A84a850ebb5d550cE763 with 203779 gas
executing NXFProxyAdmin.upgrade (tx: 0xb86aca4ab236d52362b31543dce1251c363ec7a5f80d318c0ca6d9dc2bf138ce) ...: performed with 33809 gas
Proxy deployed to: 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C
Implementation deployed to: 0xBeeB2994F1C3d7fdAB33A84a850ebb5d550cE763
```

interact with the v2 version contract:
```bash
npx hardhat getVersion --network bnbtest
npx hardhat getValue --network bnbtest
npx hardhat getValueV2 --network bnbtest
npx hardhat setValue --value 20 --network bnbtest  
npx hardhat getValue --network bnbtest   
```
the output of setValue:
```
tx:  {
  to: '0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C',
  from: '0xaa8D710BB7d39D13bf8d20b4ce41e66d170f4723',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { value: "29345" },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0xd82acbda510bb99c510ec7c3289279ad2c5acfb79a9cc29d88060995d0e3abde',
  transactionHash: '0xd68baf457707adecb0846e97278e782d18099ab7761fd86532846b18e4e89a1a',
  logs: [],
  blockNumber: 28831919,
  confirmations: 2,
  cumulativeGasUsed: BigNumber { value: "29345" },
  effectiveGasPrice: BigNumber { value: "20000000000" },
  status: 1,
  type: 0,
  byzantium: true,
  events: []
}
currentValue:  30
```

Verify the contract:
verify admin:
```bash
npx hardhat verify --network bnbtest 0x7e751122c05600FEe73508A5128BdA44b53FB640
```

verify logic: 
```bash
npx hardhat verify --network bnbtest 0xBeeB2994F1C3d7fdAB33A84a850ebb5d550cE763
```
verify proxy(failed):
reference: https://forum.openzeppelin.com/t/verify-upgrades-plugins-proxy-on-etherscan/3920
```bash
npx hardhat verify --network bnbtest 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C --constructor-args arguments/proxyarguments.js
```

update:
Add FunctionSignature.sol contract to generate the calldata
start local node (will automatically deploy the FunctionSignature.sol)
```bash
npx hardhat node
```
if you want modify the contract, and deploy to local node manually: 
```bash
npx hardhat deploy --network localhost --tags FunctionSignature
```
get calldata:
```bash
npx hardhat getCallData --network localhost 
 ```
the output:
```log
getCallData:  0xfe4b84df0000000000000000000000000000000000000000000000000000000000000001
call raw data hexstring:  0xfe4b84df0000000000000000000000000000000000000000000000000000000000000001
```
then modify the "arguments/proxyarguments.js" content like this:
```json
module.exports = [
    //logic address
    "0x7e751122c05600FEe73508A5128BdA44b53FB640",
    //admin address
    "0xBeeB2994F1C3d7fdAB33A84a850ebb5d550cE763",
    //data
    "0xfe4b84df0000000000000000000000000000000000000000000000000000000000000001",
  ];
```

verify again:
```bash
npx hardhat verify --network bnbtest 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C --constructor-args arguments/proxyarguments.js --show-stack-traces
```

but still failed, full log:
```log
PS D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2> npx hardhat verify --network bnbtest 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C --constructor-args arguments/proxyarguments.js --show-stack-traces
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy at 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C
for verification on the block explorer. Waiting for verification result...

We tried verifying your contract TransparentUpgradeableProxy without including any unrelated one, but it failed.
Trying again with the full solc input used to compile and deploy it.
This means that unrelated contracts may be displayed on Etherscan...

Successfully submitted source code for contract
@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy at 0x04DC987a1AEF3AeCE68B20aF610088B93B3f080C
for verification on the block explorer. Waiting for verification result...

Error in plugin @nomiclabs/hardhat-etherscan: The contract verification failed.
Reason: Fail - Unable to verify

NomicLabsHardhatPluginError: The contract verification failed.
Reason: Fail - Unable to verify
    at SimpleTaskDefinition.verifySubtask [as action] (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\@nomiclabs\hardhat-etherscan\src\index.ts:375:9)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Environment._runTaskDefinition (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\hardhat\src\internal\core\runtime-environment.ts:330:14)
    at async Environment.run (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\hardhat\src\internal\core\runtime-environment.ts:163:14)
    at async Environment._runTaskDefinition (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\hardhat\src\internal\core\runtime-environment.ts:330:14)
    at async Environment.run (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\hardhat\src\internal\core\runtime-environment.ts:163:14)
    at async main (D:\code\Blockchain\Zero2Hero\z2h2023_assignment\a2\node_modules\hardhat\src\internal\cli\cli.ts:277:7)
```
