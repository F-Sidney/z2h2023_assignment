import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";
import { ethers } from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const addressList = readAddressList();

  const functionSignature = await deploy("FunctionSignature", {
    contract: "FunctionSignature",
    from: deployer,
    args: [],
    log: true,
  });
  console.log("FunctionSignature deployed to:", functionSignature.address);

  addressList[network.name].FunctionSignature = functionSignature.address;
  storeAddressList(addressList);
};

func.tags = ["FunctionSignature"];
export default func;
