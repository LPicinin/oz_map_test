# Use a imagem oficial do Node.js 21
FROM node:21

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie apenas os arquivos relacionados ao gerenciamento de dependências
COPY package.json .

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto
COPY . .

# Exponha a porta que o seu aplicativo Node.js estará ouvindo
EXPOSE 3000

# Comando para iniciar o seu aplicativo
CMD ["npm", "run", "dev"]