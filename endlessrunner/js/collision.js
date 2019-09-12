var collision = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton		
		var arr = [];
		var num;
        return {
            // Public methods and variables
			checkCollision: function(rect1, rect2){
				if (rect1.x < rect2.x + rect2.w &&
				   rect1.x + rect1.w > rect2.x &&
				   rect1.y < rect2.y + rect2.h &&
				   rect1.h + rect1.y > rect2.y) {
					   return true;
				}else{
					return false; 
				}
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
