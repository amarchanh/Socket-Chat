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
				<strong>${message.nickname}</strong> dice:
				<p>${message.text}</p>
			</div>
		`);
	}).join(' ');

	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
	// Creamos un objeto message con los datos del formulario
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	// Oculatamos el campo nickname después de que el usuario mande el primer mensaje
	document.getElementById('nickname').style.display = "none";
	document.getElementById('text').value = "";
	window.location.hash = '#text';
	// Enviamos el mensaje al servidor
	socket.emit('add-message', message);


	return false;
}
