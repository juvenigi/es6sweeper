'use strict'

// import bombsGen from "./modules/bombsCounterFields.js"
// import beforeFieldsGen from "./modules/wrapperFields.js";
// import coverBoard from "./modules/wrapperFields.js";
import timer from './modules/timer.js';

//? boards class
class CheckExtremeBorders {
	constructor(bombArray) {
		this.bombArray = bombArray;
	};
	static numbersOfBoardTopVertical(num) {
		const arrayY = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111];
		return arrayY.filter(item => {
			if (item == num) return num;
		});
	};
	static numbersOfBoardButtonVertical(num) {
		let arrayX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
		return arrayX.filter(item => {
			if (item == num) return num;
		})
	};
}
//? create model class
class MineSweeperBoard {
	constructor() {
		//width, height of board
		this.width;
		this.height;
		this.lastArray;
	};
	sapperBoard(width, height) {
		//creater varibles for used to create index Arrays
		this.width = width;
		this.height = height;
		this.bool = false;
		//document connectors
		const boardClass = document.querySelector('.board-sapper');
		//create empty arrays for board on X & Y verticals
		const arrayX = [];
		arrayX.length = width;
		const arrayY = [];
		arrayY.length = height;
		let arrayXY = [];
		let bombArray = [];
		let num = 0;
		//? let's create array for random bomb's id
		for (let i = 0; i <= 15; i++) {
			bombArray.push(this.randomizeMinesXY(1, 120));
		}

		for (let i = 0; i < arrayY.length; i++) {
			for (let j = 0; j < arrayX.length; j++) {
				const number = i + j;

				//? create blocks for flags

				//? create mask
				const unpairMaskBlock = document.createElement('div');
				const pairMaskBlock = document.createElement('div');

				//? create blocks
				const createrBoardUnpairedBlocksGroup = document.createElement('div'); //unpaired blocks
				const createrBoardPairedBlocksGroup = document.createElement('div');   //paired 

				if (number % 2 === 0) {
					num++;

					pairMaskBlock.classList = `mask-block-second mask-block ${num}`;
					pairMaskBlock.style.background = '#e4c29f';
					pairMaskBlock.append(createrBoardPairedBlocksGroup);

					createrBoardPairedBlocksGroup.classList = `board-block-secondColor search-board ${num} `;
					createrBoardPairedBlocksGroup.style.backgroundColor = '#a9d751';

					bombArray.forEach(item => {
						if (item == num) {
							createrBoardPairedBlocksGroup.classList = `board-block-secondColor  bomb ${num} `;
						}
					});

					arrayXY.push(
						boardClass.append(pairMaskBlock)
					);
				} else {
					num++;

					unpairMaskBlock.style.background = '#d7b899';
					unpairMaskBlock.classList = `mask-block-firts mask-block ${num}`;
					unpairMaskBlock.append(createrBoardUnpairedBlocksGroup);

					createrBoardUnpairedBlocksGroup.classList = `board-block-firstColor search-board ${num}`;
					createrBoardUnpairedBlocksGroup.style.backgroundColor = '#a2d049';

					bombArray.forEach(item => {
						if (item == num) {
							createrBoardUnpairedBlocksGroup.classList = `board-block-firstColor  bomb ${num}`;
						}
					});

					arrayXY.push(
						boardClass.append(unpairMaskBlock)
					);
				}
			}
		}
	};
	static boombList() {
		const boomsNumberID = document.querySelectorAll('.bomb')
		let arrayOfIDBomb = [];
		boomsNumberID.forEach(item => {
			arrayOfIDBomb.push(+item.classList[2])
		});
		return arrayOfIDBomb  //? массив с координатами бомб
	};
	static arrayOfNeighborsBobms() {
		const adjacentFieldsWithBombs = [];
		for (let i = 0; i < MineSweeperBoard.boombList().length; i++) {
			for (let j = 0; j < MineSweeperBoard.neighborsSearcher(MineSweeperBoard.boombList()[i]).length; j++) {
				adjacentFieldsWithBombs.push(
					MineSweeperBoard.neighborsSearcher(MineSweeperBoard.boombList()[i])[j]
				)
			}
		}
		return adjacentFieldsWithBombs; //? показывает все ID полей, соприкасающихся с минами
	};
	// поиск координат и создание массива смежных с минами  клеток
	static neighborsSearcher(x) {
		let emptyArr = [];
		if (x >= 1 && x <= 120) {
			if (x > 1 && x < 10) {
				emptyArr.push((x - 1), +x + 1, +x + 9, +x + 10, +x + 11)
			}
			if (x >= 11 && x <= 110) {
				if (Object.keys(CheckExtremeBorders.numbersOfBoardTopVertical(x)).length !== 0) {
					emptyArr.push(
						(x - 10), (x - 9), +x + 1, +x + 10, +x + 11
					);
				} else if (Object.keys(CheckExtremeBorders.numbersOfBoardButtonVertical(x)).length !== 0) {
					emptyArr.push(
						(x - 11), (x - 10), (x - 1), +x + 9, +x + 10
					);
				} else {
					emptyArr.push(
						(x - 11), (x - 10), (x - 9), (x - 1), +x + 1, +x + 9, +x + 10, +x + 11
					);
				}
			}
			if (x > 111 && x < 120) emptyArr.push((x - 11), (x - 10), (x - 9), (x - 1), +x + 1);
			//особые усл. для угловых эл.
			if (x == 1) emptyArr.push(+x + 1, +x + 10, +x + 11);
			if (x == 10) emptyArr.push((x - 1), +x + 9, +x + 10);
			if (x == 111) emptyArr.push((x - 10), (x - 9), +x + 1);
			if (x == 120) emptyArr.push((x - 11), (x - 10), (x - 1));
			return emptyArr;
		} else return `Ha-ha no` && false;
	}
	randomizeMinesXY(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
}

function filterNeighborsBombsList() { //?  генерация номеров блоков
	const fieldsWithoutBombs = document.querySelectorAll('.search-board');

	let cache = new Map();
	let counter = 1;
	MineSweeperBoard.arrayOfNeighborsBobms().forEach(item => {

		fieldsWithoutBombs.forEach(itemsID => {

			if (item == itemsID.classList[2]) {

				if (cache.has(item)) {
					if (itemsID.innerText == "") {
						itemsID.innerText = "0";
					} else {
						itemsID.innerText = ++itemsID.innerText;
					}
				} else {

					itemsID.innerText = `${counter}`;
					itemsID.style.color = "rgba(0,0,0,0)";
					cache.set(item, counter);
				}
			}
		});
	});
};


//? основной стэк вызовов
let ownerBoard = new MineSweeperBoard()
console.log(ownerBoard.sapperBoard(10, 12));
MineSweeperBoard.boombList();
filterNeighborsBombsList();
controller();


// функция - контроллер. отвечает за взаимодействие с юзером
function controller() {
	const supperEvents = document.querySelector('.board-sapper');
	const flags = document.querySelector('.main-title__flags-counter');

	let flagsCounter = MineSweeperBoard.boombList().length;
	flags.textContent = flagsCounter;

	timer(); //! запускать таймер с момента первого нажатия на доску

	supperEvents.childNodes.forEach(item => {

		item.addEventListener('click', (e) => {

			if (e.target.textContent == '1') e.target.style.color = 'blue';
			if (e.target.textContent == '2') e.target.style.color = 'green';
			if (e.target.textContent == '3') e.target.style.color = 'red';
			if (e.target.textContent == '4') e.target.style.color = 'purple';
			if (e.target.textContent == '5') e.target.style.color = 'black';
			if (e.target.textContent == '6') e.target.style.color = 'darkslategray';
			if (e.target.textContent == '7') e.target.style.color = 'rgb(64, 25, 90)';
			if (e.target.textContent == '8') e.target.style.color = 'rgb(15, 81, 119)';

			if (e.target.classList[0] == "board-block-secondColor") {

				if (e.target.innerHTML !== '🚩') {
					e.currentTarget.style.background = 'transparent';
					e.target.style.background = '#e4c29f';

					if (e.target.classList[1] == 'bomb') {
						e.target.innerText = '💣';
						console.log(`GG`);  //! Включить обработку проигрыша
					}
				}
			} else {

				if (e.target.innerHTML !== '🚩') {
					e.currentTarget.style.background = 'transparent';
					e.target.style.background = '#d7b899';

					if (e.target.classList[1] == 'bomb') {
						e.target.innerText = '💣';
						console.log(`GG`);  //! Включить обработку проигрыша
					}
				}
			}
		});


		item.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			if (flagsCounter > 0) {

				if (e.target.innerHTML !== '🚩' && e.target.style.background !== 'rgb(228, 194, 159)'
					&& e.target.style.background !== 'rgb(215, 184, 153)') {

					if (e.target.innerHTML !== "") {

						if (e.target.classList[1] == 'bomb') {
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '1') {
							e.target.classList.add(`number-1`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '2') {
							e.target.classList.add(`number-2`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '3') {
							e.target.classList.add(`number-3`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '4') {
							e.target.classList.add(`number-4`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '5') {
							e.target.classList.add(`number-5`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '6') {
							e.target.classList.add(`number-6`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '7') {
							e.target.classList.add(`number-7`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
						if (e.target.innerHTML == '8') {
							e.target.classList.add(`number-8`);
							e.target.style.color = 'white';
							e.target.innerHTML = '🚩';
						}
					} else {
						e.target.innerHTML = '🚩';
						e.target.style.color = 'white';
					}

					flagsCounter--;

				} else if (e.target.innerHTML == '🚩' && e.target.style.background !== 'rgb(228, 194, 159)'
					&& e.target.style.background !== 'rgb(215, 184, 153)') {

					if (e.target.classList[1] == 'bomb') {
						e.target.innerHTML = ' ';
					} else if (!e.target.classList[3]) {
						e.target.innerHTML = '';
					} else {
						e.target.style.color = 'rgba(0,0,0,0)';
						let el = e.target.classList[3];
						let numEl = parseInt(el.match(/\d+/));
						e.target.innerHTML = numEl;
					}
					flagsCounter++;

				} else return flagsCounter;

				if (flagsCounter < 0) return;

				flags.textContent = flagsCounter;
			};
		});
	});
};

