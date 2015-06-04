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
img.image.onload = load;
createjs.Ticker.setFPS(60);

// Intitalize events
createjs.Ticker.addEventListener("tick", stage);
stage.addEventListener("stagemousedown", onMouseDown);
canvas.addEventListener("mousewheel", MouseWheelHandler, false);
canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

// Test circle
var c = new createjs.Shape();
c.graphics.beginFill("red").drawCircle(0, 0, 10);
stage.addChild(c);

// 'Main' Execution loop, fires 60 times per second
function tick(e){

}

// Resizes SVG file after image loads and displays it
function load(e){
	img.scaleX = img.scaleY = Math.min(canvas.width / img.image.width, canvas.height / img.image.height);
	stage.addChild(img);
}

// Test function to handle dot movement, to be replaced with predefined movement apths for assets
window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 38) { //up key
		createjs.Tween.get(c, { override:true }).to({y: c.y - 10}, 250, createjs.Ease.Linear);
    } else if (code === 40) { //down key
        createjs.Tween.get(c, { override:true }).to({y: c.y + 10}, 250, createjs.Ease.Linear);
    } else if (code === 39) { //right key
		createjs.Tween.get(c, { override:true }).to({x: c.x + 10}, 250, createjs.Ease.Linear);
	} else if (code === 37) { //left key
		createjs.Tween.get(c, { override:true }).to({x: c.x - 10}, 250, createjs.Ease.Linear);
	}
};

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