/** verificar a necessidade de dependencias**/
var mongoose = require('mongoose');

var provaSchema = new mongoose.Schema({
    
    periodo: { type: String, required: true },
    pontos: { type: Number, default: 0 },
    tipo: { type: String, required: true }, //Normal, reposição, final
    dateUploaded: { type: Date, default: Date.now() },

    disciplina: {
        nome: { type: String, required: true },
        departamento: { type: String, required: true }
    },

    curso: {
        nome: { type: String, required: true },
        centro: { type: String, required: true }
    },

    pdf: {
        filename: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Prova', provaSchema);  