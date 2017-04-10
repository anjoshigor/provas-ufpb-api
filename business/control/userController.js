var fs = require('fs');
var db = require('../../dao/userDAO');

var User = require('../model/user');

class UserController {
  constructor(){
    this._userMap = db.load();
  }

  add(user) {
    this._userMap.set(user.login, user.password);
    db.save(this.userMap);

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
