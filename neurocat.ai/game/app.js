$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];

	//make canvas full screen
    var ttxt = document.getElementById("title");
    var ttxtc = document.getElementById("canvas");

    document.getElementById('upbut').onclick = reply_click;
    document.getElementById('downbut').onclick = reply_click;
    document.getElementById('leftbut').onclick = reply_click;
    document.getElementById('rightbut').onclick = reply_click;


    var up = new Image();
    var left = new Image();
    var right = new Image();
    var down = new Image();
    var up_press = new Image();
    var left_press = new Image();
    var right_press = new Image();
    var down_press = new Image();
    up.src = "game/white_buttons/ncup.png";
    left.src = "game/white_buttons/ncleft.png";
    right.src = "game/white_buttons/ncright.png";
    down.src = "game/white_buttons/ncdown.png";
    up_press.src = "game/white_buttons/ncuppress.png";
    left_press.src = "game/white_buttons/ncleftpress.png";
    right_press.src = "game/white_buttons/ncrightpress.png";
    down_press.src = "game/white_buttons/ncdownpress.png";

    const key_img = ["game/white_buttons/ncup.png", "game/white_buttons/ncdown.png", "game/white_buttons/ncleft.png","game/white_buttons/ncright.png"];
    const key_img_pressed = ["game/white_buttons/ncuppress.png", "game/white_buttons/ncdownpress.png", "game/white_buttons/ncleftpress.png","game/white_buttons/ncrightpress.png"];
    const directions = ["up", "down", "left", "right"];
    const directionbuts = ["upbut", "downbut", "leftbut", "rightbut"];
	var size = Math.min(window.innerWidth, window.innerHeight-ttxt.clientHeight);
	size -= size%10;
	canvas.width = ttxtc.width;
	canvas.height = ttxtc.height;
    // canvas.height = window.innerHeight;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	h -= h%10;
	// var buttonSize = ($("#canvas").height()-ttxt.offsetHeight)/7-5;

	var cell_w = 10;
	var direction;
	var food;
	var score=0;
	var steps=0; // important for the speed of the dot

	//Lets create the snake now
	var snake_array; //an array of cells to make up the snake

	function init()
	{
		//at the beginning the snake walks right
		direction = "right";
		create_snake();
		create_food();
		score = 0;

		//check tipping of the keys
		$('#canvas').click(function (e) {
			//because the canvas is maybe moved
			var clickedX = e.pageX - this.offsetLeft-(window.innerWidth - size)/2;
			var clickedY = e.pageY - this.offsetTop - (ttxt.offsetHeight);
			key_pressed(clickedX, clickedY);
		});

		//create endless draw loop
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();

	function create_snake()
	{
		var length = 5; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0});
		}
	}

	//Lets create the food now
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cell_w)/cell_w),
			y: Math.round(Math.random()*(h-cell_w)/cell_w)
		};
	}

	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#565251";
		ctx.strokeRect(0, 0, w, h);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		if(direction == "right"){
			nx++;
        }
		else if(direction == "left"){
			nx--;
        }
		else if(direction == "up"){
			ny--;
        }
		else if(direction == "down"){
			ny++;
        }
        Keydirection();

		//detection of collision with border or itself
		if(nx <= -1 || nx >= w/cell_w || ny <= -1 || ny >= h/cell_w || check_collision(nx, ny, snake_array))
		{
			//restart game
			init();

			return;
		}

		//eating food
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop();
			tail.x = nx; tail.y = ny;
		if(steps >= 37-score){
     			if(!(food.x <= 0 || food.x >= w/cell_w-1 )){
        			food.x += Math.floor((Math.random() * 3) - 1);
      			}if(!(food.y <= 0 || food.y >= h/cell_w-1)){
        			food.y += Math.floor((Math.random() * 3) - 1);
      			}steps=0;
		}else{
			steps++;
		}
			
		}

		//tail is now the first cell
		snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Lets paint 10px wide cells
			paint_cell(c.x, c.y, i);
		}

		paint_cell(food.x, food.y, snake_array.length);
		var score_text = "Level: " + score;
		ctx.fillText(score_text, 5, h-5);
	}

	//paint cells in nc colors
	function paint_cell(x, y, num)
	{	
		var gc_colors = ["#1BCFC3", "#1BCFC3" , "#1BCFC3"];
		ctx.fillStyle = gc_colors[num % 3];
		ctx.fillRect(x*cell_w, y*cell_w, cell_w, cell_w);
		ctx.strokeStyle = gc_colors[num % 3];
		ctx.strokeRect(x*cell_w, y*cell_w, cell_w, cell_w);
	}

	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
    function reply_click()
    {
    	for(var i=0; i<directionbuts.length; i++){
    		if(this.id==directionbuts[i]){
    			direction=directions[i]
			}
		}
    }
	//control the snake
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
	});

	window.onorientationchange = function(){
		location.reload();
	};

	window.onresize = function(){
		location.reload();
	};

	function Keydirection(){
        for(var i = 0; i < directions.length ; i++){
        	if(direction != directions[i]){
        		document.getElementById(directions[i]).src = key_img[i];
            }else{
                document.getElementById(directions[i]).src = key_img_pressed[i];
			}
        }
	}
});
