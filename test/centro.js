var expect = require('chai').expect;
var request = require('request');

describe("API | Centro", function() {
  describe("Requisições HTTP em Centro", function(){
    var url = 'http://localhost:3000/api/v1';
    var _id;
    // GET
    it("Returns status 200", function(done) {
      request(url + "/centros", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // POST
    it("Adicionar um Centro", function(done) {
      request.post({url: url + "/centro", form: {nome: 'AdicionaCentro'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        _id = JSON.parse(body).centro._id;
        done();
      });
    });
     // GET BY ID
    it("Pesquisa um Centro pelo ID", function(done) {
      request(url + "/centro/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT
    it("Atualizar um Centro", function(done) {
      request.put({url: url + "/centro/" + _id, form: {nome: 'AtualizaCentro'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // DELETE
    it("Deletar um Centro", function(done) {
      request.del(url + "/centro/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
  });
});