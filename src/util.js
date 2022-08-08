function boundaryCheck(value, maxid) {
  let array = [value];
  if (value - 1 >= 0) array.unshift(value - 1);
  if (value + 1 <= maxid) array.push(value + 1);
  return array;
}

function getCartesianNeighbors(point = { width: 0, height: 0 }, maxWidthID, maxHeightID) {
  let xValues = boundaryCheck(point.width, maxWidthID);
  let yValues = boundaryCheck(point.height, maxHeightID);
  let pairs = [];

  xValues.forEach(x => yValues.forEach(y => pairs.push({ width: x, height: y })));
  pairs = pairs.filter(pair => point.width != pair.width && point.height != pair.height);
  return pairs;
}

// left to right, top to bottom
function getCoordPair(coord, box = { width, height }) {
  let x = coord % box.width;
  let y = Math.floor(coord / box.width);
  return { width: x, height: y };
}

function randomInts(rangeSize, count) {
  let nums = [...Array(rangeSize).keys()];
  return shuffle(nums).slice(0, count);
}

// implements Fisher-Yates shuffle.
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // while there remain elements to shuffle.
  while (currentIndex != 0) {

    // pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {boundaryCheck, getCartesianNeighbors, getCoordPair, randomInts};
