var branches = [
];

var width = 800;
var height = 800;

var maxDepth = 3;
var seed = {
	x: width/2,
	y: 0,
	i: 0,
	a: 0, //Math.random(),
	l: 100,
	d: 0,
	
	
}

var endpoint = function(currentBranch){
	var x = currentBranch.x + currentBranch.l*Math.sin(currentBranch.a)
	var y = currentBranch.y + currentBranch.l*Math.cos(currentBranch.a)
	return { x: x, y: y };
}

var branch = function(currentBranch){
	var end = endpoint(currentBranch);
	branches.push(currentBranch)
	if (currentBranch.d > maxDepth){
		return;
	}
	
	var branchesCount = 4;
	// 4
	// 0, 1, 2, 3
	
	var angleFactor = 3 / (branchesCount + 1);
	
	for (var i = 0; i < branchesCount; ++i){
		var childBranch = {
			x: end.x,
			y: end.y,
			i: branches.length,
			// [0, 1] - 0.5
			// [-1, 1]
			a: (i < (branchesCount / 2) ? -1 : 1) * (angleFactor * i) - angleFactor + Math.random() / 2, //(Math.random() - 0.5) * 2,
			l: currentBranch.l / 1.2 + Math.random() * 10,
			d: currentBranch.d + 1,
			parent: currentBranch.i,
			color: ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]
		};
		// Recursive call (branch is calling branch())
		branch(childBranch);
	}
};

var initialize = function(){
	branch(seed);
	console.log(branches);
}

initialize();



function x1 (currentLine) {
  return currentLine.x;
}

function x2(currentLine) {
	return endpoint(currentLine).x
}
function y1(currentLine){
	return currentLine.y
}
function y2(currentLine){
	return endpoint(currentLine).y
}

d3.select('svg')
	.attr("width", width)
	.attr("height",height)
	.selectAll('line')
	.data(branches)
	.enter()
	.append('line')
	.attr('x1', x1)
	.attr('y1', y1)
	.attr('x2', x2)
	.attr('y2', y2)
	.style('stroke-width', "2")
	.style('stroke', function (line) {
  	  return line.color || "yellow";
  	})
  	
  	
  	
  	
  	