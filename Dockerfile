# Usar uma imagem base do Node.js
FROM node:18

# Criar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json para o diretório de trabalho
COPY package.json .

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta em que a aplicação vai rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["npm", "start"]
