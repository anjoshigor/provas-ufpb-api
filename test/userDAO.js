var expect = require("chai").expect;
var UserDAO = require("../app_server/infra/dao/userDAO.js");
var DatabaseFactory = require("../app_server/infra/dao/databaseFactory.js");

describe('UserDAO Teste', function() {
  describe('Padrão Singleton', function() {
    it('Deve retornar um único objeto para todas as intancias', function(){
      var userDao1 = new UserDAO(DatabaseFactory.getFileDB());
      var userDao2 = new UserDAO(null);
  
      expect(userDao1).to.equal(userDao2);
    });
  });
});