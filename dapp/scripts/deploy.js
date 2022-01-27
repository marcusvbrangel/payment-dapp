const hardhat = require("hardhat");

const main = async () => {

  const [deployer] = await hardhat.ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await hardhat.ethers.getContractFactory("PaymentToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log("PaymentToken deployed to:", token.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
