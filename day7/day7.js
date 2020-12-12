const fs = require("fs").promises;

async function readInput() {
	return (await fs.readFile("input.txt")).toString();
}

async function main() {
	// const input = await readInput();
	const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
	dark orange bags contain 3 bright white bags, 4 muted yellow bags.
	bright white bags contain 1 shiny gold bag.
	muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
	shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
	dark olive bags contain 3 faded blue bags, 4 dotted black bags.
	vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
	faded blue bags contain no other bags.
	dotted black bags contain no other bags.`;

	const regex = /(\w* \w*) bags?/g;

	// format:
	// [color_container, ...colors],
	// [color_container, ...colors],
	// ...
	const bagsInput = input
		.split("\n")
		.map((s) => [...s.matchAll(regex)].map((i) => i[1]));

	// format:
	// { color: [container1, container2, ...],
	//   color: [container1, container2, ...],
	//   ....
	// }
	const bags = [];
	bagsInput.forEach((b) => {
		for (let i = 1; i < b.length; i++) {
			if (!bags[b[i]]) bags[b[i]] = [];
			bags[b[i]] = [...bags[b[i]], b[0]];
		}
	});

	// return array with every path in the graph starting from bagColor
	function findPaths(bagColor) {
		if (bagColor != "no other" && bags[bagColor])
			return [...bags[bagColor].map((b) => findPaths(b)), [bagColor]];
		else return [bagColor];
	}

	// the filter is because findContainers returns a single value instead of array
	const resultPaths = [...new Set(findPaths("shiny gold").flat(100))];

	console.log(resultPaths.length - 1);

	// ------ PART 2 ------------

	const regex2 = /(?:(\d+) )?(\w* \w*) bags?/g;
	// format:
	// [color_container, ...qty,color, qty,color}],
	// [color_container, ...qty,color, qty,color],
	// ...
	const bagsInput2 = input
		.split("\n")
		.map((s) => [...s.matchAll(regex2)].map((i) => [i[1], i[2]]));

	// format:
	// { color: [{qty,child1}, {qty,child2}, ...],
	//   color: [{qty,child1}, {qty,child2}, ...],
	//   ....
	// }
	const bags2 = [];
	bagsInput2.forEach((b) => {
		bags2[b[0][1]] = b
			.map((v, i) => i != 0 && { qty: v[0], color: v[1] })
			.filter((a) => a);
	});

	// return array with every path in the graph starting from bagColor
	function findPaths2(bagColor, qty) {
		if (bagColor != "no other" && bags2[bagColor])
			return [
				...bags2[bagColor].map((b) => findPaths2(b.color, b.qty * qty)),
				[{ color: bagColor, qty: qty }],
			];
		else return [{ color: bagColor, qty: qty }];
	}

	const path = findPaths2("shiny gold", 1).flat(100);
	const result = path.reduce(
		(acc, a) => (a.qty ? acc * 1 + a.qty * 1 : acc),
		0
	);

	console.log(result - 1);
}

main();

// (.*) bags contain \d+ (.*) bags?[,.]?(?: \d+ (.*) bags?)
