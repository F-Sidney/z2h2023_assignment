# Assignment 2 for Week4 class -- upgradable contract

Note: 
Create your own ".env" file based on the ".env.example" file.
Install dependent files
```bash
npm install 
```

1. If deploy to BSC Test net for the first time, Edit the address.json, empty the content of "bnbtest" like this:
```json
	"bnbtest": {
		"NXFProxyAdmin": "",
		"NXFImpl": ""
	}
```
1. First time to compile the contracts, edit the content of "hardhat.config.ts" file:
comment the import tasks part:
```typescript
// import "./tasks";
```
then compile:
```bash
npx hardhat clean
npx hardhat compile
```

1. After compile success, uncomment the import tasks line in "hardhat.config.ts" file,
and startup localhost network via command:

```bash
npx hardhat node
```

4. Interact with locahost
```bash
npx hardhat getVersion --network localhost
npx hardhat getValue --network localhost  
npx hardhat setValue --value 20 --network localhost
```

5. Upgrade the logic contract
copy the content of "NXFImpl_V2.sol.bak" to the file "NXFImpl.sol",
deploy the new version with following command:
```bash
npx hardhat deploy --network localhost --tags NXFImpl
```
6. Interact with the new version on locahost, check the differences
```bash
npx hardhat getVersion --network localhost
npx hardhat getValue --network localhost  
npx hardhat setValue --value 20 --network localhost
npx hardhat getValueV2 --network localhost     
```

7. Deploy to BSC test net 
Note: maybe need to use proxy to connect to the chainnet,
set the proxy in the .env file
Note:  make sure use the v1 version of NXFImpl

Depoly the Proxy、Admin and Logic(NXFImpl V1) contract:
```bash
npx hardhat deploy --network bnbtest --tags NXFProxyAdmin
npx hardhat deploy --network bnbtest --tags NXFImpl
```

interact with the v1 version contract:
```bash
npx hardhat getInitialized --network bnbtest
npx hardhat getVersion --network bnbtest
npx hardhat getValue --network bnbtest
npx hardhat setValue --value 20 --network bnbtest 
```

8. Upgrade the logic contract to v2
copy the content of "NXFImpl_V2.sol.bak" to the file "NXFImpl.sol",
deploy the new version with following command:
```bash
npx hardhat deploy --network bnbtest --tags NXFImpl
```

interact with the v2 version contract:
```bash
npx hardhat getInitialized --network bnbtest
npx hardhat getVersion --network bnbtest
npx hardhat getValue --network bnbtest
npx hardhat getValueV2 --network bnbtest
npx hardhat setValue --value 20 --network bnbtest  
npx hardhat getValue --network bnbtest   
```

9: Verify the logic contract
In step 7, the output contains the logic contract address:
"Implementation deployed to: xxxxxxxxx", use this address in the verify command,
command example:
```bash
npx hardhat verify --network bnbtest 0xBeeB2994F1C3d7fdAB33A84a850ebb5d550cE763
```