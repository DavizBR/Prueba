// Obtener referencias a los elementos HTML relevantes
var chatInput = document.getElementById('chat-input');
var chatMessages = document.getElementById('chat-messages');
//Authorization: Bearer <TOKEN>
// team_xamgniSNFPJf4fXJt5AJNXHU
// zkjaeIyWVAk3j42YRHPqdYGa
// Función para enviar una solicitud al bot y procesar la respuesta
function enviarMensajeAlBot(mensaje) {
  fetch('https://chatbot-dex.vercel.app/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <zkjaeIyWVAk3j42YRHPqdYGa>'
    },
    body: JSON.stringify({ message: mensaje })
  })
    .then(response => response.json())
    .then(data => {
      // Procesar la respuesta recibida del bot
      const respuestaBot = data.response;
      // Mostrar la respuesta del bot en el widget de chat
      var botResponseElement = document.createElement('div');
      botResponseElement.textContent = 'Bot: ' + respuestaBot;
      chatMessages.appendChild(botResponseElement);
    })
    .catch(error => {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });
}

// Manejar el evento de presionar la tecla "Enter" en el campo de entrada
chatInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    var message = chatInput.value;
    if (message.trim() !== '') {
      var messageElement = document.createElement('div');
      messageElement.textContent = 'Tú: ' + message;
      chatMessages.appendChild(messageElement);
      chatInput.value = '';

      // Enviar el mensaje al bot
      enviarMensajeAlBot(message);
    }
  }
});
