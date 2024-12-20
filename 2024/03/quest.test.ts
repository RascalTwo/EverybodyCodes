import { describe, expect, test } from 'vitest'

function mineArea(map: string, careAboutDiagonals: boolean) {
	let earthBlocksRemoved = 0;
	let landsDug = []
	const world = map.split('\n').map((rawRow, r, rawRows) => [...rawRow].map<number>((l, c) => {
		const canDigHere = l === '#'
		if (canDigHere) {
			earthBlocksRemoved++
			if ((r > 0 && r < rawRows.length - 1) && (c > 0 && c < rawRow.length - 1)) {
				landsDug.push({ r, c })
			}
		}
		return canDigHere ? 1 : 0
	}));

	function canGoDeeper(r: number, c: number, current: number) {
		for (const [ro, co] of directions) {
			const [nr, nc] = [r + ro, c + co]
			if (world[nr][nc] < current) {
				return false
			}
		}
		return true;
	}

	const directions = [
		[1, 0], [0, 1], [-1, 0], [0, -1],
		...(careAboutDiagonals ? [[+1, 1], [1, -1], [-1, 1], [-1, -1]] : [])
	]

	for (let current = 1; landsDug.length; current++) {
		const diggingDepth = current + 1

		const landsToDig = landsDug.filter(({ r, c }) => canGoDeeper(r, c, current))
		landsToDig.forEach(({ r, c }) => world[r][c] = diggingDepth)

		earthBlocksRemoved += landsToDig.length

		landsDug = landsToDig
	}
	return earthBlocksRemoved
}

describe('Part 1', () => {
	test('Example', () => {
		expect(mineArea(`..........
..###.##..
...####...
..######..
..######..
...####...
..........`.trim(), false)).toBe(35)
	})

	test('Notes', () => {
		expect(mineArea(`..............................
..............................
..............................
.............##...............
.......#..#.####.###..........
.......##.##########..........
.......###############........
.........#############........
.........##########..#........
.........##..#####............
.............#.###............
...............#..............
..............................
..............................`.trim(), false)).toBe(127)
	})
})

describe('Part 2', () => {
	test('Notes', () => {
		expect(mineArea(`......................................................................
......................................................................
......................................................................
......................................................................
...................................##.................................
................................#####..#..............................
............................#..##########....###......................
............................#############....###......................
..........................#.################.###.#....................
.......................###########################....................
......................###########################.....................
.....................###########################......................
......................##########################......................
.....................###########################......................
.....................############################.....................
...................###############################....................
..................################################....................
...............####################..#############....................
.................################################.....................
................#################################.....................
..................###############################.....................
..................################################....................
...................#############################......................
....................############################......................
....................##############################....................
....................###########################.#.....................
.......................########################.......................
......................############################....................
......................#..#######################......................
..........................###################.##......................
..........................####...########.............................
...................................###..##............................
...................................##...#.............................
...................................#..................................
......................................................................`.trim(), false)).toBe(2771)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(mineArea(`..........
..###.##..
...####...
..######..
..######..
...####...
..........`.trim(), true)).toBe(29)
	})

	test('Notes', () => {
		expect(mineArea(`
#####################..............................................................#.......................................#..################
#.###################.................................................#..........###.....................................#.#################.#
#####################.#...........................................#..##.........###....................................#######################
#######################...................................#.......##.##...#....#.####..................................#######################
######################...................................##......##########...######..................................########################
######################.................................####.....###########....#####.#................................###.####################
######################.................................####.....############.....######.................................######################
#####################................................#######.#..#.############..########.................................#.###################
#######################...............................#####.###...###################.#####................................###################
#####################..................................#######################..#####.#####................................###################
#####################...........................############################################.................................#################
#####################............................############################.##############.................................#######.#########
######################...........................###########################################.................................#################
######################............................############################################...............................#################
####.#################..........................##############################################.#..............................#####.##########
#################..#.##.........................################################################.................................##.########.#
####...##########..#..#.........................###################################################.............................###..##..###..
.#........#.#####...............................################################################......................................#..##...
..........#.....#...............................#################################################.............................................
...............................................###############################################................................................
...............................................#..#############################################...............................................
...................................................############################################...............................................
..................................................##############################################..............................................
..................................................###################......#####################..............................................
...................................................#################.######.####################..............................................
...................................................################.###..###.###################..............................................
...................................................################.###..###.#####################............................................
..................................................##################.######.###################...............................................
..................................................###################......#####################.....................................#........
................................................#################################################....................................####.....
................................................###################################################................................#####......
.................................................###############################################.................................########.....
.................................................################################################...............................##.######.....
................................................################################################................................##########.##.
................................................##############################################...................................########.###.
.................................................###########################################..................................###############.
...................................................#########################################...................................###############
..................................................#######################################.###...................................##############
...............................................#########################################....##.................................###############
..#..##.........................................#########################################...###............................#.#################
#########...#...................................##.############################################...........................####################
.########.###....................................#..############################################.#.........................###################
##############....................................#######################################.########.........................###################
################....................................####################################...#....##.........................###################
############........................................##..###########################.####................................######################
#############.......................................##...####################..###...##................................#######################
###############...........................................###################.........#................................#######################
##############..............................................#..############.............................................######################
################...........................................##....##########...........................................########################
################...............................................##########.#...........................................########################
#.###############..............................................###########............................................######################.#
###############..................................................#########...............................................#####################`.trim(), true)).toBe(10178)
	})
})
