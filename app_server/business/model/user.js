class User {
  constructor(login, password) {
    this._login = login;
    this._password = password;
  }

  get login() {
    return this._login;
  }

  get password() {
    return this._password;
  }
}

module.exports = User;
