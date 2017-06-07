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
          "content": "{\n \"message\": \"Curso adicionado com sucesso\",\n \"curso\": {\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
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
          "content": "{\n \"message\": \"Curso já existente\",\n \"curso\": { \n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n }\n}",
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
          "content": "{\n \"message\": \"Curso não encontrado\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n \n\n }\n}",
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
        "content": "GET /api/v1/cursos/centro/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cursos/centro/590e6e53e08bc1524ddb0a63"
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
          "content": "{\n \"message\": \"Curso não encontrado\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
          "type": "json"
        },
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Centro não encontrado\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
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
  },
  {
    "type": "post",
    "url": "/disciplina/",
    "title": "ADD Disciplina",
    "name": "AddDisciplina",
    "group": "Disciplinas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome do Disciplina</p>"
          }
        ]
      }
    },
    "description": "<p>Adiciona uma nova disciplina</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "POST /api/v1/disciplina HTTP/1.1\nContent-Type: application/json\n{   \n    \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"\n}",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/disciplina/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Disciplina",
            "optional": false,
            "field": "Disciplina",
            "description": "<p>Disciplina adicionada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Disciplina adicionada com sucesso\",\n \"disciplina\": {\n   \"nome\": \"METODOS DE PROJETO DE SOFTWARE\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
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
            "field": "DisciplinaExistente",
            "description": "<p>Disciplina já existe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Disciplina já existente\",\n \"disciplina\": { \n   \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/disciplina.js",
    "groupTitle": "Disciplinas"
  },
  {
    "type": "delete",
    "url": "/disciplina/:id",
    "title": "DELETE Disciplina pelo id",
    "name": "DELDisciplina",
    "group": "Disciplinas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador da Disciplina</p>"
          }
        ]
      }
    },
    "description": "<p>Deleta uma disciplina pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "DELETE /api/v1/disciplina/5930c904104d5851085c0d6a HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/disciplina/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Disciplina",
            "optional": false,
            "field": "Disciplina",
            "description": "<p>Disciplina deletada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Disciplina deletada com sucesso\",\n \"disciplina\": {\n   \"nome\": \"METODOS DE PROJETO DE SOFTWARE\",\n   \"_id\": \"5930c65d0670004e06f8699c\"\n }\n}",
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
            "field": "DisciplinaNaoEcontrada",
            "description": "<p>Disciplina não encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n \"message\": \"Disciplina não encontrada\",\n \"parametros\": {\n   \"id\": \"5930c65d0670104e06f8699c\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/disciplina.js",
    "groupTitle": "Disciplinas"
  },
  {
    "type": "get",
    "url": "/disciplina/:id",
    "title": "GET Disciplina pelo id",
    "name": "GetDisciplinaById",
    "group": "Disciplinas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador da disciplina</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna a disciplina especificada pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/disciplina/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/disciplina/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Disciplina",
            "optional": false,
            "field": "Disciplina",
            "description": "<p>Disciplina requisitado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"_id\": \"590f41a85e13810c58412efd\",\n \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"\n}",
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
            "field": "DisciplinaNaoEncontrada",
            "description": "<p>Disciplina não foi encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n },\n \"message\": \"Disciplina não encontrada\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/disciplina.js",
    "groupTitle": "Disciplinas"
  },
  {
    "type": "get",
    "url": "/disciplinas/",
    "title": "GET Todas as Disciplinas",
    "name": "GetDisciplinas",
    "group": "Disciplinas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome",
            "description": "<p>Nome da disciplina a ser pesquisada</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna todos as disciplinas cadastradas na base de dados, podendo ser filtrada por nome</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/disciplinas HTTP/1.1",
        "type": "HTTP"
      },
      {
        "title": "Exemplo de uso com pesquisa por nome",
        "content": "GET /api/v1/disciplinas?nome=Prog HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/disciplinas"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Disciplinas[]",
            "optional": false,
            "field": "Disciplina",
            "description": "<p>Lista de Disciplinas.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"590f41a85e13810c58412e53\",\n   \"nome\": \"COMPUTADORES E SOCIEDADE\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e54\",\n   \"nome\": \"INTROD À MATEMÁTICA COMPUTACINAL\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e55\",\n   \"nome\": \"INTRODUCAO A TEORIA DE GRAFOS\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e56\",\n   \"nome\": \"ESTÁGIO SUPERVISIONADO\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e57\",\n   \"nome\": \"TÓPICOS ESPECIAIS EM MÁT COMPUT I\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e58\",\n   \"nome\": \"ALGORÍTIMOS   DISTRIBUÍDOS\"\n },\n {\n   \"_id\": \"590f41a85e13810c58412e59\",\n   \"nome\": \"MÉTODOS DOS ELEMENTOS FINITOS I\"\n }\n]",
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
            "field": "DisciplinaNaoEcontrado",
            "description": "<p>Disciplina não foi encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Disciplina não encontrada\",\n \"pesquisa\": {\n   \"nome\": \"ZZ\",\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/disciplina.js",
    "groupTitle": "Disciplinas"
  },
  {
    "type": "put",
    "url": "/disciplina/:id",
    "title": "UPDATE Disciplina pelo id",
    "name": "UPDATEDisciplina",
    "group": "Disciplinas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador da Disciplina</p>"
          }
        ]
      }
    },
    "description": "<p>Atualiza as informações de uma Disciplina</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "PUT /api/v1/disciplina/5930c904104d5851085c0d6a HTTP/1.1\nContent-Type: application/json\n{\n    \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"    \n}",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/disciplina/5930c904104d5851085c0d6a"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Disciplina",
            "optional": false,
            "field": "Disciplina",
            "description": "<p>Disciplina modificado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n\"message\": \"Disciplina alterada com sucesso\",\n\"disciplina\": {\n  \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"\n  \"_id\": \"5930c65d0670004e06f8699c\"\n}\n}",
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
            "field": "DisciplinaNaoEncontrada",
            "description": "<p>Disciplina não encontrada</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "DisciplinaExistente",
            "description": "<p>Disciplina já existe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "\n{\n\"message\": \"Disciplina não encontrada\",\n\"parametros\": {\n  \"id\": \"5930ca792b7ae05258a54d2a\"\n}\n}",
          "type": "json"
        },
        {
          "title": "Exemplo de erro",
          "content": "\n {\n \"message\": \"Disciplina já existente\",\n \"disciplina\": {\n   \"nome\": \"METODOS DE PROJETO DE SOFTWARE\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/disciplina.js",
    "groupTitle": "Disciplinas"
  },
  {
    "type": "put",
    "url": "/classify/:id/add",
    "title": "ADD ponto para Prova",
    "name": "AddPointProva",
    "group": "Provas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Id da prova para ser atribuído ponto</p>"
          }
        ]
      }
    },
    "description": "<p>Adiciona um ponto a uma prova</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "Em construção",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/classify/59376251a785d011175f19d9/add/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova",
            "optional": false,
            "field": "Prova",
            "description": "<p>Prova com ponto adicionado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "Em construção",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Requisição inválida</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "Em construção",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "post",
    "url": "/prova/",
    "title": "ADD Prova",
    "name": "AddProva",
    "group": "Provas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": true,
            "field": "pdf",
            "description": "<p>Arquivo em formato pdf</p>"
          }
        ]
      }
    },
    "description": "<p>Adiciona uma nova prova</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "curl -X POST \\\n http://localhost:3000/api/v1/prova \\\n -H 'cache-control: no-cache' \\\n -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \\\n -H 'postman-token: a6401243-015b-c8d8-0c50-8aef4dc160d1' \\\n -F pdf=@Prova1BD_UFPB_2005.2.doc.pdf \\\n -F periodo=2005.2 \\\n -F 'disciplina=BANCO DE DADOS' \\\n -F tipo=Normal \\\n -F 'departamento=DEPARTAMENTO DE INFORMÁTICA' \\\n -F 'centro=CENTRO DE INFORMÁTICA (CI) (11.00.64)' \\\n -F 'curso=CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO'",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/prova/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova",
            "optional": false,
            "field": "Prova",
            "description": "<p>Prova adicionada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"message\": \"Prova adicionada com sucesso\",\n \"prova\": {\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"disciplina\": \"BANCO DE DADOS\",\n   \"_id\": \"59374350d3b9670b4f239a68\",\n   \"curso\": {\n       \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n       \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n   },\n   \"dateUploaded\": \"2017-06-07T00:05:36.236Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Requisição inválida</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Erro nos parametros da requisição\",\n \"requisicao\": {\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\",\n   \"pdf\": \"Prova1BD_UFPB_2005.2.doc.pdf\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "get",
    "url": "/provas/latest",
    "title": "GET Últimas provas adicionadas",
    "name": "GetLatestProvas",
    "group": "Provas",
    "description": "<p>Retorna as últimas 10 provas adicionadas que estão dentro do padrão e já foram avaliadas</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/provas/latest HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/provas/latest"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova[]",
            "optional": false,
            "field": "Prova",
            "description": "<p>Lista de Provas.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"5930aaf6d817660e45dfb8eb\",\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"disciplina\": \"BANCO DE DADOS\",\n   \"curso\": {\n     \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n     \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n   },\n   \"dateUploaded\": \"2017-06-02T00:01:58.950Z\"\n }\n]",
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
            "field": "ProvaNaoEncontrada",
            "description": "<p>Prova não foi encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Provas não encontradas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "get",
    "url": "/prova/:id",
    "title": "GET Prova pelo id",
    "name": "GetProvaById",
    "group": "Provas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador da prova</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna a prova especificada pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/prova/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/prova/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova",
            "optional": false,
            "field": "Prova",
            "description": "<p>Prova requisitada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "{\n \"_id\": \"5930aaf6d817660e45dfb8eb\",\n \"periodo\": \"2005.2\",\n \"tipo\": \"Normal\",\n \"disciplina\": \"BANCO DE DADOS\",\n \"curso\": {\n   \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n   \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n },\n \"dateUploaded\": \"2017-06-02T00:01:58.950Z\"\n}",
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
            "field": "ProvaNaoEncontrada",
            "description": "<p>Prova não foi encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Prova não encontrada\",\n \"parametros\": {\n   \"id\": \"5930aaf6d817660e45dfb8e4\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "get",
    "url": "/provas/",
    "title": "GET Todas as Provas",
    "name": "GetProvas",
    "group": "Provas",
    "description": "<p>Retorna todas as provas cadastradas na base de dados que estão dentro do padrão e já foram avaliadas</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/provas HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/provas"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova[]",
            "optional": false,
            "field": "Prova",
            "description": "<p>Lista de Provas.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"5930aaf6d817660e45dfb8eb\",\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"disciplina\": \"BANCO DE DADOS\",\n   \"curso\": {\n     \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n     \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n   },\n   \"dateUploaded\": \"2017-06-02T00:01:58.950Z\"\n }\n]",
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
            "field": "ProvaNaoEncontrada",
            "description": "<p>Prova não foi encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Prova não encontrada\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "get",
    "url": "/provas/curso/:id",
    "title": "GET todas as provas de um Curso",
    "name": "GetProvasByCurso",
    "group": "Provas",
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
    "description": "<p>Retorna todas as provas de um curso especificado pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/provas/curso/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/provas/curso/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Provas[]",
            "optional": false,
            "field": "Prova",
            "description": "<p>Provas requisitadas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"5930aaf6d817660e45dfb8eb\",\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"disciplina\": \"BANCO DE DADOS\",\n   \"curso\": {\n     \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n     \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n   },\n   \"dateUploaded\": \"2017-06-02T00:01:58.950Z\"\n }\n]",
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
            "field": "ProvaNaoEncontrada",
            "description": "<p>Prova não foi encontrada</p>"
          },
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
          "content": "{\n \"message\": \"Prova não encontrada\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
          "type": "json"
        },
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Curso não encontrado\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "get",
    "url": "/provas/disciplina/:id",
    "title": "GET todas as provas de uma Disciplina",
    "name": "GetProvasByDisciplina",
    "group": "Provas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador da disciplina</p>"
          }
        ]
      }
    },
    "description": "<p>Retorna todas as provas de uma disciplina especificada pelo id</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "GET /api/v1/provas/disciplina/590e6e53e08bc1524ddb0a63 HTTP/1.1",
        "type": "HTTP"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/provas/disciplina/590e6e53e08bc1524ddb0a63"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Provas[]",
            "optional": false,
            "field": "Prova",
            "description": "<p>Provas requisitadas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "[\n {\n   \"_id\": \"5930aaf6d817660e45dfb8eb\",\n   \"periodo\": \"2005.2\",\n   \"tipo\": \"Normal\",\n   \"disciplina\": \"BANCO DE DADOS\",\n   \"curso\": {\n     \"nome\": \"CIÊNCIAS DA COMPUTAÇÃO - João Pessoa - Presencial - MT - BACHARELADO\",\n     \"centro\": \"CENTRO DE INFORMÁTICA (CI) (11.00.64)\"\n   },\n   \"dateUploaded\": \"2017-06-02T00:01:58.950Z\"\n }\n]",
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
            "field": "ProvaNaoEncontrada",
            "description": "<p>Prova não foi encontrada</p>"
          },
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "DisciplinaNaoEncontrada",
            "description": "<p>Disciplina não foi encontrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Prova não encontrada\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
          "type": "json"
        },
        {
          "title": "Exemplo de erro",
          "content": "{\n \"message\": \"Disciplina não encontrada\",\n \"parametros\": {\n   \"id\": \"590e6aa53e08bc1524ddba63\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  },
  {
    "type": "put",
    "url": "/classify/:id/sub",
    "title": "SUB ponto da Prova",
    "name": "SubPointProva",
    "group": "Provas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Id da prova para ser subtraído ponto</p>"
          }
        ]
      }
    },
    "description": "<p>Subtrai um ponto a uma prova</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "Em construção",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/classify/59376251a785d011175f19d9/sub/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Prova",
            "optional": false,
            "field": "Prova",
            "description": "<p>Prova com ponto subtraido</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de corpo de resposta com sucesso",
          "content": "Em construção",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Requisição inválida</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro",
          "content": "Em construção",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/prova.js",
    "groupTitle": "Provas"
  }
] });
