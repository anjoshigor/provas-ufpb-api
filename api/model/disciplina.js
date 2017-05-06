var mongoose = require('mongoose');

var disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    departamento: { type: String, required: true }
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);  