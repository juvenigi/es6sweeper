import {getCartesianNeighbors, getCoordPair, getIndex} from "../util/coord-util.js"

export default class SweeperDivBoard {
  #dimensions;
  #divboard;
  #cells;
  #controller;

  constructor(width, height, cellpixels) {
    this.#dimensions = {width: width, height: height};
    this.#divboard = document.querySelector(".board");

    // TODO: don't do it here
    this.#divboard.style.width = (width * cellpixels) + "px";
    this.#divboard.style.height = (height * cellpixels) + "px";
    this.#divboard.style.gridTemplateColumns = "repeat(auto-fill, %px)".replace("%", cellpixels);

    this.#divboard.addEventListener("click", (e) => {
      this.handleClick(e);
    });
  }

  getDimensions() {
    return this.#dimensions;
  }

  #drawDivs() {
    let width = this.#dimensions.width;
    let size = width * this.#dimensions.height;
    for (let i = 0; i < size; i++) {
      let el = document.createElement("div");
      let magic = width % 2 ? 1 : Math.floor(i / width) % 2;
      el.className = (i % 2 === magic) ? "cell-light" : "cell-dark";
      el.id = "cell " + i.toString();
      this.#divboard.appendChild(el);
    }
    this.#cells = [...this.#divboard.children];
  }

  render() {
    this.#divboard.innerHTML = ""; // reset root class to allow re-rendering
    this.#drawDivs();
  }

  setController(controller) {
    this.#controller = controller;
  }

  handleClick(event) {
    let id = event.target.id.slice(5) // slice removes "cell " id prefix
    let box = this.#dimensions;

    console.log("dbg: handleClick");
    console.log(box);
    console.log(getCartesianNeighbors(getCoordPair(id, box), box.width, box.height));
    console.log(getIndex(getCoordPair(id, box), box));
    console.log(id);

    this.#controller.openCell(getCoordPair(id, box));
  }

  propagate(prop) {
    let coords = prop.point;
    let cell = prop.cell;
    console.log(coords);
    console.log(cell);
    console.log(this.#cells);
    this.#cells[getIndex(coords, this.#dimensions)].className = 'cell-open';
    // this.#cells[coords.width][coords.height].className='cell-open';

  }
}

