var ormDic = require('../../util/ormDic');

class OrmProxy {
    constructor() {
        this._orm = null;
    }

    setOrm(string) {
        this._orm = ormDic[string];
    }

    add(req, res) {
        if (req.headers.token === null || req.headers.token !== 'mps10') {
            var response = {};
            response.message = "Token inválido";
            response.token = req.headers.token || '';
            res.send(response);
        } else {
            this._orm.add(req, res);
        }
    }

    delete(req, res) {
        if (req.headers.token === null || req.headers.token !== 'mps10') {
            var response = {};
            response.message = "Token inválido";
            response.token = req.headers.token || '';
            res.send(response);
        } else {
            this._orm.delete(req, res);
        }
    }

    get(req, res) {
        this._orm.get(req, res);
    }

    getById(req, res) {
        this._orm.getById(req, res);
    }

    update(req, res) {
        if (req.headers.token === null || req.headers.token !== 'mps10') {
            var response = {};
            response.message = "Token inválido";
            response.token = req.headers.token || '';
            res.send(response);
        } else {
            this._orm.update(req, res);
        }

    }
}

module.exports = OrmProxy;