
class Queue {

  constructor() {
    this.elements = [];
    this.empty = () => this.elements.length === 0;
    this.put = x => this.elements.unshift(x);
    this.get = () => this.elements.pop();
  }
  
}
