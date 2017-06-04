var express = require('express');
var router = express.Router();
var Centro = require('../business/schemas/centroSchema');
var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var CentroCommand = require('../business/control/centroCommand');

/**
 * @api {get} /centros/ GET Todos os Centros
 * @apiName GetCentros
 * @apiGroup Centros
 * @apiParam {String} [nome] Nome do curso a ser pesquisado
 * @apiDescription Retorna todos os centros cadastrados na base de dados, podendo
 * ser filtrado por nome
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/centros HTTP/1.1
 * @apiExample {HTTP} Exemplo de uso com pesquisa por nome
    GET /api/v1/centros?nome=INFO HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/centros
 * @apiSuccess {Centro[]} Centro Lista de Centros.
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "590e6e53e08bc1524ddb0a63",
    "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e6e53e08bc1524ddb0a66",
    "nome": "CENTRO DE CIÊNCIAS SOCIAIS E APLICADAS (CCSA) (11.00.52)"
  },
  {
    "_id": "590e6e53e08bc1524ddb0a67",
    "nome": "CENTRO DE CIÊNCIAS MÉDICAS (CCM) (11.00.60)"
  },
  {
    "_id": "590e6e53e08bc1524ddb0a68",
    "nome": "CENTRO DE CIÊNCIAS JURÍDICAS (CCJ) (11.00.57)"
  }
 ]
 * @apiError {404} CentroNaoEncontrado Centro não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "pesquisa": {
    "nome": "ZZ"
  },
  "message": "Centro não encontrado"
 }
*/
router.get('/centros', (req, res, next) => {
    var nome = req.query.nome;
    var filter = {};
    var response = {};

    if ("undefined" !== typeof nome) {
        filter = {
            "nome": new RegExp('.*' + nome + '.*', "i")
        };
    }

    Centro.find(filter, '-__v', (err, centros) => {
        if (err) {
            response.message = "Erro interno no servidor";
            console.log(err.message);
            res.status(500).send(response);
        } else {
            if (centros.length === 0) {

                response.pesquisa = req.query;
                response.message = "Centro não encontrado";
                res.status(404).send(response);
            }
            res.send(centros);
        }
    });
});

/**
 * @api {get} /centro/:id GET Centro pelo id
 * @apiName GetCentroById
 * @apiGroup Centros
 * @apiParam {Number} id Identificador do centro
 * @apiDescription Retorna o centro especificado pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/centro/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/centro/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Centro} Centro Centro requisitado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "_id": "590e6e53e08bc1524ddb0a63",
  "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
 }
 * @apiError {404} CentroNaoEncontrado Centro não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  },
  "message": "Centro não encontrado"
*/
router.get('/centro/:id', (req, res, next) => {
    new APIManager().getById(req, res, Factory.getCentroMongoORM());
});


/**
 * @api {post} /centro/ ADD Centro
 * @apiName AddCentro
 * @apiGroup Centros
 * @apiParam {String} [nome] Nome do Centro
 * @apiDescription Adiciona um novo centro
 * @apiExample {HTTP} Exemplo de uso
    POST /api/v1/centro HTTP/1.1
    Content-Type: application/json
    {   
	"nome":"CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    }
 * @apiSampleRequest http://localhost:3000/api/v1/centro/
 * @apiSuccess {Centro} Centro Centro adicionado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Centro adicionado com sucesso",
  "centro": {
    "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {409} CentroExistente Centro já existe
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Centro já existente",
  "centro": {
    "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c83c8495824fb8bad104"
  }
 }
*/
router.post('/centro', (req, res, next) => {
    new APIManager().add(req, res, Factory.getCentroMongoORM());
});

/**
 * @api {put} /centro/:id UPDATE Centro pelo id
 * @apiName UPDATECentro
 * @apiGroup Centros
 * @apiParam {Number} id Identificador do Centro
 * @apiDescription Atualiza as informações de um Centro
 * @apiExample {HTTP} Exemplo de uso
    PUT /api/v1/centro/5930c904104d5851085c0d6a HTTP/1.1
    Content-Type: application/json
    {
	"nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    }
 * @apiSampleRequest http://localhost:3000/api/v1/centro/5930c904104d5851085c0d6a
 * @apiSuccess {Centro} Centro Centro modificado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
  {
  "message": "Centro alterado com sucesso",
  "centro": {
    "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
  }
 * @apiError {404} CentroNaoEncontrado Centro não encontrado
 * @apiErrorExample {json} Exemplo de erro

  {
  "message": "Centro não encontrado",
  "parametros": {
    "id": "5930ca792b7ae05258a54d2a"
  }
  }

*/
router.put('/centro/:id', (req, res, next) => {
    new APIManager().update(req, res, Factory.getCentroMongoORM());
});


/**
 * @api {delete} /centro/:id DELETE Centro pelo id
 * @apiName DELCentro
 * @apiGroup Centros
 * @apiParam {Number} id Identificador do Centro
 * @apiDescription Deleta um centro pelo id
 * @apiExample {HTTP} Exemplo de uso
    DELETE /api/v1/centro/5930c904104d5851085c0d6a HTTP/1.1

 * @apiSampleRequest http://localhost:3000/api/v1/centro/5930c904104d5851085c0d6a
 * @apiSuccess {Centro} Centro Centro deletado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Centro deletado com sucesso",
  "centro": {
    "nome": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {404} CentroNaoEncontrado Centro não encontrado
 * @apiErrorExample {json} Exemplo de erro

 {
  "message": "Centro não encontrado",
  "parametros": {
    "id": "5930c65d0670104e06f8699c"
  }
 }

*/
router.delete('/centro/:id', (req, res, next) => {
    new APIManager().delete(req, res, Factory.getCentroMongoORM());
});


module.exports = router;
