import { getCartesianNeighbors, getCoordPair } from "../util.js"

export default class SweeperLogic {
  #data;
  #divboard;

  setup(data, divboard) {
    this.#data = data;
    this.#divboard = divboard;
  }

  getBoard() {

  }

  openCell(point = { width, height }) {
    let set = new Set();
    set.add([point.width, point.height]);
    this.openCellRecur(set)
  }

  // NOTE: this is inefficienct since every cell in the queue leads to
  // checking 8 adjacent cells, even if most of then have been checked
  // by the previous iteration or cell.
  // this implementation can be multithreaded, but a single-thread
  // solution could do less redundant work.
  openCellRecur(updateQueue) {
    let nextQueue = new Set();
    updateQueue.forEach(coords => {
      let point = {width:coords[0],height:coords[1]};
      let cell = this.#data.getCell(point);
      cell.open();
      let neighbors = getCartesianNeighbors(point)
      if (cell.get().neiBombs == 0) {
          neighbors.filter(nei => !this.#data.getCell(nei).get().open)
                   .forEach(obj => nextQueue.add([obj.width, obj.height]));
      }
      let defusedBombs = neighbors.filter(nei => this.#data.getCell(nei).get().bomb)
                                  .map(nei => this.#data.getCell(nei).defuse())
                                  .filter(Boolean).length;
      this.#divboard.propagate(cell.get());
    })
    if (nextQueue.size > 0) return this.openCellRecur(nextQueue);
  }

}

