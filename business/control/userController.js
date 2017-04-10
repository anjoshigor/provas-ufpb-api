var fs = require('fs');
var load = require('../../dao/userDAO').load;
var save = require('../../dao/userDAO').save;

var User = require('../model/user');

class UserController {
  constructor(){
    this._userMap = load();
  }

  add(user) {
    this._userMap.set(user.login, user.password);
  }

  delete(login) {
    this._userMap.delete(login);
  }

  get(login) {
    if(this.hasUser(login))
      return new User(login, this._userMap(login));
  }

  hasUser(login) {
    return this._userMap.has(login);
  }

  get userMap() {
    return this._userMap;
  }
}

module.exports = UserController;
