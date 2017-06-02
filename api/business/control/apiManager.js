var SIGAA = require('../../util/sigaa');

class APIManager {
  constructor() { }

  initialize() {
    //está sendo chamada na conexao com mongo
    SIGAA.getAllCentros();
    SIGAA.getAllCursos();
    SIGAA.getAllDisciplinas();
  }

  get(req, res, cmd) {
    cmd.get(req, res);
  }

  getById(req, res, cmd) {
    cmd.getById(req, res);
  }
  add(req, res, cmd) {
    cmd.add(req, res);
  }

  delete(req, res, cmd) {
    cmd.delete(req, res);
  }

  update(req, res, cmd) {
    cmd.update(req, res);
  }
}

module.exports = APIManager;