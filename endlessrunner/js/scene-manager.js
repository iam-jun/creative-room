function scene(name, isActive, draw, audioManager){
	this.name = name;
	this.isActive = isActive;
	this.draw = draw;
	this.setActive = function(active){
		this.isActive = active;
	}
}
var sceneManager = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton		
		var arr = [];
		var num;
        return {
            // Public methods and variables
			addScene: function(scene){
				arr.push(scene);
			},
            loadScene: function (number) {
				if(arr[number].isActive){
						num = number;
				}
            },
			getScene: function(n){
				return arr[n];
			},
			getCurrentScene: function(){
				return arr[num];
			},
			destroyScence: function(){
				
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
