var express = require('express');
var app = express();
var http = require('http').createServer(app).listen(process.env.PORT||3009,function(){
	console.log('Application running on port '+this.address().port);
});
var io = require('socket.io')(http)
var userlist = {};
//var liveVideoCalls = {};
app.use(express.static(__dirname+'/public/'));
app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/index.html');
});

let numUsers = 0;

io.sockets.on('connection',function(socket){
	let addedUser = false;

	console.log('A user has connected!');
	socket.on('new user',function(data,callback){
		console.log('user wants to connect as '+data);
		if(data in userlist){
			callback(false);
		}else{
			callback(true);
			socket.username = data;
			userlist[socket.username] = socket;
			updateUserList();
		}
	});
	function updateUserList(){
		io.sockets.emit('users',Object.keys(userlist));
	}
	socket.on('disconnect',function(data){
		if(!socket.username)
			return;
		delete userlist[socket.username];
		updateUserList();
	});
	socket.on('new message',function(data){
		io.sockets.emit('message',{name:socket.username, msg:data});
	});
	
	socket.on('newVideoChatRequest',function(data,callback){
		console.log('Call request from '+data.sender+' to '+data.receiver);
		if(data.receiver in userlist){
			userlist[data.receiver].emit('newVideoCallRequest',{from:data.sender,to:data.receiver},function(res){
				callback(res);
				console.log('Call request from '+data.sender+' to '+data.receiver+' was '+res.reason);
			});
			
		}else{
			callback({response:false,reason:'No such user online.'});
		}
	});
	socket.on('hangup',function(data){
		console.log('User hangup target :'+data);
		io.sockets.emit('hangup',data);
	});
	socket.on('candidate',function(data){
		console.log('candidate call to '+data.targetUser+' with candidate'+data.candidate);
		io.sockets.emit('candidate',data);
	});
	socket.on('offersdp',function(data){
		console.log('offersdp to '+data.targetUser+' with offerSDP'+data.offerSDP);
		io.sockets.emit('offersdp',data);
	});
	socket.on('answersdp',function(data){
		console.log('answersdp to '+data.targetUser+' with answersdp'+data.answerSDP);
		io.sockets.emit('answersdp',data);
	});

	  // when the client emits 'new message', this listens and executes
	  socket.on('new message', function(data){
		// we tell the client to execute 'new message'
		socket.broadcast.emit('new message', {
		  username: socket.username,
		  message: data
		});
	  });

	 // when the client emits 'add user', this listens and executes
	 socket.on('add user', function(username) {
		if (addedUser) return;
	
		// we store the username in the socket session for this client
		socket.username = username;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
		  numUsers: numUsers
		});
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit ('user joined', {
		  username: socket.username,
		  numUsers: numUsers
		});
	  });
	
	  // when the client emits 'typing', we broadcast it to others
	  socket.on('typing', () => {
		socket.broadcast.emit('typing', {
		  username: socket.username
		});
	  });
	
	  // when the client emits 'stop typing', we broadcast it to others
	  socket.on('stop typing', () => {
		socket.broadcast.emit('stop typing', {
		  username: socket.username
		});
	  });
	
	  // when the user disconnects.. perform this
	  socket.on('disconnect', () => {
		if (addedUser) {
		  --numUsers;
	
		  // echo globally that this client has left
		  socket.broadcast.emit('user left', {
			username: socket.username,
			numUsers: numUsers
		  });
		}
	  }); 
});