/********** Author: Dhivo Gnani **********/ 

// Status enum currently used for BFS 
var Status = {
	UNVISITED: 0,
	VISITING: 1,
	VISITED: 2
}

/********** Points in Grid **********/ 
// JavaScript classes were introduced in ECMAScript 2015
// TODO: use classes for Grid
class Point{
	constructor(xCoord,yCoord) {
		this.x = xCoord;
		this.y = yCoord;
	}
}

/********** Grid **********/ 
// Constructor
function Grid(m,n)
{
	// number of columns in grid
	this.m = m; 
	// number of rows in grid
	this.n = n;
	// initialize grid
	this.grid = [];
	// obstacles array
	this.obstacles = [];
	// path includes diagonal coordinates
	this.diagonal = true;
}

// allow or dis-allow diagonal coordinates to be part of path for getPath
Grid.prototype.enableDiagonal = function(enable) {
	this.diagonal = enable;
}

// check if coordinates are within grid
Grid.prototype.isValidCoordinate = function(xCoord,yCoord) {
	if (xCoord < 0 || yCoord < 0 || xCoord >= this.m || yCoord >= this.n) {
		return false;
	} 
	return true;
}

// check if valid point
Grid.prototype.ValidPoint = function(point) {
	return this.isValidCoordinate(point.x, point.y);
}

// if point is in obstacles array, remove it
Grid.prototype.removeObstacle = function(point) {
 	if (!this.ValidPoint(point)) return false; 
  	for(var i = this.obstacles.length - 1; i>=0; i--) {
  		if(this.obstacles[i].x == point.x && this.obstacles[i].y == point.y){
  			obstacles.splice(i,1);
  			return true;
  		}
  	}
  	return false;
}

// add obstacle to obstacles array
Grid.prototype.addObstacle = function(point) {
 	if (!this.ValidPoint(point)) return false; 
  	this.obstacles.push(point);
  	return true;
}	

// set coordinate in grid to be an obstacle by setting its status to VISITED
Grid.prototype.setObstacles = function() {
	for (var i = 0; i < this.obstacles.length; i++ )
	{
		this.grid[this.obstacles[i].x][this.obstacles[i].y] = Status.VISITED;
	}

}


// SSP implemented using BFS
// TODO: Implement findPath using A* or Dijkstra instead?
Grid.prototype.findPath = function(start, end)
{
	// re-initialize grid for every search
	// TODO: better way to do this?
	this.grid =[];

	// error condition
	if(!this.ValidPoint(start) || !this.ValidPoint(end)) return null;
	
	// Initialize status for BFS Search
	for (var i = 0; i < this.n; ++i )
	{
		this.grid[i] = [];
		for (var j = 0; j < this.m; ++j)
		{
			this.grid[i][j] =  Status.UNVISITED;
		}
	}

	// set obstacles
	this.setObstacles();

    var paths = [];
	paths.push([start]);
	this.grid[start.x][start.y] = Status.VISITING;

	while (paths.length != 0) {
		var path = paths.shift();

		var last_node = path[path.length-1];

		// path found from start to end
		if ((last_node.x == end.x) && (last_node.y == end.y)) {
			return path;
		}

		// get adjacent elements
		var adj = this.getAdjacentCoordinates(last_node);
		
		for (var i = 0; i < adj.length; i++) {
			var xcoord = adj[i].x;
			var ycoord = adj[i].y;

			if (this.grid[xcoord][ycoord] == Status.UNVISITED) {
				var newPath = path.slice();
				newPath.push(new Point(xcoord, ycoord));
				this.grid[xcoord][ycoord] =  Status.VISITING;
				paths.push(newPath);
			}
		}
		this.grid[last_node.x][last_node.y] = Status.VISITED;
	}

	// No path from start to end
	return null;
}

// Get TOP, BOTTOM, LEFT, RIGHT adjacent coordinates
// Get UPPER-LEFT, UPPER-RIGHT, BOTTOM-LEFT, BUTTOM-RIGHT coordinates elements if diagonal is enabled
Grid.prototype.getAdjacentCoordinates = function(coordinate)
{

	var xcoord= coordinate.x;
	var ycoord = coordinate.y;

	var adjacentCoordinates = [];

	// verify if coordinate to right is within limits of grid
	if (xcoord+1 < this.m) {
		adjacentCoordinates.push({x:xcoord+1, y:ycoord});
	}

	// verify if coordinate to left is within limits of grid
	if (xcoord-1 >= 0) {
		adjacentCoordinates.push({x:xcoord-1, y:ycoord});
	}

	// verify if coordinate below is within limits of grid
    if (ycoord+1 < this.n) {
		adjacentCoordinates.push({x:xcoord, y:ycoord+1});
	}

	// verify if abpve above is within limits of grid
	if (ycoord-1 >= 0) {
		adjacentCoordinates.push({x:xcoord, y:ycoord-1});
	}

	// verify that diagonal elements can be used
	if (this.diagonal) {
		// verify if upper-left coordinate is within limits of grid
		if(xcoord-1 >= 0 && ycoord-1 >=0) {
			adjacentCoordinates.push({x:xcoord-1 , y: ycoord-1})
		}
		// verify if upper-right coordinate is within limits of grid
		if (xcoord+1 < this.m && ycoord-1 >=0) {
			adjacentCoordinates.push({x:xcoord+1, y:ycoord-1});
		}
		// verify if bottom-left coordinate is within limits of grid
		if(xcoord-1 >= 0 && ycoord+1 < this.n) {
			adjacentCoordinates.push({x:xcoord-1, y:ycoord+1});
		}
		// verify if bottom-right coordinate is within limits of grid 
		if(xcoord+1 < this.m && ycoord+1 < this.n){
			adjacentCoordinates.push({x:xcoord+1, y:ycoord+1});
		}
	}
	return adjacentCoordinates;
}