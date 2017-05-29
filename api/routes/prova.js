var express = require('express');
var multer = require('multer');
var router = express.Router();
var Prova = require('../business/schemas/provaSchema');
var Factory = require('../util/ormFactory');
var APIManager = require('../business/control/apiManager');
var ProvaCommand = require('../business/control/provaCommand');
var fs = require('fs');

/*** MULTER CONFIG **/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/ufpb/repository')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf');
    }
})

var filter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        console.log("não é pdf");
        cb(new Error('Não é pdf!'))
    } else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
}

var upload = multer({ storage: storage, fileFilter: filter }).single('pdf');

/***MULTER CONFIG***/

/**ADD prova**/
router.post('/prova', (req, res, next) => {

    upload(req, res, (err) => {
        if (err) {
            res.send(err.message);
        }


        var received = {
            "periodo": req.body.periodo || '',
            "pontos": 0,
            "tipo": req.body.tipo || 'Normal',
            "dateUploaded": Date.now(),
            "disciplina": {
                "nome": req.body.disciplina || '',
                "departamento": req.body.departamento || ''
            },
            "curso": {
                "nome": req.body.curso || '',
                "centro": req.body.centro
            },
            "pdf": {
                "filename": req.file.filename,
                "path": req.file.path,
                "size": req.file.size
            }
        }


        var newProva = new Prova(received);

        newProva.save((err, createdProva) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erro interno do servidor");
            }

            res.send(createdProva);
        });


    });

});


/**ADD +1 ponto**/
router.put('/classify/:id/add', (req, res, next) => {
    var id = req.params.id;

    var query = Prova.findById(id);
    query.where('pontos').lt(3);

    query.exec((err, prova) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        }
        if (prova === null) {
            res.status(401).send("Prova não encontrada");
        }
        else {
            prova.pontos++;
            prova.save((err, prova) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Erro interno do servidor");
                }

                res.send(prova);
            });
        }
    });

});

/**ADD -1 ponto**/
router.put('/classify/:id/sub', (req, res, next) => {
    var id = req.params.id;

    var query = Prova.findById(id);
    query.where('pontos').lt(3);
    query.exec((err, prova) => {

        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        }

        if (prova === null) {
            res.status(401).send("Prova não encontrada");

        } else {
            prova.pontos--;
            prova.save((err, prova) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Erro interno do servidor");
                }
                res.send(prova);
            });
        }
    });

});

/**UPDATE prova*/
router.put('/prova/:id', (req, res, next) => {
    upload(req, res, (err) => {
        new APIManager().update(req, res, Factory.getProvaMongoORM());
    });
});

/**Get provas **/
router.get('/provas', (req, res, next) => {
    var query = req.query;
    var filter = {};

    console.log(filter);

    //test if it has query
    if (Object.keys(query).length !== 0) {

        //test if the query is not complete
        var disciplina = query.disciplina || '';

        filter = {
            "disciplina": {
                "nome": new RegExp('.*' + disciplina + '.*', "i"),
            }
        };

    }

    Prova.find(filter, '-__v -pontos -pdf', (err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(provas);
        }
    }).where('pontos').gt(2);

});

/**Get download prova**/
router.get('/download/prova/:id', (req, res, next) => {
    var id = req.params.id;

    Prova.findById(id, (err, prova) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            fs.stat(prova.pdf.path, (err, stat) => {
                if (err == null) {
                    res.download(prova.pdf.path);
                } else if (err.code == 'ENOENT') {
                    Prova.findByIdAndRemove(id, (err, prova) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Erro interno do servidor");
                        }
                        res.status(401).send("Prova não encontrada");
                    });
                } else {
                    res.status(500).send("Erro interno no servidor");
                }
            });
        }
    }).where('pontos').gt(2);

});


/**Get uma prova aleatoria pra classificar**/
router.get('/classify/prova', (req, res, next) => {
    var query = req.query;
    var filter = {};

    Prova.find(filter, '-__v -pdf', (err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {

            var chosen = Math.floor(Math.random() * provas.length)
            res.send(provas[chosen]);
        }
    }).where('pontos').lt(3);

});

/**Get provas pra classificar**/
router.get('/classify/provas', (req, res, next) => {
    var query = req.query;
    var filter = {};

    Prova.find(filter, '-__v -pdf', (err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(provas);
        }
    }).where('pontos').lt(3);

});

/**Get download prova pra classificar**/
router.get('/download/prova/classify/:id', (req, res, next) => {
    var id = req.params.id;
    var query = Prova.findById(id);
    query.where('pontos').lt(3);
    query.exec((err, prova) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        }
        if (prova === null) {
            res.status(401).send("Prova não encontrada");
        } else {
            fs.stat(prova.pdf.path, (err, stat) => {
                if (err == null) {
                    res.download(prova.pdf.path);
                } else if (err.code == 'ENOENT') {
                    Prova.findByIdAndRemove(id, (err, prova) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Erro interno do servidor");
                        }
                        res.status(401).send("Prova não encontrada");
                    });
                } else {
                    res.status(500).send("Erro interno no servidor");
                }
            });
        }
    });
});

router.delete('/prova/:id', (req, res, next) => {
    new APIManager().delete(req, res, Factory.getProvaMongoORM());
});

module.exports = router;
