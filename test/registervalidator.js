var expect = require("chai").expect;
var User = require("../app_server/business/model/user.js");
var RegisterValidator = require('../app_server/util/registerValidator.js');

describe("RegisterValidator Teste", function () {
	describe("Teste do Campo de Login Vazio", function () {
		it('Deve lançar um erro se o campo de login não for preenchido', function() {
			var user1 = new User("", "12345678");
			var user2 = new User("HigorAnjos", "12345678");
			
			var registerValidator = new RegisterValidator();

			/* Deve lançar uma exceção */
			expect(() => registerValidator.validate(user1)).to.throw('Campo de Login Vazio!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user2)).not.to.throw('Campo de Login Vazio!');

		});
	});

	describe("Teste do Tamanho do Login", function () {
		it("Deve lançar um erro se o valor campo login possuir mais de 20 caracteres", function () {
			var user1 = new User("DiogoVenturaDantasAdmin", "12345678");
			var user2 = new User("MarcosAlves", "12345678");

			var registerValidator =  new RegisterValidator();

			/* Deve lançar uma exceção */
			expect(() => registerValidator.validate(user1)).to.throw('Login deve possuir no máximo 20 caracteres!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user2)).not.to.throw('Login deve possuir no máximo 20 caracteres!');

		});
	});

	describe("Teste da Ocorrência de Números no Login", function () {
		it("Deve lançar um erro se o login possuir algum caracter númerico", function () {
			var user1 = new User("DiogoVenturaDantas1", "12345678");
			var user2 = new User("MarcosAlves", "12345678");

			var registerValidator =  new RegisterValidator();

			/* Deve lançar uma exceção */
			expect(() => registerValidator.validate(user1)).to.throw('Login não pode conter números!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user2)).not.to.throw('Login não pode conter números!');
		});
	});

	describe("Teste do Campo de Senha Vazio", function () {
		it("Deve lançar um erro se o campo de senha não for preenchido", function () {
			var user1 = new User("DiogoDantas", "");
			var user2 = new User("HigorAnjos", "12345678")
			
			var registerValidator =  new RegisterValidator();

			/* Deve lançar uma exceção */
			expect(() => registerValidator.validate(user1)).to.throw('Campo de Senha Vazio!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user2)).not.to.throw('Campo de Senha Vazio!');
		});
	});

	describe("Teste do Tamanho da Senha", function () {
		it("Deve lançar um erro se o campo de senha possuir menos de 8 ou mais de 12 caracteres", function () {
			var user1 = new User("DiogoDantas", "1234567");
			var user2 = new User("DiogoDantas", "1234567891011");
			var user3 = new User("DiogoDantas", "12345678");

			var registerValidator =  new RegisterValidator();

			/* Menos de 8 caracteres */
			expect(() => registerValidator.validate(user1)).to.throw('Senha deve possuir entre 8 e 12 caracteres!');
			/* Mais de 12 caracteres */
			expect(() => registerValidator.validate(user2)).to.throw('Senha deve possuir entre 8 e 12 caracteres!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user3)).not.to.throw('Senha deve possuir entre 8 e 12 caracteres!')
		});
	});

	describe("Teste da Ocorrência de ao Menos 2 Números no Campo de Senha", function () {
		it("Deve lançar um erro se o campo de senha não possuir ao menos 2 caracteres númericos", function () {
			var user1 = new User("DiogoDantas", "diogoven1");
			var user2 = new User("MarcosAlves", 'admin123')

			var registerValidator =  new RegisterValidator();

			/* Deve lançar uma exceção */
			expect(() => registerValidator.validate(user1)).to.throw('Senha deve possuir no mínimo 2 números!');

			/* Não deve lançar uma exceção */
			expect(() => registerValidator.validate(user2)).not.to.throw('Senha deve possuir no mínimo 2 números!');
		});
	});
});