var Factory = require('./ormFactory');

var ormDic = {
   "prova": Factory.getProvaMongoORM(),
   "centro": Factory.getCentroMongoORM(),
   "disciplina": Factory.getDisciplinaMongoORM(),
   "curso": Factory.getCursoMongoORM()
  }

module.exports = ormDic;