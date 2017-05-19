var CentroSchema = require('../../business/schemas/centroSchema');

class CentroMongoORM {
  constructor(){
    this._centroSchema = null;
  }
  
  add(req, res) {
    this._centroSchema = new CentroSchema(req.body);
    
    this._centroSchema.save((err, createdCentro) => {
      if (err) {
        res.status(500).send("Erro interno do servidor!");
      }
      console.log(createdCentro);
      res.send(createdCentro);
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
        response.message = "Centro não encontrado";
      }
      res.send(response);
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
    
    console.log("ID: "+id);

    Centro.findById(id, function (err, centro) {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            console.log(err);
        } else {
            //se não passar o nome, mantém o existente
            centro.nome = req.body.nome || centro.nome;
            centro.save(function (err, centro) {
                if (err) {
                    res.status(500).send("Erro interno do Servidor");
                    console.log(err);
                }
                res.send(centro);
            });
        }
    });
  }
}
module.exports = CentroMongoORM;