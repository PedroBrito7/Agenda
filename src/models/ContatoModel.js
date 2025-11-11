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

  Contato.prototype.edit = async function (id) {
    if(typeof id !=='string') return;
    this.valida();
    if(this.errors.length > 0 ) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true}); // parametro é o id q o corpo q ta recebendo da req do user, o new true serve pra mostrar sempre o novo
  }

  Contato.buscaPorId = async function(id){
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id)
  return contato;
};

  Contato.buscaContatos = async function(){
  const contatos = await ContatoModel.find()
    .sort({criadoEm: -1})
  return contatos;
};
Contato.deleteById = async function (id) {
  try {
    if (!id || typeof id !== 'string') return null;
    const contato = await ContatoModel.findByIdAndDelete(id);
    return contato;
  } catch (err) {
    console.log('Erro ao deletar contato:', err);
    return null;
  }
}

module.exports = Contato