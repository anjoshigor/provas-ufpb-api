class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class LoginError extends ExtendableError {
  constructor(m) {
    super(m);
  }

}

class RegisterError extends ExtendableError {
  constructor(m) {
    super(m);
  }

}

class IOError extends ExtendableError {
  constructor(m) {
    super(m);
  }

}

class InternalError extends ExtendableError {
  constructor(m) {
    super(m);
  }

}

module.exports = { LoginError: LoginError, IOError: IOError, InternalError: InternalError, RegisterError: RegisterError };
