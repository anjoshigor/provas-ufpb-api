var Report = require('./report');
var fs = require('fs');
var PDFDocument = require('pdfkit');

class ReportPDF extends Report {
    constructor() {
        super();
    }

    save(data) {
        
        var datetime = new Date().toJSON().slice(0, 10) + "-" + new Date(new Date()).toString().split(' ')[4];
        var path = './reports/' + datetime + '.pdf';
        
        //estilo do pdf
        var pdf = new PDFDocument({
            size: 'LEGAL',
            info: {
                Title: 'Report of' + ' datetime',
                Author: 'Admin',
            }
        });

        // Diz onde será escrito
        var stream = fs.createWriteStream(path);
        pdf.pipe(stream);

        // Insere os dados
        pdf.text(data);

        
        // Fecha o pdf
        pdf.end();
     
        //retorna o caminho e o stream para ser verificado
        return {path, stream};
    }


}

module.exports = ReportPDF;