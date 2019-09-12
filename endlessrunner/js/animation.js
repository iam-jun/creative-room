function waitSeconds(iMilliSeconds) {
  while (new Date() < iMilliSeconds * 1000) {}
  return true;

}
function SpriteSheet(path, col, row) {
	this.image = new Image();
	this.image.src = path;
	this.framesHeight = this.image.height /row;
	this.framesWidth = this.image.width /col;
	this.getSpriteSheet = function(){
		var arr = [];
		for(var i=0; i<row;i++){
			for(var j=0;j<col;j++){
				
				var obj = {
					x: this.framesWidth*j,
					y: this.framesHeight*i
				}
				arr.push(obj);
			}
		}
		return arr;
	}
}


function Animation(spritesheet, position, x, y, w, h) {
	var arr = spritesheet.getSpriteSheet();
	ctx.drawImage(spritesheet.image, arr[position].x,arr[position].y,spritesheet.framesWidth,spritesheet.framesHeight, x, y, w, h);		
}
 