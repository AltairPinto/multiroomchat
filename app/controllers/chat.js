module.exports.iniciaChat = function(application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 cararcteres').len(3, 15);

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros });
        return; // para não passar do if
    }

    res.render('chat');
}