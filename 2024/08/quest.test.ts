import { describe, expect, test } from 'vitest'


function solveQuest(notes: number) {
	let blocksRemaining = notes - 4
	let blocks = [{ x: 1, y: 0, l: 2 }, { x: -1, y: 0, l: 2 }, { x: 0, y: 1, l: 2 }];
	//const directions = [[-1, 0], [1, 0], [0, 1]]
	for (let layer = 3; true; layer++) {
		const nextBlocks = []
		for (const { x, y, l } of blocks) {
			if (l !== layer - 1) continue;
			const directions = [];
			if (x < 0 || x === 0) directions.push([-1, 0])
			if (x > 0 || x === 0) directions.push([1, 0])
			if (x === 0) directions.push([0, 1])
			for (const [xo, yo] of directions) {
				const [nx, ny] = [x + xo, y + yo];
				const existing = blocks.find(b => b.x === nx && b.y === ny);
				if (existing) continue;
				const alreadyPlaced = nextBlocks.find(b => b.x === nx && b.y === ny);
				if (alreadyPlaced) continue
				nextBlocks.push({ x: nx, y: ny, l: layer })
			}
		}
		if (nextBlocks.length > blocksRemaining) {
			const neededForNextLayer = nextBlocks.length - blocksRemaining;
			return neededForNextLayer * nextBlocks.length
		} else {
			blocks = nextBlocks
			blocksRemaining -= nextBlocks.length
		}
	}
}
function solveQuest2(nullPointers, acolytes, blocksAvailable: number) {
	let blocksRemaining = blocksAvailable - 1
	const calcThickness = (prevThickness: number) => {
		return (prevThickness * nullPointers) % acolytes
	}
	let thickness = 1;
	let width = 1;
	for (let layer = 2; true; layer++) {
		width += 2;
		thickness = calcThickness(thickness)
		const newBlocks = thickness * width
		console.log(newBlocks)
		if (newBlocks > blocksRemaining) {
			const neededForNextLayer = newBlocks - blocksRemaining;
			//return neededForNextLayer * newBlocks
			return (width) * neededForNextLayer
		} else {
			blocksRemaining -= newBlocks
		}
	}
}
function solveQuest3(highPriests, acolytes, blocksAvailable) {
	let blocksRemaining = blocksAvailable - 1
	const calcThickness = (prevThickness: number) => {
		return ((prevThickness * highPriests) % acolytes) + acolytes
	}
	const emptyBlockForCol = (colHeight: number) => {
		const toRemove = ((highPriests * width) * colHeight) % acolytes
		console.log({ colHeight, toRemove })
		return toRemove
	}
	const neededForLayer = () => {

	}
	const thicknesses = [1]
	let width = 1;
	let height = 1;
	let spent = 1
	for (let layer = 2; true; layer++) {
		width += 2;
		thicknesses.push(calcThickness(thicknesses.at(-1)))
		height += thicknesses.at(-1)
		let t = height;
		let toEmpty = emptyBlockForCol(height)
		for (const think of thicknesses.slice(0, -2)) {
			t -= think
			toEmpty += emptyBlockForCol(t) * 2
		}
		const newBlocks = thicknesses.at(-1) * width
		//console.log({ layer, toEmpty, newBlocks, spent, willSpend: spent + newBlocks - toEmpty })
		if (newBlocks > blocksRemaining) {
			const neededForNextLayer = newBlocks - blocksRemaining;
			return spent + newBlocks - toEmpty
			return neededForNextLayer + blocksAvailable
		} else {
			blocksRemaining -= newBlocks
			spent += newBlocks
		}
	}
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
		expect(solveQuest2(790, 1111, 20240000)).toBe(1234567890)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(2, 5, 160)).toBe(162)
	})

	test('Notes', () => {
		expect(solveQuest3(984552, 10, 202400000000)).toBe(1234567890)
	})
})
