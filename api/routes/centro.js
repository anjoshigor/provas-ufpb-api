var express = require('express');
var router = express.Router();

var Centro = require('../business/schemas/centroSchema');

var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var CentroCommand = require('../business/control/centroCommand');

/**
 * @api {get} /centros/ Retorna todos os centros
 * @apiName GetCentros
 * @apiGroup Centros
 *
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
 */
router.get('/centros', (req, res, next) => {
    var nome = req.query.nome;
    var filter = {};

    if ("undefined" !== typeof nome) {
        filter = {
            "nome": new RegExp('.*' + nome + '.*', "i")
        };
    }

    console.log(nome);
    console.log(filter);

    Centro.find(filter, '-__v', (err, centros) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(centros);
        }
    });
});


router.get('/centro/:id', (req, res, next) => {
    new APIManager().get(req, res, Factory.getCentroMongoORM());
});


/**ADD centro**/
router.post('/centro', (req, res, next) => {
    new APIManager().add(req, res, Factory.getCentroMongoORM());
});

/**UPDATE centro pelo id**/
router.put('/centro/:id', (req, res, next) => {
    new APIManager().add(req, res, Factory.getCentroMongoORM());
});


/**Deletar pelo id**/
router.delete('/centro/:id', (req, res, next) => {
    new APIManager().delete(req, res, Factory.getCentroMongoORM());
});


module.exports = router;
