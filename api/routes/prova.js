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

/**
 * @api {get} /provas/ GET Todas as Provas
 * @apiName GetProvas
 * @apiGroup Provas
 * @apiDescription Retorna todas as provas cadastradas na base de dados
 * que estão dentro do padrão e já foram avaliadas
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/provas HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/provas
 * @apiSuccess {Prova[]} Prova Lista de Provas.
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "5930aaf6d817660e45dfb8eb",
    "periodo": "2005.2",
    "tipo": "Normal",
    "disciplina": "BANCO DE DADOS",
    "curso": {
      "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
      "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    },
    "dateUploaded": "2017-06-02T00:01:58.950Z"
  }
 ]
 * @apiError {404} ProvaNaoEncontrada Prova não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Prova não encontrada",
 }
*/
router.get('/provas', (req, res, next) => {
    new APIManager().get(req, res, new ProvaCommand(Factory.getProvaMongoORM()));

});

/**
 * @api {get} /prova/:id GET Prova pelo id
 * @apiName GetProvaById
 * @apiGroup Provas
 * @apiParam {Number} id Identificador da prova
 * @apiDescription Retorna a prova especificada pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/prova/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/prova/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Prova} Prova Prova requisitada
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "_id": "5930aaf6d817660e45dfb8eb",
  "periodo": "2005.2",
  "tipo": "Normal",
  "disciplina": "BANCO DE DADOS",
  "curso": {
    "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
  },
  "dateUploaded": "2017-06-02T00:01:58.950Z"
 }
 * @apiError {404} ProvaNaoEncontrada Prova não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Prova não encontrada",
  "parametros": {
    "id": "5930aaf6d817660e45dfb8e4"
  }
 }
*/
router.get('/prova/:id', (req, res, next) => {
    new APIManager().getById(req, res, new ProvaCommand(Factory.getProvaMongoORM()));
});

/**
 * @api {get} /provas/curso/:id GET todas as provas de um Curso
 * @apiName GetProvasByCurso
 * @apiGroup Provas
 * @apiParam {Number} id Identificador do curso
 * @apiDescription Retorna todas as provas de um curso especificado pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/provas/curso/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/provas/curso/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Provas[]} Prova Provas requisitadas
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "5930aaf6d817660e45dfb8eb",
    "periodo": "2005.2",
    "tipo": "Normal",
    "disciplina": "BANCO DE DADOS",
    "curso": {
      "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
      "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    },
    "dateUploaded": "2017-06-02T00:01:58.950Z"
  }
 ]
 * @apiError {404} ProvaNaoEncontrada Prova não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Prova não encontrada",
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  }
 }
 * @apiError {404} CursoNaoEncontrado Curso não foi encontrado
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Curso não encontrado",
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  }
 }
*/
router.get('/provas/curso/:id', (req, res, next) => {
    var idCurso = req.params.id;
    var response = {};
    var queryCurso = Curso.findById(idCurso, 'nome centro');
    queryCurso.exec((err, foundCurso) => {
        if (err) {
            response.message = "Erro interno do servidor";
            console.log(err);
            res.status(500).send(response);
        } else if (foundCurso) {

            var novoCurso = {
                nome: foundCurso.nome,
                centro: foundCurso.centro
            }

            var filter = {
                curso: novoCurso
            }

            /** Procura a prova**/
            var queryProva = Prova.find(filter, '-__v -pdf -pontos');
            queryProva.where('pontos').gt(2);
            queryProva.exec((err, provas) => {
                if (err) {
                    response.message = "Erro interno do servidor";
                    console.log(err);
                    res.status(500).send(response);
                } else if (provas.length === 0) {
                    response.message = "Provas não encontradas";
                    response.parametros = req.params;
                    res.status(404).send(response);
                } else {
                    res.send(provas);
                }
            });

        } else {
            response.message = "Curso não encontrado";
            response.parametros = req.params;
            res.status(404).send(response);
        }

    });


});


