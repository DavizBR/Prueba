// Obtener referencias a los elementos HTML relevantes
var chatInput = document.getElementById('chat-input');
var chatMessages = document.getElementById('chat-messages');

// Establecer la URL del socket y el objeto Socket.IO
var socketurl = 'http://localhost:5005'; // Reemplaza con tu URL de socket
var socket = io('http://localhost:5005'); // Asegúrate de tener la biblioteca Socket.IO incluida en tu página

//Authorization: Bearer <TOKEN>
// team_xamgniSNFPJfXJt5AJNXHU
// zkjaeIyWVAk3j42YRHPqdYGa

// Función para enviar una solicitud al bot y procesar la respuesta
function enviarMensajeAlBot(mensaje) {
  // Enviar el mensaje al servidor a través del socket
  socket.emit('user_message', { message: mensaje });

  // Mostrar el mensaje del usuario en el widget de chat
  var userMessageElement = document.createElement('div');
  userMessageElement.textContent = 'Tú: ' + mensaje;
  chatMessages.appendChild(userMessageElement);
}

// Manejar la respuesta del bot recibida a través del socket
socket.on('bot_message', function(data) {
  var respuestaBot = data.message;

  // Mostrar la respuesta del bot en el widget de chat
  var botResponseElement = document.createElement('div');
  botResponseElement.textContent = 'Bot: ' + respuestaBot;
  chatMessages.appendChild(botResponseElement);
});

// Manejar el evento de presionar la tecla "Enter" en el campo de entrada
chatInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    var message = chatInput.value;
    if (message.trim() !== '') {
      chatInput.value = '';

      // Enviar el mensaje al bot
      enviarMensajeAlBot(message);
    }
  }
});
