import {getCoordPair} from "../util.js"

export default class SweeperDivBoard {
  #box;
  #divboard;
  #cells;
  #controller;

  constructor(width, height, cellpixels) {
    this.#box = { width: width, height: height };
    let size = width * height;


    this.#divboard = document.getElementsByClassName("board")[0];
    this.#cells = this.#divboard.children;

    this.#divboard.style.width = (width * cellpixels) + "px"; // TODO: make it more dynamic
    this.#divboard.style.height = (height * cellpixels) + "px";
    this.#divboard.style.gridTemplateColumns = "repeat(auto-fill, %px)".replace("%", cellpixels);

    this.drawDivs(size, width);

    this.#divboard.addEventListener("click", (e) => { this.handleClick(e, this.#box); });
  }

  setController(controller) {
    this.#controller = controller;
  }

  handleClick(event, box) {
    let id = event.target.id.slice(5) // slice removes "cell "
    console.log(id); //TODO
    console.log(getCoordPair(id, box));
    this.#controller.openCell(getCoordPair(id, box));

  }

  drawDivs(size, width) {
    for (let i = 0; i < size; i++) {
      let el = document.createElement("div");
      let magic = width % 2 ? 1 : Math.floor(i / width) % 2;
      el.className = (i % 2 == magic) ? "cell-light" : "cell-dark";
      el.id = "cell " + i.toString();
      this.#divboard.appendChild(el);
    }
  }

  propagate(cellcoords) {
    // locate the needed cells
    // modify the value

  }
}

