var user;
var socket = io("localhost:3003/", {
  "force new connection": true,
  "reconnectionAttempts": "Infinity", 
  "timeout": 10001, 
  "transports": ["websocket"]
});
// var socket = io("http://localhost:3003/");

function setUsername() {
  socket.emit('set-username', document.getElementById('name').value);
}

function sendMessage() {
  var message = document.getElementById('message');
  if(message) {
    socket.emit('message', {message: message.value, user: user});
    message.value = '';
  }
}

socket.on('user-exists', function(data) {
  document.getElementById('error').innerHTML = data;
});

socket.on('user-set', function(data) {
  user = data.username;
  document.body.innerHTML = '<input type="text" id="message">\
  <button type="button" name="button" onclick="sendMessage()">Send</button>\
  <div id="message-container"></div>';
});

socket.on('message', function(data) {
  if(user) {
    document.getElementById('message-container').innerHTML += '<div><b>' + 
    data.user + '</b>: ' + data.message + '</div>'
  }
});
