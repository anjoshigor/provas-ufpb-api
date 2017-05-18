class ProvaCommand {
  constructor(orm) {
    this._provaOrm = orm;
  }
  
  get(req) {
    this._provaOrm.get(req);
  }

  add(req, res) {
    this._provaOrm.add(req, res);
  }

  delete(req) {
    this._provaOrm.delete(req);
  }

  update(req) {
    this._provaOrm.update(req);
  }
}
module.exports = ProvaCommand;