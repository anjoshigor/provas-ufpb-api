const fs = require('fs');
var ProvaSchema = require('../../business/schemas/provaSchema');

class ProvaMongoORM {
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
}
module.exports = ProvaMongoORM;