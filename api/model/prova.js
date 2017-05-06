/** verificar a necessidade de dependencias**/
var mongoose = require('mongoose');

var provaSchema = new mongoose.Schema({
    disciplina: { type: String, required: true },
    curso: { type: String, required: true },
    periodo: { type: String, required: true },
    pontos: { type: Number, default: 0 },
    centro: { type: String, required: true },
    tipo: { type: String, required: true }, //Normal, reposição, final
    pdf: { type: Buffer, required: true },
    dateUploaded: { type: Date, default: new Date()}
});

mongoose.model('Prova', provaSchema);  