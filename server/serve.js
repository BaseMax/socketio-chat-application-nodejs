/*
 * @Name: socketio-chat-application-nodejs
 * @Date: 2020-12-07
 * @Author: Max Base
 * @Repository: https://github.com/BaseMax/socketio-chat-application-nodejs
*/

// import libs
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

members = []
io.on('connection', function(socket) {
  console.log('A user connected')

  socket.on('set-username', function(data) {
    console.log(data)

    if(members.indexOf(data) > -1) {
      socket.emit('user-exists', data + ' username is taken!')
    } else {
      members.push(data)
      socket.emit('user-set', {username: data})
    }
  })

  socket.on('message', function(data) {
    io.sockets.emit('message', data)
  })
})

// serve client page in home of server port
// app.get('/', function(req, res) {
//   res.sendfile('index.html')
// })

// allow x-requests
app.all('/', function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

// listen port
http.listen(3003, function() {
  console.log('listening on localhost:3003')
})
