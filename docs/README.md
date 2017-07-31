## Pathfinder

### Background

Pathfinding or pathing is the plotting, by an application, of the shortest route between two points. It is a more practical variant on solving mazes that can be implemented using a variety of algorithms.

Pathfinder is web app that implements the most standard and commonly used algorithm, A\*, the optimized variant of A\*, Dijkstra's algorithm, and Breadth First Search to demonstrate the functionality in pathfinding with various algorithms.

### Functionality & MVP  

With Pathfinder, users will be able to:

- [ ] Allow users to place their own maze/obstacles
- [ ] Select squares to be start and end positions
- [ ] Use the A\* and BFS algorithms to visualize the calculated path between the two endpoints

In addition, this project will include:

- [ ] An About modal describing the background and info of the Pathfinder tool
- [ ] A production Readme

### Wireframe

This app will consist of a single screen with a grid, game controls, and controls modal.

![Pathfinder wireframe](/docs/Pathfinderwireframe.png)

### Architecture and Technologies

This project will be build with the following

- Vanilla Javascript
- jquery
- Easel.js
- Canvas

board.js: this script will handle the logic for creating and updating the necessary Easel.js elements and rendering them to the DOM.

cell.js: this script will handle the logic behind the scenes of cells. A Cell object will hold a type and will be responsible for doing neighbor checks for each Cell upon iteration and updating the Cell array appropriately.

search.js: this lightweight script will house the constructor and update functions for the Cell objects. This will be the  wrapper class for a general search algorithm (BFS, A\*, etc..).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click

**Day 3**: Implement the algorithms and finish up an algorithm class for the array of coordinates. Goals for the day:

- Be able to run algorithms in console and create a path of coordinates

**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for stop, start, and reset
- Have a styled `Canvas`, nice looking controls and title


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add more pathfinding algorithms to compare against the 3 made
- [ ] Have automatic maze generation instead of user made obstacles
