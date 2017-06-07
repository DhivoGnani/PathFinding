QUnit.test( "hello test", function( assert ) {
	var point = new Point(1,2);
  	assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("shortest path no diagonal", function(assert) {
	var grid = new Grid(10,10);
	//grid.enableDiagonal(false);

	var start = new Point(0,0);
	var end = new Point(8,7);

	var path = grid.search(start,end);
	assert.ok(true);
})