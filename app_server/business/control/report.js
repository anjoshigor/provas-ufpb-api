var UserDAO = require('../../infra/dao/userDAO');
var FileFactory = require('../../infra/dao/fileFactory');

class Report {
    constructor() {
        if (new.target === Report) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    save(data) {
        throw new TypeError("Cannot use Abstract methods directly! You must Override!");
    }

    generate() {
        var user = new UserDAO(new FileFactory().getDb());
        var users = user.getUsers();
        var data = '';
        var path = '';
        for (var [key, value] of users) {
            data += key + " " +value+"\n";
        }
        return this.save(data);
    }


}

module.exports = Report;