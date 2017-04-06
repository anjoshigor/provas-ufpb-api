var fs = require('fs');

class UserDAO {
  const PATH = '../../database.json';

  load() {
    return new Map(JSON.parse(fs.readFileSync(PATH, 'utf-8')));
  }
  save(map) {
    fs.write(PATH, JSON.stringify(map), 'utf-8', function(err) {
      if(err) throw err;
    });
  }
}
module.exports = UserDAO;
