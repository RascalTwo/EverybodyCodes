import { describe, expect, test } from 'vitest'


function solveQuest(notes: string) {
	const gained = {}
	for (const line of notes.split('\n')) {
		const [node, rawChanges] = line.split(':')
		const changes = rawChanges.split(',').map(c => {
			return {
				'+': 1,
				'-': -1,
				'=': 0
			}[c]
		})
		let total = 0
		let value = 10;
		for (let s = 0; s < 10; s++) {
			const changeI = s % changes.length
			const change = changes[changeI]
			value += change
			total += value
		}
		gained[node] = total
		console.log({ node, total })
	}
	return Object.entries(gained).sort((a, b) => b[1] - a[1]).map(([node]) => node).join('')
}

function solveQuest2(notes: string, rawTrack: string) {
	let track = [];
	track.push(...rawTrack.split('\n')[0].slice(1));
	for (let r = 1; r < rawTrack.split('\n').length; r++) {
		track.push(rawTrack.split('\n')[r].slice(-1)[0])
	}
	track.push(...[...rawTrack.split('\n').at(-1).slice(0, -1)].reverse())
	for (let r = rawTrack.split('\n').length - 2; r > 0; r--) {
		track.push(rawTrack.split('\n')[r][0])
	}
	track.push('=')
	track = track.map(c => {
		return {
			'+': 1,
			'-': -1,
			'=': 0
		}[c]
	})
	const gained = {}
	for (const line of notes.split('\n')) {
		const [node, rawChanges] = line.split(':')
		const changes = rawChanges.split(',').map(c => {
			return {
				'+': 1,
				'-': -1,
				'=': 0
			}[c]
		})
		let total = 0
		let value = 10;
		let changeI = 0
		//changes //?
		for (let lap = 0; lap < 10; lap++) {
			for (let s = 0; s < track.length; s++) {
				//const changeI = s % changes.length
				let change = changes[changeI]
				changeI++
				if (changeI > changes.length - 1) changeI = 0
				//console.log(node, changeI)
				const trackChange = track[s];
				if (trackChange) {
					change = trackChange;
				}
				//if (lap === 0) console.log(node, change)
				value += change
				total += value
			}
		}
		gained[node] = total
	}
	//console.log(gained)
	return Object.entries(gained).sort((a, b) => b[1] - a[1]).map(([node]) => node).join('')
}

const permutator = (inputArr) => {
	let result = new Set();

	const permute = (arr, m = '') => {
		if (arr.length === 0) {
			result.add(m)
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice();
				let next = curr.splice(i, 1);
				permute(curr.slice(), m + next)
			}
		}
	}

	permute(inputArr)

	return result;
}


function generateValidPlans() {
	//const pool = { '+': 5, '-': 3, '=': 3 }
	return permutator('+++++---==='.split('')) as Set<string>
}

function solveQuest3(notes: string, rawTrack: string) {
	let track = parseTrack(rawTrack).slice(1)
	track = track.map(c => {
		return {
			'+': 1,
			'-': -1,
			'=': 0,
			'S': 0
		}[c]
	})


	const gained = {}
	for (const line of notes.split('\n')) {
		const [node, rawChanges] = line.split(':')
		const changes = rawChanges.split(',').map(c => {
			return {
				'+': 1,
				'-': -1,
				'=': 0
			}[c]
		})
		let total = 0
		let value = 10;
		let changeI = 0
		for (let lap = 0; lap < 2024; lap++) {
			for (let s = 0; s < track.length; s++) {
				let change = changes[changeI]
				changeI++
				if (changeI > changes.length - 1) changeI = 0
				const trackChange = track[s];
				if (trackChange) {
					change = trackChange;
				}
				value += change
				total += value
			}
		}
		gained[node] = total
	}

	const toBeat = Object.values(gained)[0] as number

	console.log({ toBeat })

	let gt = 0
	let lt = 0
	let e = 0
	for (const rawChanges of generateValidPlans()) {
		//for (const rawChanges of ['--+=+-+=+=+']) {
		const changes = rawChanges.split('').map(c => {
			return {
				'+': 1,
				'-': -1,
				'=': 0
			}[c]
		})
		let total = 0
		let value = 10;
		let changeI = 0
		for (let lap = 0; lap < 2024; lap++) {
			for (let s = 0; s < track.length; s++) {
				let change = changes[changeI % changes.length]
				changeI++
				const trackChange = track[s];
				if (trackChange) {
					change = trackChange;
				}
				value += change
				total += value
			}
		}
		//console.log({ rawChanges, changes, total, toBeat })
		gained[rawChanges] = total
		if (total > toBeat) {
			gt++
		} else if (total < toBeat) {
			lt++
		} else {
			e++
		}
	}
	console.log({ gt, lt, e })
	return gt;
}


