module.exports.home = function(application, req, res) {
    res.render('index', { validacao: {}, nick: req.body.apelido });
}