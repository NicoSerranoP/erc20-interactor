import { expect } from "chai";
import { ethers } from "hardhat";

describe("BLSToken", async function () {
  it("Total supply should be assigned to owner at deployment time", async function () {
    const initialSupply = 100;
    const BLSToken = await ethers.getContractFactory("BLSToken");
    const blsToken = await BLSToken.deploy(initialSupply);
    const wallet = await ethers.getSigners();
    await blsToken.deployed();

    expect(await blsToken.totalSupply()).to.equal(initialSupply);
    expect(await blsToken.balanceOf(wallet[0].address)).to.equal(initialSupply);
  });

  it("Tokens should be transferable", async function () {
    const initialSupply = 100;
    const amountToTransfer = 3;
    const BLSToken = await ethers.getContractFactory("BLSToken");
    const blsToken = await BLSToken.deploy(initialSupply);
    const wallet = await ethers.getSigners();
    await blsToken.transfer(wallet[1].address, amountToTransfer);

    expect(await blsToken.balanceOf(wallet[0].address)).to.equal(
      initialSupply - amountToTransfer
    );
    expect(await blsToken.balanceOf(wallet[1].address)).to.equal(
      amountToTransfer
    );
  });

  it("Insufficient tokens should not be able to transfer", async function (){
    const initialSupply = 100;
    const amountToTransfer = 101;
    const BLSToken = await ethers.getContractFactory("BLSToken");
    const blsToken = await BLSToken.deploy(initialSupply);
    const wallet = await ethers.getSigners();

    await expect(
      blsToken.transfer(wallet[1].address, amountToTransfer)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});