function parseTrack(rawTrack: string) {
	const world = rawTrack.split('\n').map(l => [...l])
	const path = [{ r: 0, c: 0, s: 'S' }, { r: 0, c: 1, s: world[0][1] }]
	while (path.at(-1).s !== 'S') {
		const { r, c, s } = path.at(-1)!;
		//console.log({ r, c, s })
		for (const [ro, co] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
			const [nr, nc] = [r + ro, c + co]
			const prev = path.at(-2)!;
			if (prev.r === nr && prev.c === nc) continue
			const char = world[nr]?.[nc]
			if (!char || char === ' ') continue
			//console.log({ nr, nc })
			path.push({ r: nr, c: nc, s: char })
			break
		}
	}
	/*
	async function visPath() {
		for (let i = 0; i < path.length; i++) {
			const before = path.slice(0, i)
			for (const { r, c } of before) {
				world[r][c] = '█'
			}
			console.clear()
			console.log(world.map(l => l.join('')).join('\n'))
			await new Promise(r => setTimeout(r, 25))
		}
	}

	visPath()*/

	return path.map(p => p.s)
}
describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`A:+,-,=,=
B:+,=,-,+
C:=,-,+,+
D:=,=,=,+`)).toBe('BDCA')
	})

	test('Notes', () => {
		expect(solveQuest(`B:=,+,+,-,=,-,=,+,-,+
F:+,=,+,+,+,-,-,-,=,=
A:-,-,=,+,+,-,+,=,+,=
I:-,+,=,+,-,-,+,=,=,+
G:-,=,-,-,+,+,=,=,+,+
E:-,+,+,-,=,=,-,=,+,+
H:=,-,+,=,-,+,+,=,+,-
D:+,=,-,+,=,+,=,+,-,-
J:+,=,+,=,-,+,=,+,-,-`)).toBe('FJDBHIEAG')
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(`A:+,-,=,=
B:+,=,-,+
C:=,-,+,+
D:=,=,=,+`, `S+===
-   +
=+=-+`)).toBe('DCBA')
	})

	test('Notes', () => {
		expect(solveQuest2(`H:+,=,+,-,+,-,+,+,-,+,=,+,+,=,+,-,-,+,=,+,=,+,=,+,+,+,=,=,=,+,-,+,-,+,-,+,-,+,=,-
D:-,-,=,-,+,+,+,=,-,+,+,=,=,+,+,=,+,-,+,=,+,-,+,+,-,+,+,+,+,=,+,-,-,=,+,+,=,+,=,-
G:=,=,-,+,+,-,=,-,+,+,+,+,-,+,+,=,+,-,+,-,+,+,-,-,+,+,=,+,=,=,-,=,+,+,=,+,=,+,+,-
B:-,=,+,-,-,=,+,+,-,=,+,+,=,=,+,-,+,+,-,+,-,=,+,+,-,-,=,+,=,=,+,+,+,+,+,+,+,=,+,-
I:=,-,+,=,-,=,+,+,+,=,+,+,-,+,+,=,+,+,-,+,=,+,+,+,+,-,-,+,-,=,=,+,=,=,-,-,+,-,+,+
C:=,+,+,+,-,+,=,=,-,=,-,=,=,=,-,=,+,+,-,-,-,=,+,+,+,+,-,+,+,+,+,+,+,-,+,=,-,+,+,+
K:=,=,+,-,+,+,-,-,=,=,-,+,=,=,+,+,+,=,+,+,-,+,+,+,-,+,+,+,+,+,+,=,-,-,=,-,-,=,+,+
E:-,=,+,=,+,-,+,+,+,-,-,=,=,+,=,-,=,-,+,-,+,+,=,+,-,-,+,=,+,+,+,=,+,+,=,+,-,+,+,+
J:+,+,+,-,-,+,=,+,-,+,+,+,+,=,-,-,=,=,+,+,+,-,+,+,+,-,=,+,-,=,=,=,+,=,=,-,-,+,+,+`.trim(), `S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
-                                                                     -
=                                                                     =
+                                                                     +
=                                                                     +
+                                                                     =
=                                                                     =
-                                                                     -
--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`.trim())).toBe('HBCKIJDEG')
	})
})

describe('Part 3', () => {
	test('Notes', () => {
		expect(solveQuest3(`A:+,-,-,+,=,-,=,=,+,+,+`, `S+= +=-== +=++=     =+=+=--=    =-= ++=     +=-  =+=++=-+==+ =++=-=-=--
- + +   + =   =     =      =   == = - -     - =  =         =-=        -
= + + +-- =-= ==-==-= --++ +  == == = +     - =  =    ==++=    =++=-=++
+ + + =     +         =  + + == == ++ =     = =  ==   =   = =++=
= = + + +== +==     =++ == =+=  =  +  +==-=++ =   =++ --= + =
+ ==- = + =   = =+= =   =       ++--          +     =   = = =--= ==++==
=     ==- ==+-- = = = ++= +=--      ==+ ==--= +--+=-= ==- ==   =+=    =
-               = = = =   +  +  ==+ = = +   =        ++    =          -
-               = + + =   +  -  = + = = +   =        +     =          -
--==++++==+=+++-= =-= =-+-=  =+-= =-= =--   +=++=+++==     -=+=++==+++-`)).toBe(4594)
	})
})
