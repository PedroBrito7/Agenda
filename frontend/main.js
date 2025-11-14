import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import ContatoCadastro from './modules/ContatoCadastro';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const contatoCadastro = new ContatoCadastro('.form-contatos');

login.init();
cadastro.init();
contatoCadastro.init();


 import './assets/css/style.css';