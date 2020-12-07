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
