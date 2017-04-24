
class Database {
	constructor(){
		if(new.target === Database){
			throw new TypeError("Cannot construct Abstract instances directly");
		}
	}
	getAll(){
		throw new TypeError("Cannot call Abstract methods directly");
	}
	
	add(user){
		throw new TypeError("Cannot call Abstract methods directly");
	}
		
	delete(user){
		throw new TypeError("Cannot call Abstract methods directly");
	}
	
	get(user){
		throw new TypeError("Cannot call Abstract methods directly");
	}
	
}

module.exports = Database;