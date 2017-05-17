var express = require('express');
var router = express.Router();

var Curso = require('../model/curso');
var Centro = require('../model/centro');

var Factory = require('../business/ORMFactory');
var APIManager = require('../business/APIManager');
var CursoCmd = require('../business/CursoCmd');

/**Get cursos**/
router.get('/cursos', (req, res, next) => {
    var query = req.query;
    var filter = {};

    //test if it has query
    if (Object.keys(query).length !== 0) {

        //test if the query is not complete
        var nome = query.nome || '';
        var centro = query.centro || '';

        filter = {
            "nome": new RegExp('.*' + nome + '.*', "i"),
            "centro": new RegExp('.*' + centro + '.*', "i")
        };

    }

    console.log(query);
    console.log(filter);

    Curso.find(filter, '-__v', (err, cursos) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(cursos);
        }
    });
});

/** Get by id**/
router.get('/curso/:id', (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Curso.findById(id, '-__v', (err, curso) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }
        if (curso) {
            res.send(curso);
        } else {
            res.send("Curso não encontrado");
        }
    });
});

/**Get cursos pelo centro**/
router.get('/cursos/centro/:id', (req, res, next) => {
    var centroId = req.params.id;
    console.log('ID Centro: ' + centroId);

    /**Procura o centro**/
    Centro.findById(centroId, 'nome', (err, foundCentro) => {

        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }

        if (foundCentro) {
            /**Encontrou o centro**/
            console.log('centro encontrado:' + foundCentro);
            var filter = {
                centro: foundCentro.nome
            }

            /** Procura o curso**/
            Curso.find(filter, '-__v', (err, cursos) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Erro interno no servidor");
                } else {
                    res.send(cursos);
                }
            });

        } else {
            res.send("Centro não encontrado");
        }

    });

});



/**ADD curso**/
router.post('/curso', (req, res, next) => {

    var apimanager = new APIManager();
    apimanager.add(req.body, res, new CursoCmd(Factory.getCursoMongoORM()));

});

/**UPDATE curso pelo id**/
router.put('/curso/:id', (req, res, next) => {

    var id = req.params.id;

    console.log("ID: " + id);

    Curso.findById(id, function (err, curso) {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            console.log(err);
        } else {
            //se não passar o nome nem o centro, mantém os existentes
            curso.nome = req.body.nome || curso.nome;
            curso.centro = req.body.centro || curso.centro;
            curso.save(function (err, curso) {
                if (err) {
                    res.status(500).send("Erro interno do Servidor");
                    console.log(err);
                }
                res.send(curso);
            });
        }
    });
});


/**Deletar pelo id**/
router.delete('/curso/:id', (req, res, next) => {

    var id = req.params.id;

    Curso.findByIdAndRemove(id, function (err, curso) {

        var response = {
            message: "Curso deletado com sucesso",
        };

        if (err) {
            console.log(err);
            res.status(500).send("Erro interno do servidor");
        }

        if (curso) {

            response.nome = curso.nome;
            response.centro = curso.centro;
            response.id = curso._id;

        } else {
            response.message = "Curso não encontrado";
        }

        res.send(response);
    });
});


module.exports = router;
