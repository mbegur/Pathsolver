# PathSolver
[Live Link](https://mbegur.github.io/Pathsolver/)

## Introduction
The aim of this project was to visualize how different pathing algorithms find the nearest path between two points. PathSolver allows users to build their own obstacles/mazes to effectively show A\*, Breadth First Search, and Dijkstra's algorithms execute.

In four days this project was built with the following technologies:
- Vanilla Javascript
- jQuery
- EaselJS

## Features

### Interactive UI

Pick your start and end point by clicking and dragging the green and red squares. Drag and draw your own obstacles that you want your favorite algorithms to solve and start the search. Clear your search during or after your current search as well!

![pathsolver1](/assets/pathsolver1.gif)

### Algorithms

#### A\*

What A* Search Algorithm does is that at each step it compares the f-cost of each cell around the current position. the f-cost is the sum of the g-cost and h-cost. At each step it picks the cell having the lowest f-cost, and process that cell.

Below is the definitions of g-cost and h-cost:

g-cost - distance from starting node
h-cost - distance from end node

![astar](/assets/pathsolver2.gif)

### Breadth First Search

BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores the neighbor nodes first, before moving to the next level neighbors. Basically, it searches all possibilities on the graph until it hits the end point.

![bfs](/assets/pathsolver3.gif)
