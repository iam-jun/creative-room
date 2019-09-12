var game_rule = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton	
		console.log("init game rule");		
		var coin_positoin_case = [150, 250, 350];
		var item_case = ["coin", "brick", "tire"];
		var coin_distance = [500, 700, 900];
		var renew = true;
		var coin_sheet = new SpriteSheet(sprites_dir+assets.imgs.coin, 3, 2);
		var brick_sheet = sprites_dir+assets.imgs.one_way;
		var tire_sheet = sprites_dir+assets.imgs.tires;
        return {
            // Public methods and variables
			arr: [],
			update: function(){				
				if(renew){
					console.log("Enough time");
					this.arr = [];
					var random1 = Math.floor(Math.random() * 3);
					var random2 = Math.floor(Math.random() * 3);
					var random3 = Math.floor(Math.random() * 3);
					this.showItem(item_case[random1]);
					this.showItem(item_case[random2]);
					this.showItem(item_case[random3]);
					renew = false;
				}
				if(this.arr.length==3){
					this.arr[0].update();
					this.arr[1].update();
					this.arr[2].update();
					if(this.arr[this.arr.length-1].x<=(0-this.arr[this.arr.length-1].w)){
						renew = true;
					}
				}
				
			},
            showItem: function (name) {
				var distance = Math.floor(Math.random() * 3);
				if(name == "coin"){
						var random_position = Math.floor(Math.random() * coin_positoin_case.length);
						var c = new coin("coin", coin_sheet, (canvas.width*1.2)+(coin_distance[distance]*(this.arr.length+1)), coin_positoin_case[random_position]);	
						this.arr.push(c);
				}else if(name == "brick"){
						var brick = new object("brick", brick_sheet, (canvas.width*1.2)+(coin_distance[distance]*(this.arr.length+1)), 200, 300, 60);
						this.arr.push(brick);
				}else if(name == "tire"){
					var tire =  new object("tire", tire_sheet, (canvas.width*1.2)+(coin_distance[distance]*(this.arr.length*2)), 40, 100, 150);
						this.arr.push(tire);
				}
            },
			checkHasTire: function(){
				var flag = false;
				for(var i=0;i<this.arr.length;i++){
					if(this.arr[i].tag == "tire") flag = true;
				}
				console.log(flag);
				return flag;
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
