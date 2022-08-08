# Minesweeper implementation in ES6
_(utilizes classes, private fields, and modules)_

This is a Single-Page Application with classic Minesweeper rules.

**first click is guaranteed to be bomb-free**

## Controls

left mouse button to open a cell

right mouse button to place a flag

Refresh page to start a new game

## Win/Lose condition

* if all cells are correctly flagged (no wrong flags), the game is won
* also, if all bomb-surrounding cells are opened, setting the flag is not mandatory
* if the user opens the bomb cell, the game is lost
* **the game will tell you if you have won or lost**

## Launching

you have to statically serve the contents of the `src/` folder, which can be done by using  [live-server](https://www.npmjs.com/package/live-server)

```bash
cd src/
npx live-server
```

Alternatively, try launching `src/index.html` using _Go Live_ in Visual Studio Code.

## Code structure

The code is split according to the MVC pattern `src/minesweeper`:

 - Model: `SweeperBoard.js` abstract representation of the game board for easier logic
 - Controller: `SweeperLogic.js` contains logic, duh
 - View: `SweeperDivBoard.js` updates DOM, sets EventListeners, basically is the UI
 
MVC is instantiated and wired in `src/minesweeper.js` (main class).
