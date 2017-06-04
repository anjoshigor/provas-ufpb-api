define({ "api": [
  {
    "type": "post",
    "url": "/centro/",
    "title": "ADD Centro",
    "name": "AddCentro",
    "group": "Centros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome do Centro</p>"
          }
        ]
      }
    },
    "description": "<p>Adiciona um novo centro</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "    POST /api/v1/centro HTTP/1.1\n    Content-Type: application/json\n    {   \n\t\"nome\":\"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n    }",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/centro/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Centro",
            "optional": false,
            "field": "Centro",
            "description": "<p>Centro adicionado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Centro adicionado com sucesso\",\n \"centro\": {\n   \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "CentroExistente",
            "description": "<p>Centro já existe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Centro já existente\",\n \"centro\": {\n   \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c83c8495824fb8bad104\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/centro.js",
    "groupTitle": "Centros"
  },
  {
    "type": "delete",
    "url": "/centro/:id",
    "title": "DELETE Centro pelo id",
    "name": "DELCentro",
    "group": "Centros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do Centro</p>"
          }
        ]
      }
    },
    "description": "<p>Deleta um centro pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "DELETE /api/v1/centro/5930c904104d5851085c0d6a HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/centro/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Centro",
            "optional": false,
            "field": "Centro",
            "description": "<p>Centro deletado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Centro deletado com sucesso\",\n \"centro\": {\n   \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CentroNaoEncontrado",
            "description": "<p>Centro não encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n \"message\": \"Centro não encontrado\",\n \"parametros\": {\n   \"id\": \"5930c65d0670104e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/centro.js",
    "groupTitle": "Centros"
  },
  {
    "type": "get",
    "url": "/centro/:id",
    "title": "GET Centro pelo id",
    "name": "GetCentroById",
    "group": "Centros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do centro</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna o centro especificado pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/centro/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/centro/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Centro",
            "optional": false,
            "field": "Centro",
            "description": "<p>Centro requisitado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"_id\": \"590e6e53e08bc1524ddb0a63\",\n \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CentroNaoEncontrado",
            "description": "<p>Centro não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n },\n \"message\": \"Centro não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/centro.js",
    "groupTitle": "Centros"
  },
  {
    "type": "get",
    "url": "/centros/",
    "title": "GET Todos os Centros",
    "name": "GetCentros",
    "group": "Centros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome do curso a ser pesquisado</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna todos os centros cadastrados na base de dados, podendo ser filtrado por nome</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/centros HTTP/1.1",
        "type": "HTTP"
      },
      {
        "title": "Exemplo de uso com pesquisa por nome",
        "content": "GET /api/v1/centros?nome=INFO HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/centros"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Centro[]",
            "optional": false,
            "field": "Centro",
            "description": "<p>Lista de Centros.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"590e6e53e08bc1524ddb0a63\",\n   \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e6e53e08bc1524ddb0a66\",\n   \"nome\": \"CENTRO DE CIÊNCIAS SOCIAIS E APLICADAS (CCSA) (11.00.52)\"\n },\n {\n   \"_id\": \"590e6e53e08bc1524ddb0a67\",\n   \"nome\": \"CENTRO DE CIÊNCIAS MÉDICAS (CCM) (11.00.60)\"\n },\n {\n   \"_id\": \"590e6e53e08bc1524ddb0a68\",\n   \"nome\": \"CENTRO DE CIÊNCIAS JURÍDICAS (CCJ) (11.00.57)\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CentroNaoEncontrado",
            "description": "<p>Centro não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"pesquisa\": {\n   \"nome\": \"ZZ\"\n },\n \"message\": \"Centro não encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/centro.js",
    "groupTitle": "Centros"
  },
  {
    "type": "put",
    "url": "/centro/:id",
    "title": "UPDATE Centro pelo id",
    "name": "UPDATECentro",
    "group": "Centros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do Centro</p>"
          }
        ]
      }
    },
    "description": "<p>Atualiza as informações de um Centro</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "    PUT /api/v1/centro/5930c904104d5851085c0d6a HTTP/1.1\n    Content-Type: application/json\n    {\n\t\"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n    }",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/centro/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Centro",
            "optional": false,
            "field": "Centro",
            "description": "<p>Centro modificado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n\"message\": \"Centro alterado com sucesso\",\n\"centro\": {\n  \"nome\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n  \"_id\": \"5930c65d0670004e06f8699c\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CentroNaoEncontrado",
            "description": "<p>Centro não encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n\"message\": \"Centro não encontrado\",\n\"parametros\": {\n  \"id\": \"5930ca792b7ae05258a54d2a\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/centro.js",
    "groupTitle": "Centros"
  },
  {
    "type": "post",
    "url": "/curso/",
    "title": "ADD Curso",
    "name": "AddCurso",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome do Curso</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "centro",
            "description": "<p>Nome do Centro</p>"
          }
        ]
      }
    },
    "description": "<p>Adiciona um novo curso</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "    POST /api/v1/curso HTTP/1.1\n    Content-Type: application/json\n    {   \n    \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n\t\"centro\":\"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n    }",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/curso/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Curso",
            "optional": false,
            "field": "Curso",
            "description": "<p>Curso adicionado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Curso adicionado com sucesso\",\n \"centro\": {\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "CursoExistente",
            "description": "<p>Curso já existe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Curso já existente\",\n \"centro\": { \n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c83c8495824fb8bad104\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  },
  {
    "type": "delete",
    "url": "/curso/:id",
    "title": "DELETE Curso pelo id",
    "name": "DELCurso",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do Curso</p>"
          }
        ]
      }
    },
    "description": "<p>Deleta um curso pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "DELETE /api/v1/curso/5930c904104d5851085c0d6a HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/curso/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Curso",
            "optional": false,
            "field": "Curso",
            "description": "<p>Curso deletado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Curso deletado com sucesso\",\n \"curso\": {\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CursoNaoEcontrado",
            "description": "<p>Curso não encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n \"message\": \"Curso não encontrado\",\n \"parametros\": {\n   \"id\": \"5930c65d0670104e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  },
  {
    "type": "get",
    "url": "/curso/:id",
    "title": "GET Curso pelo id",
    "name": "GetCursoById",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do curso</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna o curso especificado pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/curso/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/curso/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Curso",
            "optional": false,
            "field": "Curso",
            "description": "<p>Curso requisitado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"_id\": \"590e63b6322d224b144420e6\",\n \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CursoNaoEncontrado",
            "description": "<p>Curso não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n },\n \"message\": \"Curso não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  },
  {
    "type": "get",
    "url": "/cursos/",
    "title": "GET Todos os Cursos",
    "name": "GetCursos",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome do curso a ser pesquisado</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna todos os cursos cadastrados na base de dados, podendo ser filtrado por nome e centro</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/cursos HTTP/1.1",
        "type": "HTTP"
      },
      {
        "title": "Exemplo de uso com pesquisa por nome",
        "content": "GET /api/v1/cursos?nome=Compu HTTP/1.1",
        "type": "HTTP"
      },
      {
        "title": "Exemplo de uso com pesquisa por centro",
        "content": "GET /api/v1/cursos?centro=CCSA HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cursos"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Curso[]",
            "optional": false,
            "field": "Curso",
            "description": "<p>Lista de Cursos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"590e63b6322d224b144420e6\",\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420e7\",\n   \"nome\": \"ENGENHARIA DE COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420e9\",\n   \"nome\": \"ADMINISTRAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE CIÊNCIAS SOCIAIS E APLICADAS (CCSA) (11.00.52)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420e8\",\n   \"nome\": \"MATEMÁTICA COMPUTACIONAL (BACH) - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420ea\",\n   \"nome\": \"MEDICINA - João Pessoa - Presencial - MT - OUTRO TIPO DE GRAU ACADÊMICO\",\n   \"centro\": \"CENTRO DE CIÊNCIAS MÉDICAS (CCM) (11.00.60)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420eb\",\n   \"nome\": \"DIREITO - João Pessoa - Presencial - N - BACHARELADO\",\n   \"centro\": \"CENTRO DE CIÊNCIAS JURÍDICAS (CCJ) (11.00.57)\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CursoNaoEcontrado",
            "description": "<p>Curso não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Curso não encontrado\",\n \"pesquisa\": {\n   \"nome\": \"ZZ\",\n   \"centro\": \"ZZ\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  },
  {
    "type": "get",
    "url": "/cursos/centro/:id",
    "title": "GET todos os Cursos de um Centro",
    "name": "GetCursosByCentro",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do centro</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna todos os cursos de um centro especificado pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/curso/centro/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/curso/centro/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Cursos[]",
            "optional": false,
            "field": "Curso",
            "description": "<p>Cursos requisitados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"590e63b6322d224b144420e6\",\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420e7\",\n   \"nome\": \"ENGENHARIA DE COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n {\n   \"_id\": \"590e63b6322d224b144420e8\",\n   \"nome\": \"MATEMÁTICA COMPUTACIONAL (BACH) - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CursoNaoEncontrado",
            "description": "<p>Curso não foi encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CentroNaoEncontrado",
            "description": "<p>Centro não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n },\n \"message\": \"Curso não encontrado\"",
          "type": "json"
        },
        {
          "title": "Exemplo de erro",
          "content": "{\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n },\n \"message\": \"Centro não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  },
  {
    "type": "put",
    "url": "/curso/:id",
    "title": "UPDATE Curso pelo id",
    "name": "UPDATECurso",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador do Curso</p>"
          }
        ]
      }
    },
    "description": "<p>Atualiza as informações de um Curso</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "    PUT /api/v1/curso/5930c904104d5851085c0d6a HTTP/1.1\n    Content-Type: application/json\n    {\n    \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n\t\"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n    }",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/curso/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Curso",
            "optional": false,
            "field": "Curso",
            "description": "<p>Curso modificado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n\"message\": \"Curso alterado com sucesso\",\n\"curso\": {\n  \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n  \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n  \"_id\": \"5930c65d0670004e06f8699c\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CursoNaoEncontrado",
            "description": "<p>Curso não encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n\"message\": \"Curso não encontrado\",\n\"parametros\": {\n  \"id\": \"5930ca792b7ae05258a54d2a\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/curso.js",
    "groupTitle": "Cursos"
  }
] });
