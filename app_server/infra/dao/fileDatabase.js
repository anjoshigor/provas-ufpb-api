var fs = require('fs');
var Database = require('./database');
var IOError = require('../error').IOError;
var RegisterError = require('../error').RegisterError;
var User = require('../../business/model/user');

class FileDatabase extends Database {
    
	constructor(filePath) {
		super();
		this._filePath = filePath;
		this._map = new Map();
	}
    
	getAll() {
		//ler do arquivo
		try {
			var data = fs.readFileSync(this._filePath, 'utf8');
			this._map = new Map(JSON.parse(data));
			return this._map;
		} catch (error) {
			console.log(error);
			throw new IOError('Falha na leitura do arquivo ' + this._filePath);
		}
        
	}
    
	add(user) {
		//sobrescrita do arquivo
		if (this._map.has(user.login)) {
			throw new RegisterError('Usuário não pôde ser criado. Já existe usuário ' + user.login + ' cadastrado no sistema');
		}
        
		try {
			this._map.set(user.login, user.password);
			fs.writeFileSync(this._filePath, JSON.stringify([...this._map]));
		} catch (error) {
			console.log(error);
			throw new IOError('Falha na leitura do arquivo ' + this._filePath);
		}
	}
    
	delete(user) {
		//delete no arquivo
		if (!this._map.delete(user.login)) {
			throw new RegisterError('Usuário não pôde ser deletado. Não existe usuário ' + user.login + 'cadastrado no sistema');
		}
    
		try {
			fs.writeFileSync(this._filePath, JSON.stringify(this._map));
		} catch (error) {
			throw new IOError('Falha na leitura do arquivo ' + this._filePath);
		}
	}
    
	get(user) {
		//pegar o usuario
		if (!this._map.has(user.login)) {
			throw new RegisterError('Usuário ' + user.login + ' não cadastrado no sistema');
		} else {
			var password = this._map.get(user.login);
			return new User(user.login, password);
		}
	}
}
module.exports = FileDatabase;