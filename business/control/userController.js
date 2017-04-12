var fs = require('fs');
var UserDAO = require('../../infra/dao/userDAO').UserDAO;
var FileDatabase = require('../../infra/dao/userDAO').FileDatabase;
var InternalError = require('../../infra/error').InternalError;
var RegisterError = require('../../infra/error').RegisterError;
var User = require('../model/user');
var RegisterValidator = require('../../util/registerValidator');

class UserController {
  constructor() {
    this._UserDAO = new UserDAO(new FileDatabase('/home/anjoshigor/Documents/provas-ufpb-api/database.json'));
  }

  add(user) {
    try {
      this._UserDAO.addUser(user);
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }


  delete(user) {
    try {
      this._UserDAO.deleteUser(user)
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }

  getUser(user) {
    var foundUser;
    try {
      foundUser = this._UserDAO.getUser(user);
      return foundUser;
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      } else {
        console.error(error);
        throw new InternalError('Erro interno do sistema, tente novamente mais tarde ou procure o admin');
      }
    }
  }

  getAll() {
    var usersMap;
    try {
      usersMap = this._UserDAO.getUsers();
      return usersMap;
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

module.exports = UserController;
