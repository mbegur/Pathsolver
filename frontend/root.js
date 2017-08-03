import Board from './grid';
import * as Finders from './algorithims/search_export';
window.Finders = Finders;

class Root {
  constructor(stage) {
    this.board = new Board(stage);
    this.board.init();
    this.finder = new Finders.AStar(this.board);
    this.addListeners();
    window.addEventListener('resize', this.resetDimensions.bind(this));

    this.resetDimensions();
  }

  addListeners() {


    $('#algorithims input').on('change', () => {
      const algoName = $('input[name=algorithim-type]:checked', '#algorithims').val();
      this.finder.kill();
      this.finder = new Finders[algoName](this.board);
      this.board.clearSearch();
    });
    $('#start-search').on('click', (e) => {
      e.preventDefault();
      this.finder.run();
    });
    $('#clear-search').on('click', (e) => {
      e.preventDefault();
      this.finder.kill();
      this.board.clearSearch();
    });
  }

  resetDimensions() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    $('#pathFinderCanvas').width(window.innerWidth);
    $('#pathFinderCanvas').height(window.innerHeight);

  }


}

export default Root;
