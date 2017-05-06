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

#### URLs funcionando até o momento

VERBO|URL|PARÂMETRO|BODY|DESCRIÇÃO
-----|-----|-----|------|--------
GET| http://localhost:3000/api/v1/centros?nome=\<nome\> | nome ou vazio | - | Traz um centro ou um conjunto de centros que correspondem à pesquisa pelo nome
GET| http://localhost:3000/api/v1/centro/\<id\> | id | - | Traz um centro pelo id indicado
POST| http://localhost:3000/api/v1/centro/ | - |{ nome: "nome do centro" } | Adiciona um novo centro caso não exista com esse nome
PUT| http://localhost:3000/api/v1/centro/\<id\> | id |{ nome: "nome do centro" } | Atualiza o campo nome do centro indicado pelo id
DELETE| http://localhost:3000/api/v1/centro/\<id\> | id | - | Deleta o centro indicado pelo id

