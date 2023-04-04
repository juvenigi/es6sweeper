export default class SweeperCell {
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
    return 8 === ++this.#defuseCounter;
  }

  addBombCount(diff) {
    this.#neighboringBombs += diff;
    this.#defuseCounter += diff;
  }

  open() {
    this.#isOpen = true;
  }

  get() {
    return {bomb: this.#isBomb, open: this.#isOpen, neiBombs: this.#neighboringBombs}
  }
}
