var fs = require('fs');
var db = require('../database.json');

function load() {
  return new Map(db);
}

function save(map) {
  // fs.write('../database.json', JSON.stringify(map), 'utf-8', (err) => {
  //   if(err) throw err;
  // });
}

module.exports = { load: load, save: save };
