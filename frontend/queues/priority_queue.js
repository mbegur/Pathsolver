class PriorityQueue {
  constructor() {
    this.elements = [{item: null, priority: 0}];
  }

  put(item, priority) {
    this.elements.push({item, priority});
    this._bubbleUp();

    return this.elements.length;
  }

  get() {
    if(this.isEmpty()) {
      return null;
    } else if (this.elements.length === 2) {
      return this.elements.pop();
    } else {
      const min = this.elements[1];
      this.elements[1] = this.elements.pop();
      this._bubbleDown();

      return min.item;
    }
  }

  _bubbleUp() {
    let childIdx = this.elements.length-1;
    let parentIdx = Math.floor(childIdx/2);
    while (this.elements[childIdx].priority < this.elements[parentIdx].priority) {
      [this.elements[childIdx], this.elements[parentIdx]] =
          [this.elements[parentIdx], this.elements[childIdx]];

      childIdx = parentIdx;
      parentIdx = Math.floor(childIdx/2);
    }
  }

  isEmpty() {
    return this.elements.length === 1;
  }

  _bubbleDown() {
    let idx = 1;
    let minChildIdx = this._getMinChildIdx(idx);

    while(minChildIdx &&
      this.elements[idx].priority > this.elements[minChildIdx].priority) {
      [this.elements[idx], this.elements[minChildIdx]] =
        [this.elements[minChildIdx], this.elements[idx]];

      idx = minChildIdx;
      minChildIdx = this._getMinChildIdx(idx);
    }
  }

  _getMinChildIdx(idx) {
    let leftChild = this.elements[2*idx];
    let rightChild = this.elements[2*idx+1];
    let minChildIdx, minPriority;
    if(rightChild) {
      minPriority = Math.min(leftChild.priority, rightChild.priority);
    } else if (leftChild){
      minPriority = leftChild.priority;
    } else {
      return false;
    }
    return leftChild.priority === minPriority ? 2*idx : 2*idx+1;
  }
}

export default PriorityQueue;

// Code created by Nikita Shalimov, github user: ndshal
// https://stackoverflow.com/questions/3808808/how-to-get-element-by-class-in-javascript
// Repo
// https://github.com/ndshal/pathfinder.js/blob/master/js/data_structures.js
