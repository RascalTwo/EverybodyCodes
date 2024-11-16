

async function parseTrack(rawTrack: string) {
	const world = rawTrack.split('\n').map(l => [...l])
	const path = [{ r: 0, c: 0, char: 'S' }, { r: 0, c: 1, s: world[0][1] }]
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

	await visPath()
}

let prom = Promise.resolve()
for (const track of [
	`S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
-                                                                     -
=                                                                     =
+                                                                     +
=                                                                     +
+                                                                     =
=                                                                     =
-                                                                     -
--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`, `S+= +=-== +=++=     =+=+=--=    =-= ++=     +=-  =+=++=-+==+ =++=-=-=--
- + +   + =   =     =      =   == = - -     - =  =         =-=        -
= + + +-- =-= ==-==-= --++ +  == == = +     - =  =    ==++=    =++=-=++
+ + + =     +         =  + + == == ++ =     = =  ==   =   = =++=
= = + + +== +==     =++ == =+=  =  +  +==-=++ =   =++ --= + =
+ ==- = + =   = =+= =   =       ++--          +     =   = = =--= ==++==
=     ==- ==+-- = = = ++= +=--      ==+ ==--= +--+=-= ==- ==   =+=    =
-               = = = =   +  +  ==+ = = +   =        ++    =          -
-               = + + =   +  -  = + = = +   =        +     =          -
--==++++==+=+++-= =-= =-+-=  =+-= =-= =--   +=++=+++==     -=+=++==+++-`]) {
	prom.then(() => parseTrack(track))
}