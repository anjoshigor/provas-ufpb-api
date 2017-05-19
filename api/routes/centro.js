var express = require('express');
var router = express.Router();

var Centro = require('../business/schemas/centroSchema');

var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var CentroCommand = require('../business/control/centroCommand');

/**Get centros**/
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

/** Get by id**/
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
