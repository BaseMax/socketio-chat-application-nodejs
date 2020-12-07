/*
 * @Name: socketio-chat-application-nodejs
 * @Date: 2020-12-07
 * @Author: Max Base
 * @Repository: https://github.com/BaseMax/socketio-chat-application-nodejs
*/

// import libs
const fs          = require("fs");
const ioServer    = require("socket.io");
const http        = require("http")
const https       = require("https");
const httpPort    = 9098;
const httpsPort   = 9099;

// headers
const CORS = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTIONS" ) {
        res.writeHead(200);
        res.end();
        return;
    }
};

// http webserver
const httpServer  = http.createServer(CORS);
// https webserver
const httpsServer = https.createServer({
  // read certificates from disk
  "key": fs.readFileSync("selfsigned.key"),
  "cert": fs.readFileSync("selfsigned.crt"),
  "ca": fs.readFileSync("selfsigned.ca")
}, CORS);


// socket
const io = ioServer();

// listen port(s)
httpServer.listen(httpPort, function() {
    console.log(`Listening HTTP on ${httpPort}`);
});
httpsServer.listen(httpsPort, function() {
    console.log(`Listening HTTPS on ${httpsPort}`);
});

// attach socket to webserver(s)
io.attach(httpServer);
io.attach(httpsServer);

members = []
io.on('connection', function(socket) {
  console.log('A user connected')

  socket.on('set-username', function(data) {
    console.log(data)

    if(members.indexOf(data) > -1) {
      socket.emit('user-exists', data + ' username is taken!')
    }
    else {
      members.push(data)
      socket.emit('user-set', {username: data})
    }
  })

  socket.on('message', function(data) {
    io.sockets.emit('message', data)
  })
})

