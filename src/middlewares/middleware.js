const e = require("connect-flash");

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};
exports.outroMiddleware = (req, res, next) => {
    next();
};
 
exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
 
    next();
};
 
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired= (req,res,next) => { // qm quer ver pag e nao ta logado vai ser redirecionado pro /
if(!req.session.user){ // usuario nao logado
    req.flash('errors', ' Voce precisa fazer login' )
    req.session.save( ()=> res.redirect('/'));
    return; // se passar daq ele pd ir pra outro midd
}
next()
}