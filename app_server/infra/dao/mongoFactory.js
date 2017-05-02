var dbFactory = require('dbFactory');

class mongoFactory extends dbFactory{
    constructor(){
        super();
    }
    getDb(){
        return null;
    }
} 

module.exports = mongoFactory;