var CursoMongoORM =  require('./CursoMongoORM');

class ORMFactory{
    constructor(){

    }

    static getCursoMongoORM(){
        return new CursoMongoORM();
    }

}

module.exports = ORMFactory;