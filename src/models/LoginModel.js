const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs= require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

// o que for enviado no login controller queremos receber na class login
class Login {
  constructor (body){
    this.body = body;
    this.errors = []; // se tiver algum erro aq dentro ele nao vai deixar cadastrar na db, e vai voltar e avisar o cliente
    this.users = null;
  }

  async login(){
    this.valida();
    if(this.errors.lenght > 0) return;
    this.user = await LoginModel.findOne({email: this.body.email});

    if(!this.user) {
      this.errors.push('Usuário näo existe '); //se o usuario nn existir 
      return;
    }

    if(bcryptjs.compareSync(this.body.password, this.user.password)){// body.password é string da senha e user.password a senha do db
      this.errors.push('senha invalida'); //  array vai com senha invalida
      this.user= null; //
      return; // ta ou nao logado se passar criar a session no controller
    } 
  } 

  async register() {  // tudo que for async precisa envolver no try catch, e é uma promise
    this.valida();
    if(this.errors.lenght > 0) return; // como ele ta puxando a class login e oq controla os erros no login ée o array errors se ele tiver mais de 1 coisa nele é pq ta certo, se tiver vazio errado 
   
    await this.userExists(); // await para esperar a validacao do metodo userexists pra ver se o usario existe

    if(this.errors.lenght > 0) return;
    
    const salt = bcryptjs.genSaltSync(); // gerando um salt 
    this.body.password = bcryptjs.hashSync(this.body.password, salt) // com esse salt estamos gerando um hash da senha 
    
     this.user = await LoginModel.create(this.body); // obj ta limpo ai pode registrar na db como ele ta criando um user ele indentifico com this.user = e acao de jogar na db
  }

  async userExists(){ // mexendo com a base de dados entao usa async
   const user = await LoginModel.findOne({email: this.body.email});
   if(user) this.errors.push('usuário já existe.')
  }

  valida(){
    this.cleanUp(); 
    // validation, email need to be valid, password need have 3 and 50
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if(this.body.password.length < 3 || this.body.password.length >50){
      this.errors.push(' a senha precisa ter entre 3 e 50 caracteres. ');
    }
  }

  cleanUp(){
    for (let key in this.body) {
     if (typeof this.body[key] !== 'string'){
      this.body[key]= '';
     }
  }
this.body= {
  email: this.body.email,
  password: this.body.password,  // Isso remove qualquer outro campo que tenha vindo no corpo da requisição (por exemplo, _csrf, confirmPassword, ou campos extras que o usuário possa tentar enviar).

}

}
}

module.exports = Login;