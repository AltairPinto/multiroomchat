/* importar as configurações do servidor */
var app = require('./config/server');
var http = require('http').Server(app);

/* parametrizar a porta de escuta */
var server = app.listen(app.get('port'), function() {
    console.log('Servidor Online');
})

var io = require('socket.io')(http).listen(server);

app.set('io', io);

/* criar uma conexão por websocket */
io.on('connection', function(socket) {
    console.log('Usuário conectou')

    socket.on('disconnect', function() {
        console.log('Usuário desconectou')
    });

    socket.on('msgParaServidor', function(data) {
        /* dialogo */
        socket
            .emit('msgParaCliente', {
                apelido: data.apelido,
                mensagem: data.mensagem
            });

        socket
            .broadcast
            .emit('msgParaCliente', {
                apelido: data.apelido,
                mensagem: data.mensagem
            });

        /* participantes */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket
                .emit('participantesParaCliente', {
                    apelido: data.apelido
                });

            socket
                .broadcast
                .emit('participantesParaCliente', {
                    apelido: data.apelido
                });
        }

    });

});