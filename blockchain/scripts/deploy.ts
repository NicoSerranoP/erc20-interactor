// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { FormatTypes } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BLSToken = await ethers.getContractFactory("BLSToken");
  const blsToken = await BLSToken.deploy(100);

  await blsToken.deployed();

  console.log("BLSToken deployed to:", blsToken.address);
  console.log("ABI code:", BLSToken.interface.format(FormatTypes.json));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
