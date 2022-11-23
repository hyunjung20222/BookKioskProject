const socketio = require('socket.io');
const http = require('http');
const server = http.createServer().listen(9994);
// const io = socketio(server);

const io = socketio (server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });


io.sockets.on('connection', (socket) => {
	
	socket.join("output");
	socket.join("isbnput");
	socket.join("faceput");

	socket.on('inputdata', (data) => {
	console.log(data);
	io.sockets.in("output").emit('outputdata', data);
	});

	socket.on('isbndata', (data) => {
	console.log(data);
	io.sockets.in("isbnput").emit('isbnoutput', data);
	});

	socket.on('facedata', (data) => {
		console.log(data);
		io.sockets.in("faceput").emit('faceoutput', data);
	});
});