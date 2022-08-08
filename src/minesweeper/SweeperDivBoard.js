import {getCoordPair, getIndex} from "../util.js"

export default class SweeperDivBoard {
  #dimensions;
  #divboard;
  #cells;
  #controller;

  constructor(width, height, cellpixels) {
    let size = width * height;

    this.#dimensions = { width: width, height: height };
    this.#divboard = document.querySelector(".board");
    
    // TODO: don't do it here
    this.#divboard.style.width = (width * cellpixels) + "px"; 
    this.#divboard.style.height = (height * cellpixels) + "px";
    this.#divboard.style.gridTemplateColumns = "repeat(auto-fill, %px)".replace("%", cellpixels);
    
    this.#divboard.addEventListener("click", (e) => { this.handleClick(e, this.#dimensions); });
  }

  #drawDivs() {
    let width = this.#dimensions.width;
    let size  = width * this.#dimensions.height;
    for (let i = 0; i < size; i++) {
      let el = document.createElement("div");
      let magic = width % 2 ? 1 : Math.floor(i / width) % 2;
      el.className = (i % 2 == magic) ? "cell-light" : "cell-dark";
      el.id = "cell " + i.toString();
      this.#divboard.appendChild(el);
    }
    this.#cells = [...this.#divboard.children];
  }

  render() {
    this.#divboard.innerHTML= ""; // reset root class to allow re-rendering
    this.#drawDivs();
  }

  setController(controller) {
    this.#controller = controller;
  }

  handleClick(event, box) {
    let id = event.target.id.slice(5) // slice removes "cell " id prefix

    console.log("dbg: handleClick");
    console.log(id);
    console.log(getCoordPair(id, box));
    // console.log(getIndex(getCoordPair(id, box), box));

    this.#controller.openCell(getCoordPair(id, box));
  }

  propagate(prop) {
    let coords = prop.point;
    let cell   = prop.cell;
    
  }
}

