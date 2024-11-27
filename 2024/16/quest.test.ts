import { describe, expect, test } from 'vitest'
import fs from 'fs'

function solveQuest(notes: string) {
	const [first, last] = notes.split('\n\n')
	const numbers = first.split(',').map(Number);

	const wheels = Array.from({ length: numbers.length }, () => []);
	const faceIndexes = wheels.map((_, i) => i * 3 + i)
	faceIndexes
	for (const line of last.split('\n')) {
		for (const [w, f] of faceIndexes.entries()) {
			const face = line.slice(f, f + 3).trim()
			if (face) {
				wheels[w].push(line.slice(f, f + 3))
			}
		}
	}

	let results = []
	let wheelIndexes = wheels.map(() => 0)
	for (let s = 0; s < 100; s++) {
		wheelIndexes = wheelIndexes.map((wi, w) => wi + numbers[w])
		results.push(wheelIndexes.map((wi, w) => wheels[w][wi % wheels[w].length]))
	}
	return results.at(-1).join(' ')
}

function solveQuest2(notes: string, pulls: number) {
	//const [first, last] = notes.split('\r\n\r\n')
	const [first, last] = notes.split('\n\n')
	const numbers = first.split(',').map(Number);

	const wheels = Array.from({ length: numbers.length }, () => []);
	const faceIndexes = wheels.map((_, i) => i * 3 + i)
	for (const line of last.split('\n')) {
		for (const [w, f] of faceIndexes.entries()) {
			const face = line.slice(f, f + 3).trim()
			if (face) {
				wheels[w].push(line.slice(f, f + 3))
			}
		}
	}

	let ttl = 0
	let coins = []
	const indexResults = {}
	let wheelIndexes = wheels.map(() => 0)
	for (let s = 0; s < pulls; s++) {
		wheelIndexes = wheelIndexes.map((wi, w) => (wi + numbers[w]) % wheels[w].length)
		const key = wheelIndexes.join('|')
		const cycleIndex = indexResults[key]
		if (cycleIndex === undefined) {
		}
		if (cycleIndex === undefined) {
			const result = wheelIndexes.map((wi, w) => wheels[w][wi])
			const counts = {};
			let ccoins = 0
			for (const char of result.map(face => face[0] + face[2]).join('')) {
				if ((counts[char] = (counts[char] ?? 0) + 1) >= 3) {
					ccoins++
				}
			}
			coins.push(ccoins)
			ttl += ccoins
			indexResults[key] = s
		} else {
			const increment = s - cycleIndex
			let nextS = s + increment;
			const ttlOfRange = coins.slice(cycleIndex, cycleIndex + s).reduce((a, b) => a + b, 0)
			while (nextS < pulls) {
				ttl += ttlOfRange
				s = nextS
				nextS += increment
			}
			const remainign = pulls - s;
			let e = cycleIndex + remainign
			ttl += coins.slice(cycleIndex, e).reduce((a, b) => a + b, 0)
			s += remainign
		}
	}

	return ttl
}

function solveQuest3(notes: string, pulls: number) {
	const [first, last] = notes.split('\n\n')
	const numbers = first.split(',').map(Number);

	const wheels = Array.from({ length: numbers.length }, () => []);
	const faceIndexes = wheels.map((_, i) => i * 3 + i)
	for (const line of last.split('\n')) {
		for (const [w, f] of faceIndexes.entries()) {
			const face = line.slice(f, f + 3).trim()
			if (face) {
				wheels[w].push(line.slice(f, f + 3))
			}
		}
	}


	function countCoins(result: string[]) {
		const counts = {};
		let ccoins = 0
		for (const char of result.map(face => face[0] + face[2]).join('')) {
			if ((counts[char] = (counts[char] ?? 0) + 1) >= 3) {
				ccoins++
			}
		}
		return ccoins
	}

	const cache = {}
	function recur(wheelIndexes, pull, goal) {
		const key = [...wheelIndexes, pull, goal].join('|')
		if (key in cache) return cache[key]

		wheelIndexes = wheelIndexes.map((wi, w) => (wi + numbers[w]) % wheels[w].length)
		const backwardIndexes = wheelIndexes.map((wi, w) => {
			wi--
			if (wi < 0) wi = wheels[w].length - 1
			return wi
		})
		const forwardIndexes = wheelIndexes.map((wi, w) => (wi + 1) % wheels[w].length)
		let backwardCoins = countCoins(backwardIndexes.map((wi, w) => wheels[w][wi]))
		let coins = countCoins(wheelIndexes.map((wi, w) => wheels[w][wi]))
		let forwardCoins = countCoins(forwardIndexes.map((wi, w) => wheels[w][wi]))

		if (pull !== pulls) {
			backwardCoins += recur(backwardIndexes, pull + 1, goal)
			coins += recur(wheelIndexes, pull + 1, goal)
			forwardCoins += recur(forwardIndexes, pull + 1, goal)
		}

		const result = Math[goal](backwardCoins, coins, forwardCoins)
		cache[key] = result;
		return result
	}

	const min = recur(wheels.map(() => 0), 1, 'min')
	const max = recur(wheels.map(() => 0), 1, 'max')
	return [max, min].join(' ')
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
