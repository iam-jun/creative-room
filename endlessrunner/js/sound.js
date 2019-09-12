var soundManager = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton		
		
        return {
            // Public methods and variables
			bg_sound: new Audio("sounds/bg.mp3"),
			coin_sound: new Audio("sounds/smb_coin.wav"),
			jump_sound: new Audio("sounds/jump.ogg"),
			lose_sound: new Audio("sounds/smb_gameover.wav"),
			win_sound: new Audio("sounds/smb_world_clear.wav"),
			load: function(){
				this.bg_sound.load();
				this.coin_sound.load();
				this.lose_sound.load();
				this.win_sound.load();
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
