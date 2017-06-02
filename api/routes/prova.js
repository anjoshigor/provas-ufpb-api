var express = require('express');
var multer = require('multer');
var router = express.Router();
var Prova = require('../business/schemas/provaSchema');
var Curso = require('../business/schemas/cursoSchema');
var Disciplina = require('../business/schemas/disciplinaSchema');
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
            "disciplina": req.body.disciplina || '',
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
            createdProva.pdf = undefined;
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
    var filters = req.query;

    var query = Prova.find(filters, '-__v -pontos -pdf');
    query.where('pontos').gt(2);

    query.exec((err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        }
        if (provas === null) {
            res.status(401).send("Provas não encontradas");
        }
        else {
            res.send(provas);
        }
    });

});

/**Get provas por curso**/
router.get('/provas/curso/:id', (req, res, next) => {
    var idCurso = req.params.id;

    var queryCurso = Curso.findById(idCurso, 'nome centro');
    queryCurso.exec((err, foundCurso) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }

        if (foundCurso) {

            var novoCurso = {
                nome: foundCurso.nome,
                centro: foundCurso.centro
            }

            var filter = {
                curso: novoCurso
            }

            console.log(filter);
            /** Procura o curso**/
            var queryProva = Prova.find(filter, '-__v -pdf -pontos');
            queryProva.where('pontos').gt(2);
            queryProva.exec((err, provas) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Erro interno no servidor");
                }
                if (provas === null) {
                    res.status(401).send("Provas não encontradas");
                } else {
                    res.send(provas);
                }
            });

        } else {
            res.send("Curso não encontrado");
        }

    });


});

/**Get provas por disciplina**/
router.get('/provas/disciplina/:id', (req, res, next) => {
    var idDisciplina = req.params.id;

    var queryDisciplina = Disciplina.findById(idDisciplina, 'nome');
    queryDisciplina.exec((err, foundDisciplina) => {
        if (err) {
            console.log(err);
            res.send("Erro interno do servidor");
        }

        if (foundDisciplina) {
            var filter = {};
            filter.disciplina = foundDisciplina.nome;
            console.log(filter);
            var queryProva = Prova.find(filter, '-__v -pdf -pontos');
            queryProva.where('pontos').gt(2);
            queryProva.exec((err, provas) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Erro interno no servidor");
                }
                if (provas === null) {
                    res.status(401).send("Provas não encontradas");
                } else {
                    res.send(provas);
                }
            });

        } else {
            res.send("Disciplina não encontrada");
        }

    });


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

/**Get últimas provas adicionada**/
router.get('/provas/latest/', (req, res, next) => {
    var query = Prova.find({});
    query.where('pontos').gt(2);
    query.sort({ dateUploaded: 'desc' });
    query.limit(10);
    query.exec((err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        }
        if (provas === null) {
            res.status(401).send("Prova não encontrada");
        } else {
            res.send(provas);
        }
    });
});

/**Delete uma prova**/
router.delete('/prova/:id', (req, res, next) => {
    new APIManager().delete(req, res, Factory.getProvaMongoORM());
});

module.exports = router;
