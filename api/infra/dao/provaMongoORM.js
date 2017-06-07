const fs = require('fs');
var ProvaSchema = require('../../business/schemas/provaSchema');

class ProvaMongoORM {
    add(req, res) {
        var response = {};

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

        var newProva = new ProvaSchema(received);

        newProva.save((err, createdProva) => {
            if (err) {
                if (err.name = 'ValidationError') {
                    response.message = "Erro nos parametros da requisição";
                    response.requisicao = req.body;
                    response.requisicao.pdf = req.file.originalname;
                    res.status(400);
                } else {
                    response.message = "Erro interno no servidor";
                    console.log(err);
                    res.status(500);
                }
                res.send(response);
            } else {
                createdProva.pdf = undefined;
                createdProva.__v = undefined;
                createdProva.pontos = undefined;
                res.send(createdProva);
            }
        });


    }

    get(req, res) {
        var filters = req.query;
        var response = {};

        var query = ProvaSchema.find(filters, '-__v -pontos -pdf');
        query.where('pontos').gt(2);
        query.exec((err, provas) => {
            if (err) {
                response.message = "Erro interno no servidor";
                console.log(err.message);
                res.status(500).send(response);
            } else if (provas.length > 0) {
                res.send(provas);
            } else {
                response.message = "Provas não encontradas";
                response.pesquisa = req.query;
                res.status(404).send(response);
            }
        });
    }

    getById(req, res) {
        var id = req.params.id;
        var response = {};

        var query = ProvaSchema.findById(id, '-__v -pontos -pdf');
        query.where('pontos').gt(2);
        query.exec((err, prova) => {
            if (err) {
                response.message = "Erro interno do servidor";
                console.log(err);
                res.status(500).send(response);
            } else if (prova) {
                res.send(prova);
            } else {
                response.message = "Prova não encontrada";
                response.parametros = req.params;
                res.status(404).send(response);
            }
        });
    }
    delete(req, res) {
        var id = req.params.id;

        ProvaSchema.findByIdAndRemove(id, function (err, prova) {
            var response = {
                message: "Prova deletada com sucesso",
            };

            if (err) {
                console.log(err);
                res.status(500).send("Erro interno do servidor");
            }

            if (prova) {
                response.disciplina = prova.disciplina;
                response.periodo = prova.periodo;
                response.id = prova._id;
                console.log(prova);

                fs.unlink(prova.pdf.path, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Erro interno do servidor");
                    } else {
                        res.send(response);
                    }
                });

            } else {
                response.message = "Prova não encontrada";
                res.send(response);
            }
        });
    }

    update(req, res) {
        var id = req.params.id;

        ProvaSchema.findById(id, function (err, prova) {
            if (err) {
                res.status(500).send("Erro interno do servidor");
                console.log(err);
            } else {

                //test pdf file
                if (req.file !== undefined) {

                    try {
                        fs.unlinkSync(prova.pdf.path);
                    } catch (err) {
                        if (err.code !== 'ENOENT') {
                            console.log(err);
                            throw (err);
                        }
                    }

                    prova.pdf.filename = req.file.filename || prova.pdf.filename;
                    prova.pdf.path = req.file.path || prova.pdf.path;
                    prova.pdf.size = req.file.size || prova.pdf.size;
                }

                prova.tipo = req.body.tipo || prova.tipo;
                prova.periodo = req.body.periodo || prova.periodo;
                prova.disciplina = req.body.disciplina || prova.disciplina;
                prova.curso.nome = req.body.curso || prova.curso.nome;
                prova.curso.centro = req.body.centro || prova.curso.centro;

                prova.save(function (err, prova) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Erro interno do Servidor");
                    }
                    res.send(prova);
                });
            }
        });
    }
}
module.exports = ProvaMongoORM;