var CentroSchema = require('../../business/schemas/centroSchema');

class CentroMongoORM {
  constructor() {
    this._centroSchema = null;
  }

  add(req, res) {
    var response = {};

    this._centroSchema = new CentroSchema(req.body);

    this._centroSchema.save((err, createdCentro) => {
      if (err) {
        if (err.code === 11000) {
          response.message = "Centro já existente";
          response.centro = this._centroSchema;
          response.centro.__v = undefined;
          res.status(409);
        } else {
          response.message = "Erro interno no servidor";
          res.status(500);
        }
        res.send(response);
      } else {
        response.message = "Centro adicionado com sucesso";
        createdCentro.__v = undefined;
        response.centro = createdCentro;
        res.send(response);
      }
    });

  }

  delete(req, res) {
    var id = req.params.id;

    CentroSchema.findByIdAndRemove(id, function (err, centro) {
      var response = {
        message: "Centro deletado com sucesso",
      };

      if (err) {
        console.log(err);
        res.status(500).send("Erro interno do servidor");
      }

      if (centro) {
        response.nome = centro.nome;
        response.id = centro._id;
      } else {
        response.parametros = req.params;
        response.message = "Centro não encontrado";
      }
      res.send(response);
    });
  }

  getById(req, res) {
    var id = req.params.id;
    var response = {};
    CentroSchema.findById(id, '-__v', (err, centro) => {
      if (err) {
        console.log(err.message);
        response.message = "Erro interno no servidor";
        res.status(500).send(response);
      } else {
        if (centro === null) {
          response.parametros = req.params;
          response.message = "Centro não encontrado";
          res.status(404).send(response);
        }
        res.send(centro);
      }
    });
  }

  get(req, res) {
    var nome = req.query.nome;
    var filter = {};

    if ("undefined" !== typeof nome) {
      filter = {
        "nome": new RegExp('.*' + nome + '.*', "i")
      };
    }

    console.log(nome);
    console.log(filter);

    CentroSchema.find(filter, '-__v', (err, centros) => {
      if (err) {
        console.log(err.message);
        res.status(500).send("Erro interno no servidor");
      } else {
        res.send(centros);
      }
    });
  }

  update(req, res) {
    var id = req.params.id;
    var response = {};
    CentroSchema.findById(id, (err, centro) => {
      if (err) {
        console.log(err);
        response.message = "Erro interno no servidor";
        res.status(500).send(response);
      } else {
        if (centro === null) {
          response.message = "Centro não encontrado";
          response.parametros = req.params;
          res.status(404).send(response);
        } else {
          //se não passar o nome, mantém o existente
          centro.nome = req.body.nome || centro.nome;
          centro.save((err, centro) => {
            if (err) {
              console.log(err);
              response.message = "Erro interno no servidor";
              res.status(500).send(response);
            } else {
              response.message = "Centro alterado com sucesso";
              centro.__v = undefined;
              response.centro = centro;
              res.send(response);
            }
          });
        }
      }
    });
  }
}
module.exports = CentroMongoORM;