const fs = require("fs").promises;

async function readInput() {
	return (await fs.readFile("day9/input.txt")).toString();
}

async function main() {
	const input = await readInput();
	// 	const input = `35
	// 20
	// 15
	// 25
	// 47
	// 40
	// 62
	// 55
	// 65
	// 95
	// 102
	// 117
	// 150
	// 182
	// 127
	// 219
	// 299
	// 277
	// 309
	// 576`;

	const inputData = input.split("\n").map((x) => parseInt(x));

	function sumPairExist(array, indexStart, qty, number) {
		for (let i = indexStart; i < indexStart + qty; i++) {
			for (let j = indexStart; j < indexStart + qty; j++) {
				if (i != j) {
					if (array[i] + array[j] === number) {
						return true;
					}
				}
			}
		}
		return false;
	}

	function findSumSet(array, indexStart, number) {
		let sum = 0;
		if (array[indexStart] === number) return false;
		for (let i = indexStart; i < array.length; i++) {
			sum += array[i];
			if (sum === number) return array.slice(indexStart, i);
			if (sum > number) return false;
		}
		return false;
	}

	// part 1
	let result = 0;
	for (let i = 25; i < inputData.length; i++) {
		if (!sumPairExist(inputData, i - 25, 25, inputData[i])) {
			result = inputData[i];
			break;
		}
	}
	console.log(result);

	let sumSet = [];
	// part 2
	for (let i = 0; i < inputData.length; i++) {
		sumSet = findSumSet(inputData, i, result);
		if (sumSet) break;
	}

	console.log(Math.min(...sumSet) + Math.max(...sumSet));
}

main();
