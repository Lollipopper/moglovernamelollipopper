var express = require('express')
	app 	= express()	
	server 	= require('http').createServer(app)
	io 		= require('socket.io').listen(server)
	
var users 		= []
var positions   = []
var datas       = []
var ids         = []


server.listen(3000)

console.log("server running...")

app.use(express.static("public"))

app.get('/',function(req,res){
	
	res.sendFile(__dirname + '/index.html')
	
})



io.sockets.on("connection",function(socket){

	console.log(ids.length + ": " + socket.id)	
	
	ids.push(socket.id)
	socket.broadcast.emit("obj", positions)
	
	socket.on("created", function(data){
		
		console.log(data)
		positions.push(data)
		
	})
	
	socket.on("update", function(data){
		
		for(i = 0; i < positions.length; i++){
			
			if(ids[i] == socket.id){
				
				positions.splice(i,1,data)
				socket.broadcast.emit("obj", positions)
				
			}
			
		}
		
	})
	
	socket.on("loller", function(data){
		
		socket.broadcast.emit("lol",data)
		datas.push(data)
		
	})
	socket.on("Quit", function(data){
		
		datas = data
		socket.broadcast.emit("refr",1)
		
	})
	
	socket.on("disconnect",function(){
		
		for(i = 0; i < positions.length; i++){
			
			if(ids[i] == socket.id){
				
				positions.splice(i,1)
				ids.splice(i,1)
				
			}
			
		}
		users.pop()
		
	})
	
	
})



