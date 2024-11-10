import { describe, expect, test } from 'vitest'


function solveQuest(notes: string) {
	const lines = notes.split('\n')
	const rows = [];
	for (const line of lines) {
		const values = line.split(' ');
		for (let i = 0; i < values.length; i++) {
			while (!rows[i]) { rows.push([]) }
			rows[i].push(+values[i])
		}
	}
	const columns = []
	for (let r = 0; r < rows.length; r++) {
		const column = []
		for (let c = 0; c < rows[r].length; c++) {
			column.push(rows[r][c])
		}
		columns.push(column)
	}

	const results = []

	for (let round = 1; round <= 10; round++) {
		const columnIndex = (round - 1) % columns.length
		//console.log(columnIndex)
		const number = columns[columnIndex].splice(0, 1)[0];
		const nextColumn = columns[(columnIndex + 1) % columns.length]
		let side = 'left';
		let rowV = 1
		let row = 0
		let clap = 1
		while (clap !== number) {
			clap++;
			if (columns[row + rowV] === undefined) {
				rowV *= -1
				side = side === 'left' ? 'right' : 'left'
			} else {
				row += rowV
			}
		}
		//console.log({ row, side, clap })
		//console.log(nextColumn.join('\n'))
		//console.log('added', number)
		nextColumn.splice(row + (side === 'left' ? 0 : 1), 0, number)
		//console.log(nextColumn.join('\n'))
		//console.log()
		results.push(columns.map(c => c[0]).join(''))
	}
	//console.log(results)
	return +results.at(-1)
}

function solveQuest2(notes: string) {
	const lines = notes.split('\n')
	const rows = [];
	for (const line of lines) {
		const values = line.split(' ');
		for (let i = 0; i < values.length; i++) {
			while (!rows[i]) { rows.push([]) }
			rows[i].push(+values[i])
		}
	}
	const columns = []
	for (let r = 0; r < rows.length; r++) {
		const column = []
		for (let c = 0; c < rows[r].length; c++) {
			column.push(rows[r][c])
		}
		columns.push(column)
	}

	const resultCounts = {};

	for (let round = 1; true; round++) {
		const columnIndex = (round - 1) % columns.length
		//console.log(columnIndex)
		const number = columns[columnIndex].splice(0, 1)[0];
		const nextColumn = columns[(columnIndex + 1) % columns.length]
		let side = 'left';
		let rowV = 1
		let row = 0
		let clap = 1
		while (clap !== number) {
			clap++;
			if (nextColumn[row + rowV] === undefined) {
				rowV *= -1
				//console.log(side)
				side = side === 'left' ? 'right' : 'left'
				//console.log(side)
			} else {
				row += rowV
			}
		}
		//console.log({ row, side, clap })
		//console.log(nextColumn.join('\n'))
		//console.log('added', number)
		nextColumn.splice(row + (side === 'left' ? 0 : 1), 0, number)
		//console.log(nextColumn.join('\n'))
		//console.log()
		const result = +columns.map(c => c[0]).join('')
		resultCounts[result] = (resultCounts[result] ?? 0) + 1
		//console.log(columns)
		//console.log(result)
		//if (round <= 10) console.log(resultCounts, result, round)
		//if (round === 10) break;
		if (resultCounts[result] === 2024) {
			//console.log(resultCounts, result, round)
			return result * round
		}
	}
}

function solveQuest3_not(notes: string) {
	const lines = notes.split('\n')
	const rows = [];
	for (const line of lines) {
		const values = line.split(' ');
		for (let i = 0; i < values.length; i++) {
			while (!rows[i]) { rows.push([]) }
			rows[i].push(+values[i])
		}
	}
	const columns = []
	for (let r = 0; r < rows.length; r++) {
		const column = []
		for (let c = 0; c < rows[r].length; c++) {
			column.push(rows[r][c])
		}
		columns.push(column)
	}

	const resultCounts = {};

	for (let round = 1; true; round++) {
		const columnIndex = (round - 1) % columns.length
		//console.log(columnIndex)
		const number = columns[columnIndex].splice(0, 1)[0];
		const nextColumn = columns[(columnIndex + 1) % columns.length]
		let side = 'left';
		let rowV = 1
		let row = 0
		let clap = 1
		while (clap !== number) {
			clap++;
			if (nextColumn[row + rowV] === undefined) {
				rowV *= -1
				//console.log(side)
				side = side === 'left' ? 'right' : 'left'
				//console.log(side)
			} else {
				row += rowV
			}
		}
		//console.log({ row, side, clap })
		//console.log(nextColumn.join('\n'))
		//console.log('added', number)
		nextColumn.splice(row + (side === 'left' ? 0 : 1), 0, number)
		//console.log(nextColumn.join('\n'))
		//console.log()
		const result = +columns.map(c => c[0]).join('')
		resultCounts[result] = (resultCounts[result] ?? 0) + 1
		//console.log(columns)
		//console.log(result)
		//if (round <= 10) console.log(resultCounts, result, round)
		//if (round === 10) break;
		if (resultCounts[result] === 2024) {
			//console.log(resultCounts, result, round)
			return result * round
		}
	}
}

