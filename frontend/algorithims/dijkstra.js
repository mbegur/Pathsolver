import Search from './search';
import PriorityQueue  from '../queues/priority_queue';

class Dijkstra extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    this.processNeighbors(this.board.start);
  }

  reset() {
    super.reset();
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        if (!(neighbor in this.cameFrom)) {
          const type = this.board.grid[neighbor].type;
          if (type !== 'obstacle') {
            this.frontier.enqueue(neighbor);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          }
        }
      }.bind(this)
    );
  }
}

export default Dijkstra;
