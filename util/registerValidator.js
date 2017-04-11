
var RegisterError = require('../infra/error').RegisterError;

class RegisterValidator {
  constructor() {
  }

  validate(user) {
    var pswSize = user.password.length;
    var logSize = user.login.length;
    var matchPsw = user.password.match(/\d/g);
    var matchLogin = user.login.match(/\d/g);
    
    if (user.login == "") {
      throw new RegisterError("Campo de Login Vazio!");
      return;
    }
    if (logSize > 20) {
      throw new RegisterError("Login deve possuir no máximo 20 caracteres!");
      return;
    }
    if (matchLogin != null) {
      throw new RegisterError("Login não pode conter números!");
      return;
    }
    if (user.password == "") {
      throw new RegisterError("Campo de Senha Vazio!");
      return;
    }
    if (pswSize > 12 || pswSize < 8) {
      throw new RegisterError("Senha deve possuir entre 8 e 12 caracteres!");
      return;
    }
    if (matchPsw == null || matchPsw.length < 2) {
      throw new RegisterError("Senha deve possuir no mínimo 2 números!");
    }
  }


}

module.exports = RegisterValidator;