function solveQuest3(notes: string) {
	const lines = notes.split('\n')
	const rows = [];
	for (const line of lines) {
		const values = line.split(' ');
		for (let i = 0; i < values.length; i++) {
			while (!rows[i]) { rows.push([]) }
			rows[i].push(+values[i])
		}
	}
	const columns = []
	for (let r = 0; r < rows.length; r++) {
		const column = []
		for (let c = 0; c < rows[r].length; c++) {
			column.push(rows[r][c])
		}
		columns.push(column)
	}

	let bigR = Number.MIN_SAFE_INTEGER
	let lastFound = Date.now()
	for (let round = 1; true; round++) {
		const columnIndex = (round - 1) % columns.length
		const number = columns[columnIndex].splice(0, 1)[0];
		const nextColumn = columns[(columnIndex + 1) % columns.length]
		let side = 'left';
		let rowV = 1
		let row = 0
		let clap = 1
		while (clap !== number) {
			clap++;
			if (nextColumn[row + rowV] === undefined) {
				rowV *= -1
				side = side === 'left' ? 'right' : 'left'
			} else {
				row += rowV
			}
		}
		nextColumn.splice(row + (side === 'left' ? 0 : 1), 0, number)
		const result = +columns.map(c => c[0]).join('')
		if (result > bigR) {
			bigR = result;
			lastFound = Date.now()
			console.log(bigR)
		}
		//if (round % 100000 === 0) console.log(bigR)
		if (Date.now() - lastFound > 10 * 1000) break
	}
	return bigR
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`

2 3 4 5
3 4 5 2
4 5 2 3
5 2 3 4

`.trim())).toBe(2323)
	})

	test('Notes', () => {
		expect(solveQuest(`4 2 3 4
5 4 2 5
2 3 5 3
3 5 2 4
5 2 4 3`.trim())).toBe(3222)
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(`

2 3 4 5
6 7 8 9

`.trim())).toBe(50877075)
	})

	test('Notes', () => {
		expect(solveQuest2(`22 94 27 64
87 13 98 96
19 37 19 48
69 74 11 42
12 77 82 19
32 25 88 11
35 73 67 65
11 92 90 29
39 55 36 60
22 62 20 85
64 81 43 31
60 10 43 13
54 59 95 26
41 53 84 30
84 36 72 29
78 75 87 34
91 72 16 76
92 35 38 17
37 28 47 14
60 35 97 18
13 24 75 52
49 33 71 32
10 82 58 23
77 40 58 91
94 94 73 43
85 39 83 85
69 23 93 55
33 37 18 43
80 15 50 14
24 26 36 16
44 97 78 61
99 25 65 11
74 37 81 10
56 72 44 15
24 54 74 36
77 92 99 40
66 61 79 44
30 42 23 15
71 76 93 57
21 24 21 46
93 65 79 60
91 31 52 47
22 78 85 91
29 20 89 67
51 52 82 18
88 68 51 55
12 12 66 45
98 14 26 67
45 18 54 39
17 76 13 50
41 22 48 55
21 41 46 66
50 53 27 39
98 96 69 95
30 51 76 46
63 22 87 24
61 57 28 14
40 44 53 74
30 34 53 27
62 56 21 96
39 57 52 34
50 28 78 46
29 41 56 90
19 97 34 61
46 86 63 25
88 49 86 21
89 15 70 59
79 16 35 23
69 82 13 38
64 70 27 66
67 40 23 38
65 75 40 11
12 98 36 18
19 72 30 16
43 45 92 73
64 68 33 20
48 45 42 93
10 41 63 86
33 59 47 81
70 15 83 49
63 38 62 83
57 88 58 89
68 58 70 17
42 90 59 80
28 32 25 20
16 20 17 99
97 99 84 31
95 94 90 12
28 31 62 77
49 89 29 51
26 54 71 71
83 42 25 26
45 81 33 80
38 34 80 27
35 37 56 44
32 96 32 95
48 73 14 79
68 17 86 75
87 84 47 31`.trim())).toBe(17830051584540)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`2 3 4 5
6 7 8 9`.trim())).toBe(6584)
	})

	test('Notes', () => {
		expect(solveQuest3(`1003 1009 1001 1005
1000 1005 5366 1000
1000 1009 1004 1002
1000 1003 1003 1000
1002 1009 1000 1009
6891 1001 1005 1007
1008 1005 7561 7082
7801 1003 1000 1001
1002 1001 1002 7603
1009 1001 1008 1003
1008 1003 1006 1001
1005 1001 1002 1006
1002 1003 1006 1009
1002 5943 1003 1006
1000 1008 1007 1009
2895 1007 1004 1006
1007 1002 1007 1000
1008 1005 1004 1006
5037 1000 1001 1001
1008 1003 1008 1003
1000 1002 1003 1001
1007 1004 1007 1005
5613 1001 1009 7504
1009 1003 1006 1003
1000 1001 1000 1000
1006 5855 1002 3301
1000 9843 1000 1009
1004 1006 1007 1006
1005 8411 1000 1001
1006 1008 1008 1008
1003 1004 1008 1006
1008 1003 1006 1000
1003 1005 1001 1001
1004 1004 1006 1008
1004 1005 1000 5316
1000 1005 1002 1009
1007 1002 1006 1007
1000 1005 1007 1007
1002 1000 5866 1002
1003 1001 1000 5447
1009 1009 1007 1009
1009 1003 1001 1007
1007 1008 9560 1007
1004 1006 1007 1000
1005 2162 1002 1000
1009 1000 1007 1008
1002 1008 1006 1008
1001 1005 1007 1001
1008 1005 1000 1008
1009 1007 1001 1009`.trim())).toBe(7801100910031002)
	})
})
