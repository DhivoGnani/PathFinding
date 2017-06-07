// paths with no diagonal coordinates
QUnit.test("path with no diagonal found", function(assert) {
	var grid = new Grid(10,10);
	grid.enableDiagonal(false);
	var path = grid.findPath(new Point(0,0), new Point(8,7));
	assert.ok(path.length == 16);
})

// path with diagonal coordinates should be shorter than with no diagonal coordinates
QUnit.test("path with diagonal found", function(assert) {
	var grid = new Grid(10,10);
	var path = grid.findPath(new Point(0,0), new Point(8,7));
	assert.ok(path.length == 9);
})

// no path should be returned because end point is added as an obstacle
QUnit.test("no path found", function(assert) {
	var grid = new Grid(10,10);
	grid.addObstacle(new Point(8,7));
	var path = grid.findPath(new Point(0,0), new Point(8,7));
	assert.ok(path == null);
})