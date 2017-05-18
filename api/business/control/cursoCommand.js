class CursoCommand {
  constructor(orm) {
    this._cursoOrm = orm;
  }
  
  get(req, res) {
    this._cursoOrm.get(req, res);
  }

  add(req, res) {
    this._cursoOrm.add(req, res);
  }

  delete(req, res) {
    this._cursoOrm.delete(req, res);
  }

  update(req, res) {
    this._cursoOrm.update(req, res);
  }
}
module.exports = CursoCommand;