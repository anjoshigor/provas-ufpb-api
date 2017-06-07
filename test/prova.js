var expect = require('chai').expect;
var request = require('request');
var fs = require('fs');

describe("API | Prova", function() {
  describe("Requisições HTTP em Prova", function(){
    var url = 'http://localhost:3000/api/v1';
    var _id;
    // POST
    it("Adicionar um Prova", function(done) {
      var formData = {
        pdf: fs.createReadStream(__dirname + '/files/atividade.pdf'),
        periodo: "2017.1",
        disciplina: "AdicionaMinhaDisciplina",
        tipo: "Normal",
        departamento: "MeuDepartamento",
        centro: "AdicionaMeuCentro",
        curso: "AdicionaMeuCurso"
      };
      request.post({url: url + "/prova", formData: formData }, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        _id = JSON.parse(body)._id;
        done();
      });
    });
    // GET PROVA PARA CLASSIFICAR
    it("Retorna uma prova para classificar", function(done) {
      request(url + "/classify/prova", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // GET PROVA PARA CLASSIFICAR
    it("Download de uma prova para classificar", function(done) {
      request(url + "/download/prova/classify/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT ADICIONA PONTUAÇÃO ADITIVA NA PROVA
    it("Adiciona pontuação na prova primeiro nível (+1)", function(done) {
      request.put(url + "/classify/" + _id + "/add", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT ADICIONA PONTUAÇÃO ADITIVA NA PROVA
    it("Adiciona pontuação na prova segundo nível (+1)", function(done) {
      request.put(url + "/classify/" + _id + "/add", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // PUT ADICIONA PONTUAÇÃO NEGATIVA NA PROVA
    it("Adiciona pontuação na prova volta para o primeiro nível (-1)", function(done) {
      request.put(url + "/classify/" + _id + "/sub", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT ADICIONA PONTUAÇÃO ADITIVA NA PROVA
    it("Adiciona pontuação na prova segundo nível (+1)", function(done) {
      request.put(url + "/classify/" + _id + "/add", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT ADICIONA PONTUAÇÃO ADITIVA NA PROVA
    it("Adiciona pontuação na prova prova aceita (+1)", function(done) {
      request.put(url + "/classify/" + _id + "/add", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // GET BY ID
    it("Pesquisa um Prova pelo ID", function(done) {
      request(url + "/prova/" + _id, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
     // GET ÚLTIMAS PROVAS ADICIONADAS
    it("Últimas provas adicionadas", function(done) {
      request(url + "/provas/latest", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // PUT
    it("Atualizar uma Prova", function(done) {
      var formData = {
        pdf: fs.createReadStream(__dirname + '/files/atividade.pdf'),
        periodo: "2017.1",
        disciplina: "AtualizaMinhaDisciplina",
        tipo: "Normal",
        departamento: "AtualizaDepartamento",
        centro: "AtualizaMeuCentro",
        curso: "AtualizaMeuCurso"
      };
      request.put({url: url + "/prova/" + _id, headers: {token: 'mps10'}, formData: formData}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // GET
    it("Returns status 200", function(done) {
      request(url + "/provas", function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
    // DELETE
    it("Deletar uma Prova", function(done) {
      request.del({url: url + "/prova/" + _id, headers: {token: 'mps10'}}, function(err, response, body) {
        expect(200).to.equal(response.statusCode);
        done();
      });
    });
  });
});