/**
 * @api {get} /provas/disciplina/:id GET todas as provas de uma Disciplina
 * @apiName GetProvasByDisciplina
 * @apiGroup Provas
 * @apiParam {Number} id Identificador da disciplina
 * @apiDescription Retorna todas as provas de uma disciplina especificada pelo id
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/provas/disciplina/590e6e53e08bc1524ddb0a63 HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/provas/disciplina/590e6e53e08bc1524ddb0a63
 * @apiSuccess {Provas[]} Prova Provas requisitadas
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "5930aaf6d817660e45dfb8eb",
    "periodo": "2005.2",
    "tipo": "Normal",
    "disciplina": "BANCO DE DADOS",
    "curso": {
      "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
      "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    },
    "dateUploaded": "2017-06-02T00:01:58.950Z"
  }
 ]
 * @apiError {404} ProvaNaoEncontrada Prova não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Prova não encontrada",
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  }
 }
 * @apiError {404} DisciplinaNaoEncontrada Disciplina não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Disciplina não encontrada",
  "parametros": {
    "id": "590e6aa53e08bc1524ddba63"
  }
 }
*/
router.get('/provas/disciplina/:id', (req, res, next) => {
    var idDisciplina = req.params.id;
    var response = {};
    var queryDisciplina = Disciplina.findById(idDisciplina, 'nome');
    queryDisciplina.exec((err, foundDisciplina) => {
        if (err) {
            response.message = "Erro interno no servidor";
            console.log(err);
            res.status(500).send(response);
        } else if (foundDisciplina) {
            var filter = {};
            filter.disciplina = foundDisciplina.nome;
            var queryProva = Prova.find(filter, '-__v -pdf -pontos');
            queryProva.where('pontos').gt(2);
            queryProva.exec((err, provas) => {
                if (err) {
                    response.message = "Erro interno no servidor";
                    console.log(err);
                    res.status(500).send(response);
                }
                if (provas.length === 0) {
                    response.message = "Provas não encontradas";
                    response.parametros = req.params;
                    res.status(404).send(response);
                } else {
                    res.send(provas);
                }
            });

        } else {
            response.message = "Disciplina não encontrada";
            response.parametros = req.params;
            res.send(response);
        }

    });


});


/**
 * @api {get} /provas/latest GET Últimas provas adicionadas
 * @apiName GetLatestProvas
 * @apiGroup Provas
 * @apiDescription Retorna as últimas 10 provas adicionadas
 * que estão dentro do padrão e já foram avaliadas
 * @apiExample {HTTP} Exemplo de uso
    GET /api/v1/provas/latest HTTP/1.1
 * @apiSampleRequest http://localhost:3000/api/v1/provas/latest
 * @apiSuccess {Prova[]} Prova Lista de Provas.
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 [
  {
    "_id": "5930aaf6d817660e45dfb8eb",
    "periodo": "2005.2",
    "tipo": "Normal",
    "disciplina": "BANCO DE DADOS",
    "curso": {
      "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
      "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    },
    "dateUploaded": "2017-06-02T00:01:58.950Z"
  }
 ]
 * @apiError {404} ProvaNaoEncontrada Prova não foi encontrada
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Provas não encontradas"
 }
*/
router.get('/provas/latest/', (req, res, next) => {
    var response = {};
    var query = Prova.find({}, '-__v -pontos -pdf');
    query.where('pontos').gt(2);
    query.sort({ dateUploaded: 'desc' });
    query.limit(10);
    query.exec((err, provas) => {
        if (err) {
            response.message = "Erro interno no servidor";
            console.log(err);
            res.status(500).send(response);
        }
        if (provas.length === 0) {
            response.message = "Provas não encontradas";
            res.status(404).send(response);
        } else {
            res.send(provas);
        }
    });
});


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

/**Delete uma prova**/
router.delete('/prova/:id', (req, res, next) => {
    new APIManager().delete(req, res, Factory.getProvaMongoORM());
});

module.exports = router;
