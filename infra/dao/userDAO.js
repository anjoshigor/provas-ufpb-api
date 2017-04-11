var fs = require('fs');
var db = require('../../database.json');
var IOError = require('../error').IOError;


function load() {
	return new Map(db);
}

function save(map) {
	var file = 'database.json';
	json = JSON.stringify([...map]); //convertendo para json
		
	if (fs.existsSync(file)) {
		try {
			fs.writeFileSync(file, json, 'utf8'); // escrevendo no arquivo 
		} catch (error) {
			console.log(error.stack);
			throw new IOError('Erro na escrita do arquivo');
		}
	} else {
		//criar arquivo
		throw new IOError("Arquivo não encontrado");
	}
}

module.exports = { load: load, save: save };
