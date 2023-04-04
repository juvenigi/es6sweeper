import {getCartesianNeighbors, getCoordPair, randomInts} from "../util/coord-util.js";
import SweeperCell from "./SweeperCell.js"

export default class SweeperData {
  #box;
  #board; // A 2D Array of SweeperCells
  #extrabomb; // replacement bomb in case the user was unlucky to explode on turn 1
  #extrabombcount = 1;

  constructor(width, height, bombcount) {
    this.#box = {width: width, height: height};
    this.#board = new Array(width).fill(undefined)
      .map(() =>
        new Array(height).fill(undefined)
          .map(() => new SweeperCell()
          )
      );

    let size = width * height;
    let bombCoords = randomInts(size, bombcount + this.#extrabombcount);
    bombCoords = bombCoords.map((int) => getCoordPair(int, {width: width, height: height}));
    this.#extrabomb = bombCoords.pop();
    this.setupBombs(width, height, bombCoords);
  }

  setupBombs(width, height, bombCoords) {
    console.log('bombcoords');
    console.log(bombCoords);
    bombCoords.forEach(coord => {
      this.#readArray(coord).setBomb(true);
      getCartesianNeighbors(coord, width, height).forEach(
        neighbor => {
          this.#readArray(neighbor).addBombCount(1);
        }
      )
    })
  }

  modifyFirstBomb(point) {
    this.#readArray(point).setBomb(false);
    getCartesianNeighbors(point)
      .forEach((neighbor) => this.#readArray(neighbor).addBombCount(-1));
  }

  activateExtraBomb() {
    this.#readArray(this.#extrabomb).setBomb(true);
    getCartesianNeighbors(this.#extrabomb).forEach(coords => {
      this.#readArray(coords).addBombCount(1);
    });
  }

  getCell(point) { // will be executed one time
    let cell = this.#readArray(point);
    if (cell.get().bomb) {
      console.log("wow you're lucky");
      this.modifyFirstBomb(point);
      this.activateExtraBomb();
      this.replaceFunctionGetCell(); // NOTE: this approach is ill-advised, just use if statements.
    }

    return cell;
  }

  replaceFunctionGetCell() {
    this.getCell = this.#readArray;
  }

  #readArray(point) {
    console.log("readarray");
    console.log(point);
    console.log(this.#board);
    return this.#board[point.width][point.height];
  }
}
