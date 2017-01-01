window.onload = function(){
	
	start()
	
}

function Game(){

	this.socket					= io.connect()
	this.canvas 				= document.getElementById("canvas")
	this.canvas.style.cursor 	= "none"
	this.canvas.style.top       = "0px"
	this.canvas.style.left      = "0px"
	this.canvas.style.position  = "absolute"
	this.canvas.width 	   		= window.innerWidth 
    this.canvas.height 	   		= window.innerHeight
	this.ctx 			   		= this.canvas.getContext("2d")
	//this.why 			   		= 85
	//this.hhy                  = 85
	//this.whe 			   		= 87
	//this.hhe                  = 86
	this.x				   		= 0
	this.y				   		= 0
	this.tick 			   		= 0
	this.frame                  = 0
	this.TicksPerFrame 	   		= 4
	this.frameIndexX 	   		= 0
	this.frameIndexY 	   		= 0
	this.movement      	   		= false
	this.hermFrames    	   		= [{walk:4},{wand:2}]
	this.level1            		
	this.start         	   		= true
	this.fullscreen    	   		= false
	


	
	//resources
	rh = new resources( function() {
     
		game.GameLoop();
		game.LoadLevel(0);
		
	});	
	//this.sprHermione        = rh.loader("img/hermionegranger.png",1)
	//this.sprHarry           = rh.loader("img/harrypotter.png",1)
	//this.coursor            = rh.loader("img/cursor.png",1)
	//this.background         = rh.loader("img/menubg.png",1)
	//this.level1bg           = rh.loader("img/level1bg.png",1)
	//this.Scopa              = rh.loader("img/Scopa.png",1)
	//this.ScopaD             = rh.loader("img/ScopaD.png",1)
	//this.Malfoy             = rh.loader("img/dracomalfoy.png",1)
	//this.ricordella         = rh.loader("img/ricordella.png",1)
	//this.offscreenico       = rh.loader("img/offscreen.png",1)
	//this.fullscreenico      = rh.loader("img/fullscreen.png",1)
	//this.sndmenu            = rh.audio ("sounds/menusnd.mp3",1)
	//this.riegel             = rh.loader("img/riegel.png",1)
	
	
	//Game Loop
	this.GameLoop = function(){
		
		this.draw()
		this.update()
		if(this.start){
			
			this.LoadLevel(0)
			this.socket.emit("created",this.menu.data)
		}
		this.start = false
		Inputs.Clear()
		window.requestAnimationFrame(function(){game.GameLoop()})
	}
	
	this.LoadLevel= function(level){
		
		this.Level = level
		this.menu = null
		
		if(level == 0){
			
			this.menu  = new Menu()
			
		}else if(level == 1){
			
			localStorage.setItem("level",this.Level)
			this.leveln = new Level1()
			
		}else if(level == 2){
			
			localStorage.setItem("level",this.Level)
			this.level2 = new Level2()
			
		}else if(level == 666){
			
			this.options = new Options()
			
		}
		
	}
	//Draw
	this.draw = function(){
		
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
		//drawImage(img, Xcrop, Ycrop, CropWidth, CropHeight, Xpos, Xpos, width, height)
		//? w*1 || w*5...  h+1
		if(this.Level == 0){
			
			this.menu.draw()
			
		}else if(this.Level == 1){
			
			this.leveln.draws()

		}else if(this.Level == 2){
			
			this.level2.draws()

		}else if(this.Level == 666){
			
			this.options.draw()
			
		}	
		//this.ctx.drawImage(this.fullscreenico,1200,750,48,32)	
		//this.ctx.drawImage(this.coursor,Inputs.mouseX,Inputs.mouseY)
		
	}
	
	//update
	this.update = function(){
		
		this.tick++
		if(this.tick > this.TicksPerFrame){
			
			this.tick = 0
			if(this.Level == 1){
				
				this.frame++
				this.leveln.moveTick()
			}
			
		}
		if(this.Level == 0){
			
			
			this.menu.update()
			
		}
		
		
		
	}
	window.addEventListener("click",function(){	
		
		if(Inputs.MouseInsideRect(1200,750,48,32)){
				
			if(this.fullscreen){
				this.fullscreen = false
				this.canvas.style.top = "0px"
				document.webkitExitFullscreen()
				console.log("offscreen")
			}else{
				
				this.fullscreen = true
				this.canvas.style.top = "70px"
				this.canvas.webkitRequestFullscreen()
				console.log("fullscreen")
			}
		}
		
	})

	
	this.move = function(){
		
		if(this.movement){
			game.frameIndexX++
		}
		
	}
	
	//start GameLoop
	this.GameLoop()
	
}

function Vector(x,y,w,h){
	
	this.wil     = w
	this.hil     = h
	this.x       = x
	this.y       = y
	this.centerx = this.x+(this.wil/2) 
	this.centery = this.y+(this.hil/2)

	this.sig
	this.i       = 0

	
	this.moveto = function(vec,vel,i,funct){
		
		this.sig = i
		this.vel = vel
		
		if(this.i < 1){
		this.ax = vec.x - this.centerx
		this.ay = vec.y - this.centery
		}
	
		if(i != undefined){
			
			if(this.i<this.sig){
				this.x += this.ax/this.vel
				this.y += this.ay/this.vel
			}
		
		}else if(i == undefined){
			this.x += this.ax/this.vel
			this.y += this.ay/this.vel
		}
		if(funct != undefined){
			
			funct()
			
		}
		this.i++
	
	}
	this.colisionX = false
	this.colisionY = false

	this.checkColision = function(b){
		
		this.col = b
		
		if(this.y <= this.col.y+this.col.hil && this.y + this.hil >= this.col.y){
			
			
			if(this.x <= this.col.x+this.col.wil && this.x + this.wil >= this.col.x){

				this.colision = true
				
			}
		    
		}
		return (this.colision)
	
	}
	
}      


function start(){
	
	game = new Game();
	
}

