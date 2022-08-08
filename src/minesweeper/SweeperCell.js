class SwepperCell {
  #isOpen = false;
  #isBomb = false;
  #neighboringBombs = 0;

  set(isBomb) {
    this.#isBomb = isBomb;
  }

  addBombCount(diff) {
    this.#neighboringBombs += diff;
  }

  open() {
    this.#isOpen = true;
  }

  get() {
    return { bomb: this.#isBomb, open: this.#isOpen, number: this.#neighboringBombs }
  }
}

export default class SweeperData {
  #box;
  #board; // A 2D Array of SweeperCells
  #extrabomb; // replacement bomb in case the user was unlucky to explode on turn 1
  constructor(width, height, bombcount) {
    this.#box = { width: width, height: height };
    this.#board = new Array(width).fill(null);
    this.#board = this.#board.map(() => new Array(height).fill(null))

    for( let i = 0; i < width; i++ ) { for( let j = 0; j < height; j ++ ) {
      this.#board[i][j] = new SwepperCell();
    }}

    let size = width * height;
    let bombCoords = randomInts(size, bombcount + 1);
    console.log({width:width, height:height});
    bombCoords = bombCoords.map( (int) => getCoordPair(int, {width:width, height:height}));
    console.log(bombCoords);
    this.#extrabomb = bombCoords.pop();
    this.setupBombs(width, height, bombCoords);
  }

  setupBombs(width, height, bombCoords) {
    bombCoords.forEach(coord => {
      this.getCell(coord).set(true);
      getCartesianNeighbors(coord, width - 1, height - 1).forEach(
        neighbor => {
          this.getCell(neighbor).addBombCount(1);
        }
      )
    })
  }
  modifyFirstBomb(point) {
    this.getCell(point).set(false);
    getCartesianNeighbors(point)
      .filter(coords => { return this.getCell(coords).get().bomb })
      .forEach(this.getCell(point).addBombCount(1));
  }
  activateExtraBomb() {
    this.getCell(this.#extrabomb).set(true);
    getCartesianNeighbors(this.#extrabomb).forEach(coords => {
      this.getCell(coords).addBombCount(1);
    });
  }

  getCell(point = { width: 0, height: 0 }) {
    console.log(point);
    let cell = this.#board[point.width][point.height];
    if (cell.get().bomb) {
      this.modifyFirstBomb(point);
      this.activateExtraBomb();
    }
    this.replaceFunctionGetCell();
    return cell;
  }

  replaceFunctionGetCell() {
    this.getCell = function(point) {
      return this.#board[point.width][point.height];
    }
  }
}

