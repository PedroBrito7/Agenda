require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

const routes = require('./routes');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => app.emit('pronto'))
  .catch(e => console.error('Erro ao conectar no MongoDB:', e));


// Helmet para segurança HTTP
app.use(helmet({ contentSecurityPolicy: false }));


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));


app.use(session({
  secret: 'seuSegredoAqui',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}));


app.use(flash());

app.use(csrf());

app.use(middlewareGlobal);
app.use(csrfMiddleware);


app.use(checkCsrfError);

app.use(routes);


app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
});
