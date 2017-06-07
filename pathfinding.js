/********** Author: Dhivo Gnani **********/ 

// Status enum currently used for BFS 
var Status = {
	UNVISITED: 0,
	VISITING: 1,
	VISITED: 2
}

/********** Points in Grid **********/ 
function Point(xCoord, yCoord) {
	this.x = xCoord;
	this.y = yCoord;
}

Point.prototype.setX = function(xCoord) {
	this.x = xCoord;
}

Point.prototype.setY = function(yCoord) {
	this.y = yCoord;
}

Point.prototype.getX = function() {
	return this.x;
}

Point.prototype.getY = function() {
	return this.y;
}

/********** Grid **********/ 
// Constructor
function Grid(m,n)
{
	this.m = m;
	this.n = n;
	this.grid = [];
	this.obstacles = [];
}

Grid.prototype.isNotObstacle = function(xCoord, yCoord) {
	if (isInvalidCoordinates(xCoord, yCoord)) return null;

	for (var i = 0; i < this.obstacles.length; ++i) {
		var obstacle = this.obstacles[i]
		if (obstacle.x == xCoord && obstacle.y == yCoord) return false;
	}
	return true;
}

Grid.prototype.setObstacle = function(xCoord,yCoord) {
	if (isInvalidCoordinates(xCoord, yCoord)) return false; 

 	var obstaclePoint = {x: xCoord, y:yCoord};
 	this.obstacles.push(obstaclePoint);
 	return true;
}	

Grid.prototype.isInvalidCoordinates = function(xCoord,yCoord) {
	if (xCoord < 0 || yCoord < 0 || xCoord > m || yCoord > n) {
		return true;
	} 
	return false;
}

// SSP implemented using BFS
// TODO: Implement serach using A* or Dijkstra instead?
Grid.prototype.search = function(start, end)
{
	
	// Initialize status for BFS Search
	for (var i = 0; i < n; ++i )
	{
		this.grid[i] = [];
		for (var j = 0; j < m; ++j)
		{
			this.grid[i][j] =  Status.UNVISITED;
		}
	}

    var paths = [];
	paths.push([start]);
	this.grid[start.x][start.y] = VISITING;
	
	while (paths.length != 0)
	{
		var path = paths.shift();

		var last_node = path[path.length-1];

		if ((last_node.x == end.x) && (last_node.y == end.y))
		{
			return path;
		}

		var x = this.getAdjacentElements(last_node);
		for (var i = 0; i < x.length; ++i)
		{
			var xcoord = x[i].x;
			var ycoord = x[i].y;

			if (this.grid[xcoord][ycoord] == Status.UNVISITED)
			{
				var newPath = path.slice();
				newPath.push({x: x[i].x, y: x[i].y});
				this.grid[xcoord][ycoord] =  Status.VISITING;
				paths.push(newPath);
			}
		}
		this.grid[last_node.x][last_node.y] = Status.VISITED;
	}

	// No path from start to end
	return null;

}

// Get TOP, BOTTOM, LEFT, RIGHT adjacent elements
Grid.prototype.getAdjacentElements = function(last_node)
{
	var xcoord= last_node.x;
	var ycoord = last_node.y;


	var temp_array = [];
	if (xcoord+1 < this.m)
	{
		temp_array.push({x:xcoord+1, y:ycoord});
	}

	if (xcoord-1 >= 0)
	{
		temp_array.push({x:xcoord-1, y:ycoord});
	}

    if (ycoord+1 < this.n)
	{
		temp_array.push({x:xcoord, y:ycoord+1});
	}

	if (ycoord-1 >= 0)
	{
		temp_array.push({x:xcoord, y:ycoord-1});
	}

	return temp_array;
}