var UserDAO = require('../../infra/dao/userDAO');
var DatabaseFactory = require('../../infra/dao/databaseFactory');

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
    var user = new UserDAO(DatabaseFactory.getFileDB());
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