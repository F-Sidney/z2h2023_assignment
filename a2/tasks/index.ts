import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { NXFImpl__factory } from "../typechain-types"; //This will auto generated after compile

task("getValue").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new NXFImpl__factory(dev).attach(
    addressList[network.name].NXFImpl
  );
  const value = await myContract.value();
  console.log("value: ", value.toString());
});

task("getValueV2").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new NXFImpl__factory(dev).attach(
    addressList[network.name].NXFImpl
  );
  const value = await myContract.valueV2();
  console.log("valueV2: ", value.toString());
});

task("getInitialized").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new NXFImpl__factory(dev).attach(
    addressList[network.name].NXFImpl
  );
  const value = await myContract.initialized();
  console.log("Initialized: ", value.toString());
});


task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new NXFImpl__factory(dev).attach(
    addressList[network.name].NXFImpl
  );
  const version = await myContract.VERSION();
  console.log("version: ", version.toString());
});

task("setValue")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new NXFImpl__factory(dev).attach(
      addressList[network.name].NXFImpl
    );
    const tx = await myContract.setValue(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.value();
    console.log("currentValue: ", currentValue.toString());
  });
