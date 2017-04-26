var InternalError = require('../../infra/error').InternalError;
var RegisterError = require('../../infra/error').RegisterError;
var User = require('../model/user');
var RegisterValidator = require('../../util/registerValidator');
var UserController = require('./userController');

class RegisterController {
  constructor() {
    this._controller = new UserController();
    this._validator = new RegisterValidator();
  }

//Callback function to render the view
  getPage(req, res, next) {
    res.render('register', { title: 'Register | API' });
  }

  register(user) {
    try {
      this._validator.validate(user);
      this._controller.add(user);
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }

}

module.exports = RegisterController;
