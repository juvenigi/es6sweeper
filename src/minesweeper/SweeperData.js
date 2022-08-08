import { getCartesianNeighbors, randomInts, getCoordPair } from "../util.js";

class SwepperCell {
  #isOpen = false;
  #isBomb = false;
  #isFlagged = false;
  #neighboringBombs = 0;
  #defuseCounter = 0; // diffuse counter = 8 - neighboring bombs initially

  setBomb(isBomb) {
    this.#isBomb = isBomb;
  }

  setFlag(isFlagged) {
    this.#isFlagged = isFlagged;
  }

  defuse() {
    if (this.#isFlagged || !this.#isBomb) return true;
    return 8 == ++this.#defuseCounter? true : false;
  }

  addBombCount(diff) {
    this.#neighboringBombs += diff;
    this.#defuseCounter += diff;
  }

  open() {
    this.#isOpen = true;
  }

  get() {
    return { bomb: this.#isBomb, open: this.#isOpen, neiBombs: this.#neighboringBombs }
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

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.#board[i][j] = new SwepperCell();
      }
    }

    let size = width * height;
    let bombCoords = randomInts(size, bombcount + 1);
    bombCoords = bombCoords.map((int) => getCoordPair(int, { width: width, height: height }));
    this.#extrabomb = bombCoords.pop();
    this.setupBombs(width, height, bombCoords);
  }

  setupBombs(width, height, bombCoords) {
    bombCoords.forEach(coord => {
      this.#readArray(coord).setBomb(true);
      getCartesianNeighbors(coord, width - 1, height - 1).forEach(
        neighbor => {
          this.#readArray(neighbor).addBombCount(1);
        }
      )
    })
  }

  modifyFirstBomb(point) {
    this.#readArray(point).setBomb(false);
    getCartesianNeighbors(point)
      .filter(coords => { return this.#readArray(coords).get().bomb })
      .forEach(this.#readArray(point).addBombCount(1));
  }

  activateExtraBomb() {
    this.#readArray(this.#extrabomb).setBomb(true);
    getCartesianNeighbors(this.#extrabomb).forEach(coords => {
      this.#readArray(coords).addBombCount(1);
    });
  }

  getCell(point) { // will be executed one time
    let cell = this.#board[point.width][point.height];
    if (cell.get().bomb) {
      this.modifyFirstBomb(point);
      this.activateExtraBomb();
    }
    this.replaceFunctionGetCell();
    console.log("getCell replaced") //FIXME dbg
    return cell;
  }

  replaceFunctionGetCell() {
    this.getCell = this.#readArray;
  }

  #readArray(point) {
    return this.#board[point.width][point.height];
  }
}
