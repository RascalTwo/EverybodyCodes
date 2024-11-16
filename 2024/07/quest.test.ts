import { describe, expect, test } from 'vitest'

type Action = '-' | '=' | '+'

const actionToChange = (action: '-' | '=' | '+') => {
	switch (action) {
		case '-': return -1
		case '=': return 0
		case '+': return 1
	}
}

function parseChariots(notes: string) {
	return notes.split('\n').map(line => {
		const [id, rawPlan] = line.split(':')
		const plan = (rawPlan.split(',') as Action[]).map(actionToChange)
		return { id, plan }
	})
}

function raceChariots(track: number[], chariots: ReturnType<typeof parseChariots>, lapCount: number) {
	const results: Record<string, number> = {}
	for (const { id, plan } of chariots) {
		let totalEssenceGathered = 0
		let power = 10;
		let step = 0
		for (let _ = 0; _ < lapCount; _++) {
			for (const segmentChange of track) {
				power += segmentChange || plan[step]
				totalEssenceGathered += power

				step = (step + 1) % plan.length
			}
		}
		results[id] = totalEssenceGathered
	}
	return results
}

function generateRankings(results: Record<string, number>) {
	return Object.entries(results).sort((a, b) => b[1] - a[1]).map(([id]) => id).join('')
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
	return permutator('+++++---==='.split('')) as Set<string>
}

function parseTrack(rawTrack: string) {
	const world = rawTrack.split('\n').map(l => [...l])
	const path = [{ r: 0, c: 0, char: 'S' }, { r: 0, c: 1, char: world[0][1] }]
	while (path.at(-1).char !== 'S') {
		const { r, c } = path.at(-1);
		for (const [ro, co] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
			const [nr, nc] = [r + ro, c + co]

			const prev = path.at(-2);
			if (prev.r === nr && prev.c === nc) continue

			const char = world[nr]?.[nc]
			if (!char || char === ' ') continue

			path.push({ r: nr, c: nc, char })
			break
		}
	}

	return path.slice(1).map(segment => actionToChange(segment.char as Action))
}

function solveQuest(notes: string) {
	const track = Array.from({ length: 10 }).fill(0) as number[];
	const chariots = parseChariots(notes);
	const results = raceChariots(track, chariots, 1)
	return generateRankings(results);
}

function solveQuest2(notes: string, rawTrack: string) {
	const track = parseTrack(rawTrack)
	const chariots = parseChariots(notes)
	const results = raceChariots(track, chariots, 10)
	return generateRankings(results)
}

function solveQuest3(notes: string, rawTrack: string) {
	const track = parseTrack(rawTrack)
	const toBeatChariot = parseChariots(notes)[0];
	const toBeat = Object.values(raceChariots(track, [toBeatChariot], 2024))[0]

	let betterPlanCount = 0
	for (const rawPlan of generateValidPlans()) {
		const chariot = { id: '0', plan: ([...rawPlan] as Action[]).map(actionToChange) }
		const result = Object.values(raceChariots(track, [chariot], 2024))[0];
		if (result > toBeat) betterPlanCount++
	}

	return betterPlanCount
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
