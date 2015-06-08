/*
 * JS for warehouse asset tracking prototype.
 * Written by: Matthew Stagg
 * 06/02/2015
 */


// Intialize canvas and createjs stage
var canvas= document.getElementById("trackerWindow");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;   
var stage = new createjs.Stage("trackerWindow");
var img = new createjs.Bitmap("testsvg.svg");
img.image.onload = mapLoad;
createjs.Ticker.setFPS(60);

// Intitalize events
createjs.Ticker.addEventListener("tick", stage);
stage.addEventListener("stagemousedown", onMouseDown);
canvas.addEventListener("mousewheel", MouseWheelHandler, false);
canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
var assets = new Array();

// Resizes SVG file after image loads and displays it
// Remainder of program waits ot execute until after blueprint is loaded!
function mapLoad(e){
	img.scaleX = img.scaleY = Math.min(canvas.width / img.image.width, canvas.height / img.image.height);
	stage.addChild(img);
	createAssets();
}

// Creates all assets
function createAssets(){
	assets.push(new Asset("Yellow", 50));
	assets.push(new Asset("Red", 75));
	assets.push(new Asset("Green", 100));
	assets.push(new Asset("Blue", 125));
	assets.push(new Asset("Purple", 150));
	assets.push(new Asset("Orange", 175));
	// Testing logs
	console.log("move 1: " + assets[0].path[0].a);
	console.log("move 2: " + assets[0].path[1].a);
	console.log("move 3: " + assets[0].path[2].a);
}

// Asset Structure
function Asset(c, v){
	this.shape = new createjs.Shape();
	this.color = c;
	this.shape.graphics.beginFill(this.color)
	.moveTo(0, 0)
	.lineTo(10, 0)
	.lineTo(20, 10)
	.lineTo(10, 20)
	.lineTo(0, 20)
	.lineTo(0, 0);			//TODO: Give assets shape that can indicate direction
	this.velocity = v;
	this.direction = 0;
	this.path = generatePoints();
	stage.addChild(this.shape);
	generateTween(this);
}

// Generates array that represents path for asset to travel along
// Each point on path contains x location, y location, and a direction in degrees to the next point
function generatePoints(){
	var size = Math.floor((Math.random() * 12) + 4);
	var nodes = new Array(size);
	nodes[0] = {x:0, y:0, a:null};
	for(var i = 1; i < size; i++){
		nodes[i] = {x:(Math.floor((Math.random() * (img.image.width * img.scaleX)) + 1)), y:(Math.floor((Math.random() * (img.image.height * img.scaleY)) + 1))};
		nodes[i - 1].a = getDirection(nodes[i - 1], nodes[i]);
	}
	nodes[nodes.length - 1].a = getDirection(nodes[nodes.length - 1], nodes[0]);
	return nodes;
}

// Queues up a loop of tweens between all of an asset's path nodes
function generateTween(a){
	var t = createjs.Tween.get(a.shape, {loop:true, paused:true});
	a.shape.regX = a.shape.x + 10;
	a.shape.regY = a.shape.y + 10;
	for(var i = 0; i < a.path.length - 1; i++){
		var d = distance(a.path[i], a.path[i + 1]);
		var time = (d / a.velocity) * 1000;
		t.to({rotation: a.path[i].a}, 1000);
		t.to({x:a.path[i + 1].x, y:a.path[i + 1].y}, time);
	} 
	d = distance(a.path[a.path.length - 1], a.path[0]);
	time = (d / a.velocity) * 1000;
	t.to({rotation: a.path[a.path.length - 1].a}, 1000);
	t.to({x:a.path[0].x, y:a.path[0].y}, time);
	t.setPaused(false);
}

// Returns distance between two cartesian points
function distance(p1, p2){
	var x1 = p1.x;
	var x2 = p2.x;
	var y1 = p1.y;
	var y2 = p2.y;
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

// Returns direction as an angle in respect to an eastern vector from one cartesian point to another
function getDirection(p1, p2){
	//to get radians: arctangent(slope from p1 to p2)
	//to get degrees: multiply above by (180 / Pi)
	var dir = ((Math.atan((p2.y - p1.y) / (p2.x - p1.x)))) * (180 / Math.PI);
		
	if(p2.x > p1.x){  	// If asset is moving right
		if(dir > 0){
			//return 360 - dir;
			dir = 360 - dir;
		} else {
			//return 0 - dir;
			dir = 0 - dir;
		}
	} else {			// If asset is moving left
		if(dir > 0){
			//return 180 - dir;
			dir = 180 - dir;
		} else {
			//return -dir + 180;
			dir = -dir + 180;
		}
	}

	// WARNING: The following code exists only to make this function compatible with tweenjs rotation property
	// If tweenjs library is removed, uncomment return statements in if/else statement above
	return Math.abs(dir - 360);
}

// Listen for mouse click Events, handles dragging
function onMouseDown(e) {
	var offset={ x: stage.x - e.stageX, y: stage.y - e.stageY };
	stage.addEventListener("stagemousemove",function(ev) {
		stage.x = ev.stageX + offset.x;
		stage.y = ev.stageY + offset.y;
		stage.update();
	});
	stage.addEventListener("stagemouseup", function(){
		stage.removeAllEventListeners("stagemousemove");
	});
}

// Listen for mouse wheel Events, handles zooming
var zoom;
function MouseWheelHandler(e) {
	if(Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))>0)
		zoom=1.1;
	else
		zoom=1/1.1;
    // Move the point in the direction of the current mouse position, for smooth transition
    var new_point = new createjs.Point(
        stage.regX + parseInt((stage.mouseX - stage.regX)/2),
        stage.regY + parseInt((stage.mouseY - stage.regY)/2));
	stage.x = stage.regX = new_point.x;
    stage.y = stage.regY = new_point.y;
	stage.scaleX=stage.scaleY*=zoom;
}