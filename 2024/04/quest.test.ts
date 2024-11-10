import { describe, expect, test } from 'vitest'


function solveQuest(notes: string) {
	const nails = notes.split('\n').map(Number)
	const smallest = Math.min(...nails)
	let total = 0
	for (const n of nails) {
		const diff = n - smallest
		total += diff
	}
	return total
}

function solveQuestEff(notes: string) {
	const nails = notes.split('\n').map(Number)
	let smallest = nails[0]
	let total = 0
	for (let i = 1; i < nails.length; i++) {
		const n = nails[i];
		if (n < smallest) {
			const newDiff = smallest - n;
			total += newDiff * i
			smallest = n;
		}
		const diff = n - smallest
		total += diff
	}
	return total
}

function solveQuest3(notes: string) {
	const nails = notes.split('\n').map(Number)
	//const avg = Math.floor(nails.reduce((a, b) => a + b, 0) / nails.length);
	const max = Math.max(...nails)
	console.log(Math.min(...nails), max);
	let best = Number.MAX_SAFE_INTEGER
	for (let i = Math.min(...nails); i <= max; i++) {
		let total = 0
		for (const n of nails) {
			const diff = Math.abs(n - i)
			total += diff
		}
		if (total < best) best = total
	}
	console.log(best)
	return best
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`3
4
7
8`.trim())).toBe(10)
	})

	test('Example 2', () => {
		expect(solveQuestEff(`4
3
7
8`.trim())).toBe(10)
	})


	test('Notes', () => {
		expect(solveQuestEff(`11
18
16
7
14
15
17
10
10
19
17`.trim())).toBe(77)
	})
})

