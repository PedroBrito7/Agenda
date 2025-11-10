const Contato = require('../models/ContatoModel');
exports.index= (req,res)=> {
    res.render('contato', {
        contato: {}
});
}
exports.register= async(req,res)=> { // vai mostrar nd na tela, so vai receber os dados receber no db e voltar pra pag ou r3direcionar
    try {
        const contato = new Contato(req.body)
    await contato.register();
    if(contato.errors.length > 0){
    req.flash('errors', contato.errors);
    req.session.save(() => res.redirect('/login/index'));
    return;
    }

    req.flash('sucess', 'contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
    } catch (e) {
        console.log(e)
        return res.render('404')    
    } 
}

exports.editIndex = async function (){
if(!req.params.id) return res.render('404')

const user = await Contato.buscaPorId(req.Params.id);
if(!user) return res.render('404')
res.render('contato', { contato })

};