var fs = require('fs');
var db = require('../database.json');

function load() {
	return new Map(db);
}

function save(map) {
	console.log(map);
	var file = 'database.json';
    json = JSON.stringify([...map]); //convertendo para json
    if(fs.existsSync(file)){
    	fs.writeFileSync(file, json, 'utf8'); // escrevendo no arquivo 
    }
}

module.exports = { load: load, save: save };
