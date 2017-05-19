var express = require('express');
var router = express.Router();

var Disciplina = require('../business/schemas/disciplinaSchema');

/**Get disciplina**/
router.get('/disciplinas', (req, res, next) => {
    var query = req.query;
    var filter = {};

    //test if it has query
    if (Object.keys(query).length !== 0) {

        //test if the query is not complete
        var nome = query.nome || '';

        filter = {
            "nome": new RegExp('.*' + nome + '.*', "i"),
        };

    }

    console.log(query);
    console.log(filter);

    Disciplina.find(filter, '-__v', (err, disciplinas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(disciplinas);
        }
    });
});

/** Get by id**/
router.get('/disciplina/:id', (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Disciplina.findById(id, '-__v', (err, disciplina) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }
        if (disciplina) {
            res.send(disciplina);
        } else {
            res.send("Disciplina não encontrado");
        }
    });
});


/**ADD disciplina**/
router.post('/disciplina', (req, res, next) => {

    var newDisciplina = new Disciplina(req.body);
    console.log(req.body);

    newDisciplina.save((err, createdDisciplina) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }
        res.send(createdDisciplina);

    });
});

/**UPDATE disciplina pelo id**/
router.put('/disciplina/:id', (req, res, next) => {

    var id = req.params.id;

    console.log("ID: " + id);

    Disciplina.findById(id, function (err, disciplina) {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            console.log(err);
        } if (disciplina) {
            //se não passar o nome, mantém o existente
            disciplina.nome = req.body.nome || disciplina.nome;

            disciplina.save(function (err, disciplina) {
                if (err) {
                    res.status(500).send("Erro interno do Servidor");
                    console.log(err);
                }
                res.send(disciplina);
            });
        } else {
            res.send("Disciplina não encontrada");
        }
    });
});


/**Deletar pelo id**/
router.delete('/disciplina/:id', (req, res, next) => {

    var id = req.params.id;

    Disciplina.findByIdAndRemove(id, function (err, disciplina) {

        var response = {
            message: "Disciplina deletada com sucesso",
        };

        if (err) {
            console.log(err);
            res.status(500).send("Erro interno do servidor");
        }

        if (disciplina) {

            response.nome = disciplina.nome;
            response.id = disciplina._id;

        } else {
            response.message = "Disciplina não encontrada";
        }

        res.send(response);
    });
});


module.exports = router;
