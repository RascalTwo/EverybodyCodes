import { describe, expect, test } from 'vitest'

const denoms = [1, 3, 5, 10].reverse()
function solveQuest(notes: string) {
	const brightnesses = notes.split('\n').map(Number);
	let totalUsed = 0
	for (const b of brightnesses) {
		let current = 0;
		let used = []
		while (current !== b) {
			const remaining = b - current
			for (const d of denoms) {
				if (d <= remaining) {
					used.push(d)
					current += d
					break
				}
			}
		}
		totalUsed += used.length
	}
	return totalUsed
}

// all pairs, from length 2 to length demons.length - 1;
/*
function solveQuest2(notes: string, denoms2 = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30].reverse()) {
	const brightnesses = notes.split('\n').map(Number);
	let totalUsed = 0
	for (const b of brightnesses) {
		const paths = [{ current: 0, used: [], ignoring: [] }]
		let best = null
		while (paths.length) {
			let { current, used, ignoring } = paths.pop()
			if (used.length >= best?.length) {
				continue;
			}
			const remaining = b - current
			for (const d of denoms2) {
				const dc = used.filter(u => u === d).length
				const did = d + '-' + dc
				if (ignoring.includes(did)) {
					continue
				}
				if (d <= remaining) {
					const nxt = { current: current + d, used: [...used, did], ignoring }
					if (nxt.current === b) {
						if (best === null || best.length > nxt.used.length) best = nxt.used
					} else {
						paths.push(nxt)
					}
					paths.push({ current, used, ignoring: [...ignoring, did] })
				}
			}
			paths.sort((a, b) => a.used.length - b.used.length || a.current - b.current)
		}

		totalUsed += best.length
	}
	return totalUsed
}*/
function minBeetles(amount: number, coins: number[], dp: number[]) {
	for (let i = 0; i < coins.length; i++) {
		const coin = coins[i]
		for (let j = coin; j <= amount; j++) {
			dp[j] = Math.min(dp[j], 1 + dp[j - coin]);
		}
	}

	return dp[amount] === Infinity ? -1 : dp[amount];
}
function getInitDP(amounts: number[]) {
	const dp = Array(Math.max(...amounts) + 1).fill(Infinity);
	dp[0] = 0
	return dp
}
// function leastToSumToX(x: number, values: number[], seen: Record<number, number>) {
// 	let best = Number.MAX_SAFE_INTEGER
// 	const possible = []
// 	for (const value of values) {
// 		if (value > x) continue;
// 		const remaining = x - value;
// 		if (remaining in seen) {
// 			possible.push(seen[remaining])
// 		} else {
// 			seen[remaining] = leastToSumToX(remaining, values, seen)
// 		}
// 	}
// 	return Math.min(...possible) + 1
// }

const genInitSeen = (arr: number[]) => {
	return arr.reduce((a, b) => ({ ...a, [b]: 1 }), {})
}

test('work', () => {
	expect(minBeetles(35, [5, 15, 20], getInitDP([5, 15, 20, 35]))).toBe(2)
	expect(minBeetles(41, [1, 3, 5, 10, 15, 16, 20, 24, 25, 30], getInitDP([41, 1, 3, 5, 10, 15, 16, 20, 24, 25, 30]))).toBe(2)
})

function solveQuest2(notes: string, denoms2 = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30]) {
	denoms2.sort((a, b) => a - b)
	const brightnesses = notes.split('\n').map(Number);
	let totalUsed = 0
	const dp = getInitDP([...denoms2, ...brightnesses])
	for (const b of brightnesses) {
		totalUsed += minBeetles(b, denoms2, dp)
	}
	return totalUsed
}



describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`2
4
7
16`)).toBe(10)
	})

	test('Notes', () => {
		expect(solveQuest(`17087
12507
18189
17568
10107
10000
16362
10099
10059
15142`)).toBe(13730)
	})
})

describe('Part 2', () => {
	test('me', () => {

		expect(solveQuest2(`30`, [5, 15, 20].reverse())).toBe(2) // 15 + 15
		expect(solveQuest2(`35`, [5, 15, 20].reverse())).toBe(2) // 20 + 15
	})
	test('Example', () => {
		expect(solveQuest2(`33
41
55
99`)).toBe(10)
	})

	test('Notes', () => {
		expect(solveQuest2(`1959
1279
1490
1638
1430
1864
1046
1251
1088
1868
1428
1746
1035
1340
1662
1121
1023
1470
1912
1908
1377
1519
1070
1229
1747
1697
1860
1217
1848
1220
1724
1959
1780
1896
1762
1454
1180
1846
1497
1673
1823
1977
1573
1497
1977
1633
1752
1144
1870
1407
1827
1838
1714
1834
1204
1518
1942
1114
1877
1816
1620
1452
1069
1743
1321
1208
1727
1244
1632
1536
1215
1235
1057
1919
1448
1681
1289
1766
1437
1956
1400
1774
1294
1251
1957
1411
1071
1426
1363
1610
1392
1474
1428
1833
1036
1958
1550
1634
1775
1944`)).toBe(5228)
	})
})


function solveQuest3(notes: string, denoms2 = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30]) {
	denoms2.sort((a, b) => a - b)
	const brightnesses = notes.split('\n').map(Number);
	let totalUsed = 0
	const seen = getInitDP([...denoms2, ...brightnesses])
	minBeetles(Math.max(...[...denoms2, ...brightnesses]), denoms2, seen)
	for (const bright of brightnesses) {
		let a = Math.floor(bright / 2)
		let b = bright - a;

		let best = Number.MAX_SAFE_INTEGER
		/*for (let o = -50; o <= 50; o++) {
			const na = a + o;
			const nb = b - o
			const c = seen[na] + seen[nb]
			if (c < best) {
				best = c
			}
		}*/
		for (let i = 0; i <= 50; i++) {
			const c = seen[a] + seen[b]
			if (c < best) {
				best = c
			}
			a++
			b--
		}
		totalUsed += best;
	}
	return totalUsed
}

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`156488
352486
546212`, [1, 3, 5, 10, 15, 16, 20, 24, 25, 30, 37, 38, 49, 50, 74, 75, 100, 101])).toBe(10449)
	})

	test('Notes', () => {
		expect(solveQuest3(`154608
134053
100794
160840
118834
166142
129511
179708
192708
197812
107841
144175
142848
119632
189260
173389
186355
197319
146763
167730
176185
125375
193192
186560
110314
185730
165061
105919
193652
107921
133402
105922
180014
103379
148100
110029
185767
140589
179802
102611
127342
151683
194126
158816
110931
145705
160149
171382
171240
120592
140861
164836
113793
108216
122864
188680
137454
136768
173709
100222
124611
133763
164264
170387
104402
136380
192098
124053
107182
158663
137011
177223
113338
164313
155210
113432
147644
192307
192275
162091
171912
115415
143449
119745
190658
161415
178802
179580
130814
107867
176880
168322
112082
124353
186652
143875
192285
113694
107117
158267`, [1, 3, 5, 10, 15, 16, 20, 24, 25, 30, 37, 38, 49, 50, 74, 75, 100, 101])).toBe(1234567890)
	})
})
