function Menu(){
	
	this.datas = []
	this.pers  = new Vector(Math.random()*100,Math.random()*100)
	this.data = {
		
		x : this.pers.x,
		y : this.pers.y,
		
	}
	

	
	this.draw = function(){
		
		for(i = 0; i< this.datas.length; i++){
			
			game.ctx.fillStyle = "black"
			game.ctx.fillRect(this.datas[i].x,this.datas[i].y,100,100)
			
		}
		
		game.ctx.fillStyle = "blue"
		game.ctx.fillRect(this.pers.x,this.pers.y,100,100)
		
	}
	
	this.update = function(){
		
		
		if(this.datas.length > 0){
			
		
		}
		
		this.data = {
		
			x : this.pers.x,
			y : this.pers.y,
		
		}
		game.socket.emit("update",this.data)
		game.socket.on("obj",function(data){
			
			game.menu.datas = data
			
			
		})
		
		if(Inputs.key[39]){
			
			this.pers.x ++
			
		}else if(Inputs.key[37]){
			
			this.pers.x --
			
		}else if(Inputs.key[38]){
			
			this.pers.y--
			
		}else if(Inputs.key[40]){
			
			this.pers.y ++
			
		}
		
	}
	
}
function Level1(){

	
	this.draws = function(){
		
		
		if(this.start){
			
			this.move()
			
		}
		
	}
	this.move = function(){	
	
		
		
	}
	
	this.checkwin = function(){}
	
	this.moveTick = function(){}
	
	this.update = function(){
	
		if(game.frame>= 9){
		
			this.start = true
			
		}
		
		
	}
	
}
function Level2(){
	
	this.draws = function(){}
	
}
function Options(){
	
	this.draw = function(){}
	
}