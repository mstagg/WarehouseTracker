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

// Resizes SVG file after image loads and displays it
// Remainder of program waits ot execute until after blueprint is loaded!
function mapLoad(e){
	img.scaleX = img.scaleY = Math.min(canvas.width / img.image.width, canvas.height / img.image.height);
	stage.addChild(img);
	main();
}

// Main function
function main(){
	//Test shapes
	var shp1 = new Asset("Yellow", 0, 0);
	var shp2 = new Asset("Red", 0, 0);
	var shp3 = new Asset("Green", 0, 0);
	var shp4 = new Asset("Blue", 0, 0);
	var shp5 = new Asset("Purple", 0, 0);
	alert(img.image.width);
}

// Asset Structure
function Asset(c, v, d){
	this.shape = new createjs.Shape();
	this.color = c;
	this.shape.graphics.beginFill(this.color).drawCircle(0, 0, 10);			//TODO: Give assets shape that can indicate direction
	this.velocity = v;														//TODO: Implement velocity that will control tweening speed
	this.direction = d;														//TODO: Implement directional facing
	this.movingToPoint = false;
	this.path = generatePoints();											//TODO: Refactor into dynamic structure. Current implementation is static and beyond disgusting.
	this.current = this.path.head;
	stage.addChild(this.shape);
	createjs.Tween.get(this.shape, { override:true, loop:true })
	.to({x:this.path.head.x, y:this.path.head.y}, 1000, createjs.Ease.Linear)
	.to({x:this.path.head.next.x, y:this.path.head.next.y}, 1000, createjs.Ease.Linear)
	.to({x:this.path.head.next.next.x, y:this.path.head.next.next.y}, 1000, createjs.Ease.Linear)
	.to({x:this.path.head.next.next.next.x, y:this.path.head.next.next.next.y}, 1000, createjs.Ease.Linear)
	.to({x:this.path.head.next.next.next.next.x, y:this.path.head.next.next.next.next.y}, 1000, createjs.Ease.Linear)
	.to({x:this.path.head.x, y:this.path.head.y}, 1000, createjs.Ease.Linear);
}

// Generates Linked List that represents path for asset to travel along
function generatePoints(){
	var a = {x:0, y:0};
	var b = {x:(Math.floor((Math.random() * (img.image.width * img.scaleX)) - 1)), y:(Math.floor((Math.random() * (img.image.height * img.scaleY)) - 1))};
	var c = {x:(Math.floor((Math.random() * (img.image.width * img.scaleX)) - 1)), y:(Math.floor((Math.random() * (img.image.height * img.scaleY)) - 1))};
	var d = {x:(Math.floor((Math.random() * (img.image.width * img.scaleX)) - 1)), y:(Math.floor((Math.random() * (img.image.height * img.scaleY)) - 1))};
	var e = {x:(Math.floor((Math.random() * (img.image.width * img.scaleX)) - 1)), y:(Math.floor((Math.random() * (img.image.height * img.scaleY)) - 1))};
	
	a.next = b;
	b.next = c;
	c.next = d;
	d.next = e;
	
	return {head:a};
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