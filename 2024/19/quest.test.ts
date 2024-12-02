import { describe, expect, test } from 'vitest'


function isRotationPoint(r: number, c: number, world: string[][]) {
	if (r === 0 || c === 0) return false;
	if (r === world.length - 1) return false;
	if (c === world[0].length - 1) return false;
	return true;
}

const rotations = [
	[[-1, -1], [-1, 0]],
	[[-1, 0], [-1, 1]],
	[[-1, 1], [0, 1]],
	[[0, 1], [1, 1]],
	[[1, 1], [1, 0]],
	[[1, 0], [1, -1]],
	[[1, -1], [0, -1]],
	[[0, -1], [-1, -1]],
]

//ABCDEFGH
//HABCDEFG

//ABCDEFGH
//BCDEFGHA

function rotateAtPoint(r: number, c: number, direction: 'R' | 'L', world: string[][]) {
	const values = [];
	for (const [[ro, co]] of rotations) {
		const [nr, nc] = [r + ro, c + co]
		values.push(world[nr][nc])
	}
	direction
	//console.log()
	if (direction === 'R') {
		values.splice(0, 0, values.pop())
	} else {
		values.push(values.splice(0, 1)[0])
	}
	//console.log()
	for (const [rot, [[ro, co]]] of rotations.entries()) {
		const [nr, nc] = [r + ro, c + co]
		world[nr][nc] = values[rot]
	}
	//console.log()
}

function findMessage(world: string[][]) {
	for (const row of world) {
		const startI = row.indexOf('>')
		const endI = row.indexOf('<')
		if (startI === -1 || endI === -1) continue
		if (endI < startI) continue;
		return row.slice(startI + 1, endI).join('')
	}
}

function solveQuest(notes: string) {
	const [top, bottom] = notes.split('\n\n');
	const directions = [...top]

	const world = bottom.split('\n').map(l => [...l]);
	const rotationPoints = [];
	for (let r = 1; r < world.length - 1; r++) {
		for (let c = 1; c < world[0].length - 1; c++) {
			if (isRotationPoint(r, c, world)) {
				rotationPoints.push({ r, c })
			}
		}
	}
	let directionI = 0;
	const messages = []
	while (true) {
		for (const { r, c } of rotationPoints) {
			rotateAtPoint(r, c, directions[directionI++ % directions.length], world)
			const message = findMessage(world)
			if (message) {
				console.log(world.map(l => l.join('')).join('\n'))
				return message
			}
		}
	}
}

function solveQuest2(notes: string) {
	const [top, bottom] = notes.split('\n\n');
	const directions = [...top]

	const world = bottom.split('\n').map(l => [...l]);
	const rotationPoints = [];
	for (let r = 1; r < world.length - 1; r++) {
		for (let c = 1; c < world[0].length - 1; c++) {
			if (isRotationPoint(r, c, world)) {
				rotationPoints.push({ r, c })
			}
		}
	}
	for (let round = 0; round < 100; round++) {
		let directionI = 0;
		for (const { r, c } of rotationPoints) {
			rotateAtPoint(r, c, directions[directionI++ % directions.length], world)
		}
	}
	const message = findMessage(world)
	if (message) {
		console.log(world.map(l => l.join('')).join('\n'))
		return message
	}
}

