const fs = require("fs").promises;

async function readInput() {
	return (await fs.readFile("input.txt")).toString();
}

async function main() {
	const input = await readInput();
	// const input = `nop +0
	// acc +1
	// jmp +4
	// acc +3
	// jmp -3
	// acc -99
	// acc +1
	// jmp -4
	// acc +6`;

	const regex = /([a-z]+) ([\+-]\d+)/;
	const inputInstructions = input.split("\n").map((s, i) => {
		const r = regex.exec(s);
		return {
			index: i,
			instruction: r[1],
			value: parseInt(r[2]),
		};
	});

	function simulation(instructions) {
		// part 1
		const visited = [];
		let acc = 0;
		let i = 0;
		let finish = true;
		while (i < instructions.length) {
			if (visited.includes(instructions[i])) {
				finish = false;
				break;
			}
			const currInstruction = instructions[i];
			switch (currInstruction.instruction) {
				case "jmp":
					i += currInstruction.value;
					break;
				case "acc":
					acc += currInstruction.value;
					i++;
					break;
				default:
					i++;
					break;
			}
			visited.push(currInstruction);
		}
		return { acc: acc, finish: finish };
	}
	console.log(simulation(inputInstructions).acc);

	// part 2
	for (let i = 0; i < inputInstructions.length; i++) {
		const tempInstructions = JSON.parse(JSON.stringify(inputInstructions));
		switch (tempInstructions[i].instruction) {
			case "jmp":
				tempInstructions[i].instruction = "nop";
				break;
			case "nop":
				tempInstructions[i].instruction = "jmp";
				break;
			default:
				break;
		}
		const sim = simulation(tempInstructions);
		if (sim.finish) {
			console.log(sim.acc, i);
			break;
		}
	}
}

main();
