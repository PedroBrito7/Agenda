# 📒 Agenda – CRUD com Node.js, Express e EJS

Um sistema de agenda de contatos desenvolvido em **Node.js**, utilizando **Express**, **EJS** e **MongoDB**, seguindo boas práticas de organização e arquitetura.  
O objetivo é permitir o cadastro, edição, visualização e exclusão de contatos de forma simples e eficiente.

---

## 🚀 Tecnologias Utilizadas

- Node.js  
- Express  
- EJS  
- MongoDB + Mongoose  
- dotenv  
- Nodemon  
- Arquitetura MVC  

---

## 📂 Estrutura do Projeto

- **app.js** → configurações da aplicação (Express, rotas, views, middlewares)  
- **server.js** → inicialização do servidor para ambiente de produção  
- **controllers** → lógica das rotas  
- **models** → schemas do Mongoose  
- **routes** → rotas organizadas  
- **views** → templates EJS + HTML

---

## ✨ Funcionalidades

- Criar novos contatos  
- Listar contatos cadastrados  
- Editar contatos  
- Excluir contatos  
- Validação de dados  
- Uso de middlewares  
- Interface com EJS e layouts reutilizáveis  

---

## 🔧 Instalação e Execução

Clone o repositório:

git clone <cole o link aqui >

Instale as dependências:
npm install

Crie um arquivo .env na raiz do projeto:
MONGO_URI=
PORT=3000
Execute o projeto em modo desenvolvimento:

npm run dev
Acesse no navegador:
http://localhost:3000
🗄️ Banco de Dados
O projeto utiliza MongoDB com Mongoose.

Exemplo de schema:
{
  nome: String,
  telefone: String,
  email: String,
  criadoEm: Date
}
🧼 Boas Práticas Utilizadas
Arquitetura MVC

Separação entre app.js e server.js

Uso de variáveis de ambiente (.env)

Middlewares personalizados

Código modular e organizado

Templates EJS reutilizáveis

☁️ Deploy no Google Cloud Platform (GCP)
O projeto foi implantado no Google Cloud Platform (GCP) utilizando uma instância configurada para rodar aplicações Node.js em produção.

Boas práticas aplicadas:

Servidor dedicado com server.js

Configuração de ambiente na VM (Compute Engine)

Variáveis de ambiente configuradas

Firewall e portas ajustadas

Execução do Node.js em ambiente produtivo

O domínio/IP da instância não está sendo divulgado neste repositório.

📜 Licença
Projeto livre para fins educacionais e uso em portfólio.


---







