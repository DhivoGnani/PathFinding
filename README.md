## Overview

This JavaScript library can be used to find the shortest path between an n by m 2d grid. 


## Installation

Using Node:

```sh
npm install path-finding
```

You can also download the source and include pathfinding.js in your projects.

## Usage

Create grid: 

```sh
var grid = new Grid(n,m)
```

n: number of rows

m: number of columns

```sh
var start = new Point(0,0)

var end = new Point(8,7)

var shortestPath = grid.findPath(start,end)
```

You can create a starting and ending point for your path.

grid.findPath will return an [] of Points. start and end will be included. 

These Points will give the shortest path. You can access the coordinates using Point.x and Point.y

If no path was found, the return value will be null.

```sh
grid.enableDiagonal(false)
```

By default, diagonal points are included in the path. To disable diagonals, execute the above statement.

## Motivation

I wished to create a JavaScript snake game where an enemy could chase the player. I realized I would need to find

the shortest path between the two. I also realized the importance of path-finding algorithms in game development.

Hence, I created this library.

I use this library for the enemy's movement in level 2 of my [snake game](https://dhivognani.github.io/games/snake/snake.html)

## Algorithm

This library uses BFS to calculate the shortest path between two points.

## Coming soon

Implement A* and Dijkstra's SSP algorithms as part of library.
