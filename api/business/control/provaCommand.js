class ProvaCommand {
  constructor(orm) {
    this._provaOrm = orm;
  }

  get(req, res) {
    this._provaOrm.get(req, res);
  }

  getById(req, res) {
    this._provaOrm.getById(req, res);
  }

  add(req, res) {
    this._provaOrm.add(req, res);
  }

  delete(req) {
    this._provaOrm.delete(req, res);
  }

  update(req) {
    this._provaOrm.update(req, res);
  }
}
module.exports = ProvaCommand;