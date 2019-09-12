var mainplayer = (function () {
    // Instance stores a reference to the Singleton
    var instance;
	
    function init() {
        // Singleton
		
		var sheet = new SpriteSheet(sprites_dir+assets.imgs.player, 6, 2);
		var startRun = 2;
        return {
            // Public methods and variables
			gravity: 1,
			speed: 15,
			x: 150,
			y: canvas.height-160-40,
			w: 100,
			h: 160,
			isRunning: true,
			isFalling: false,
			isJumping: false,
			frameTime: 0,
			score: 0,
            run: function () {
				console.log("run");
				Animation(sheet, startRun, this.x, this.y, this.w, this.h);
				if(this.frameTime>=150){
					startRun++;
					this.frameTime = 0;
				}
				if(startRun>=9) startRun   =2;
            },
			jump: function(){
				console.log("jump");
				Animation(sheet, 1, this.x, this.y, this.w, this.h);
				this.y-=this.speed;
				this.speed-=0.5;
				if(this.speed==0){
					userInput = false;
					this.isJumping = false;
					this.isFalling = true;
				}
			},
			fall: function(){
				console.log("fall");
				Animation(sheet, 0, this.x, this.y, this.w, this.h);
				this.y +=this.speed;
				this.speed+=0.5;
			},
			die: function(){
				Animation(sheet, 10, this.x, this.y, this.w, this.h);
				this.isRunning =  false;
				this.isJumping = false;
				this.y +=5;
			},
			update: function(){
				console.log("player state: run "+player.isRunning +" jump "+player.isJumping +" fall "+player.isFalling+ " y "+player.y+" x "+player.x);
				if(this.isRunning && !this.isJumping && !this.isFalling){
					this.frameTime+=dt;
					this.run();
				}
				if(this.isJumping && !this.isRunning && !this.isFalling){
					this.jump();
				}
				if(this.isFalling && !this.isJumping && !this.isRunning){
					this.fall();
				}
				if(this.isDie){
					this.die();
				}
				
			},
			reset: function(){
				this.speed = 15;
			}
			
        };
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();