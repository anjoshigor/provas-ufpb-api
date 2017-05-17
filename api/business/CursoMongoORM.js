var Curso = require('../model/curso');

class CursoMongoORM {
    constructor() {
    }

    add(curso, res) {
        var newCurso = new Curso(curso);
        
        newCurso.save((err, createdCurso) => {

            if (err) {
                res.status(500).send("Erro interno do servidor!");
            }
            console.log(createdCurso);
            res.send(createdCurso);
        });

    }
}

module.exports = CursoMongoORM;