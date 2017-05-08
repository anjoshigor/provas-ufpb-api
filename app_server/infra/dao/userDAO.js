var fs = require('fs');
var IOError = require('../error').IOError;
var RegisterError = require('../error').RegisterError;
var User = require('../../business/model/user');

/**Singleton **/
var instance = null;

class UserDAO {
	
	constructor(database) {
		if (!instance) {
			instance = this;
		}
	
		this._database = database;
		return instance;
	
	}
	
	getUsers() {
		return this._database.getAll();
	}
	
	
	getUser(user) {
		return this._database.get(user);
	}
	
	addUser(user) {
		this._database.add(user);
	}
	
	deleteUser(user) {
		this._database.delete(user);
	}
}
module.exports = UserDAO;
