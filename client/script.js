var user;
var url    = "//localhost:9099";

var socket = io(url, {
  "force new connection": true,
  "reconnectionAttempts": "Infinity", 
  "timeout": 10001, 
  "transports": ["websocket"]
  // false = self-signed certificate
  "rejectUnauthorized": false
});
// var socket = io("localhost:9999/", {
//   "force new connection": true,
//   "reconnectionAttempts": "Infinity", 
//   "timeout": 10001, 
//   "transports": ["websocket"]
// });
// var socket = io("http://localhost:3003/");

function setUsername(value) {
  socket.emit('set-username', value);
}

function sendMessage(message, field) {
  if(message && field) {
    socket.emit('message', {message: message, user: user});
    field.value = '';
  }
}

socket.on('user-exists', function(data) {
  document.getElementById('error').innerHTML = data;
});

socket.on('user-set', function(data) {
  user = data.username;
  document.body.innerHTML = '<input type="text" id="message">\
  <button type="button" name="button" onclick="sendMessage(document.getElementById(\'message\').value, document.getElementById(\'message\'))">Send</button>\
  <div id="message-container"></div>';
});

socket.on('message', function(data) {
  if(user) {
    document.getElementById('message-container').innerHTML += '<div><b>' + 
    data.user + '</b>: ' + data.message + '</div>'
  }
});
