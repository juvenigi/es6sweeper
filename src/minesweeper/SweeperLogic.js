import {getCartesianNeighbors} from "../util/coord-util.js"

export default class SweeperLogic {
  #data;
  #divboard;
  #dimensions;

  setup(data, divboard) {
    this.#data = data;
    this.#divboard = divboard;
    this.#dimensions = this.#divboard.getDimensions();
  }

  openCell(point = {width, height}) {
    let set = new Set();
    set.add(JSON.stringify(point));
    this.openCellRecur(set)
  }

  // NOTE: this is inefficienct since every cell in the queue leads to
  // checking 8 adjacent cells, even if most of them have been checked
  // by the previous iteration or cell.
  // this implementation can be multithreaded, but a single-thread
  // solution could do less redundant work.
  openCellRecur(updateQueue) {
    let nextQueue = new Set();
    updateQueue.forEach(coordsjson => {
      let point = JSON.parse(coordsjson);
      let cell = this.#data.getCell(point);
      cell.open();
      let neighbors = getCartesianNeighbors(point, this.#dimensions.width, this.#dimensions.height);
      if (cell.get().neiBombs === 0) {
        neighbors.filter(nei => !this.#data.getCell(nei).get().open) // find closed
          .forEach(p => nextQueue.add(JSON.stringify(p)));
      }

      let prop = {point: point, cell: cell.get()};
      this.#divboard.propagate(prop);
    })
    if (nextQueue.size > 0) this.openCellRecur(nextQueue);
  }

}

