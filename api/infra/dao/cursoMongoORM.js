var CursoSchema = require('../../business/schemes/cursoScheme');

class CursoMongoORM {
  constructor() {
    this._cursoScheme = null;
  }
  
  add(curso, res) {
    this._cursoScheme = new CursoSchema(curso);
        
    this._cursoScheme.save((err, createdCurso) => {
      if (err) {
        res.status(500).send("Erro interno do servidor!");
      }
      console.log(createdCurso);
      res.send(createdCurso);
    });
  }

  delete(req, res) {
    var id = req.params.id;

    CursoSchema.findByIdAndRemove(id, function (err, curso) {

      var response = {
        message: "Curso deletado com sucesso",
      };

      if (err) {
        console.log(err);
        res.status(500).send("Erro interno do servidor");
      }

      if (curso) {

        response.nome = curso.nome;
        response.centro = curso.centro;
        response.id = curso._id;

      } else {
        response.message = "Curso não encontrado";
      }
      res.send(response);
    });
  }

  get(req, res) {
    var query = req.query;
    var filter = {};

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
        console.log(err.message);
        res.status(500).send("Erro interno no servidor");
      } else {
        res.send(cursos);
      }
    });
  }

  update(req, res) {
    var id = req.params.id;

    console.log("ID: " + id);

    CursoSchema.findById(id, function (err, curso) {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            console.log(err);
        } else {
            //se não passar o nome nem o centro, mantém os existentes
          curso.nome = req.body.nome || curso.nome;
          curso.centro = req.body.centro || curso.centro;
          curso.save(function (err, curso) {
            if (err) {
              res.status(500).send("Erro interno do Servidor");
              console.log(err);
            }
            res.send(curso);
          });
        }
    });
  }
}
module.exports = CursoMongoORM;