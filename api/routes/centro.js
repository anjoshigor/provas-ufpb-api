var express = require('express');
var router = express.Router();

var Centro = require('../model/centro');

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
    var id = req.params.id;
    console.log(id);
    Centro.findById(id, '-__v', (err, centro) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }
        if (centro) {
            res.send(centro);
        } else {
            res.send("Centro não encontrado");
        }
    });
});


/**ADD centro**/
router.post('/centro', (req, res, next) => {

    var newCentro = new Centro(req.body);
    console.log(req.body);

    newCentro.save((err, createdCentro) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }
        res.send(createdCentro);

    });
});

/**UPDATE centro pelo id**/
router.put('/centro/:id', (req, res, next) => {

    var id = req.params.id;
    
    console.log("ID: "+id);

    Centro.findById(id, function (err, centro) {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            console.log(err);
        } else {
            //se não passar o nome, mantém o existente
            centro.nome = req.body.nome || centro.nome;
            centro.save(function (err, centro) {
                if (err) {
                    res.status(500).send("Erro interno do Servidor");
                    console.log(err);
                }
                res.send(centro);
            });
        }
    });
});


/**Deletar pelo id**/
router.delete('/centro/:id', (req, res, next) => {

    var id = req.params.id;

    Centro.findByIdAndRemove(id, function (err, centro) {
        var response = {
            message: "Centro deletado com sucesso",
            nome: centro.nome,
            id: centro._id
        };

        if (err) {
            console.log(err);
            res.status(500).send("Erro interno do servidor");
        }
        res.send(response);
    });
});


module.exports = router;
