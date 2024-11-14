
function solveQuest3(highPriests, acolytes, blocksAvailable) {
	let blocksRemaining = blocksAvailable - 1
	const calcThickness = (prevThickness: number) => {
		return ((prevThickness * highPriests) % acolytes) + acolytes
	}
	const emptyBlockForCol = (colHeight: number) => {
		const toRemove = ((highPriests * width) * colHeight) % acolytes
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
		if (layer % 10000 === 0) console.log(blocksRemaining)
		if (newBlocks - toEmpty > blocksRemaining) {
			const neededForNextLayer = newBlocks - blocksRemaining;
			console.log(layer)
			const nxt = spent + newBlocks - toEmpty
			width -= 2
			height -= thicknesses.at(-1)
			spent -= thicknesses.at(-2) * width

			let t = height;
			let toEmpty2 = emptyBlockForCol(height)
			for (const think of thicknesses.slice(0, -2)) {
				t -= think
				toEmpty2 += emptyBlockForCol(t) * 2
			}
			const newBlocks2 = thicknesses.at(-1) * width
			console.log(spent + newBlocks2 - toEmpty2)
			return nxt
			return neededForNextLayer + blocksAvailable
		} else {
			blocksRemaining -= newBlocks
			spent += newBlocks
		}
	}
}
console.log(solveQuest3(984552, 10, 202400000000))