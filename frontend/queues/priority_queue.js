// When inserting a new element to heap, heap is repaired by bubbling-up
// when deleting a new element to heap, heap is repaired by bubbling-down

class PriorityQueue {
  constructor() {
    this.elements = [{value: null, priority: 0}];
  }

  empty() {
    return this.elements === 0;
  }

  put(value, priority) {
    this.elements.push({value, priority});
    this._bubbleUp();
    return this.elements.length;
  }

  remove() {
    if (this.empty()) {
      return null;
    } else if (this.elements.length === 2) {
      return this.elements.pop().value;
    } else {
      const min = this.elements[1];
      this.elements[1] = this.elements.pop();
      this._bubbleDown();
      return min;
    }
  }

  _bubbleUp() {
    let child = this.elements.length-1;
    let parent = Math.floor(child/2);
    while (this.elements[child].priority < this.elements[parent].priority) {
      [this.elements[child], this.elements[parent]] =
          [this.elements[parent], this.elements[child]];

      child = parent;
      parent = Math.floor(child/2);
    }
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
    let left = this.elements[2*idx];
    let right = this.elements[2*idx+1];
    let minChildIdx, minPriority;
    if(right) {
      minPriority = Math.min(left.priority, right.priority);
    } else if (left){
      minPriority = left.priority;
    } else {
      return false;
    }
    return left.priority === minPriority ? 2*idx : 2*idx+1;
  }

}
