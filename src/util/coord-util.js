function boundaryCheck(value, maxlength) {
  console.log("value: "+ value + " maxlength: " + maxlength);

  let left = value-1;
  let right = value+1;

  let bounds = [];
  if (left > -1) bounds.push(left);
  if (right < maxlength-1) bounds.push(right);

  return bounds;
}

function getCartesianNeighbors(point = { width: 0, height: 0 }, maxWidth, maxHeight) {
  let xValues = boundaryCheck(point.width, maxWidth);
  let yValues = boundaryCheck(point.height, maxHeight);
  let pairs;

  pairs = yValues.flatMap(yvalue => xValues.map((xvalue) => {
    return {width: xvalue, height: yvalue};
  }));
  console.log(pairs);
  return pairs;
}

// left to right, top to bottom
function getCoordPair(coord, box = { width, height }) {
  let x = coord % box.width;
  let y = Math.floor(coord / box.width);
  return { width: x, height: y };
}

function getIndex(point, box) {
  return point.height * (box.height + 1) + point.width;
}

function randomInts(rangeSize, count) {
  let nums = [...Array(rangeSize).keys()];
  return shuffle(nums).slice(0, count);
}

// implements Fisher-Yates shuffle.
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // while there remain elements to shuffle.
  while (currentIndex !== 0) {

    // pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {boundaryCheck, getCartesianNeighbors, getCoordPair, randomInts, getIndex};
