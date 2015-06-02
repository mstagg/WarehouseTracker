/*
 * JS for warehouse asset tracking prototype.
 * Written by: Matthew Stagg
 * 06/02/2015
 */


//Intialize canvas and createjs stage
var canvas= document.getElementById("trackerWindow");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;   
var stage = new createjs.Stage("trackerWindow");
createjs.Ticker.setFPS(60);

//Intitalize events
createjs.Ticker.addEventListener("tick", stage);

//Create grid of 1000 points scaled to current canvas size
var points = new Array();
var xinc = canvas.width / 100, yinc = canvas.height / 100;
var xdot = xinc, ydot = yinc;

for(var i = 0; i < 100; i++){
	points.push(new Array());
	for(var j = 0; j < 100; j++){
		var p = new Point(xdot, ydot);
		points[i][j] = p;
		ydot += yinc;	
	}
	ydot = yinc;
	xdot += xinc;
}

var cx = 0, cy = 0;
var c = new createjs.Shape();
c.graphics.beginFill("red").drawCircle(points[0][0].x, points[0][0].y, 5);
stage.addChild(c);

function tick(e){

}

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 38 && cy > 0) { //up key
		cy--;
        //c.y = points[cx][cy].y;
    } else if (code === 40 && cy < 99) { //down key
        cy++;
		//c.y = points[cx][cy].y;
    } else if (code === 39 && cx < 99) { //right key
		cx++;
        //c.x = points[cx][cy].x;
	} else if (code === 37 && cx > 0) { //left key
		cx--;
        //c.x = points[cx][cy].x;
	}
	createjs.Tween.get(c, { override:true }).to({ x: points[cx][cy].x, y: points[cx][cy].y }, 200, createjs.Ease.Linear);
};

function Point(xCoor, yCoor){
	this.x = xCoor;
	this.y = yCoor;
}