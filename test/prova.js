// var expect = require('chai').expect;
// var request = require('request');

// describe("API | Prova", function() {
//   describe("Requisições HTTP em Prova", function(){
//     var url = 'http://localhost:3000/api/v1';
//     var _id;
//     // GET
//     it("Returns status 200", function(done) {
//       request(url + "/provas", function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         done();
//       });
//     });
//     // POST
//     it("Adicionar um Prova", function(done) {
//       var formData = {
//         "periodo": "2017.1",
//         "pontos": 0,
//         "tipo": "Normal",
//         "dateUploaded": Date.now(),
//         "disciplina": "AdicionaMinhaDisciplina",
//         "curso": {
//           "nome": "AdicionaMeuCurso",
//           "centro": "AdicionaMeuCentro"
//         },
//         "pdf": {
//           "filename": "AdicionaProvaTeste",
//           "path": "../...",
//           "size": 0
//         }
//       }
//       request.post({url: url + "/prova", form: formData }, function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         _id = JSON.parse(body).centro._id;
//         done();
//       });
//     });
//      // GET PROVA PARA CLASSIFICAR
//     it("Retorna uma prova para classificar", function(done) {
//       request(url + "/classify/prova", function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         done();
//       });
//     });
//      // GET PROVA PARA CLASSIFICAR
//     it("Retorna uma prova para classificar", function(done) {
//       request(url + "/download/prova/classify/" + _id, function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         done();
//       });
//     });
//     // PUT
//     it("Atualizar um Centro", function(done) {
//       var formData = {
//         "periodo": "2017.1",
//         "pontos": 0,
//         "tipo": "Normal",
//         "dateUploaded": Date.now(),
//         "disciplina": "AtualizaMinhaDisciplina",
//         "curso": {
//           "nome": "AtualizaMeuCurso",
//           "centro": "AtualizaMeuCentro"
//         },
//         "pdf": {
//           "filename": "AtualizaProvaTeste",
//           "path": "../...",
//           "size": 0
//         }
//       }
//       request.put({url: url + "/prova/" + _id, form: formData}, function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         done();
//       });
//     });
//      // DELETE
//     it("Deletar um Centro", function(done) {
//       request.del(url + "/prova/" + _id, function(err, response, body) {
//         expect(200).to.equal(response.statusCode);
//         done();
//       });
//     });
//   });
// });