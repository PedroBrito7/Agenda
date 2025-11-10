const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default:''},
  email: { type: String, required: false, default:''},
  telefone: { type: String, required: false, default:''},
  criadoEm: { type: Date, default: Date.now}, // hora q for cadastrado save day
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
  this.body = body;
  this.errors = [];
  this.contato = null;
} 

Contato.buscaPorId = async function(id){
  if (typeof id !== 'string') return;
  const user = await ContatoModel.findById(id)
  return user;
};
Contato.prototype.register = async function(){ // trabalha direto com o db entt é async await
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function(){
    this.cleanUp(); 
    // validation, email need to be valid, password need have 3 and 50
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone){
      this.errors.push(' Pelo menos um contato precisa ser enviado: email ou telefone')
    }
  
  }

  Contato.prototype.cleanUp= function() {
    for (let key in this.body) {
     if (typeof this.body[key] !== 'string'){
      this.body[key]= '';
     }
  }

  // dados
this.body= {
  nome: this.body.nome,
  sobrenome: this.body.sobrenome,
  email: this.body.email,
  telefone: this.body.telefone,
}
  }
module.exports = Contato;