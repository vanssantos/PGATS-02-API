# API de Transferências e Usuários

Esta API permite realizar registro, login, consulta de usuários e transferências de valores entre usuários. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Execução

- Para iniciar o servidor:
  ```powershell
  node server.js
  ```
- Para importar o app em testes:
  ```javascript
  const app = require('./app');
  ```

## Endpoints

- `POST /register`: Registra novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `isFavorecido` (boolean).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários.
- `POST /transfer`: Realiza transferência. Campos obrigatórios: `from`, `to`, `amount`.
- `GET /transfers`: Lista todas as transferências.
- `GET /api-docs`: Documentação Swagger da API.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha válidos.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

- Recomenda-se o uso do [Supertest](https://github.com/visionmedia/supertest) para testes automatizados.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.
