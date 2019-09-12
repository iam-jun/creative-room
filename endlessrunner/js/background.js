var background = (function() {
    var sky   = {};
    var backdrop = {};
    var backdrop2 = {};
    var tree = {};
    var bush ={};
    var ground ={};
    var m = new Image();
    var city = new Image();
    var city2 = new Image();
    var trees = new Image();
    var grasses = new Image();
    var gr = new Image();
    
  /**
   * Draw the backgrounds to the screen at different speeds
   */
   this.tmpGround = { }
  this.draw = function() {
    var n = 150;
    var tree_h = 500;
    var bush_h = 150;
    var ground_h = 60;
	this.tmpGround = {
		x: 0,
		y: canvas.height-60,
		w: canvas.width,
		h: 60
   }
	m.src = sprites_dir+assets.imgs.sky_moon;
	city.src = sprites_dir+assets.imgs.city;
	city2.src = sprites_dir+assets.imgs.city2;
    trees.src = sprites_dir+assets.imgs.trees;
    grasses.src = sprites_dir+assets.imgs.bush;
    gr.src = sprites_dir+assets.imgs.platform;
    ctx.drawImage(m, 0, 0, canvas.width, canvas.height);
    // Pan background
    backdrop.x -= backdrop.speed;
    backdrop2.x -= backdrop2.speed;
    tree.x -= tree.speed;
    bush.x -= bush.speed;
    ground.x -= ground.speed;
    // draw images side by side to loop
    ctx.drawImage(m, sky.x, sky.y, canvas.width, canvas.height);
    ctx.drawImage(city, backdrop.x, backdrop.y+n, canvas.width, canvas.height-n);
    ctx.drawImage(city, backdrop.x + canvas.width, backdrop.y+n, canvas.width, canvas.height-n);
    ctx.drawImage(city2, backdrop2.x, backdrop2.y+n, canvas.width, canvas.height-n);
    ctx.drawImage(city2, backdrop2.x + canvas.width, backdrop2.y+n, canvas.width, canvas.height-n);
    ctx.drawImage(trees, tree.x, tree.y+(canvas.height-tree_h), canvas.width, tree_h);
    ctx.drawImage(trees, tree.x + canvas.width, tree.y+(canvas.height-tree_h), canvas.width, tree_h);
    ctx.drawImage(grasses, bush.x, bush.y+(canvas.height-bush_h), canvas.width, bush_h);
    ctx.drawImage(grasses, bush.x + canvas.width, bush.y+(canvas.height-bush_h), canvas.width, bush_h);
    for(var i=0; i< Math.floor(canvas.width/gr.width)*2;i++){
         ctx.drawImage(gr, ground.x+(gr.width*i), ground.y+(canvas.height-ground_h), gr.width, ground_h);
    }
	ctx.beginPath();
	ctx.rect(this.tmpGround.x,this.tmpGround.y,this.tmpGround.w,this.tmpGround.h);
	ctx.fillStyle = 'rgba(100, 100, 100, 0)';
	ctx.fill();
    // If the image scrolled off the screen, reset
    if (backdrop.x + canvas.width <= 0){
        backdrop.x = 0;
    }
    if (backdrop2.x + canvas.width <= 0){
        backdrop2.x = 0;
    }
    if (tree.x + canvas.width <= 0){
        tree.x = 0;
    }
    if (bush.x + canvas.width <= 0){
        bush.x = 0;
    }
    if (ground.x + canvas.width <= 0+((canvas.width%gr.width)*2)){
        ground.x = 0;
    }
      
  };
  /**
   * Reset background to zero
   */
  this.reset = function()  {
    sky.x = 0;
    sky.y = 0;
    sky.speed = 0;
    backdrop.x = 0;
    backdrop.y = 0;
    backdrop.speed = 3;
    backdrop2.x = 0;
    backdrop2.y = 0;
    backdrop2.speed = 4;
    tree.x = 0;
    tree.y = 0;
    tree.speed = 5;
    bush.x = 0;
    bush.y = 0;
    bush.speed = 7;
    ground.x = 0;
    ground.y = 0;
    ground.speed = 8;
  };
  return {
    draw: this.draw,
    reset: this.reset,
	tmpGround: this.tmpGround
  };
})();