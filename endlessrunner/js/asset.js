var assetsLoader = (function(){
	var instance;
	this.imgs = {
			sky_moon: "01_sky_moon.png",
			city: "03_city.png",
			city2: "04_city.png",
			bush: "05_bush.png",
			trees: "05_trees.png",
			coin: "coin.png",
			one_way: "oneway.png",
			platform: "platform.png",
			player: "player.png",
			tires: "tires.png",
			btn_replay: "btnReplay.png",
			btn_replay2: "btnReplay2.png",
			sad_boy: "sad.png",
			happy_boy: "happy.png"
	};
	function init(){
		var numImgs = Object.keys(this.imgs).length;
		var arr = [];
		var count=0;
		for (var img in this.imgs) {
		  if (this.imgs.hasOwnProperty(img)) {
				src = this.imgs[img];
				var img = new Image();
				img.src = "sprites/"+src;
				img.onload = function(){
					count++;					
					if(count == numImgs){
						main();
					}
				};				
		  }
		}
		return {
            imgs: this.imgs,
			ImgsLength: numImgs
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
