var express = require('express');
var router = express.Router();

var Curso = require('../business/schemas/cursoSchema');
var Centro = require('../business/schemas/centroSchema');

var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var CursoCommand = require('../business/control/cursoCommand');


/**
 * @api {get} /cursos/ GET Todos os Cursos
 * @apiName GetCursos
 * @apiGroup Cursos
 * @apiParam {String} [nome] Nome do curso a ser pesquisado
 * @apiDescription Retorna todos os cursos cadastrados na base de dados, podendo
 * ser filtrado por nome e centro
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/cursos HTTP/1.1
 * @apiExample {HTTP} Exemplo de uso com pesquisa por nome
    GET /api/v1/cursos?nome=Compu HTTP/1.1
 * @apiExample {HTTP} Exemplo de uso com pesquisa por centro
    GET /api/v1/cursos?centro=CCSA HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/cursos
 * @apiSuccess {Curso[]} Curso Lista de Cursos.
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "590e63b6322d224b144420e6",
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e63b6322d224b144420e7",
    "nome": "ENGENHARIA DE COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e63b6322d224b144420e9",
    "nome": "ADMINISTRAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE CIÊNCIAS SOCIAIS E APLICADAS (CCSA) (11.00.52)"
  },
  {
    "_id": "590e63b6322d224b144420e8",
    "nome": "MATEMÁTICA COMPUTACIONAL (BACH) - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e63b6322d224b144420ea",
    "nome": "MEDICINA - João Pessoa - Presencial - MT - OUTRO TIPO DE GRAU ACADÊMICO",
    "centro": "CENTRO DE CIÊNCIAS MÉDICAS (CCM) (11.00.60)"
  },
  {
    "_id": "590e63b6322d224b144420eb",
    "nome": "DIREITO - João Pessoa - Presencial - N - BACHARELADO",
    "centro": "CENTRO DE CIÊNCIAS JURÍDICAS (CCJ) (11.00.57)"
  }
 ]
 * @apiError {404} CursoNaoEcontrado Curso não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Curso não encontrado",
  "pesquisa": {
    "nome": "ZZ",
    "centro": "ZZ"
  }
 }
*/
router.get('/cursos', (req, res, next) => {
    new APIManager().get(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});



/**
 * @api {get} /curso/:id GET Curso pelo id
 * @apiName GetCursoById
 * @apiGroup Cursos
 * @apiParam {Number} id Identificador do curso
 * @apiDescription Retorna o curso especificado pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/curso/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/curso/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Curso} Curso Curso requisitado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "_id": "590e63b6322d224b144420e6",
  "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
  "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
 }
 * @apiError {404} CursoNaoEncontrado Curso não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  },
  "message": "Curso não encontrado"
*/

router.get('/curso/:id', (req, res, next) => {
    new APIManager().getById(req, res, new CursoCommand(Factory.getCursoMongoORM()));

});


/**
 * @api {get} /cursos/centro/:id GET todos os Cursos de um Centro
 * @apiName GetCursosByCentro
 * @apiGroup Cursos
 * @apiParam {Number} id Identificador do centro
 * @apiDescription Retorna todos os cursos de um centro especificado pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/curso/centro/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/curso/centro/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Cursos[]} Curso Cursos requisitados
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "590e63b6322d224b144420e6",
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e63b6322d224b144420e7",
    "nome": "ENGENHARIA DE COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  {
    "_id": "590e63b6322d224b144420e8",
    "nome": "MATEMÁTICA COMPUTACIONAL (BACH) - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  }
 ]
 * @apiError {404} CursoNaoEncontrado Curso não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  },
  "message": "Curso não encontrado"
 * @apiError {404} CentroNaoEncontrado Centro não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  },
  "message": "Centro não encontrado"
*/
router.get('/cursos/centro/:id', (req, res, next) => {
    var centroId = req.params.id;
    var response = {};
    /**Procura o centro**/
    Centro.findById(centroId, 'nome', (err, foundCentro) => {

        if (err) {
            response.message = "Erro interno do servidor";
            console.log(err);
            res.status(500).send(response);
        } else if (foundCentro) {
            /**Encontrou o centro**/
            var filter = {
                centro: foundCentro.nome
            }

            /** Procura o curso**/
            Curso.find(filter, '-__v', (err, cursos) => {
                if (err) {
                    response.message = "Erro interno do servidor";
                    console.log(err);
                    res.status(500).send(response);
                } else if (cursos.length === 0) {
                    response.message = "Curso não encontrado";
                    response.parametros = req.params;
                    res.status(404).send(response);
                } else {
                    res.send(cursos);
                }
            });

        } else {
            response.message = "Centro não encontrado";
            response.parametros = req.params;
            res.status(404).send(response);
        }

    });

});


/**
 * @api {post} /curso/ ADD Curso
 * @apiName AddCurso
 * @apiGroup Cursos
 * @apiParam {String} [nome] Nome do Curso
 * @apiParam {String} [centro] Nome do Centro
 * @apiDescription Adiciona um novo curso
 * @apiExample {HTTP} Exemplo de uso
    POST /api/v1/curso HTTP/1.1
    Content-Type: application/json
    {   
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
	"centro":"CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    }
 * @apiSampleRequest http://localhost:3000/api/v1/curso/
 * @apiSuccess {Curso} Curso Curso adicionado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Curso adicionado com sucesso",
  "centro": {
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {409} CursoExistente Curso já existe
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Curso já existente",
  "centro": { 
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c83c8495824fb8bad104"
  }
 }
*/
router.post('/curso', (req, res, next) => {
    new APIManager().add(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});



/**
 * @api {put} /curso/:id UPDATE Curso pelo id
 * @apiName UPDATECurso
 * @apiGroup Cursos
 * @apiParam {Number} id Identificador do Curso
 * @apiDescription Atualiza as informações de um Curso
 * @apiExample {HTTP} Exemplo de uso
    PUT /api/v1/curso/5930c904104d5851085c0d6a HTTP/1.1
    Content-Type: application/json
    {
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
	"centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    }
 * @apiSampleRequest http://localhost:3000/api/v1/curso/5930c904104d5851085c0d6a
 * @apiSuccess {Curso} Curso Curso modificado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
  {
  "message": "Curso alterado com sucesso",
  "curso": {
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
  }
 * @apiError {404} CursoNaoEncontrado Curso não encontrado
 * @apiErrorExample {json} Exemplo de erro

  {
  "message": "Curso não encontrado",
  "parametros": {
    "id": "5930ca792b7ae05258a54d2a"
  }
  }

*/
router.put('/curso/:id', (req, res, next) => {
    new APIManager().update(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});



/**
 * @api {delete} /curso/:id DELETE Curso pelo id
 * @apiName DELCurso
 * @apiGroup Cursos
 * @apiParam {Number} id Identificador do Curso
 * @apiDescription Deleta um curso pelo id
 * @apiExample {HTTP} Exemplo de uso
    DELETE /api/v1/curso/5930c904104d5851085c0d6a HTTP/1.1

 * @apiSampleRequest http://localhost:3000/api/v1/curso/5930c904104d5851085c0d6a
 * @apiSuccess {Curso} Curso Curso deletado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Curso deletado com sucesso",
  "curso": {
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "_id": "5930c65d0670004e06f8699c"
  }
 }
 * @apiError {404} CursoNaoEcontrado Curso não encontrado
 * @apiErrorExample {json} Exemplo de erro

 {
  "message": "Curso não encontrado",
  "parametros": {
    "id": "5930c65d0670104e06f8699c"
  }
 }

*/
router.delete('/curso/:id', (req, res, next) => {
    new APIManager().delete(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});


module.exports = router;
