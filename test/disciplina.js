var expect = require('chai').expect;
var request = require('request');

describe("API | Disciplina", function() {
  describe("Requisições HTTP em Disciplina", function(){
    var url = 'http://localhost:3000/api/v1';
    var _id;
    // GET
    it("Returns status 200", function(done) {
      request(url + "/disciplinas", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // POST
    it("Adicionar uma Disciplina", function(done) {
      request.post({url: url + "/disciplina", form: {nome: 'AdicionaDisciplina'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        _id = JSON.parse(body).disciplina._id;
        done();
      });
    });
    // GET WITH FILTER
    it("Pesquisa Disciplinas com filtro", function(done) {
      request(url + "/disciplinas?nome=Adiciona", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // GET BY ID
    it("Pesquisa uma Disciplina pelo ID", function(done) {
      request(url + "/disciplina/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT
    it("Atualizar uma Disciplina", function(done) {
      request.put({url: url + "/disciplina/" + _id, form: {nome: 'AtualizaDisciplina'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // DELETE
    it("Deletar uma Disciplina", function(done) {
      request.del(url + "/disciplina/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
  });
});