describe('Part 2', () => {
	test('Notes', () => {
		expect(solveQuestEff(`5243
5477
1386
3062
3012
2372
2991
1356
9713
9186
4325
4166
3896
2566
7490
8016
8096
5082
5079
2450
1352
4413
3138
6103
8076
3488
4498
5910
2339
7683
8904
9563
1800
7077
2665
4050
9445
6171
8733
2001
5845
9421
5534
3323
1500
7698
8256
5196
1686
6159
8542
1209
6972
9354
1199
1742
7303
6256
9801
7277
3965
9011
8222
7206
2515
9898
7645
1049
2862
7614
4174
1823
9328
9911
3181
5491
1893
5655
4183
9442
2182
3686
7236
6545
3302
8114
2801
2885
2586
2470
1744
2340
2390
8810
7125
4884
1160
9644
6355
4234
5756
7601
7362
9143
4157
6385
3116
2504
3896
3782
2014
6193
6794
5124
1470
6987
6058
8677
5635
5379
8553
3062
5733
9001
8107
4281
7780
9739
1769
8581
9093
6904
2004
5864
7962
2078
1323
2476
2054
2889
1699
9672
6735
3189
9567
1078
4193
3515
1490
9853
3468
2531
9093
7230
3801
4598
7681
5227
8119
5461
8276
5013
1106
6445
7062
2178
2804
3158
7095
1248
2755
5973
3600
6510
3577
3517
7482
2043
6874
1997
9523
1517
4247
4302
8732
2282
8637
1642
7784
9644
3838
6456
7867
6057
6030
5272
8949
5213
9471
6668`.trim())).toBe(850737)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`2
4
5
6
8`.trim())).toBe(8)
	})

	test('Notes', () => {
		expect(solveQuest3(`27963823
27780001
27221286
27473386
27942822
27193921
27770338
27390704
27469078
27853240
27130213
27860220
27147031
27357470
27211296
27621080
27056195
27508139
27722589
27021962
27064553
27774465
27281149
27533448
27176877
27741536
27197258
27553752
27843780
27341479
27523587
27260487
27499357
27681386
27208320
27212237
27171858
27708537
27051699
27583440
27432243
27240830
27621535
27360665
27954881
27511274
27605781
27389921
27065539
27440411
27947449
27238798
27094819
27978786
27629654
27010623
27089523
27563044
27828173
27128176
27769833
27318218
27196343
27280557
27046679
27268716
27467253
27925384
27473540
27846222
27157881
27764649
27424921
27340004
27616424
27713621
27497610
27360353
27104075
27701275
27254104
27310299
27273098
27717201
27647718
27824193
27153167
27387846
27225192
27725137
27521585
27247600
27429195
27397337
27962623
27797072
27699823
27318687
27643012
27435723
27574642
27002097
27231226
27527950
27364371
27819863
27572901
27273664
27281620
27675499
27606017
27840018
27790896
27814655
27859450
27023295
27153650
27689239
27652397
27209925
27501305
27803669
27813198
27781163
27638404
27368749
27206645
27815865
27611417
27784967
27431406
27669995
27116164
27419714
27855055
27040146
27488251
27661649
27601945
27908316
27035372
27858830
27773643
27316733
27197295
27831666
27665985
27544056
27087730
27048176
27257758
27133531
27266468
27848550
27119088
27041511
27714319
27819141
27154064
27052690
27935638
27558360
27497355
27999097
27356745
27652261
27230209
27953002
27494393
27914445
27671215
27493370
27425925
27427171
27756809
27869996
27018695
27785459
27673281
27573033
27991548
27054417
27828926
27120781
27096622
27137682
27274084
27634055
27967235
27293563
27774458
27385568
27428213
27911348
27281596
27241591
27699536
27702311
27876621
27908770
27478962
27314805
27293812
27364835
27407521
27259485
27282558
27760919
27266560
27955763
27122990
27705111
27065102
27418550
27047021
27947378
27743413
27235954
27781185
27159368
27705412
27055139
27544377
27280269
27387236
27548745
27861596
27970776
27613908
27214999
27231421
27452449
27365368
27769044
27057018
27467564
27883946
27493012
27768699
27681563
27226664
27497742
27651078
27479278
27691669
27934346
27350347
27493161
27430925
27741978
27471603
27290876
27465046
27029607
27046757
27009953
27544847
27815894
27199381
27375424
27753138
27605689
27330301
27905314
27561372
27010186
27075363
27878267
27807344
27613587
27866793
27039141
27173057
27439228
27775856
27564963
27756426
27954933
27750376
27824386
27234175
27631083
27537674
27307350
27755984
27444972
27410272
27063501
27243458
27376571
27639913
27106265
27616101
27734853
27737441
27133341
27506594
27516110
27571383
27844670
27581101
27405892
27558428
27023972
27018771
27109503
27354935
27179255
27846257
27411513
27909113
27006420
27773968
27431750
27396120
27481162
27248380
27735366
27937751
27811560
27357023
27580615
27255690
27465802
27289152
27863203
27103889
27394157
27812757
27354516
27683032
27359592
27825074
27200493
27522171
27215535
27605375
27159372
27467881
27149580
27040953
27788471
27571906
27271154
27562507
27727263
27171376
27319691
27801543
27743465
27106427
27452389
27213441
27550352
27398040
27767420
27991163
27000233
27390830
27013850
27065696
27305701
27059629
27283270
27999359
27389288
27765919
27718262
27248572
27378822
27747560
27269494
27452270
27838385
27795181
27903895
27116565
27706266
27492159
27659079
27718938
27753605
27720105
27330229
27823545
27602617
27854501
27629279
27061447
27383744
27561753
27968876
27169738
27997138
27351243
27540621
27884949
27336358
27937437
27108566
27768508
27832529
27683893
27341887
27082141
27483592
27377222
27348792
27647220
27419451
27677915
27675777
27260282
27320963
27926215
27393451
27225183
27935395
27420677
27379245
27593852
27290147
27010025
27089522
27990592
27962373
27336997
27281640
27472691
27124812
27302885
27879448
27917471
27755177
27290515
27581345
27019513
27753556
27517454
27542946
27987421
27524463
27159485
27790573
27586008
27187802
27619865
27257843
27810850
27570715
27557151
27000558
27651412
27632939
27567853
27475183
27568775
27221552
27837809
27416511
27823893
27926218
27276728
27199706
27185786
27778425
27355794
27097989
27977262
27925632
27066322
27437852
27071621
27006576
27908501
27557373
27723904
27039088
27202199
27870572
27111133
27611637
27357082
27887880
27660135
27115526
27408657
27260127
27608567
27620823
27702703
27230671
27216560
27596759
27021739
27073743
27976524
27675116
27485802
27133858`.trim())).toBe(121708193)
	})
})