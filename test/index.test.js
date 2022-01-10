const assert = require('assert');
const chai = require('chai');
const ganache = require('ganache-cli') //local ethereum network
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
var expect = chai.expect;
const { interface , bytecode } = require('../compile.js');


let accounts;

beforeEach(async() => {
	// pega as contas do ganache e retorna no console.log
	accounts = await web3.eth.getAccounts();

	// contrato
	inbox =  await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode, 
			arguments: ["Hiiiiiiii Thereeeee!!!!!"] })
		.send({
			from: accounts[0], 
			gas: 1000000 });
});



describe('Inbox', () => {
	it('O contrato tem um Address? ', () => {
		//verifica se o inbox tem um endereco
		assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		expect(message).to.be.a("string");
	});

	it('can change the message', async () => {
		await inbox.methods.setMessage("ccyyyaaaaaa")
			.send({
				from: accounts[0],
				gas: 1000000
			})
		const message = await inbox.methods.message().call();
		assert.equal(message, "ccyyyaaaaaa");

	});

});











/*

class Car {
	constructor(park, drive) {
		this.park = "0 km...";
		this.drive = "20 km..."
	}

}


let ford;
beforeEach(() => {
	ford = new Car();  //cria novo carro
});


describe('Car', () => {
	it('Deveria estar parado', () => {
		expect(ford.park).to.be.equal('330 km...');
	})

	it('Deveria ser uma string', () => {
		expect(ford.drive).to.be.a("string");
	})
})

*/
