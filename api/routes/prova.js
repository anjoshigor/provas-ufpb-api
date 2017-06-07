var express = require('express');
var multer = require('multer');
var router = express.Router();
var Prova = require('../business/schemas/provaSchema');
var Curso = require('../business/schemas/cursoSchema');
var Disciplina = require('../business/schemas/disciplinaSchema');
var Factory = require('../util/ormFactory');
var OrmProxy = require('../business/control/ormProxy');
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
    new APIManager().get(req, res, new ProvaCommand(new OrmProxy()));

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
    new APIManager().getById(req, res, new ProvaCommand(new OrmProxy()));
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

/**
 * @api {post} /prova/ ADD Prova
 * @apiName AddProva
 * @apiGroup Provas
 * @apiParam {file} [pdf] Arquivo em formato pdf
 * @apiDescription Adiciona uma nova prova
 * @apiExample {curl} Exemplo de uso
 curl -X POST \
  http://localhost:3000/api/v1/prova \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: a6401243-015b-c8d8-0c50-8aef4dc160d1' \
  -F pdf=@Prova1BD_UFPB_2005.2.doc.pdf \
  -F periodo=2005.2 \
  -F 'disciplina=BANCO DE DADOS' \
  -F tipo=Normal \
  -F 'departamento=DEPARTAMENTO DE INFORMÁTICA' \
  -F 'centro=CENTRO DE INFORMÁTICA (CI) (11.00.64)' \
  -F 'curso=CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO'
 * @apiSampleRequest http://localhost:3000/api/v1/prova/
 * @apiSuccess {Prova} Prova Prova adicionada
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 {
  "message": "Prova adicionada com sucesso",
  "prova": {
    "periodo": "2005.2",
    "tipo": "Normal",
    "disciplina": "BANCO DE DADOS",
    "_id": "59374350d3b9670b4f239a68",
    "curso": {
        "nome": "CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO",
        "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)"
    },
    "dateUploaded": "2017-06-07T00:05:36.236Z"
  }
 }
 * @apiError {400} BadRequest Requisição inválida
 * @apiErrorExample {json} Exemplo de erro
 {
  "message": "Erro nos parametros da requisição",
  "requisicao": {
    "periodo": "2005.2",
    "tipo": "Normal",
    "centro": "CENTRO DE INFORMÁTICA (CI) (11.00.64)",
    "pdf": "Prova1BD_UFPB_2005.2.doc.pdf"
  }
 }
*/
router.post('/prova', (req, res, next) => {
    var response = {};

    upload(req, res, (err) => {
        if (err) {
            response.message = "Falha no upload do arquivo";
            console.log(err);
            res.status(500).send(response);
        } else {
            new APIManager().add(req, res, new ProvaCommand(new OrmProxy()));
        }
    });

});

/**
 * @api {post} /classify/:id/add ADD ponto para Prova
 * @apiName AddPointProva
 * @apiGroup Provas
 * @apiParam {Number} [id] Id da prova para ser atribuído ponto
 * @apiDescription Adiciona um ponto a uma prova
 * @apiExample {curl} Exemplo de uso

 * @apiSampleRequest http://localhost:3000/api/v1/classify/59376251a785d011175f19d9/add/
 * @apiSuccess {Prova} Prova Prova com ponto adicionado
 * @apiSuccessExample {json} Exemplo de corpo de resposta com sucesso
 Em construção
 * @apiError {400} BadRequest Requisição inválida
 * @apiErrorExample {json} Exemplo de erro
 Em construção
*/
router.put('/classify/:id/add', (req, res, next) => {
    var id = req.params.id;
    var response = {};

    var query = Prova.findById(id);
    query.where('pontos').lt(3);

    query.exec((err, prova) => {
        if (err) {
            response.message = "Erro interno no servidor";
            console.log(err.message);
            res.status(500).send(response);
        } else if (prova === null) {
            response.message = "Prova não encontrada";
            response.parametros = req.params;
            res.status(404).send(response);
        } else {
            prova.pontos++;
            prova.save((err, prova) => {
                if (err) {

                    response.message = "Erro interno no servidor";
                    console.log(err.message);
                    res.status(500).send(response);
                }
                response.message = "Ponto atribuído com sucesso";
                response.prova = prova;
                response.prova.pdf = undefined;
                response.prova.__v = undefined;
                res.send(response);
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
    var response = {};
    upload(req, res, (err) => {
        if (err) {
            response.message = "Falha no upload do arquivo";
            console.log(err);
            res.status(500).send(response);
        } else {
            new APIManager().update(req, res, new ProvaCommand(new OrmProxy()));
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

/**Delete uma prova**/
router.delete('/prova/:id', (req, res, next) => {
    new APIManager().delete(req, res, new ProvaCommand(new OrmProxy()));
});

module.exports = router;
