class APIManager {
    constructor() {
    }

    get(req, cmd) {
        cmd.get(req);
    }

    add(req, res, cmd) {
        cmd.add(req, res);
    }

    delete(req, cmd) {
        cmd.delete(req);
    }

    update(req, cmd) {
        cmd.update(req);
    }
}

module.exports = APIManager;