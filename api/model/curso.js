/** verificar a necessidade de dependencias**/

var mongoose = require('mongoose');

var cursoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    centro: { type: String, required: true}
});

mongoose.model('Curso', cursoSchema);  