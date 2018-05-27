// Dependencia a express
var express = require('express');
// Aplicacion de express
var app = express();
// Libería HTTP (con express cargado)
var server = require('http').Server(app);
// Dependencia a Socket.io. Se pasa server como variable para poder hacer uso de los sockets desde ella
var io = require('socket.io')(server);

// Carga los html estaticos de la carpeta "client"
app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
	res.status(200).send('Hello World');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado.',
	nickname: 'BotChat'
}];

io.on('connection', function(socket) {
	console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado...");
	// Envía los datos del array mensajes al cliente
	socket.emit('messages', messages);

	// Recibe una petición del cliente con un mensaje nuevo. Lo guarda en el array de mensajes
	socket.on('add-message', function(data) {
		messages.push(data);

		// Despues de montar el array de mensajes, se remite a todos los clientes de la página
		io.sockets.emit('messages', messages);
	});

});

// Puerto para la aplicación
var port = 6677;

server.listen(port, function() {
	console.log('Servidor funcionando en http://localhost:' + port);
});

