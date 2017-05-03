var Report = require('./report');
var fs = require('fs');

class ReportFile extends Report {
    constructor(){
        super();
    }

    save(data){
        var datetime = new Date().toJSON().slice(0,10)+ "-" + new Date(new Date()).toString().split(' ')[4];

        var path = './reports/'+datetime+'.txt';
        fs.writeFileSync(path, data);
        //retorna apenas o caminho
        return path;
    }


}

module.exports = ReportFile;