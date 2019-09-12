var app;
var assets;
var sound;
var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");
var t_now;
var t_last = Date.now();
var dt;
var sprites_dir = "sprites/";
var fps = 30;
var interval = 1000/fps;
var frameTime = 0;
var sceneManager;
var player;
var colli;
var score;
var rule;
var userInput = false;
var time_to_show_end=0;

var Application = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton
	    background.reset();
		var loading_w = 0;
		player = mainplayer.getInstance();		
		colli = collision.getInstance();
		score = scoreboard.getInstance();
		var drawLoadingScene = function(){
			ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#20B2AA";
			ctx.fill();
			if(frameTime>300){
				if(loading_w>=700){
					ctx.clearRect(0,0,canvas.width, canvas.height);
					loadingScene.setActive(false);
					beginScene.setActive(true);
					sceneManager.loadScene(1);
					sound.bg_sound.loop = true;
					sound.bg_sound.play();
				}else{
					loading_w+=10;
					ctx.beginPath();
					ctx.rect((canvas.width*22)/100, (canvas.height*40)/100, loading_w, 50);
					ctx.fillStyle = "white"; 
					ctx.fill();
				}
			}
		}
		var loadingScene = new scene("loading", true, drawLoadingScene);
		sceneManager.addScene(loadingScene);
		rule = game_rule.getInstance();
		var coin = rule.coin;
		var brick = rule.brick;
		var tire = rule.tire;
		var beginDraw = function(){
			background.draw();
			player.update();		
			rule.update();	
			score.update();
		};
		var beginScene = new scene("begin", false, beginDraw );
		sceneManager.addScene(beginScene);
		var endDraw =  function(){
			
			var btn_img = document.createElement("img");
			btn_img.setAttribute("src", sprites_dir+assets.imgs.btn_replay);
			btn_img.setAttribute("style", "position: absolute; z-index: 2; width: 30%; left: 35%; top: 500px; float: left");
			var arr_img = document.getElementsByTagName("img");
			if(arr_img.length<1){
				var arr = document.getElementsByTagName("body");
				arr[0].appendChild(btn_img);
				btn_img.addEventListener("mousedown",function(){
					btn_img.setAttribute("src", sprites_dir+assets.imgs.btn_replay2);
				});
				btn_img.addEventListener("mouseup",function(){
					btn_img.setAttribute("src", sprites_dir+assets.imgs.btn_replay);
					location.reload();
				});
				ctx.beginPath();
				ctx.rect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "#20B2AA";
				ctx.fill();
				if(score.isNewRecord()){
					console.log("high score");
					sound.win_sound.play();
					var happy_img = new Image();
					happy_img.src =  sprites_dir+assets.imgs.happy_boy;
					ctx.drawImage(happy_img, canvas.width/2-100, 80, 200, 200);
					ctx.beginPath();
					ctx.font = "40px Comic Sans MS";
					ctx.fillStyle = "red";
					ctx.textAlign = "center";
					ctx.fillText("Congrats! You have new record!",canvas.width/2, canvas.height/2);
					score.saveScore();
				}else{
					console.log("bad score");
					sound.lose_sound.play();
					var sad_img = new Image();
					sad_img.src =  sprites_dir+assets.imgs.sad_boy;
					ctx.drawImage(sad_img, canvas.width/2-100, 80, 200, 200);
					
					ctx.beginPath();
					ctx.font = "40px Comic Sans MS";
					ctx.fillStyle = "red";
					ctx.textAlign = "center";
					ctx.fillText("High Score: "+ score.getScore(),canvas.width/2, 350);
				}
			}
			
			ctx.beginPath();
			ctx.font = "30px Comic Sans MS";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("Your Score: "+ player.score,canvas.width/2, 450);
		};
		var endScene = new scene("end" , false, endDraw);
		sceneManager.addScene(endScene);
        return {
            // Public methods and variables
            update: function () {
				if(sceneManager.getCurrentScene().name == "begin"){
					if(rule.arr.length==3){
						checkItem(rule.arr[0]);
						checkItem(rule.arr[1]);
						checkItem(rule.arr[2]);
					}
					if(!player.isDie)
					if(colli.checkCollision(player, background.tmpGround)){
						if(!player.isJumping){
							player.isFalling = false;
							player.reset();
							player.isRunning = true;
						}
					}
				}
				//console.log("update");
            },
			render: function(){
                
				sceneManager.getCurrentScene().draw();		
				//console.log("render");
			},
			destroy: function(){
				
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

function checkItem(item){
	if(item.tag=="coin"){
		if(colli.checkCollision(player, item)){
			sound.coin_sound.play();
			item.x -=1000;
			player.score++;
		}
	}
					
	if(item.tag=="tire"){
		if(colli.checkCollision(player, item)){
			sound.bg_sound.pause();
			player.isDie = true;		
			setTimeout(function(){
				sceneManager.getScene(2).setActive(true);
				sceneManager.loadScene(2);
			}, 1000);
		}
	}
	if(item.tag=="brick"){
		if(!userInput){
			if(player.y<=item.y && player.x<item.x + item.w-20 && player.x + player.w > item.x+20){
					player.reset();
					player.isFalling = false;
					player.isJumping = false;
					player.y = item.y-player.h;
					player.isRunning = true;
					if(player.x>item.x+270){
						player.speed = 5;
						player.isRunning = false;
						player.isFalling = true;
					}
			}
		}
	}
}

function run() {
	requestAnimationFrame(run);
    var t_now = Date.now();
    dt = t_now - t_last;   
    
	
	app.update();
    app.render();
	if (dt > interval) {
		frameTime+=dt;
		t_last = t_now - (dt % interval);
		
	}
}
 
function main() {
	console.log("main");
	app = Application.getInstance();
	sceneManager.loadScene(0);
    run();
	window.addEventListener("click", playerJump);
	document.addEventListener('keydown', function(event) {
			if(event.keyCode == 32) {
				playerJump();
			}
	});
	
}
function playerJump(){
	if(sceneManager.getCurrentScene().name == "begin"){
			if(!player.isFalling){
				userInput = true;
				sound.jump_sound.play();
				player.isJumping = true;
				player.isRunning = false;
				player.isFalling = false;
				
			}
					
	}
}
window.addEventListener("load", function () {
	assets = assetsLoader.getInstance();
	sound = soundManager.getInstance();
	sceneManager = sceneManager.getInstance();
});


					
