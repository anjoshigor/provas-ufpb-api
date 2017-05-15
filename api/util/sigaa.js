var fetch = require('node-fetch');
var Curso = require('../model/curso');
var Centro = require('../model/centro');
var Disciplina = require('../model/disciplina');

/** Class to communicate with sigaa api from: cursos-ufpb.herokuapp.com**/
class Sigaa {
    constructor() {

    }

    static getAllCursos() {

        fetch("https://cursos-ufpb.herokuapp.com/api/curricula")
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json + "FIM");
                var curso = json.curricula;

                for (var i in curso) {

                    console.log(curso[i].name);
                    console.log(curso[i].faculty);


                    var newCurso = new Curso(
                        {
                            nome: curso[i].name,
                            centro: curso[i].faculty
                            //centro: new Centro({nome: curso[i].faculty})
                        }
                    );

                    newCurso.save((err, curso) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(curso + "adicionado com sucesso");
                    });

                }

            });
    }

    static getAllCentros() {

        fetch("https://cursos-ufpb.herokuapp.com/api/curricula")
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json + "FIM");
                var curso = json.curricula;

                for (var i in curso) {

                    console.log(curso[i].faculty);

                    var newCentro = new Centro(
                        {
                            nome: curso[i].faculty
                        }
                    );

                    newCentro.save((err, centro) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(centro + "adicionado com sucesso");
                    });

                }

            });
    }

    static getAllDisciplinas() {


        fetch("https://cursos-ufpb.herokuapp.com/api/curricula")
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                var doc = json.curricula;

                for (var i in doc) {
                    var cursoId = doc[i].id;

                    fetch("https://cursos-ufpb.herokuapp.com/api/curricula/" + cursoId)
                        .then((res) => {
                            return res.json();
                        }).then((json) => {

                            var disciplinas = json.curriculum.courses;

                            for (var j in disciplinas) {

                                new Disciplina({ nome: disciplinas[j].name }).save((err, disciplina) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(disciplina + " adicionada com sucesso");
                                    }
                                });
                            }

                        })

                }

            });

    }
}

module.exports = Sigaa;


