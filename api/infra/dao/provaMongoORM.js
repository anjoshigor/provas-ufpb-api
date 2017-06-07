const fs = require('fs');
var ProvaSchema = require('../../business/schemas/provaSchema');

class ProvaMongoORM {
    add(req, res) {
        var response = {};
        console.log(req.file);

        if (req.file === undefined) {
            response.message = "PDF não enviado";
            return res.status(400).send(response);
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
                response.message = "Erro interno no servidor";
                console.log(err);
                res.status(500).send(response);
            } else if (prova) {

                fs.unlink(prova.pdf.path, (err) => {
                    if (err) {
                        response.message = "Erro interno no servidor";
                        console.log(err);
                        res.status(500).send(response);
                    } else {
                        response.message = "Prova deletada com sucesso";
                        response.prova = prova;
                        response.prova.pdf = undefined;
                        response.prova.__v = undefined;
                        response.prova.pontos = undefined;
                        res.send(response);
                    }
                });

            } else {
                response.message = "Prova não encontrada";
                response.parametros = req.params;
                res.send(response);
            }
        });
    }

    update(req, res) {
        var id = req.params.id;
        var response = {};
        ProvaSchema.findById(id, (err, prova) => {
            if (err) {
                response.message = "Erro interno no servidor";
                res.status(500).send(response);
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
                        response.message = "Erro interno no servidor";
                        res.status(500).send(response);
                        console.log(err);
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

                prova.save((err, prova) => {
                    if (err) {
                        response.message = "Erro interno no servidor";
                        res.status(500).send(response);
                        console.log(err);
                    }
                    response.message = "Prova atualizada com sucesso";
                    response.prova = prova;
                    response.prova.__v = undefined;
                    response.prova.pontos = undefined;
                    response.prova.pdf = undefined;
                    res.send(response);
                });
            }
        });
    }
}
module.exports = ProvaMongoORM;