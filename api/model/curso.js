/** verificar a necessidade de dependencias**/

var mongoose = require('mongoose');

var cursoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    centro: { type: String, required: true}
    //centro: {type: ObjectId(), required: true}
});

module.exports = mongoose.model('Curso', cursoSchema);  