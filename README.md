# provas-ufpb-api
Uma api de provas da universidade federal da paraíba


## Para testar

### Instale as dependencias:
```console
    npm install
```

### Inicie o mongodb

```console
    mongod
```

### Inicie o projeto

```console
    npm start
```

Abra `localhost:3000`, se a tela for renderizada no browser, tudo está funcionando.

### Testes unitários

```console
    npm test
```

## Padrões de Projeto Implementados

### Singleton

```js
var instance = null;

class UserDAO {

	constructor(database) {
		if (!instance) {
			instance = this;
		}

		this._database = database;
		return instance;

	}
```

### Adapter

```js
//userController.js
class UserController {
  constructor() {
    this._UserDAO = new UserDAO(DatabaseFactory.getFileDB());
  }

getAll() {
		//ler do arquivo
		try {
			var data = fs.readFileSync(this._filePath, 'utf8');
			this._map = new Map(JSON.parse(data));
			return this._map;
		} catch (error) {
			console.log(error);
			throw new IOError('Falha na leitura do arquivo ' + this._filePath);
		}

}
...

//userDao.js
var instance = null;

class UserDAO {

	constructor(database) {
		if (!instance) {
			instance = this;
		}
        //adapter
		this._database = database;
		return instance;

	}
...


//fileDatabase.js
class FileDatabase extends Database {

	constructor(filePath) {
		super();
		this._filePath = filePath;
		this._map = new Map();
	}
...

//database.js
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

```

### Template

```js
//report.js
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

//reportFile.js
class ReportFile extends Report {
    constructor(){
        super();
    }

    save(data){
        var datetime = new Date().toJSON().slice(0,10)+ "-" + new Date(new Date()).toString().split(' ')[4];

        var path = './reports/'+datetime+'.txt';
        fs.writeFileSync(path, data);
        //retorna apenas o caminho
        return path;
    }


}

//reportPDF.js
class ReportPDF extends Report {
    constructor() {
        super();
    }

    save(data) {

        var datetime = new Date().toJSON().slice(0, 10) + "-" + new Date(new Date()).toString().split(' ')[4];
        var path = './reports/' + datetime + '.pdf';

        //estilo do pdf
        var pdf = new PDFDocument({
            size: 'LEGAL',
            info: {
                Title: 'Report of' + ' datetime',
                Author: 'Admin',
            }
        });

        // Diz onde será escrito
        var stream = fs.createWriteStream(path);
        pdf.pipe(stream);

        // Insere os dados
        pdf.text(data);


        // Fecha o pdf
        pdf.end();

        //retorna o caminho e o stream para ser verificado
        return {path, stream};
    }


}
```

### Factory Method

```js
//ormFactory.js
class ORMFactory {
  constructor() {
    if(new.target === ORMFactory)
      throw new TypeError("Cannot construct Abstract instances directly");
  }

  static getCentroMongoORM(){
    return new CentroMongoORM();
  }

  static getCursoMongoORM(){
    return new CursoMongoORM();
  }

  static getDisciplinaMongoORM(){
    return new DisciplinaMongoORM();
  }

  static getProvaMongoORM(){
    return new ProvaMongoORM();
  }
}

//ormDic.js
var ormDic = {
   "prova": Factory.getProvaMongoORM(),
   "centro": Factory.getCentroMongoORM(),
   "disciplina": Factory.getDisciplinaMongoORM(),
   "curso": Factory.getCursoMongoORM()
  }

```

### Command

```js
//provaCommand.js
class ProvaCommand {
  constructor(proxy) {
    this._provaProxy = proxy;
    proxy.setOrm('prova');
  }

  get(req, res) {
    this._provaProxy.get(req, res);
  }

  getById(req, res) {
    this._provaProxy.getById(req, res);
  }

  add(req, res) {
    this._provaProxy.add(req, res);
  }

  delete(req, res) {
    this._provaProxy.delete(req, res);
  }

  update(req, res) {
    this._provaProxy.update(req, res);
  }
}

//routes/prova.js
...
router.get('/provas', (req, res, next) => {
    new APIManager().get(req, res, new ProvaCommand(new OrmProxy()));

});
...
```

### Facade

```js
//apiManager.js
class APIManager {
  constructor() { }

  initialize() {
    //está sendo chamada na conexao com mongo
    SIGAA.getAllCentros();
    SIGAA.getAllCursos();
    SIGAA.getAllDisciplinas();
  }

  get(req, res, cmd) {
    cmd.get(req, res);
  }

  getById(req, res, cmd) {
    cmd.getById(req, res);
  }
  add(req, res, cmd) {
    cmd.add(req, res);
  }

  delete(req, res, cmd) {
    cmd.delete(req, res);
  }

  update(req, res, cmd) {
    cmd.update(req, res);
  }
}

//routes/prova.js
...
router.get('/provas', (req, res, next) => {
    new APIManager().get(req, res, new ProvaCommand(new OrmProxy()));

});
...


```

### Proxy

```js
//ormProxy.js
class OrmProxy {
    constructor() {
        this._orm = null;
    }

    setOrm(string) {
        this._orm = ormDic[string];
    }

    add(req, res) {
        if (req.headers.token === null || req.headers.token !== 'mps10') {
            var response = {};
            response.message = "Token inválido";
            response.token = req.headers.token || '';
            res.send(response);
        } else {
            this._orm.add(req, res);
        }
    }

    delete(req, res) {
        if (req.headers.token === null || req.headers.token !== 'mps10') {
            var response = {};
            response.message = "Token inválido";
            response.token = req.headers.token || '';
            res.send(response);
        } else {
            this._orm.delete(req, res);
        }
    }
...

//provaCommand.js
class ProvaCommand {
  constructor(proxy) {
    this._provaProxy = proxy;
    proxy.setOrm('prova');
  }

  get(req, res) {
    this._provaProxy.get(req, res);
  }

  getById(req, res) {
    this._provaProxy.getById(req, res);
  }

  add(req, res) {
    this._provaProxy.add(req, res);
  }

  delete(req, res) {
    this._provaProxy.delete(req, res);
  }

  update(req, res) {
    this._provaProxy.update(req, res);
  }
}

```