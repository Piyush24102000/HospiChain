const Migrations = artifacts.require("examine");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
