/*
 * Prototype. Needs refactoring. Put together for demo.
 * Written by: Matthew Stagg
 * 06/10/2015
 */

var Asset1 = {
	shape: new createjs.Shape(),
	color: "yellow",
	vel: 0,
	path: new Array()
};

var Asset2 = {
	shape: new createjs.Shape(),
	color: "green",
	vel: 0,
	path: new Array()
};

// Creates all assets
function createAssets(){
	Asset1.shape = drawAsset(Asset1.color);
	stage.addChild(Asset1.shape);
	Asset1.path[0] = {x:700, y:380};
	Asset1.path[1] = {x:525, y:380};
	Asset1.path[2] = {x:525, y:390};
	Asset1.path[3] = {x:525, y:380};
	Asset1.path[4] = {x:700, y:380};
	Asset1.path[5] = {x:700, y:700};
	Asset1.shape.regX = Asset1.shape.x + 20;
	Asset1.shape.regY = Asset1.shape.y + 20;
	Asset1.shape.x = 700;
	Asset1.shape.y = 700;
	createjs.Tween.get(Asset1.shape, {loop:true})
	.to({alpha:0}, 0)
	.to({rotation:270}, 0)
	.to({alpha:1}, 3000)
	.to({x:Asset1.path[0].x, y:Asset1.path[0].y}, 3000)
	.to({rotation:180}, 1500)
	.to({x:Asset1.path[1].x, y:Asset1.path[1].y}, 1500)
	.to({rotation:90}, 1500)
	.to({x:Asset1.path[2].x, y:Asset1.path[2].y}, 2000)
	.wait(2000)
	.to({x:Asset1.path[3].x, y:Asset1.path[3].y}, 2000)
	.to({rotation:0}, 1500)
	.to({x:Asset1.path[4].x, y:Asset1.path[4].y}, 1500)
	.to({rotation:90}, 1500)
	.to({x:Asset1.path[5].x, y:Asset1.path[5].y}, 3000)
	.to({alpha:0}, 3000);
	
	Asset2.shape = drawAsset(Asset2.color);
	stage.addChild(Asset2.shape);
	Asset2.path[0] = {x:330, y:330};
	Asset2.path[1] = {x:330, y:110};
	Asset2.path[2] = {x:280, y:110};
	Asset2.path[3] = {x:330, y:110};
	Asset2.path[4] = {x:330, y:75};
	Asset2.path[5] = {x:610, y:75};
	Asset2.path[6] = {x:610, y:280};
	Asset2.path[7] = {x:785, y:280};
	Asset2.path[8] = {x:785, y:700};
	Asset2.shape.regX = Asset2.shape.x + 20;
	Asset2.shape.regY = Asset2.shape.y + 20;
	Asset2.shape.x = 0;
	Asset2.shape.y = 330;
	createjs.Tween.get(Asset2.shape, {loop:true})
	.to({alpha:0}, 0)
	.to({rotation:0}, 0)
	.wait(3000)
	.to({alpha:1}, 3000)
	.to({x:Asset2.path[0].x, y:Asset2.path[0].y}, 3000)
	.to({rotation:270}, 1500)
	.to({x:Asset2.path[1].x, y:Asset2.path[1].y}, 1500)
	.to({rotation:180}, 1500)
	.to({x:Asset2.path[2].x, y:Asset2.path[2].y}, 1500)
	.wait(2000)
	.to({x:Asset2.path[3].x, y:Asset2.path[3].y}, 1500)
	.to({rotation:270}, 1500)
	.to({x:Asset2.path[4].x, y:Asset2.path[4].y}, 750)
	.to({rotation:360}, 1500)
	.to({x:Asset2.path[5].x, y:Asset2.path[5].y}, 2000)
	.to({rotation:90}, 1500)
	.to({x:Asset2.path[6].x, y:Asset2.path[6].y}, 1500)
	.to({rotation:0}, 1500)
	.to({x:Asset2.path[7].x, y:Asset2.path[7].y}, 1500)
	.to({rotation:90}, 1500)
	.to({x:Asset2.path[8].x, y:Asset2.path[8].y}, 3000)
	.to({alpha:0}, 3000);
}

function drawAsset(color){
	var s = new createjs.Shape();
	s.graphics.beginFill(color) // Draw body
	.moveTo(0, 0)
	.lineTo(40, 0)
	.lineTo(40, 40)
	.lineTo(0, 40)
	.lineTo(0, 0)
	.beginFill("silver") // Draw front lift
	.moveTo(40, 0)
	.lineTo(60, 0)
	.lineTo(60, 5)
	.lineTo(45, 5)
	.lineTo(45, 35)
	.lineTo(60, 35)
	.lineTo(60, 40)
	.lineTo(40, 40)
	.lineTo(40, 0)
	.beginFill("skyblue") // Draw windshield
	.moveTo(35, 10)
	.lineTo(35, 30)
	.lineTo(30, 35)
	.lineTo(30, 5)
	.lineTo(35, 10)
	.beginStroke("black") // Draw black line
	.moveTo(20, 0)
	.lineTo(20, 40)
	.beginFill("black") // Draw rear wheels
	.moveTo(5, 0)
	.lineTo(12, 0)
	.lineTo(12, 5)
	.lineTo(5, 5)
	.lineTo(5, 0)
	.moveTo(5, 40)
	.lineTo(12, 40)
	.lineTo(12, 35)
	.lineTo(5, 35)
	.lineTo(5, 40)
	.beginStroke("white")
	.moveTo(5, 2)
	.lineTo(12, 2)
	.moveTo(5, 38)
	.lineTo(12, 38);
	
	return s;
}