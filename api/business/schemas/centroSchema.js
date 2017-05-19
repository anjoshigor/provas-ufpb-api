var mongoose = require('mongoose');

var centroSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Centro', centroSchema);  