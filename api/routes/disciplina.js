var express = require('express');
var router = express.Router();

var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var DisciplinaCommand = require('../business/control/disciplinaCommand');

var Disciplina = require('../business/schemas/disciplinaSchema');


/**
 * @api {get} /disciplinas/ GET Todas as Disciplinas
 * @apiName GetDisciplinas
 * @apiGroup Disciplinas
 * @apiParam {String} [nome] Nome da disciplina a ser pesquisada
 * @apiDescription Retorna todos as disciplinas cadastradas na base de dados, podendo
 * ser filtrada por nome
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/disciplinas HTTP/1.1
 * @apiExample {HTTP} Exemplo de uso com pesquisa por nome
    GET /api/v1/disciplinas?nome=Prog HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/disciplinas
 * @apiSuccess {Disciplinas[]} Disciplina Lista de Disciplinas.
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "590f41a85e13810c58412e53",
    "nome": "COMPUTADORES E SOCIEDADE"
  },
  {
    "_id": "590f41a85e13810c58412e54",
    "nome": "INTROD À MATEMÁTICA COMPUTACINAL"
  },
  {
    "_id": "590f41a85e13810c58412e55",
    "nome": "INTRODUCAO A TEORIA DE GRAFOS"
  },
  {
    "_id": "590f41a85e13810c58412e56",
    "nome": "ESTÁGIO SUPERVISIONADO"
  },
  {
    "_id": "590f41a85e13810c58412e57",
    "nome": "TÓPICOS ESPECIAIS EM MÁT COMPUT I"
  },
  {
    "_id": "590f41a85e13810c58412e58",
    "nome": "ALGORÍTIMOS   DISTRIBUÍDOS"
  },
  {
    "_id": "590f41a85e13810c58412e59",
    "nome": "MÉTODOS DOS ELEMENTOS FINITOS I"
  }
 ]
 * @apiError {404} DisciplinaNaoEcontrado Disciplina não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Disciplina não encontrada",
  "pesquisa": {
    "nome": "ZZ",
  }
 }
*/
router.get('/disciplinas', (req, res, next) => {
    new APIManager().get(req, res, new DisciplinaCommand(Factory.getDisciplinaMongoORM()));
});

/**
 * @api {get} /disciplina/:id GET Disciplina pelo id
 * @apiName GetDisciplinaById
 * @apiGroup Disciplinas
 * @apiParam {Number} id Identificador da disciplina
 * @apiDescription Retorna a disciplina especificada pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/disciplina/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/disciplina/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Disciplina} Disciplina Disciplina requisitado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "_id": "590f41a85e13810c58412efd",
  "nome": "METODOS DE PROJETO DE SOFTWARE"
 }
 * @apiError {404} DisciplinaNaoEncontrada Disciplina não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  },
  "message": "Disciplina não encontrada"
*/
router.get('/disciplina/:id', (req, res, next) => {
    new APIManager().getById(req, res, new DisciplinaCommand(Factory.getDisciplinaMongoORM()));
});


/**
 * @api {post} /disciplina/ ADD Disciplina
 * @apiName AddDisciplina
 * @apiGroup Disciplinas
 * @apiParam {String} [nome] Nome do Disciplina
 * @apiDescription Adiciona uma nova disciplina
 * @apiExample {HTTP} Exemplo de uso
    POST /api/v1/disciplina HTTP/1.1
    Content-Type: application/json
    {   
        "nome": "METODOS DE PROJETO DE SOFTWARE"
    }
 * @apiSampleRequest http://localhost:3000/api/v1/disciplina/
 * @apiSuccess {Disciplina} Disciplina Disciplina adicionada
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Disciplina adicionada com sucesso",
  "disciplina": {
    "nome": "METODOS DE PROJETO DE SOFTWARE",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {409} DisciplinaExistente Disciplina já existe
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Disciplina já existente",
  "disciplina": { 
    "nome": "METODOS DE PROJETO DE SOFTWARE"
  }
 }
*/
router.post('/disciplina', (req, res, next) => {
    new APIManager().add(req, res, new DisciplinaCommand(Factory.getDisciplinaMongoORM()));
});


/**
 * @api {put} /disciplina/:id UPDATE Disciplina pelo id
 * @apiName UPDATEDisciplina
 * @apiGroup Disciplinas
 * @apiParam {Number} id Identificador da Disciplina
 * @apiDescription Atualiza as informações de uma Disciplina
 * @apiExample {HTTP} Exemplo de uso
    PUT /api/v1/disciplina/5930c904104d5851085c0d6a HTTP/1.1
    Content-Type: application/json
    {
        "nome": "METODOS DE PROJETO DE SOFTWARE"    
    }
 * @apiSampleRequest http://localhost:3000/api/v1/disciplina/5930c904104d5851085c0d6a
 * @apiSuccess {Disciplina} Disciplina Disciplina modificado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
  {
  "message": "Disciplina alterada com sucesso",
  "disciplina": {
    "nome": "METODOS DE PROJETO DE SOFTWARE"
    "_id": "5930c65d0670004e06f8699c"
  }
  }
 * @apiError {404} DisciplinaNaoEncontrada Disciplina não encontrada
 * @apiErrorExample {json} Exemplo de erro

  {
  "message": "Disciplina não encontrada",
  "parametros": {
    "id": "5930ca792b7ae05258a54d2a"
  }
  }

 * @apiError {409} DisciplinaExistente Disciplina já existe
 * @apiErrorExample {json} Exemplo de erro

  {
  "message": "Disciplina já existente",
  "disciplina": {
    "nome": "METODOS DE PROJETO DE SOFTWARE"
  }
 }
*/
router.put('/disciplina/:id', (req, res, next) => {
    new APIManager().update(req, res, new DisciplinaCommand(Factory.getDisciplinaMongoORM()));
});


/**
 * @api {delete} /disciplina/:id DELETE Disciplina pelo id
 * @apiName DELDisciplina
 * @apiGroup Disciplinas
 * @apiParam {Number} id Identificador da Disciplina
 * @apiDescription Deleta uma disciplina pelo id
 * @apiExample {HTTP} Exemplo de uso
    DELETE /api/v1/disciplina/5930c904104d5851085c0d6a HTTP/1.1

 * @apiSampleRequest http://localhost:3000/api/v1/disciplina/5930c904104d5851085c0d6a
 * @apiSuccess {Disciplina} Disciplina Disciplina deletada
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Disciplina deletada com sucesso",
  "disciplina": {
    "nome": "METODOS DE PROJETO DE SOFTWARE",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {404} DisciplinaNaoEcontrada Disciplina não encontrada
 * @apiErrorExample {json} Exemplo de erro

 {
  "message": "Disciplina não encontrada",
  "parametros": {
    "id": "5930c65d0670104e06f8699c"
  }
 }

*/
router.delete('/disciplina/:id', (req, res, next) => {
    new APIManager().delete(req, res, new DisciplinaCommand(Factory.getDisciplinaMongoORM()));
});


module.exports = router;
