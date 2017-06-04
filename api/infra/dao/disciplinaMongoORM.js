
var DisciplinaSchema = require('../../business/schemas/disciplinaSchema');

class DisciplinaMongoORM {
    constructor() {
        this._disciplinaSchema = null;
    }
    get(req, res) {
        var query = req.query;
        var filter = {};
        var response = {};

        //test if it has query
        if (Object.keys(query).length !== 0) {

            //test if the query is not complete
            var nome = query.nome || '';

            filter = {
                "nome": new RegExp('.*' + nome + '.*', "i"),
            };
        }
        DisciplinaSchema.find(filter, '-__v', (err, disciplinas) => {
            if (err) {
                response.message = "Erro interno no servidor";
                response.pesquisa = req.query;

                console.log(err.message);
                res.status(500).send(response);
            }
            if (disciplinas.length === 0) {
                response.message = "Disciplina não encontrada";
                response.pesquisa = req.query;
                res.status(404).send(response);
            } else {
                res.send(disciplinas);
            }
        });
    }

    getById(req, res) {
        var id = req.params.id;
        var response = {};

        var query = DisciplinaSchema.findById(id, '-__v');
        query.exec((err, disciplina) => {
            if (err) {
                response.message = "Erro interno do servidor";
                console.log(err);
                res.status(500).send(response);
            } else if (disciplina) {
                res.send(disciplina);
            } else {
                response.message = "Disciplina não encontrado";
                response.parametros = req.params;
                res.status(404).send(response);
            }
        });
    }


    add(req, res) {
        var response = {};
        this._disciplinaSchema = new DisciplinaSchema(req.body);

        this._disciplinaSchema.save((err, createdDisciplina) => {
            if (err) {
                if (err.code === 11000) {
                    response.message = "Disciplina já existente";
                    response.disciplina = this._disciplinaSchema;
                    response.disciplina.__v = undefined;
                    response.disciplina._id = undefined;
                    res.status(409);
                } else {
                    response.message = "Erro interno no servidor";
                    res.status(500);
                }
                res.send(response);
            } else {
                response.message = "Disciplina adicionada com sucesso";
                response.disciplina = createdDisciplina;
                response.disciplina.__v = undefined;
                res.send(response);
            }
        });
    }

    update(req, res) {
        var id = req.params.id;
        var response = {};
        DisciplinaSchema.findById(id, (err, disciplina) => {
            if (err) {
                response.message = "Erro interno do servidor";
                console.log(err);
                res.status(500).send(response);
            } else if (!disciplina) {
                response.message = "Disciplina não encontrada";
                response.parametros = req.params;
                res.status(404).send(response);
            } else {
                //se não passar o nome, mantém o existente
                disciplina.nome = req.body.nome || disciplina.nome;
                disciplina.save(function (err, novaDisciplina) {
                    if (err) {
                        if (err.code === 11000) {
                            response.message = "Disciplina já existente";
                            response.disciplina = disciplina;
                            response.disciplina._id = undefined;
                            response.disciplina.__v = undefined;
                            res.status(409);
                        } else {
                            response.message = "Erro interno no servidor";
                            res.status(500);
                        }
                        res.send(response);
                    } else {
                        response.message = "Disciplina alterada com sucesso";
                        response.disciplina = novaDisciplina;
                        response.disciplina.__v = undefined;
                        res.send(response);
                    }
                });
            }
        });
    }

    delete(req, res) {
    var id = req.params.id;
    var response = {
      message: "Disciplina deletada com sucesso",
    };
    var query = DisciplinaSchema.findByIdAndRemove(id);
    query.exec((err, disciplina) => {
      if (err) {
        response.message = "Erro interno no servidor";
        console.log(err);
        res.status(500).send(response);
      } else if (disciplina) {
        response.disciplina = disciplina;
        response.disciplina.__v = undefined;
        res.send(response);
      } else {
        response.message = "Disciplina não encontrada";
        response.parametros = req.params;
        res.status(404).send(response);
      }
    });
  }


}
module.exports = DisciplinaMongoORM;