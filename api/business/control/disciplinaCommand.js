class DisciplinaCommand {
  constructor(orm) {
    this._disciplinaOrm = orm;
  }
  
  get(req, res) {
    this._disciplinaOrm.get(req, res);
  }

  add(req, res) {
    this._disciplinaOrm.add(req, res);
  }

  delete(req, res) {
    this._disciplinaOrm.delete(req, res);
  }

  update(req, res) {
    this._disciplinaOrm.update(req, res);
  }
}
module.exports = DisciplinaCommand;