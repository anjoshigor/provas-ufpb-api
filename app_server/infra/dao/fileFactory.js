var dbFactory = require('./dbFactory');
var FileDatabase = require('./fileDatabase');

class fileFactory extends dbFactory{
    constructor(){
        super();
    }
    getDb(){
        return new FileDatabase('./database.json');
    }
}

module.exports = fileFactory;