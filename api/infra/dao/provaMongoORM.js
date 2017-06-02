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
                        if (err.code !== 'ENOENT'){
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