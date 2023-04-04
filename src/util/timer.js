"use srtict"

export default function timer() {

	let timer = document.querySelector('.main-title__timer-time');
	let interval;
	let second = 0;

	function reseter() {
		clearInterval(interval);
		interval = setInterval(runningTimer, 1000)
	}

	function runningTimer() {

		if (second < 9) {
			second++;
			timer.innerText = "00" + second;
		} else if (second < 99) {
			second++;
			timer.innerText = "0" + second;
		} else if (second >= 99) {
			second++;
			timer.innerText = second;
		}

	}
	reseter();
}
