
var LoginError = require('../infra/error').LoginError;

class LoginValidator {
  constructor() {
  }

  validate(user) {
    
    if (user.login == "") {
      throw new LoginError("Campo de Login Vazio!");
    } else if (user.password == "") {
      throw new LoginError("Campo de Senha Vazio!");
    }
  }
}

module.exports = LoginValidator;
