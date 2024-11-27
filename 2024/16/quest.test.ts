import { describe, expect, test } from 'vitest'
import fs from 'fs'

function parseMachine(notes: string) {
	const [first, last] = notes.split('\n\n')
	const turns = first.split(',').map(Number);

	const wheelFaces = Array.from({ length: turns.length }, () => [] as string[]);
	const faceIndexes = wheelFaces.map((_, i) => i * 3 + i)
	for (const line of last.split('\n')) {
		for (const [wi, f] of faceIndexes.entries()) {
			const face = line.slice(f, f + 3).trim()
			if (face) {
				wheelFaces[wi].push(face)
			}
		}
	}

	return { wheelFaces, turns }
}

function countCoins(result: string[]) {
	let coins = 0

	const counts: Record<string, number> = {};
	for (const char of result.map(face => face[0] + face[2]).join('')) {
		if ((counts[char] = (counts[char] ?? 0) + 1) >= 3) {
			coins++
		}
	}

	return coins
}

function positionsToWheelFaces(positions: number[], wheelFaces: string[][]) {
	return positions.map((position, wi) => wheelFaces[wi][position])
}

function countPositionCoins(positions: number[], wheelFaces: string[][]) {
	return countCoins(positionsToWheelFaces(positions, wheelFaces))
}


function turnWheelPositions(positions: number[], turns: number[], wheelFaces: string[][]) {
	for (let p = 0; p < positions.length; p++) {
		positions[p] = (positions[p] + turns[p]) % wheelFaces[p].length
	}
}


function solveQuest(notes: string) {
	const { wheelFaces, turns } = parseMachine(notes)

	let positions = wheelFaces.map(() => 0)
	for (let pull = 0; pull < 100; pull++) {
		turnWheelPositions(positions, turns, wheelFaces)
	}
	return positionsToWheelFaces(positions, wheelFaces).join(' ')
}

function solveQuest2(notes: string, pulls: number) {
	const { wheelFaces, turns } = parseMachine(notes)

	const coins = []
	const positionHistory = {}
	let positions = wheelFaces.map(() => 0)
	for (let pull = 0; pull < pulls; pull++) {
		turnWheelPositions(positions, turns, wheelFaces)

		const key = positions.join('|')
		const cycleIndex = positionHistory[key]

		if (cycleIndex === undefined) {
			coins.push(countPositionCoins(positions, wheelFaces))
			positionHistory[key] = pull
			continue
		}

		let total = coins.reduce((a, b) => a + b, 0)

		const cycleCoins = coins.slice(cycleIndex, cycleIndex + pull).reduce((a, b) => a + b, 0)
		const cycleIncrement = pull - cycleIndex

		let remaining = pulls - pull;
		const cycleCount = Math.floor(remaining / cycleIncrement)
		total += cycleCount * cycleCoins
		pull += cycleCount * cycleIncrement

		remaining = pulls - pull;
		total += coins.slice(cycleIndex, cycleIndex + remaining).reduce((a, b) => a + b, 0)

		return total
	}

	return coins.reduce((a, b) => a + b, 0)
}


function solveQuest3(notes: string, pulls: number) {
	const { wheelFaces, turns } = parseMachine(notes)

	const cache: Record<string, number> = {}
	function recur(positions: number[], pull: number, goal: 'min' | 'max') {
		const key = [...positions, pull, goal].join('|')
		if (key in cache) return cache[key]

		turnWheelPositions(positions, turns, wheelFaces)
		const backwardPositions = positions.map((position, wi) => (position + wheelFaces[wi].length - 1) % wheelFaces[wi].length)
		const forwardPositions = positions.map((position, wi) => (position + 1) % wheelFaces[wi].length)

		let backwardCoins = countPositionCoins(backwardPositions, wheelFaces)
		let coins = countPositionCoins(positions, wheelFaces)
		let forwardCoins = countPositionCoins(forwardPositions, wheelFaces)

		if (pull !== pulls) {
			backwardCoins += recur(backwardPositions, pull + 1, goal)
			coins += recur(positions, pull + 1, goal)
			forwardCoins += recur(forwardPositions, pull + 1, goal)
		}

		return cache[key] = Math[goal](backwardCoins, coins, forwardCoins);
	}

	return [recur(wheelFaces.map(() => 0), 1, 'max'), recur(wheelFaces.map(() => 0), 1, 'min')].join(' ')
}



describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>`)).toBe('>.- -.- ^,-')
	})

	test('Notes', () => {
		expect(solveQuest(`10,3,11,20

*:> *:> <:> >_>
>:* <:< >:* >:*
<.- >_> >_> <.-
<.- <.- *:> <:>
<.- ^,< *.* *:>
-_> >_> >_> <.-
<.- -_> <.- >:*
<:^ *.* -_> *:>
>_> <:> *.* -_>
>:* <.- <:> <:<
    -_> <.-    
    <:> >:*    
    <:^ ^,<    
        ^,<    
        <:<    
        >:*    
        <:>    
        *:>    
        -_>    
        ^,<    
        *.*    
        >_>    
        *:>    
        >_>`)).toBe('*:> <:< *.* >_>')
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>`, 10)).toBe(15)
		expect(solveQuest2(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>`, 100)).toBe(138)
		expect(solveQuest2(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>`, 100000)).toBe(138333)
		expect(solveQuest2(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>`, 202420242024)).toBe(280014668134)
	})

	test('Notes', () => {
		const input = fs.readFileSync('2.txt', 'utf-8').replace(/\r\n/g, '\n')
		expect(solveQuest2(input, 202420242024)).toBe(127565533110)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- ^.^
    -.^ >.<
    >.>`, 1)).toBe('4 1')
		expect(solveQuest3(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- ^.^
    -.^ >.<
    >.>`, 2)).toBe('6 1')
		expect(solveQuest3(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- ^.^
    -.^ >.<
    >.>`, 3)).toBe('9 2')
		expect(solveQuest3(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- ^.^
    -.^ >.<
    >.>`, 10)).toBe('26 5')
		expect(solveQuest3(`1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- ^.^
    -.^ >.<
    >.>`, 256)).toBe('627 128')
	})

	test('Notes', () => {
		expect(solveQuest3(`59,47,43,61,53

$.$ o.< o:> ^.* =.< 
>.< ^:o *.^ *.< =.o 
<.^ ^.> o:> *.< ^.> 
*.* =:< -.= <:* $:- 
o.o *.* -.$ =:= *:$ 
<.> =:o =.* ^.< *:* 
^:- <:$ o:- o.^ o:o 
^.< o.* $.^ ^:* $.= 
^:< -:$ -:o o:< <.o 
<:o ^:$ $:$ *:* >:o 
<:^ *:^ ^.$ <:^ *:o 
$:$ >:> o:< =:> <.o 
o:$ =.- =.- -:= -:$ 
<:* ^:- *.o ^:^ ^.o 
$:> *:^ *.> >.$ *.$ 
-.^ o.- *.= >:^ -.^ 
^:< $:$ ^:- <:= =:> 
*.* *.* *:o ^.o >:* 
-.* >:^ <:o ^.$ ^.< 
*:= =.> o:< *.* o:$ 
-:^ *.< =.$ =:$ $.> 
<.= *.- o:= *.* o:o 
>.> <.^ <.* -:o *.= 
-.- >:^ =.* <.= <.$ 
=.< *.^ $:- *.* =:< 
^.$ o.^ $:o >.- $:- 
<.* $:- ^:- *.^ $:o 
*.$ -:< ^.* o:^ -.= 
$:= o:= >.o o.^ ^.o 
$:$ >.< ^:* <:> >.o 
=.o $:* $:-     *.= 
>:* o.o =:$     =.= 
*:$ *:o o.-     ^:* 
-.- o:> ^:$     o:^ 
<.= -:- >.=     <.= 
$:^     *.-     =.^ 
=.$     $:o     >.> 
<:o     ^.<     =:$ 
^.*     ^.^     o.- 
<:>     <.o     o.< 
        *:-     o.o 
        o:*     -.o 
        *.^     o:> 
        $.<     $.< 
        =:$     *:< 
        o:>         
        =.>         
        $:$         
        =.-         
        >:-`, 256)).toBe('638 90')
	})
})
