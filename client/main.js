//  Variable para la conexión al socket. La IP es la del servidor
var socket = io.connect('http://192.168.1.129:6677', {'forceNew':true});

// Procesa el mensaje que le llega del socket cuando el evento coincide con el que pasa el socket
socket.on('messages', function(data) {
	console.log(data);
	render(data);
});

function render(data) {
	// Itera sobre los objetos del array "data". Se pasan las variables para poder trabajar con el contenido
	var html = data.map(function(message, index) {
		return (`
			<div class="message">
				<strong>${message.nickname}</strong>
				<p>${message.text}</p>
			</div>
		`);
	}).join(' ');

	document.getElementById('messages').innerHTML = html;
}
