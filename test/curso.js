var expect = require('chai').expect;
var request = require('request');

describe("API | Curso", function() {
  describe("Requisições HTTP em Curso", function(){
    var url = 'http://localhost:3000/api/v1';
    var _id;
    // GET
    it("Returns status 200", function(done) {
      request(url + "/cursos", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // POST
    it("Adicionar um Curso", function(done) {
      request.post({url: url + "/curso", form: {nome: 'AdicionaCurso', centro: 'AdicionaOCentro'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        _id = JSON.parse(body).curso._id;
        done();
      });
    });
     // GET BY ID
    it("Pesquisa um Curso pelo ID", function(done) {
      request(url + "/curso/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT
    it("Atualizar um Curso", function(done) {
      request.put({url: url + "/curso/" + _id, form: {nome: 'AtualizaCurso', centro: 'AtualizaOCentro'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // DELETE
    it("Deletar um Curso", function(done) {
      request.del(url + "/curso/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
  });
});