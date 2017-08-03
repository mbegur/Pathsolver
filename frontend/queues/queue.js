class Queue {
  constructor() {
    this.elements = [];
    this.get = () => this.elements.pop();
    this.enqueue = item => this.elements.unshift(item);
    this.isEmpty = () => this.elements.length === 0;
  }
}

export default Queue;
