import SweeperData from "./minesweeper/SweeperData.js";
import SweeperLogic from "./minesweeper/SweeperLogic.js";
import SweeperDivBoard from "./minesweeper/SweeperDivBoard.js";

'use strict'

const config = {
  width: 13,
  height: 12,
  bombs: 15,
  pxsize: 40
}

let data = new SweeperData(config.width, config.height, config.bombs);
let controller = new SweeperLogic();
let board = new SweeperDivBoard(config.width, config.height, config.pxsize);

// Now wire them together

controller.setup(data,board);
board.setController(controller);
board.render();
