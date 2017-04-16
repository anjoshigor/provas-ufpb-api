var expect = require("chai").expect;
var User = require("../business/model/user.js");
var LoginValidator = require('../util/loginValidator.js');
var LoginError = require("../infra/error.js").LoginError

describe("LoginValidator Teste", function () {
	describe("Teste do Campo de Login Vazio", function () {
		it('Deve lançar um erro se o campo de login não for preenchido', function() {
			var user1 = new User("", "12345678");
			var user2 = new User("MarcosAlves", "12345678");

			var loginValidator = new LoginValidator();

			/* Deve lançar uma exceção */
			expect(() => loginValidator.validate(user1)).to.throw('Campo de Login Vazio!');

			/* Não deve lançar uma exceção */
			expect(() => loginValidator.validate(user2)).not.to.throw('Campo de Login Vazio!');

		});
	});

	describe("Teste do Campo de Senha Vazio", function () {
		it("Deve lançar um erro se o campo de senha não for preenchido", function () {
			var user1 = new User("DiogoDantas", "");
			var user2 = new User("DiogoDantas", "12345678")
			var loginValidator =  new LoginValidator();

			/* Deve lançar uma exceção */
			expect(() => loginValidator.validate(user1)).to.throw('Campo de Senha Vazio!');

			/* Não deve lançar uma exceção */
			expect(() => loginValidator.validate(user2)).not.to.throw('Campo de Login Vazio!');

		});
	});
});