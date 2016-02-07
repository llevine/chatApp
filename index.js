// requiring express. express is a server framework
var express = require('express');

var app = express();

// the line below creates an http server for the app
var http = require('http').Server(app);

// socket.io is a websocket package. creating a new instance of a http server.  Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object.
var io = require('socket.io')(http);

// needed to connect the stylesheet. stylesheets are seen as "static" files
app.use(express.static('public'));

// // req is what's coming in and res is what's going out
app.get('/', function(req, res){
	// .send tells dom what to display in browser. in this case the response to the get request is displaying a h1 header that states "hello world"
	// So far in index.js we’re calling res.send and pass it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a index.html file and serve it.
	// res.send('<h1>Hello World</h1>');


	// __dirname stands for the current directory that the file that is being read is in. in this case it's the address of where index.js is  (/Users/laurenlevine/repos/sockets)
	// below basically tells the dom to use index.html to populate the browser with it's html rendering vs what we wrote previous on line 11. 
	// res.sendFile(__dirname + '/index.html');
	// console.log(__dirname);

	res.sendFile(__dirname + '/index.html');

});

// id is arbitrary word. It is a web standard but can use any word as long as it is preceeded by a ":".
// app.get('/:id', function(req, res){
// 	// due to line below if user goes to localhost:3000/lauren browswer will display lauren. the line below sets the variable "name" to whatever comes after the slash in the url
// 	var name = req.params.id;
// 	res.send(name);
// });


// listening for a connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket){
  console.log('a user connected');

  // this is where we recieve the message from index.html's form and socket and tell the browser to print the message in the console. sorta says if there is a message respond by running the function which prints the message in the browser
  socket.on('chat message', function(msg){
  	 io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  // sockets have a disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



// tells the browser to run the server on localhost:3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

// the above codes translates into the following:
// 	1)  Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 5).
// 	2)  We define a route handler / that gets called when we hit our website home. (as seen in line 8)
//	3)  We make the http server listen on port 3000. (as seen in line 30)



// // connecting the server to the "public folder" so the server can read files from it
// app.use(express.static('public'));

// // will "serve" aka show up when u go to the domain localhost:3000
// app.get('/', function (req, res) {
// 	res.send("index.html")
// })