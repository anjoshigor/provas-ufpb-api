class ProvaCommand {
  constructor(proxy) {
    this._provaProxy = proxy;
    proxy.setOrm('prova');
  }

  get(req, res) {
    this._provaProxy.get(req, res);
  }

  getById(req, res) {
    this._provaProxy.getById(req, res);
  }

  add(req, res) {
    this._provaProxy.add(req, res);
  }

  delete(req, res) {
    this._provaProxy.delete(req, res);
  }

  update(req, res) {
    this._provaProxy.update(req, res);
  }
}
module.exports = ProvaCommand;