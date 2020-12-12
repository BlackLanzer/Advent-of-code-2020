const { debug } = require("console");

const fs = require("fs").promises;

async function readInput() {
	return (await fs.readFile("input.txt")).toString();
}

async function main() {
	const input = await readInput();
	const groups = input.split("\n\n");

	// part 1: anyone answer
	let answers = 0;
	for (const g of groups) {
		const uniqAnswers = [];
		for (const c of g) {
			if (!uniqAnswers.includes(c) && c !== "\n") {
				uniqAnswers.push(c);
				answers++;
			}
		}
	}
	console.log(answers);

	// part 2: everyone answer
	let result = 0;
	for (const g of groups) {
		const answers = g.split("\n");
		// build bin array with answer: 'abd' -> 1101 (reversed?)
		// let answersBin = [];
		// for (const a of answers) {
		// 	let bin = 0;
		// 	for (let i = 0; i < a.length; i++) {
		// 		bin = bin + (1 << (a.charCodeAt(i) - "a".charCodeAt(0)));
		// 	}
		// 	answersBin.push(bin);
		// }
		// // logic and to get common answers in group
		// let x = answersBin.reduce((acc, b) => acc & b, Math.pow(2, 30) - 1);
		// while (x > 0) {
		// 	result += x % 2;
		// 	x = x >> 1;
		// }

		let sameAnswers = answers.reduce(
			(acc, a) => a.split("").filter((c) => acc.includes(c)),
			answers[0].split("")
		);
		result += sameAnswers.length;
	}
	console.log(result);
}

main();
