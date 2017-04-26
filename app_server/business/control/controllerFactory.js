/**Imports**/
var ControlEnum = require('./controllerType');
var UserController = require('./userController');
var LoginController = require('./loginController');
var RegisterController = require('./registerController');
var InternalError = require('../../infra/error').InternalError;

class ControllerFactory {
    
    static getController(type) {
        switch (type) {
            case ControlEnum.User:
                return new UserController();
                break;
            case ControlEnum.Login:
                return new LoginController();
                break;
            case ControlEnum.Register:
                return new RegisterController();
                break;
            default:
                throw new InternalError("Tipo de fábrica de controladores " + type + " não definido");
                break;
        }
    }
}

module.exports = ControllerFactory;