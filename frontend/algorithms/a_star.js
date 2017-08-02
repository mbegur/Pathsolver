import PriorityQueue from '../queues/priority_queue';

class aStar {
  constructor(grid) {
    this.board = grid;
  }

  addFrontier() {
    this.frontier = new PriorityQueue();
    this.reset();
    this.processNeighbors(this.board.start);
  }

  reset() {
    this.cameFrom = {};
    this.cameFrom[this.board.start] = null;
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;
  }

  restart() {
    clearInterval(this.updateInterval);
    this.reset();
  }

  heuristic(a, b) {
    const [x1, y1] = a.split(',').map(int => parseInt(int));
    const [x2, y2] = b.split(',').map(int => parseInt(int));
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return dx + dy;
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        const type = this.board.grid[neighbor].type;
        const cost = type === 'obstacle' ? 99999 : 1;
        const newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) ||
            newCost < this.costSoFar[neighbor]) {
              const priority = newCost + this.heuristic(neighbor, this.board.end);

              this.frontier.insert(neighbor, priority);
              this.cameFrom[neighbor] = current;
              this.costSoFar[neighbor] = newCost;
              this.board.grid[neighbor].setType('frontier');
          }
        }.bind(this)
      );

  }


  oldRun() {
    this.addFrontier();

    while(!this.frontier.isEmpty()) {
      const current = this.frontier.dequeue();
      if (current === this.board.end) break;

      this.processNeighbors(current);
      this.board.grid[current].setType('visited');
    }

    return this.buildPath();
  }

  run() {
    this.addFrontier();

    this.updateInterval = setInterval(
      () => {
        const current = this.frontier.dequeue();
        if(!current || current === this.board.end) {
          clearInterval(this.updateInterval);
          // this.path = new Path(this.buildPath(), this.board.stage)
        }

        this.processNeighbors(current);
        this.board.grid[current].setType('visited');
      },20);
  }

  buildPath() {
    if(!this.cameFrom[this.board.end]) {
      return null;
    }

    let current = this.board.end;
    let path = [];

    while(current) {
      path.unshift(current);
      current = this.cameFrom[current];
    }

    return path;
  }


}

export default aStar;
