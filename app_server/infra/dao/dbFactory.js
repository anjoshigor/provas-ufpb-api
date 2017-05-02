class dbFactory{

    constructor(){
        if(new.target === dbFactory){
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }
    getDb(){
        throw new TypeError("Cannot call Abstract methods directly");
    }
}

module.exports = dbFactory;