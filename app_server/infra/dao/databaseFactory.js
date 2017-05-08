var FileDatabase = require('./fileDatabase');

class DatabaseFactory {
  constructor() {
    if(new.target === dbFactory)
      throw new TypeError("Cannot construct Abstract instances directly");
  }

  static getFileDB() {
    return new FileDatabase('./database.json');
  }
  
  static getMongoDB() {
    return null;
  }
}

module.exports = DatabaseFactory;