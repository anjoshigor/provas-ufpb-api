var CentroMongoORM =  require('../infra/dao/centroMongoORM');
var CursoMongoORM =  require('../infra/dao/cursoMongoORM');
var DisciplinaMongoORM =  require('../infra/dao/disciplinaMongoORM');
var ProvaMongoORM =  require('../infra/dao/provaMongoORM');

class ORMFactory {
  constructor() {
    if(new.target === ORMFactory)
      throw new TypeError("Cannot construct Abstract instances directly");
  }
  
  static getCentroMongoORM(){
    return new CentroMongoORM();
  }

  static getCursoMongoORM(){
    return new CursoMongoORM();
  }

  static getDisciplinaMongoORM(){
    return new DisciplinaMongoORM();
  }

  static getProvaMongoORM(){
    return new ProvaMongoORM();
  }
}
module.exports = ORMFactory;