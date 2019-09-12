var object = function(tag,spritesheet, x, y, w, h){
	this.tag = tag;
	this.sheet = spritesheet;
	this.x = x;
	this.y = canvas.height-h-y;
	this.w = w;
	this.h = h;
	this.speed = 8;
}
object.prototype.update = function(){
	var img = new Image();
	img.src = this.sheet;
	ctx.drawImage(img, this.x,this.y,this.w,this.h);
	this.x-=this.speed;
}

 function coin(tag,spritesheet, x, y){
	 object.call(this, tag,spritesheet, x, y, 50, 50);
	 this.frameTime = 0;
	 this.startRun = 0;
//	 requestAnimationFrame(this.update);
 }
 coin.prototype.update = function(){
	this.frameTime+=dt;
	Animation(this.sheet, this.startRun, this.x, this.y, this.w, this.h);
	this.x-=this.speed;
	if(this.frameTime>=250){
			this.startRun++;
			this.frameTime = 0;
	}
	if(this.startRun>=5) this.startRun = 0;
 }