var scoreboard = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton		
		var score = 0;
        return {
            // Public methods and variables
			update: function(){
				ctx.font = "30px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Score: "+ player.score,100,100);
			},
			isNewRecord: function(){
				var oldscore = localStorage.getItem("highscore");
				var isNew = false;
				if(oldscore == undefined){
					isNew =  true;
				}else if(player.score>=oldscore){
					isNew =  true;
				}
				return isNew;
			},
			saveScore: function(){
				localStorage.setItem("highscore", player.score);
			},
			getScore: function(){
				return localStorage.getItem("highscore");
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
