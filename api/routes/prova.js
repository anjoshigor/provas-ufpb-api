var express = require('express');
var multer = require('multer');
var router = express.Router();
var Prova = require('../model/prova');


/*** MULTER CONFIG **/
var storageLimbo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/ufpb/limbo')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf');
    }
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/ufpb/repository')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf');
    }
})


var filter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        console.log("não é pdf");
        cb(new Error('Não é pdf!'))
    } else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
}

var upload = multer({ storage: storageLimbo, fileFilter: filter }).single('pdf');

/***MULTER CONFIG***/


/**ADD prova**/
router.post('/prova', (req, res, next) => {

    upload(req, res, (err) => {
        if (err) {
            res.send(err.message);
        }


        var received = {
            "periodo": req.body.periodo || '',
            "pontos": 0,
            "tipo": req.body.tipo || 'Normal',
            "dateUploaded": Date.now(),
            "disciplina": {
                "nome": req.body.disciplina || '',
                "departamento": req.body.departamento || ''
            },
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


        var newProva = new Prova(received);

        newProva.save((err, createdProva) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erro interno do servidor");
            }

            res.send(createdProva);
        });


    });

});


/**Get provas classificadas**/
router.get('/provas', (req, res, next) => {
    var query = req.query;
    var filter = {};

    console.log(filter);

    //test if it has query
    if (Object.keys(query).length !== 0) {

        //test if the query is not complete
        var disciplina = query.disciplina || '';

        filter = {
            "disciplina": {
                "nome": new RegExp('.*' + disciplina + '.*', "i"),
            }
        };

    }

    Prova.find(filter, '-__v', (err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {
            res.send(provas);
        }
    }).where('pontos').gt(2);

});


/**Get uma prova pra classificar**/
router.get('/classify/prova', (req, res, next) => {
    var query = req.query;
    var filter = {};

    Prova.find(filter, '-__v', (err, provas) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Erro interno no servidor");
        } else {

            var chosen =Math.floor(Math.random() * provas.length) + 0;  

            res.send(provas[chosen]);
        }
    }).where('pontos').lt(3);

});


module.exports = router;
