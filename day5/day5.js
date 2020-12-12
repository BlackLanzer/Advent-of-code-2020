const fs = require("fs").promises;

async function readInput() {
	return await fs.readFile("input.txt");
}

function findRow(input) {
	let min = 0;
	let max = 128;
	for (let i = 0; i < input.length - 3; i++) {
		const c = input[i];
		if (c === "F") {
			max = max - (max - min) / 2;
		} else if (c === "B") {
			min = min + (max - min) / 2;
		}
	}
	return min;
}

function findCol(input) {
	let min = 0;
	let max = 8;
	for (let i = 7; i < input.length; i++) {
		const c = input[i];
		if (c === "L") {
			max = max - (max - min) / 2;
		} else if (c === "R") {
			min = min + (max - min) / 2;
		}
	}
	return min;
}

async function main() {
	const input = (await readInput()).toString().split("\n");

	// part 1
	const seats = input.reduce(
		(acc, x) => [...acc, findRow(x) * 8 + findCol(x)],
		[]
	);
	console.log(seats.sort((a, b) => b - a)[0]);

	// part 2
	const empty = [];
	const sortSeats = seats.sort((a, b) => a - b);
	for (let i = 0; i < sortSeats.length; i++) {
		if (sortSeats[i + 1] !== sortSeats[i] + 1) {
			empty.push(sortSeats[i] + 1);
		}
	}
	console.log(empty);
}

main();
