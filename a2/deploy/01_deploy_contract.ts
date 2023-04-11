import { DeployFunction, ProxyOptions } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying NXFImpl with account:", deployer);

  const addressList = readAddressList();

  const proxyOptions: ProxyOptions = {
    proxyContract: "TransparentUpgradeableProxy",
    viaAdminContract: "NXFProxyAdmin",
    execute: {
      // 只在初始化时执行
      init: {
        // 执行initialize方法
        methodName: "initialize",
        // 参数
        args: [1],
      },
    },
  };

  const nxfImpl = await deploy("NXFImpl", {
    contract: "NXFImpl",
    from: deployer,
    proxy: proxyOptions,
    args: [],
    log: true,
  });

  console.log("Proxy deployed to:", nxfImpl.address);
  console.log("Implementation deployed to:", nxfImpl.implementation);

  addressList[network.name].NXFImpl = nxfImpl.address;
  storeAddressList(addressList);
};

// npx hardhat deploy --network {network} --tags {Tag}
func.tags = ["NXFImpl"];
export default func;
