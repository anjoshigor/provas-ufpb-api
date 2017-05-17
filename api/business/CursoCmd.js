
class CursoCmd {
    constructor(orm) {
        this.cursoOrm = orm;
    }

    get(req) {
        this.cursoOrm.get(req);
    }

    add(req, res) {
        this.cursoOrm.add(req, res);
    }

    delete(req) {
        this.cursoOrm.delete(req);
    }

    update(req) {
        this.cursoOrm.update(req);
    }
}

module.exports = CursoCmd;