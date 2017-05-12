var expect = require("chai").expect;
var FileDatabase = require("../app_server/infra/dao/fileDatabase.js");
var DatabaseFactory = require("../app_server/infra/dao/databaseFactory.js");

describe('DatabaseFactory Teste', function() {
  describe('Padrão Factory', function() {
    it('Deve retornar uma instancia de FileDatabase', function(){
      expect(DatabaseFactory.getFileDB()).to.be.an.instanceof(FileDatabase);
    });
  });
});