var fs = require('fs');
var db = require('../../infra/dao/userDAO');
var InternalError = require('../../infra/error').InternalError;
var RegisterError = require('../../infra/error').RegisterError;
var LoginError = require('../../infra/error').LoginError;
var User = require('../model/user');
var LoginValidator = require('../../util/loginValidator');
var UserController = require('./userController');

class LoginController {
  constructor() {
    this._controller = new UserController();
    this._validator = new LoginValidator();
  }

  singIn(user) {
    try {
      this._validator.validate(user);
      var foundUser = this._controller.getUser(user);
      if (foundUser.password !== user.password) {
        throw new LoginError('Senha não confere');
      }
    } catch (error) {
      if (error instanceof LoginError || RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }

}

module.exports = LoginController;
