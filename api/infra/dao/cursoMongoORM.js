var CursoSchema = require('../../business/schemas/cursoSchema');

class CursoMongoORM {
  constructor() {
    this._cursoSchema = null;
  }

  add(req, res) {
    var response = {};
    this._cursoSchema = new CursoSchema(req.body);

    this._cursoSchema.save((err, createdCurso) => {
      if (err) {
        if (err.code === 11000) {
          response.message = "Curso já existente";
          response.curso = this._cursoSchema;
          response.curso.__v = undefined;
          response.curso._id = undefined;
          res.status(409);
        } else {
          response.message = "Erro interno no servidor";
          res.status(500);
        }
        res.send(response);
      } else {
        response.message = "Curso adicionado com sucesso";
        response.curso = createdCurso;
        response.curso.__v = undefined;
        res.send(response);
      }
    });
  }

  delete(req, res) {
    var id = req.params.id;
    var response = {
      message: "Curso deletado com sucesso",
    };
    var query = CursoSchema.findByIdAndRemove(id);
    query.exec((err, curso) => {
      if (err) {
        response.message = "Erro interno no servidor";
        console.log(err);
        res.status(500).send(response);
      } else if (curso) {
        response.curso = curso;
        response.curso.__v = undefined;
        res.send(response);
      } else {
        response.message = "Curso não encontrado";
        response.parametros = req.params;
        res.status(404).send(response);
      }
    });
  }

  get(req, res) {
    var query = req.query;
    var filter = {};
    var response = {};

    //test if it has query
    if (Object.keys(query).length !== 0) {

      //test if the query is not complete
      var nome = query.nome || '';
      var centro = query.centro || '';

      filter = {
        "nome": new RegExp('.*' + nome + '.*', "i"),
        "centro": new RegExp('.*' + centro + '.*', "i")
      };
    }
    console.log(query);
    console.log(filter);

    CursoSchema.find(filter, '-__v', (err, cursos) => {
      if (err) {
        response.message = "Erro interno no servidor";
        response.pesquisa = req.query;

        console.log(err.message);
        res.status(500).send(response);
      }
      if (cursos.length === 0) {
        response.message = "Curso não encontrado";
        response.pesquisa = req.query;
        res.status(404).send(response);
      } else {
        res.send(cursos);
      }
    });
  }

  getById(req, res) {
    var id = req.params.id;
    var response = {};

    var query = CursoSchema.findById(id, '-__v');
    query.exec((err, curso) => {
      if (err) {
        response.message = "Erro interno do servidor";
        console.log(err);
        res.status(500).send(response);
      } else if (curso) {
        res.send(curso);
      } else {
        response.message = "Curso não encontrado";
        response.parametros = req.params;
        res.status(404).send(response);
      }
    });
  }
  
  update(req, res) {
    var id = req.params.id;
    var response = {};
    CursoSchema.findById(id, (err, curso) => {
      if (err) {
        response.message = "Erro interno do servidor";
        console.log(err);
        res.status(500).send(response);
      } else if (!curso) {
        response.message = "Curso não encontrado";
        response.parametros = req.params;
        res.status(404).send(response);
      } else {
        //se não passar o nome nem o centro, mantém os existentes
        curso.nome = req.body.nome || curso.nome;
        curso.centro = req.body.centro || curso.centro;
        curso.save(function (err, novoCurso) {
          if (err) {
            if (err.code === 11000) {
              response.message = "Curso já existente";
              response.curso = curso;
              response.curso._id = undefined;
              response.curso.__v = undefined;
              res.status(409);
            } else {
              response.message = "Erro interno no servidor";
              res.status(500);
            }
            res.send(response);
          } else {
            response.message = "Curso alterado com sucesso";
            response.curso = novoCurso;
            response.curso.__v = undefined;
            res.send(response);
          }
        });
      }
    });
  }
}
module.exports = CursoMongoORM;