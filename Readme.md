
# PampaBooks - User Management Microservice

Este microserviço é responsável pela gestão de usuários do sistema PampaBooks. Ele cuida do registro, autenticação e gerenciamento de perfis de usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o JavaScript.
- **Express**: Framework para construção de aplicações web em Node.js.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados dos usuários.
- **Mongoose**: ODM (Object Data Modeling) que conecta o MongoDB com a aplicação Express.
- **bcryptjs**: Biblioteca utilizada para hashing de senhas.
- **jsonwebtoken**: Utilizado para a criação e verificação de tokens JWT, garantindo a autenticação de usuários.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para a aplicação.

## Funcionalidades

- Registro de usuários
- Login de usuários (autenticação)
- Exibição de perfil do usuário (rota protegida)

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/igorsimoes4/pampabooks-user-service.git
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:
    ```plaintext
    MONGO_URI=seu_mongo_uri
    JWT_SECRET=seu_jwt_secreto
    ```

4. Inicie o servidor:
    ```bash
    npm start
    ```

## Endpoints

### 1. Registro de Usuário

- **Rota**: `/register`
- **Método**: `POST`
- **Descrição**: Registra um novo usuário no sistema.

#### Exemplo de Requisição
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Exemplo de Resposta
```json
{
  "message": "Usuário registrado com sucesso!",
  "user": {
    "_id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login de Usuário

- **Rota**: `/login`
- **Método**: `POST`
- **Descrição**: Autentica um usuário e retorna um token JWT.

#### Exemplo de Requisição
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Exemplo de Resposta
```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Obter Perfil do Usuário

- **Rota**: `/profile`
- **Método**: `GET`
- **Descrição**: Retorna os detalhes do perfil do usuário autenticado.
- **Autenticação**: Requer token JWT.

#### Exemplo de Requisição
Cabeçalho HTTP:
```plaintext
Authorization: Bearer <seu_token_jwt>
```

#### Exemplo de Resposta
```json
{
  "_id": "1234567890",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Estrutura do Projeto

```plaintext
├── controllers
│   └── userController.js  # Lógica de negócio para usuários
├── models
│   └── userModel.js       # Modelo de usuário (Mongoose)
├── routes
│   └── userRoutes.js      # Definição das rotas do microserviço
├── app.js                 # Configuração principal do app Express
└── .env.example           # Exemplo de arquivo de variáveis de ambiente
```

## Segurança

Este microserviço utiliza **JWT (JSON Web Tokens)** para autenticação e proteção de rotas, garantindo que apenas usuários autenticados possam acessar informações sensíveis, como o perfil do usuário.

Além disso, as senhas dos usuários são criptografadas utilizando **bcryptjs** antes de serem armazenadas no banco de dados.

## Como Contribuir

1. Fork o projeto
2. Crie uma nova branch (`git checkout -b minha-nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova funcionalidade'`)
4. Envie para a branch (`git push origin minha-nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).
