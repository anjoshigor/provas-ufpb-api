var fs = require('fs');
var db = require('../../infra/dao/userDAO');
var InternalError = require('../../infra/error').InternalError;
var RegisterError = require('../../infra/error').RegisterError;
var User = require('../model/user');
var RegisterValidator = require('../../util/registerValidator');

class UserController {
  constructor() {
    this._userMap = db.load();
    this._validator = new RegisterValidator();
  }

  add(user) {
    try {
      this._validator.validate(user);
      this._userMap.set(user.login, user.password);
      db.save(this.userMap);
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }


  delete(login) {
    this._userMap.delete(login);
  }

  get(login) {
    if (this.hasUser(login))
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
