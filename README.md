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

## URLs funcionando até o momento

### Centros

VERBO|URL|PARÂMETRO|BODY|DESCRIÇÃO
-----|-----|-----|------|--------
GET| http://localhost:3000/api/v1/centros?nome=<nome\> | nome ou vazio | - | Traz um centro ou um conjunto de centros que correspondem à pesquisa pelo nome
GET| http://localhost:3000/api/v1/centro/<id\> | id | - | Traz um centro pelo id indicado
POST| http://localhost:3000/api/v1/centro/ | - |{ nome: "nome do centro" } | Adiciona um novo centro caso não exista com esse nome
PUT| http://localhost:3000/api/v1/centro/<id\> | id |{ nome: "nome do centro" } | Atualiza o campo nome do centro indicado pelo id
DELETE| http://localhost:3000/api/v1/centro/<id\> | id | - | Deleta o centro indicado pelo id


### Cursos

VERBO|URL|PARÂMETRO|BODY|DESCRIÇÃO
-----|-----|-----|------|--------
GET| http://localhost:3000/api/v1/cursos?nome=<nome\>&centro<centro\> | nome, centro ou vazio | - | Traz um curso ou um conjunto de cursos filtrados por nome, centro, ou ambos
GET| http://localhost:3000/api/v1/curso/<id\> | id | - | Traz um curso pelo id indicado
GET| http://localhost:3000/api/v1/cursos/centro/<id\> | id | - | Traz os cursos de um centro indicado pelo id 
POST| http://localhost:3000/api/v1/curso/ | - |{ nome: "nome do curso", centro: "nome do centro" } | Adiciona um novo curso caso não exista com esse nome
PUT| http://localhost:3000/api/v1/curso/<id\> | id |{ nome: "nome do curso", centro: "nome do centro" } | Atualiza o campo nome e/ou centro do curso indicado pelo id
DELETE| http://localhost:3000/api/v1/curso/<id\> | id | - | Deleta o curso indicado pelo id


### Disciplinas

VERBO|URL|PARÂMETRO|BODY|DESCRIÇÃO
-----|-----|-----|------|--------
GET| http://localhost:3000/api/v1/disciplinas?nome=<nome\> | nome ou vazio | - | Traz uma disciplina ou um conjunto de disciplinas filtradas por nome
GET| http://localhost:3000/api/v1/disciplina/<id\> | id | - | Traz uma disciplina pelo id indicado
POST| http://localhost:3000/api/v1/disciplina/ | - |{ nome: "nome da disciplina"} | Adiciona uma nova disciplina caso não exista com esse nome
PUT| http://localhost:3000/api/v1/disciplina/<id\> | id |{ nome: "nome da disciplina"} | Atualiza o campo nome da disciplina indicada pelo id
DELETE| http://localhost:3000/api/v1/disciplina/<id\> | id | - | Deleta a disciplina indicada pelo id


### Provas

VERBO|URL|PARÂMETRO|BODY|DESCRIÇÃO
-----|-----|-----|------|--------
GET| http://localhost:3000/api/v1/provas | - | - | Traz um conjunto de provas que já foram classificadas e estão dentro do padrão
GET| http://localhost:3000/api/v1/classify/prova | - | - | Traz uma prova randômica que ainda não foi classificada como dentro do padrão
GET| http://localhost:3000/api/v1/classify/provas | - | - | Traz um conjunto de provas que ainda não foram classificadas como dentro do padrão
GET| http://localhost:3000/api/v1/download/prova/:id | id |- | Faz o download de uma prova para classificar
POST| http://localhost:3000/api/v1/prova/ | - |form-data { pdf: arquivo em formato pdf, periodo: 2017.1, disciplina: nome da disciplina, tipo: Normal \| Reposição \| Final, departamento: nome do departamento, centro: nome do centro, curso: nome do curso} | Adiciona uma nova prova
PUT| http://localhost:3000/api/v1/classify/:id/add | id |- | Adiciona um ponto na classificacao da prova com id informado
PUT| http://localhost:3000/api/v1/classify/:id/sub | id |- | Subtrai um ponto na classificacao da prova com id informado