function solveQuest3(notes: string, roundCount: number) {
	const [top, bottom] = notes.split('\n\n');
	const directions = [...top]

	let world = bottom.split('\n').map(l => [...l]);
	const rotationPoints = [];
	for (let r = 1; r < world.length - 1; r++) {
		for (let c = 1; c < world[0].length - 1; c++) {
			if (isRotationPoint(r, c, world)) {
				rotationPoints.push({ r, c })
			}
		}
	}

	const roundCycles = []

	for (let round = 0; round < roundCount; round++) {
		const cycleKey = world.map(l => l.join('')).join('\n')
		if (roundCycles.includes(cycleKey)) {
			const prevRound = roundCycles.indexOf(cycleKey)
			const cycleLength = round - prevRound
			const remainingRounds = roundCount - round;
			const cycleToFF = Math.floor(remainingRounds / cycleLength)
			round += cycleToFF * cycleLength;
			const remaining = roundCount - round;
			const destWorld = roundCycles[prevRound + remaining]
			world = destWorld.split('\n').map(l => [...l])
			break
		} else {
			roundCycles.push(cycleKey)
			let directionI = 0;
			for (const { r, c } of rotationPoints) {
				rotateAtPoint(r, c, directions[directionI++ % directions.length], world)
			}
		}
	}
	return findMessage(world)
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`LR

>-IN-
-----
W---<`)).toBe('WIN')
	})

	test('Notes', () => {
		expect(solveQuest(`LLRRLR

>+88++8+89++6+4+6<
++++++++++++++++++
9+++67+5++69+5++4+`)).toBe('8968788569964546')
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(`RRLL

A.VI..>...T
.CC...<...O
.....EIB.R.
.DHB...YF..
.....F..G..
D.H........`)).toBe('VICTORY')
	})

	test('Notes', () => {
		expect(solveQuest2(`RRLLLRRRLRRRLRLRLLLRRRLRLRRRRLRRRLRRRLLLLRRLRLLLRRRLRLLLLLLLLRRLLLLLRRRLLRRRRRLLLLRLLRLRLLRRRLLLLRRR

........1...7....DKW....M.K....M.N.M.M.MM....MM.MOM;
........+.+1.+0O...UX.<.MM.M.....N.0OMO:MM..WMMO..MD
......M.........M...WN.MDMW.MM.M.M.M.CMWN0O.M;MMM...
....M.X.N.+3....M;;X...+MMMM...M.OM.M.MM...MM.......
....+.O.+LXQ.K........X.:M.MM0.M.M;M..MMMMMM.MK.M...
..ONW..K4..+........M.X+MMMMN..M.MK..MC...MM.K..X..M
..>D..O.....M...X...MC.A:M.XMM.M..MMM0K..MKMN..WM...
...........3...MMM.DM:.4MMMM...MMM.WKM...M.WM....W.M
+X.+M.K2OL.C........KL.X.OM..M;M.MMMMMX.OM.M.M;MM...
...0...K....KM62X.M.0.X.XMKMM..MMMMXMK..CM.N.M.C...M
...+..W0...D...O....M...MMMMMM0M.MMXMM.:M0WMMM.MM...
.+.+...W...+:.K.0.M.W...M;MM;..MXMXXW..WMMMM.M...K.M
....M.C.......M..O..M!.XM.WMMOMMMO.0;MMMM.MM.M;MX.N.
....6......+.O....CW+.K.KN.XWMM.LMDM....KMM.XM.M.MMM
.....WX.8..;.D..D..0M+..MMMMN.MM.M.K..KMN.MM.M.MO.M.
.....0+....+N.++..MK...+MMMM.MMM.X.M.WMDMM0LOM.M.MMW
......M.....+....5.0M+C.OMMKMMMMMM....MMMMMLCM.MM.M.
.............+++.MW..M..MMMMNMMM.MWMMMMOMMMM.M.M.MM.
...2.0W.1....+N.4WK...K.MMMMMMMMM.MM...OKWNMKMOWM.M.
N.....+.++.+;.K++...L...MMMM0M....MM.LM.MWM:MNMM0DM.
.C....;.....+....;.L.M...MMMMM.M..MMM.;..M..W.M.M...`)).toBe('2861311237424465')
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`RRLL

A.VI..>...T
.CC...<...O
.....EIB.R.
.DHB...YF..
.....F..G..
D.H........`, 100)).toBe('VICTORY')
	})

	test('Previous Notes', () => {
		expect(solveQuest3(`RRLLLRRRLRRRLRLRLLLRRRLRLRRRRLRRRLRRRLLLLRRLRLLLRRRLRLLLLLLLLRRLLLLLRRRLLRRRRRLLLLRLLRLRLLRRRLLLLRRR

........1...7....DKW....M.K....M.N.M.M.MM....MM.MOM;
........+.+1.+0O...UX.<.MM.M.....N.0OMO:MM..WMMO..MD
......M.........M...WN.MDMW.MM.M.M.M.CMWN0O.M;MMM...
....M.X.N.+3....M;;X...+MMMM...M.OM.M.MM...MM.......
....+.O.+LXQ.K........X.:M.MM0.M.M;M..MMMMMM.MK.M...
..ONW..K4..+........M.X+MMMMN..M.MK..MC...MM.K..X..M
..>D..O.....M...X...MC.A:M.XMM.M..MMM0K..MKMN..WM...
...........3...MMM.DM:.4MMMM...MMM.WKM...M.WM....W.M
+X.+M.K2OL.C........KL.X.OM..M;M.MMMMMX.OM.M.M;MM...
...0...K....KM62X.M.0.X.XMKMM..MMMMXMK..CM.N.M.C...M
...+..W0...D...O....M...MMMMMM0M.MMXMM.:M0WMMM.MM...
.+.+...W...+:.K.0.M.W...M;MM;..MXMXXW..WMMMM.M...K.M
....M.C.......M..O..M!.XM.WMMOMMMO.0;MMMM.MM.M;MX.N.
....6......+.O....CW+.K.KN.XWMM.LMDM....KMM.XM.M.MMM
.....WX.8..;.D..D..0M+..MMMMN.MM.M.K..KMN.MM.M.MO.M.
.....0+....+N.++..MK...+MMMM.MMM.X.M.WMDMM0LOM.M.MMW
......M.....+....5.0M+C.OMMKMMMMMM....MMMMMLCM.MM.M.
.............+++.MW..M..MMMMNMMM.MWMMMMOMMMM.M.M.MM.
...2.0W.1....+N.4WK...K.MMMMMMMMM.MM...OKWNMKMOWM.M.
N.....+.++.+;.K++...L...MMMM0M....MM.LM.MWM:MNMM0DM.
.C....;.....+....;.L.M...MMMMM.M..MMM.;..M..W.M.M...`, 100)).toBe('2861311237424465')
	})

	test('Notes', () => {
		expect(solveQuest3(`RRRRLRLLRRLLLLRLRRLRLRLLRLLLLLLRRLRRRRRRLLRRRRLRLLLLLLLRLRRRRLLRRLLLRLRLLLLRLRRLLRLRRLLLRRRRRRLRRRLLRRRLLRLRLRLLLLLLRLRRLLRLRRRLL

.................E..D..D.Y.........................................X.Y....CR..:..D..............0....W.OD.O...YXSDD.D..C.RCS.R.RO.D..R.V.....OO............+....D.................O.Y..O.V..............
....................DS..DE.....................................0.....VC.D..O..K..................RV..OKVD.E.:S..OVCVLXODES.EDBVYYOBEYWCO.........................:.................E.EKCXDD.R.V......;..
.....D...........C.ESEVD.ON...N......................................CD.EB.D.....O.O.C........KWV.D.CEYBOEK.ECD.OYODDYKE.ODXDBYORDBYEOY:...KE..............W.0.OE............O.O....EEVE..Y.0...........
...B..E..........ED.E.CY.D.......................O.............V.E.......B.....K0O.........;.C....YYSV.D.BO.YC0DYBYREEDEKKVVCESSOEEROEEED.......W...O...Y.....OS..............C......O..BDEEW.O...O..E..
.....W............OOE.VO.NESV......D...........C..............B....VOOB.YEYOY......Y......K...V.B.YBDE..0.SK.EEEOSOVECOOKEXSYDEEYYCVEBEEV......Y.V..........EY.............Y..SB......X0VYX..E..........
...O.YKO.........CEBB.DYO.X.........O..V;......................B.DR..O.DYOV.OC...C.....K....YO..Y..CE..R..O....D..DCSEYREYEVEOOVRYDEVYSOO.......EE....C.SE.DKO............R.D.....WY.Y.X.RY..........O..
..ROVV.XS...Y..C..B.YCE..E..BS...Y..E..O.V....................Y.O.....Y.E.R.D....E.X.......E.OC..EE..E....;XEEDOEK.V.CDRVY.SREEEDDVODRDDEC...E.E........D9..V...XK.....E......D.N...OES.O.EX.E.......VW.
....WV.C....O..NE.EYOO.EE.E....................O..................R.E....BY.SC.Y...R...D.D.DC.DE..;.O.Y...E....ED.Y.YY.CDYORYEDCCDVECE.SV....Y.O..K.O..6.O+..D+...+.....CCD.E...L..E...SYOD.............
Y..SEO.RE.S....Y.....Y.E....E..........B.V..D....C............O.O..........D.C.O....B.L.O..D.S..ESE.....E.....YBOB....EEYOCODSYDBCCEOBY.BS+D...C..CS.B.RY.++....E.EEW.L....VE:Y...RKOEY.BREV...X..+.....
DBOY.NW.D.C..O..E...E.YOE.E...VV....W..NR...DY.OY...........Y.0...O;EEW...W.O.R.C.DV.....O.E.YEY.....K..0..W.EVEE.V.BYEEBBEEE.CYDYV.YYO.........C..ER.YD.B....+.....ODE...C...R.EE.EE.VRSEDOX...O..O;.D.
ND.YW..VV..Y..V.DC..D....D..Y......E.W.YY...R..............Y.Y..O...D.O......O.O......E......S.OSYV....EWE.;EYRN.VOOO..EEBDRDDBDEWYYRDB.O.CRR.SOD..R.BEYBOE.....Y......O..EDOEWEY.YXYOBDDD.E....Y.+.....
.S.O.KV.RE..RD.V..DYC...Y.O.EY......L.XO........DDY...E............K.K.W.E........D.S......E...D0DV.S...E......SE.;..Y.VYEBWY.OV.X.E..NR.C.E..E.EEO......D.EECV...OY.K+.EEOOBYEYD.YNV.E.C....KY....Y....
NEX;.EY..D..D.E..O....Y...O.;R.O...K...Y.K..V.L..Y....V...........RKX.VX.....O.....XEK.......VDVDESDR.......Y...E..EES....EDLEYSEY.E.YB....SY.R.BY.D.OROD..Y.YD.R...E.+...VYYEEW..CBOR..VD0.0.....C.Y.B.
XS..O.EYC.....;CWOBD....D.RS.OE..OC....D.YD.DV...EE.V...........LE.......O.Y........KD.L..Y....E.D++6E..B.B.S..Y.D....O.R.VDE..ERED.R.OY.Y...EVCEDOEDDEV.OROOOROC..D....C..DOE0CVREY.ED.....B..E....VSYE
O+B....O.O.YO.V0.X.Y..K...R.O...D..V.Y.....W.S...........R......Y.E.V.EE...........KXO..Y..E..S...+OEDB..E..E....VEYCE..SE.OR.ROCE..OEBE...D..Y.EVDCRCBC...Y.O...C..X.V.B.RE:E.W....YEC...O.0E..D...O..B
R..SC0EEEDDBDEW..K.EO.........O..B.C.....O.O.....SO..E........B.V.RD...............Y.E.0ES.EE..O.D.YY..R.R...YOCXDYBRDS..EE....YCDEO...D..V.C..ROESYEERY..E....ORV..KR..O<..5EDYVWX.0C....X...O.......OW
.S..V.DBOEBEEO.K...W......Y.....D.DK.Y............CW..YE.L........S.DEYC....V.....D.B.YDE....B.V.OE.VD.C...YE..Y..BEO.OE.E..D.C.DS.VRCE..E.B..DREDEEBVVOC..Y.D.ERK.S.RY..C...CV..Y.R.WD.+...R.....R.DDO.
...X.OE.DYYED.E.O.............K.....C......K....E..X.SY.D.......E...R.EO.D...........ROD..E.EKC.:O........O..R..OV.RBV..OSSOVS.S....SS.CO.DVESEEEYEEEOYRVV.OE...YC.D...CD.BS..VRY....Y+.:..+.:.....DC.C.
.E...ORYBXYOECEC.........O..........0..D.........RS.........DDV...EYCVEYOE...........Y..YVE....N..D.VDV.V.B..BC..V.E.ESE.Y....SY.O..E....S.E...OYYYSD.DOE.S.DD........S..C.DVOOVKD.E.DC...+.+N.O0.S...DR
.....ERCVDBDDDD.KVY............;Y.....V....O.........SO.B..D.RE.C...R.V..........C....Y......E.XN..L.ESR.RV....DEE...V.EYOS..S.S.....BE.D....EYOEEVDDE.EO.Y...E.YBOVR.O.YYWD.EDBYDB..........E.1.E.R.ORY
.....ORERRD...Y.N.XO..........D..K..E..V.....SWB.S....VE..KOEEYYX..E....BOE...S........BCYYE.YY.VESO..S.XYDBC.O....R...E.EO.EDSY.E.DEDY..C.D.KBEYREES.........CO.COD.EY..E.YO....D.OEVR...>0...EE.VOSCYE
....L.YDC.BR.BD.O......E.....OYX.D......E..E....EV.Y..E....O.D...E..E.O.OY....E........SOVCRC.YE...EYE.....X..W.RN...REDVEEDOED.OEDE...ODO...YOR.EBSO...;.EB.KYY..BCDRDVCYOC.OBOO..Y.CV.Y....R....EO.Y.W
..0.KOSRE.B..;..........E..C..YD.O.....Y.YED...D..........O....YROV.EC...BB.B...V...B..DCS.EE.O..Y.O..V.ED.DE.;....D...C.S....VC.D..N.DKYV.C..B.Y.YC.R..KL..NYEOBE...BOS.BD.ENBC.BREYYEVC....0..YO0EYEC.
...OW..DYYY..Y..O....O..O.DD.O.EXO.O.O...Y.E..;YRR.O.EEDC..C.E..EE.Y.OEEK........D...Y..ORR..VRVYD..O.C..ERE.EOW.CCO..S....DRY.B.CDDO....S...YOE0NVOK....EEOR.K.Y.DROCVSESOD.VOO...E.O...........EYDY0OD
....B.E.BELOE.D.......D....KDOYSO.R.Y..O..XB.E.CS.BDCY...O.O....YD.B.....Y...Y..C.;C..C.B.DRE.O....ODLYO.Y..E.......V..Y.Y.EB.E.RE.....S.E.O.CEOYEED.B.DE...OYEVBDYRSYCDEBC..DOD..E....RVB...O.;BBB.D.CS
;..E.L..;B0C....S.......L..YDOEYXEOO.......B....VE.E.V..Y.Y..Y.....N......O....C.DO......OR.BEOE..YDE.DD.OYR.O....EEOS.EN..VYE.DORE.D...E.E.ESYEON.EDDX...E.EBYERDOSBVYRYD.Y.ODDV..E.E.YY....Y...E.YYOCV
D..OO.E.E.CYE.X...EYO.O....O.YY.;;W.....E...0O.K.V.ROB..........VV..B........D....Y.....Y.O.S.EB.YYEYOESECVXD....VEEE.Y..Y..B.O.BE.SDC...O.VDYBDEDE..D.N.....RBO.DOSOYEKE.CBYYRO.E.ER...YB.B...DLD...YER
.DWERC..S:D.CY..E....VO.V..V.DVCD.W...L..B.DD...S.EX...........R.EC..E....D......YOECCD..KYBDEDREDCSYRSEOC.0.DBD...EY.Y...YVEDN.EV.O..C.EO...CDYC.DC.ODE.E..V.EEVOSOYEY..B.DC.D.S.V.VV........E..ES..D.C
EE.C.;EOR...S.RDDY..E.O.....EWD......E.WD:..DD..O.EOE...E.O...BV..E..V.O.......Y.D.S.DO.S.D.V.D...Y.ONYEOY.OO;BEL........R.REEO.DW.SE..OCCEDOOCYVRYCCO........BRYRYRDEEY.D.SEO.XW.E...V.DCB.B.C..OW..YDO
.YDYOE.C..E...E.OV.EDED.D.ESE.EBOCEYBR...SVKOEVEEEEO.YS..YO..E.R.O...............Y.DEEOEVE.E....BEESDOVRES.OC.OREE...EVD.ODBYEY..X....O.E..B.CVEDDRCEEOD.Y.VVEOVEDEB..RNS.YE.............CVB.SW.L.DECD..
R..EOBBE....YCCEEEEVRD.YEYO...OC..OW.E.WN.O.ESWOE0.SOS...SOY.VWWY.E.EB.O.........0WO.V...DB.V.EDYYYWVDSYDCRBOYYD.YY...E..Y.BKYEDY...O..L....CY.BCOEO.YN.OSEE...D.O.ED.CV.R.YYB.E.CY..S.O..E.WYYYOXO.....
..DY.0.RR.....B.D....BV.Y.OY..EODXKRXDD.B.OD..V.OEYDEYOE....YO.B.YDK.YO...........E....EOER.EV..KDYBO.EWVV..B.OCCYD..KRC.Y.OSEE.Y.O.....V...YOBDCYYYD.DS......VVD..R..E.K..B.D..Y.O..V..ER........W.V.Y.
OS.D...S..E..E....DYC.B.EEDV..W.RSNSKOORREKD.CDDOBEYEDYC.EC..OC...SRYY..........V.DD.YD;OSDR.EEOOYRDE.OB.RS..OO.DEON....EE.D.RCV.E..R...E...DYYOCYYCVO.D.XEEE....E...CYEE.EOY.:...EE.SNVO.D.EEKR..O...C.
...N...Y...B..Y.B.BR.D.DE.BEOESCD.SRVR.ES.E...D.REEOOEDEEYOY....CE.R..D..........O.E....OSYDC..O.CNO.EVEE.YE..R.C.DC..E..E.BX..DR.....O.B...SEBEYO..D.O.D......R.O.E..OYEE.R.B.V....VSS.SY.Y.OR.;ENB;...
.........V..O.R...YDD.DDCDOY..OB.CESYSCYV.YCED.CN.DVEVYEY.RE.CV.YKEB.O.......L..E.O..EVY.DCOO.E..:R.O.CV.Y..DSD..EYLEVB...ESOD.R.............DVY.RDB.:..DSB.E.Y.B...:SROE..VBVD...E...WDS.E.EV....B.O...
...O....R..O.O.LE..S.Y.DSEVDR..YODCDRWWYX.DOV.R...OBB.VEWOEVCO..B;XNS..L.........V......Y.E.D.Y..OY..R.SEVEO.X..O.BO..RD..XVK..E......O.....DDEE.S..E.C.OS.Y.E.B.NYO.OYBY..K:Y.D......E.YY;...O..X...DES
..V.D.E.........N.BVB..YE.B.EDEDDYEYEE.OBEY.OEOK0E.VBOY0R0VS.SD.YOBXCD.....O.:R...E....R.Y.VE....KBS.....V.YVVE...YDO.B..RV.O.....D.E..C..D....ESO.BE..CEE..CWNDORCXYEVORLEY.SRE.X....YEB.E.BEBV..D.SYV.
ED...SLEVOE.....O..VYY.OEOBDY.EVDERRDVEYBOEYS.B.E.B0DREBEDY.BBBY.CD.E.KSON............R.......R.B.EW.0.VE..O.SE.OLW...D...DOO..N.WC........E.R.ESECWEB..O..E.S.VR:SEE.DO.BKYOE.D.....REE.VREV...D.EB.EEB
O.OYD.OO...O.X.K..YYEC.YE.B.YRWERDYE.ECSBOCE.OCX..LOERSOEEOOOCO.Y.ODOO.Y.V....Y........X.E..NR.N......EW.EVV.OEOD..VW.......YO.......0....DLC...E.K.DY.Y......EBODODDBDNC.VO;WR0...0...OV.E.YS.D.D..EYRB
DDY.O.YVKR..C..O..XOOEYE..EDOVCOODBCD.ODEDE.DE...;.WCSE+VDD..ROOY...0...O....V.............O.....V.........K.D...W...00.E.DVVX.V........E..D.Y.Y..O..CEBBSDY.B....BOS.DK.W.OSBE.+V......R..DS...B....BYE
R.DWY.Y.SEC.O..S.E..YO.YYYEYYSODEDVR..CVY.S..Y..KLO.YYVV..YOD.Y.D.......6...Y.E................V.B.....D..Y....OEY.EOD..E....S..Y..CE.B.W.EEOV.......O.D....BD.V..B.BER.D.DOB.RS...YC..O.C..DO.B.Y..E.YR
O..V.KEV.RB....CDB0O:XB.CVYE.DOYCE..EE.CROYYC.O.E..N;EEBD7C..EC..Y........D....O.........D...RDBK....S.DD..R.E.YEW..VYK....V.CE.;C.OCE.......EYB...........E.O.....ECCERBBDYC..O..YXO..D.SD.C..YSK..DE.S
.O.YVOD.V.Y.C:YD.EDR.O.VO.CEVDECRSEB..YWOE.YV...EEYB2VV.D+.VB.OS+.CR..........E.ECEW.....0OV0OVSD.RSO....R.D...ERB.Y.DOEY..ES.EOYB..DC..V.RDS..E.......D...OBO.Y.EYERSYDODYYD.E.W..OBEBDDV..:....E....E.
.R.KX.SVEBDOEOBOSY........OORYEDEEYRYCRDYODESDDSK...0K.KC.1OO..R.OE3V1......V...O.DE.D...E.V.N..S..B..C.B.E..Y..E.0..SDD.E..RDKD.OEY......;.....K...S..Y..BOC.DRSY....EV.ROBB.D.EO.ED.OO...O.O..........
..YBECOOOBVERBEDCEER.O.YCYVEYDBBE.DE0RODYBV.E.YO.+XE+O..V.DXESO....+....0.....R.DYOES.......LYDR.E..B.......CYEEE.O.RCO..VO.VCEBDDY.E.N.....................OO.D..E.SD.C.RC.YCOYCCY..O.EOYV.B......VY...
...Y.BCDRE.ERBYS.ORWOYDD..VE.OEDY.EEBO.YE.VOE..Y..N..+.ED....B.EKVO.E...........B.O...W..E.B.KE.D.O;........RO..EEEDVK.O...EYCERDDEODYV...LR.....C..K........Y..ORE..C.EVDO.OOOEOSE.VBOD..ECSD...N......
..RDY.ODEYVRDBYODREV.BLEX.SSE.DYSOVD.OWY.EECYX:WRD.X.D+.SEDDDVORBKOD...Y.V.....D....C.:E.K:..OK...SYBD...DR.OV.WDEE..0O.E.DOEOWOYOEY.BY.D..............O.R..R.O...NEXOYSEWE..OYDBS...C.BYCEE......E.....
...EDDB.EEECBRYVEE.B.YDOVXEDCD..Y.V.Y.EEEY.RD..DYWDNY0.Y..Y.YY.OREB......C...Y..R.D...C.O.LB..E.O.EV.DS...D..C.OEBRYY..:......CR.ODYDSYDS.........B..WV..D....COEOE..EE.CY.DD;OR.RSEV.YO.YC.Y..;D..OY...
VDVCCRSOEERYEE;.L.E.VY.EC.DDRE.V..EY.D.SV.OBOCBN.....OWOE.NSDRE.RN.C..O.......E.C....:.......OX.V.SRBO....VV.E.EEE..:E..........0E.C.S.........DD.....Y...D.E.DYVD.D..VY..D.OYEERYRS.Y....OV..D...VYN...
EYVSDRYOEDOEDBODVSYVEOY.RED.B0.OW.WB.B.ODBCDDO.EE.D..E.XO.ECCO.EDEEEX......N.Y.E..O........E..VB.VY..RB......EKDVEEOC..S.D.....R.;YO...ORC...C....O;....ED..Y..VY..ES.O..R.B.YOEYE.EEE.E..E....X;..C....
R.VERE.OOSOSCCEREORBOE.DEW.V.V.V..OEO..N.YDDRVYOWR.KVCEYEVDYOYEYBY.CE..OV.....................VE..0.R.BO..C..S.DL.RWDBC.........E..CSBROE....E.D;......C.DO..YO.:V...SERECD.R....DCE.E.....O.......X....
YEEECBEW.XKYSC.VDY.CCE.DR..V:RY.R..RRVWCSCBODREEOC...S.V...DBB.EO.CK....S.............O...E....SCYY...V.ESWD...VVDR.V0DB.........YRE.:..YCRO.X.Y...YO..EC.OR..0.D.C.D.E....EY.Y..O.ERY.E.YBD.......EO...
YKEOYOESYDNESYE.DRS.V.YEERVOSC.CO.D....BBRB:0EROOX..Y....RER.DBECD.NR.N...R..W............W.L..V....Y...O.EK.O:VRKR..B..O....OE.O0OY.OVV.Y.Y.C......Y.OD.D..BRD........B..D.Y.....ORO.YOOE........X.....
RSREV.DDY..OD..BOCCOD....E.E.O....C.OBKV.OEDDBESESY..E.D.CEDE.ORD.......O..O......E.W.................YY0DEDDO..E...D.........B..D.KRRD.VYDCR.V.C....EOOOEEB........V....RDED.S.VOY.WR.D..R..........N..
.VOYSYER.D.OYVSDDEEDEDEDOOCYD.W.E..V.B...BYEOVCESYSSECEL.CYE.VOVE..VB.VSN.OS....E.........R.E...........S.S...E.EN.DRR..W....CYEDSOVE.CE.ESD.O...E.......Y.YDCR...XD.Y.SYSVO.ROYB.......ED........O.....
VYYR.DOCEY.VC.D.ER.E..E.OY..EOK.YDE.V..YWVROEOB..DO.DEDY..C.O.DC:Y..ER..YO.BE.........C.CYEE........N..O....CD.L.E..KY..Y....CY.ESK.SR.D..YY.EERE.....DRD....RO.Y...O......SE.K..B..O............O......
DOE.OKCEYEVOEKEDDC.B0..YO.O.B.:.EE.O.DO...O.Y.YOBEV.E.ES.COB.OSS..RY.BBBO.V.C...Y.....DV..ER.........E..E.CBBED....WRE.C.C.OE.YD.YSOE.C..O...OOY.C....DY.YCSEENXV..;....ODD.S.OVE........E..0E...O..Y...
EDR....YSDKOOLEOE...Y...EO.BS....EO:Y....DBO..O..E...OVBV.DEB.EEOD.DE...OKYDEDEOD......E.EY...........D.V....NERN.+.E...EK..ODEROO..EVYRK.YYDE.OEC.Y..E....O.V......Y...YN.Y.DC...........B..DE.O...D...
OOBDOECRYEYSBYRE.O.....S.E.DD...LKE.BEEE....D...ODY.OCV..RRYBERS.E..OSYDCCOSVWESYX...;RW0.Y.......D..E.D..RYE.Y.Y.7...D..E..:....ODCKR..X...+RDD.E.....Y..E....D.Y......BDS.CEDOV...BV..CYC..S..OOV.....
.O..O.VBYOEDRE.........NDE.XW...;YXEWW..E.O.YCE..OYC.VY.Y.VEODRVYO:DBYRBSYOD.YRRX....O...RBDE...D.....Y....EXOVY.E9Y...E.B..R.B.BD.SK.OC.XC..D+DOY.O.E.OC..C.E.OD........O.D.YV.X....Y....E.......O.E...
.....SY.EEDVO.OE......XO...V..C.;..RYS.E...Y.K..DOYEE.D.S..SDEOB.YBCDERSCRYRBYDBEO:...Y.YV.C....D.OC.D.O..5.S.EER.E....KEECYK....OXDDC.ES...1.BDY.CSD....B.C.....N.W...EY..O.CYO.....YD.B.DC.E.ES.COD...
.V...OEORYEYOBNC..EO....WL.YR..V.C.BDVVXV...R....DCCYEYRE.R.E.DCBS..YEBRE.RECDVYE.LEB..R.V.EVEE............OO+.R..OYYO.K.E..X...C.BE+DEKE.ECOCE.BC.D..D.D.E..Y........Y..VB.BD..E......BDWELOYOVBEY...O.
.....EODYBYDDSSSYBE....C.X....E.E...C.B.EE.B;N....CEROB.EEOEYB.YEOYYDR.OESDEEBEOC..C.O.ECDR.C.Y....O.....EY.Y.E7.;.............SVDBOYB...DEESERD.D.OYS........E.DEO...O.WDY....B.D...R..Y.EYE.DEEC.E.BXY
.....SEBSDD..D.OVSDE........S.EV.Y.RREOOV.RRBRYO.YN.W.OVS...ERED.EYREDEDYYOYYEEEE.RVEY.....DE..D..E.....OE...C.W.LB.D...........YVDR.O..V..+.DO.R.YR..............CB.Y....DOEE...........EYVEESOO.B.XBCD
......E.O.BDREE.DEDD.X...E...EOSBB.YR.B.SE.S....BO.Y..D.REROO.YODVSDCYDY.RBVYEDODO.C.B....R.OR..KY.Y.......EB.EYVRER..W.....BY.E.Y.XODVKE.OCBEBO.OVRDE..OOO..O.O.....DBED.O...............O.ELR.Y..O.X.D
.....CDE..C..R.B.XD.C.......Y.DB.OVB..YOCRCB..OY........VYEOCBDSODCYEEDCBDOEYCOB..EN.RX..BE..Y.RE.E.B...:BDDXCSECEDB.........EO.D.S.OE.OYEE...E.V.BO.OD..DY.RV.OE.................EO....OS.O...WCYS.YEE.
...R....D...OS...YE......BR....EDC.DYREEO.DXE.OYRD.Y.VCYESEBEOV.VESYYEOEEEODEDS.RS.VO..CE.YYD......Y.DYOCR.OC.BESDD...........E.E..SEOE.EDDYERE.YEKCYVB..YBBYREBK....R.E.................EE.S.BV.Y.DXERR
......E.E.R..ESE..V.E..O...ESBDEVSYDVYOB.O.B.X.EY.DYCD..DDOOEYYYEDESV0R.YDC.SRY.CE..EVYD.Y.E.R...RE..EXOYROVDXYED.DC.........E.E..E..O...VODB.OO.EY.YOR.....EYDERYSV.:E..O.....E..........E.S.O.CBRDORED
.D.E..BE....DSBX..E.D....D..O.SCREEYDDDBV.OCC.BEEE.E.V..YVYOEDSYRSVEVKYE.OOD.O0SOR.E...EEDOORDE..N.O.REBYD.ODCDENEEE...............LEC.W.DKR..DC.OY.E.ES.RSEVDVDS.ROKO................YB.SCO..CEYEEV.ROD
..Y.V..EYRO...DOV:...........VC.SESCV.RRSOYY..DC.E.EDDEYYVOEEE.CBS.YDN..SEYDEV....Y.DVYERDYY.RDY;....S.D.B.EYWE.D..Y..............Y..EE.OE..C...YRNSR.V.VDSYVKO.YB....O...................O.W...DO...ESD
S...EV.EKK....YW.E...........SREYCEDSYESD.RRO.O.E.EE.RDYDERENEOEECE.DDVV..VOOYED.B:Y.YYOECB.V.C.....O...EEC.Y.E.SC...................BE......;.D.O..V...KYRBVEVDO.E.BD:......OS.......DD.DEEY.S..SO..B..
EVY...VYYK........X..........SYDEEBRYYE.DDEEWYBSOEDED.EKCRC.E.EREEVERY.D..BBSVDY...RYBOORSDE.REBEOO..E.C..CEYS..E..........0..........DSYO............SKD.EOSRCRDLCYE............E...............BY.....
.RKB.E.E......K..R...........YEBEDCO.EEEEVOVEEEECSSDDYEE;OBSDYYEEEVBODD....Y..E..E.YEROD.CYCOYOE..LD.D..C.E..CX.W.........E...........V.......E.........VCBORDRDS.V.OB.......OO.B.B.........0.....SOYE..
.........V....KN.............OOEDDCBRSDDROBO.YOBRDDSYVDEDCDOO.Y.CVSYSY.O...CREC.S.ESOVCCWYCV.YO...D.O..Y....O............N.V...........................EEYEE.DE.VDVEV...E....D....................E.....
......Y..K:..................RCEBOYVEYDDCBREVOSOSVRVEOV.RSSEOBYEVCCDOEV...K.;.....WDB.OBD...D.DR.......E...E..O.............E0.......................Y..E.CB.WVE.VS.DY.D.S..................;...........
.........XE....E.............E.YEBDOCODVOCEEYOODYCSROS.KSYCOVEYDOYDSYY.....O.;CX..CEESO.YVD...O.......V.W...R............RYO.VERVD...................DSYO.SB..E.BCVE....................................
......K..XE........C..........E.Y.C.D....S.EDYSY.CREB.R.EEYR.YCVDB..B......O.X..S.....CVY.BY............................O.....Y......................D.OOYRBD..S.O.Y....................................`, 1048576000)).toBe('')
	})
})
