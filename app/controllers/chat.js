module.exports.iniciaChat = function(application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 cararcteres').len(3, 15);
    req.assert('codigo', 'Código é obrigatório').notEmpty();
    req.assert('codigo', 'Código inválido').equals('senhaqualquer');

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros, nick: dadosForm.apelido });
        return; // para não passar do if
    }

    /* usar objeto do socket io dentro do controller */
    application.get('io')
        .emit('msgParaCliente', {
            apelido: dadosForm.apelido,
            mensagem: ' acabou de entrar no chat'
        });

    res.render('chat', { dadosForm: dadosForm });
}