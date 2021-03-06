import Search from './search';
import PriorityQueue from '../queues/priority_queue';

class AStar extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    super.initializeFrontier();
  }

  reset() {
    super.reset();
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        const type = this.board.grid[neighbor].type;
        const cost = type === 'obstacle' ? 99999 : 1;
        const newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) ||
            newCost < this.costSoFar[neighbor]) {
              const priority = newCost + this.heuristic(neighbor, this.board.goal);

              this.frontier.put(neighbor, priority);
              this.cameFrom[neighbor] = current;
              this.costSoFar[neighbor] = newCost;
              this.board.grid[neighbor].setType('frontier');
          }
        }.bind(this)
      );
  }
}

export default AStar;

// Code created by Nikita Shalimov, github user: ndshal
// Repo
// https://github.com/ndshal/pathfinder.js/blob/master/js/search/a_star.js
