var express = require('express');
var router = express.Router();

var Curso = require('../business/schemas/cursoSchema');
var Centro = require('../business/schemas/centroSchema');

var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var CursoCommand = require('../business/control/cursoCommand');

/**Get cursos**/
router.get('/cursos', (req, res, next) => {
    new APIManager().get(req, res, new CursoCommand(Factory.getCursoMongoORM()));
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
    new APIManager().add(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});

/**UPDATE curso pelo id**/
router.put('/curso/:id', (req, res, next) => {
    new APIManager().update(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});


/**Deletar pelo id**/
router.delete('/curso/:id', (req, res, next) => {
    new APIManager().delete(req, res, new CursoCommand(Factory.getCursoMongoORM()));
});


module.exports = router;
