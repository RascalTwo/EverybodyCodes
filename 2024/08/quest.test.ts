import { describe, expect, test } from 'vitest'


function planShrineBuilding(available: number, calcThickness: (prevThickness: number) => number, calcEmptyBlocksForColumn: (height: number, width: number) => number) {
	let remaining = available - 1
	const thicknesses = [1]
	for (let layer = 2; true; layer++) {
		const width = layer + layer - 1

		thicknesses.push(calcThickness(thicknesses.at(-1)))
		const height = thicknesses.reduce((a, b) => a + b)

		let leftAsEmptySpace = calcEmptyBlocksForColumn(height, width)
		let currentHeight = height;
		for (const thickness of thicknesses.slice(0, -2)) {
			currentHeight -= thickness
			leftAsEmptySpace += calcEmptyBlocksForColumn(currentHeight, width) * 2
		}

		const neededForThisLayer = thicknesses.at(-1) * width
		if (neededForThisLayer <= remaining) {
			remaining -= neededForThisLayer
			continue
		}

		const spent = available - remaining
		const totalToThisLayer = spent + neededForThisLayer - leftAsEmptySpace
		return {
			missing: neededForThisLayer - remaining,
			width,
			totalToThisLayer
		}
	}
}

function solveQuest(notes: number) {
	const { width, missing } = planShrineBuilding(notes, () => 1, () => 0)
	return width * missing;
}

function solveQuest2(nullPointers: number, acolytes: number, blocksAvailable: number) {
	const { width, missing } = planShrineBuilding(blocksAvailable, prevThickness => (prevThickness * nullPointers) % acolytes, () => 0)
	return width * missing;

}

function solveQuest3(highPriests: number, acolytes: number, blocksAvailable: number) {
	const { totalToThisLayer } = planShrineBuilding(blocksAvailable, prevThickness => ((prevThickness * highPriests) % acolytes) + acolytes, (height, width) => ((highPriests * width) * height) % acolytes)
	return totalToThisLayer - blocksAvailable
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(13)).toBe(21)
	})

	test('Notes', () => {
		expect(solveQuest(4097767)).toBe(11572042)
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(3, 5, 50)).toBe(27)
	})

	test('Notes', () => {
		expect(solveQuest2(790, 1111, 20240000)).toBe(141385290)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(2, 5, 160)).toBe(2)
	})

	test('Notes', () => {
		expect(solveQuest3(984552, 10, 202400000)).toBe(41067)
	})
})
