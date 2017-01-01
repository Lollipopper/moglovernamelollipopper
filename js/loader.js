function resources(callback){
	
	this.loader= function(url, frm,func){
		
		var img = new Image()
		img.src = url
		img.rh = this
		img.frm = frm
		
		this.w = this.width/this.frm
		
		img.onload = function(){
			
			if(func != undefined){
				
				funct()
				
			}
			
		}
		return img
		
	}
	
	this.audio = function(url,funct){
		
		var audio = new Audio()
		audio.src = url
		audio.rh = this
		
		this.w = this.width/this.frm
		
		audio.onload = function(){
			
			if(func != undefined){
				
				funct()
				
			}
			
		}
		
		return audio
		
	}
	
}