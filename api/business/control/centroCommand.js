class CentroCommand {
  constructor(orm) {
    this._centroOrm = orm;
  }
  
  get(req, res) {
    this._centroOrm.get(req, res);
  }

  add(req, res) {
    this._centroOrm.add(req, res);
  }

  delete(req, res) {
    this._centroOrm.delete(req, res);
  }

  update(req, res) {
    this._centroOrm.update(req, res);
  }
}
module.exports = CentroCommand;