const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");
const { abi , evm } = require('./compile.js');


const provider = new HDWalletProvider(
	'twin brown volcano enhance person success riot laundry scorpion pledge random receive',
	'https://rinkeby.infura.io/v3/c6138a5b459049e692f1d5c67950de71'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Tentando dar deploy da conta: ', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(abi))
		.deploy({
			data: evm.bytecode.object,
			arguments: ['Hello World! =)']
		})
		.send({
			from: accounts[0],
			gas: 1000000
		});

	console.log(" Contrato deployed para", result.options.address);
	provider.engine.stop()
}
deploy();