import { describe, expect, test } from 'vitest'


function solveQuest(notes: string) {
	const world = notes.split('\n').map(l => [...l])
	let newChars = ''
	for (let r = 0; r < world.length; r++) {
		for (let c = 0; c < world[r].length; c++) {
			if (world[r][c] !== '.') continue;
			let rowChars = '';
			for (let r2 = 0; r2 < world.length; r2++) {
				rowChars += world[r2][c]
			}
			let colChars = '';
			for (let c2 = 0; c2 < world[r].length; c2++) {
				colChars += world[r][c2]
			}
			rowChars = rowChars.replace(/\./g, '').replace(/\*/g, '')
			colChars = colChars.replace(/\./g, '').replace(/\*/g, '')
			let found;
			for (const char of rowChars) {
				if (colChars.includes(char)) {
					found = char
					break
				}
			}
			world[r][c] = found
			newChars += found;
		}
	}
	return newChars
}

function solveQuest2(notes: string) {
	const word = solveQuest(notes);
	let total = 0;
	for (let i = 0; i < word.length; i++) {
		let c = word[i]
		const bp = c.charCodeAt(0) - 'A'.charCodeAt(0) + 1
		total += (i + 1) * bp
	}
	return total
}

const parseStackThing = (notes: string) => {
	const rawLines = notes.split('\n')
	const rowsOfStacks = notes.split('\n\n').length
	const columnsOfStacks = notes.split('\n')[0].split(' ').length
	const inputs = [];
	const inputWidth = 8
	const inputHeight = 8
	for (let sr = 0; sr < rowsOfStacks; sr++) {
		for (let sc = 0; sc < columnsOfStacks; sc++) {
			let lines = [];
			for (let r = sr * 8 + sr; r < sr * 8 + sr + inputHeight; r++) {
				let line = ''
				for (let c = sc * 8 + sc; c < sc * 8 + sc + inputWidth; c++) {
					line += rawLines[r][c]
				}
				lines.push(line)
			}
			inputs.push(lines.join('\n'))
		}
	}
	return inputs
}

test('parser', () => {
	const raw = `
**JFBN** **RKJG** **TJRG** **HPMR** **FTCB** **JDHC** **QRFV** **DTVN** **VWZP** **MTGD** **GWPK** **FMDL** **QLKH** **XNTP** **XKDM**
**WCXG** **QZBC** **PXCV** **TFSB** **JSZR** **PBFT** **NMXG** **JGPH** **SXQG** **KZXR** **CBZN** **NKTH** **FPMX** **JKCZ** **HJNC**
NR....FS ML....RZ MP....CJ SN....PL QJ....SH WF....BM MF....PN JS....CW VP....TB ZR....WX KF....TZ KL....PN DZ....NQ LP....NJ LZ....VX
LX....CD FK....GN NB....VT GJ....BT GM....ZD VJ....XG QX....GL HB....GD JC....FW GK....DF CV....QB VH....DB FS....HK ZF....HS MG....HK
TV....WK JH....PX DK....XR MC....WX LR....PX LD....HC VC....DJ KF....ZP RN....QS LV....MQ HX....PN JX....FC LJ....WM CX....KD CW....JD
BH....GJ SB....CQ GQ....SZ RH....FV BF....TC ST....PN WH....RK TN....VR GH....ZX ST....CN WG....DR GM....QT PX....GB BT....VM BN....RQ
**DHTL** **XPNL** **QZND** **XGVL** **XDHQ** **WNSM** **JDCP** **FSWC** **HNBR** **WFCQ** **FTDQ** **VBPQ** **GNBZ** **MFLB** **WQVZ**
**SKRV** **FSMH** **KBSM** **NWJC** **GLPM** **LGXV** **HLWK** **RZBK** **JTCF** **SVLN** **HXVR** **GCJX** **JSDW** **SVHD** **RLGB**

**DFBW** **PHXG** **XCFP** **TLZN** **VGRB** **QBLS** **SWHM** **BZPR** **HQVW** **TNJQ** **MTDG** **FPTL** **ZXKW** **LJQZ** **FNHX**
**CQMK** **TZWJ** **JNLT** **XPRK** **MNJZ** **DJPM** **ZFXP** **QDFV** **MXFD** **XZGC** **ZRSW** **QHKB** **BSNG** **NVTX** **DRPB**
RP....VG WZ....PD CH....VG BG....DH XP....QL DS....WH SV....FX WV....TQ TN....GF HB....KJ SZ....QL NS....ZT CZ....PX VW....XQ JB....QW
QN....BK JN....CM LR....WS LK....RW HN....ST MB....ZP ZM....BL BJ....ZF WH....SP TF....CR HC....WB QG....CB GD....NS TZ....BJ ZK....FC
XM....FC GT....QB TX....FN MC....TZ JB....MD FR....XL TH....RJ CN....MD ZJ....QB QP....LZ NR....PV FP....KL BV....KJ KN....SG XH....DN
DW....HT LF....XH JD....MP VP....NX RV....GZ GK....QJ WP....DN LP....RS VM....DX WG....XN DT....MG XW....DH LR....QW MD....LF PG....TR
**NTGX** **CMNL** **WSHV** **WCVB** **LPXT** **ZXHR** **NLDT** **CTNM** **ZTJB** **HBRW** **VLNP** **SZCN** **DJRP** **WFKS** **TKZG**
**RPHV** **FBQD** **GDMR** **DGHM** **HDSQ** **FWKG** **RJBV** **LSWJ** **GSPN** **LFPK** **CHBQ** **XGDW** **LQCV** **BGMD** **JQWC**
`.trim()
	const res = parseStackThing(raw)
	expect(res).toHaveLength(30)
})

function solveQuest25(notes: string) {
	const worlds = parseStackThing(notes);
	let total = 0;
	for (const rawWorld of worlds) {
		const word = solveQuest(rawWorld);
		for (let i = 0; i < word.length; i++) {
			let c = word[i]
			const bp = c.charCodeAt(0) - 'A'.charCodeAt(0) + 1
			total += (i + 1) * bp
		}
	}
	return total
}
function solveQuest3(notes: string) {
	let total = 0
	const world = notes.split('\n').map(l => [...l])
	const inputColCount = world[2].join('').split('...').length - 1
	const inputRowCount = world.map(r => r[2]).join('').split('...').length - 1
	const solved = new Set<string>();
	while (true) {
		const prevTotal = total
		for (let ir = 0; ir < inputRowCount; ir++) {
			//if (ir % 2 !== 0) continue
			let startR = ir * 8 - (2 * ir)
			let endR = startR + 8
			for (let ic = 0; ic < inputColCount; ic++) {
				const ikey = `${ir}-${ic}`
				if (solved.has(ikey)) continue
				let startC = ic * 8 - (2 * ic)
				let endC = startC + 8

				let newChars = [];

				const questionables = []
				const solvedEasily = []
				for (let r = startR; r < endR; r++) {
					for (let c = startC; c < endC; c++) {
						if (world[r][c] !== '.') continue;
						let rowChars = '';
						for (let r2 = startR; r2 < endR; r2++) {
							rowChars += world[r2][c]
						}
						let colChars = '';
						for (let c2 = startC; c2 < endC; c2++) {
							colChars += world[r][c2]
						}
						rowChars = rowChars.replace(/\./g, '').replace(/\*/g, '')
						colChars = colChars.replace(/\./g, '').replace(/\*/g, '')
						let found;
						for (const char of rowChars) {
							if (colChars.includes(char)) {
								found = char
								break
							}
						}
						if (found) {
							world[r][c] = found
							newChars.push(found)
							solvedEasily.push({ r, c })
						} else if (rowChars.includes('?') || colChars.includes('?')) {
							newChars.push('?')
							questionables.push({ r, c, startR, startC, insertIndex: newChars.length - 1 })
						}
					}
				}

				let unsolvable = false
				for (const q of questionables) {
					let similarR = questionables.filter(q2 => q2.r === q.r)
					if (similarR.length > 1) {
						unsolvable = true;
						break
					}
					let similarC = questionables.filter(q2 => q2.c === q.c)
					if (similarC.length > 1) {
						unsolvable = true;
						break
					}
				}

				if (unsolvable) {
					solvedEasily.forEach(({ r, c }) => world[r][c] = '.')
					continue
				}

				for (const { r, c, startR, startC, insertIndex } of questionables) {
					let questionMark;
					let rowChars = '';
					for (let r2 = startR; r2 < endR; r2++) {
						rowChars += world[r2][c]
						if (world[r2][c] === '?') questionMark = { r: r2, c }
					}
					let colChars = '';
					for (let c2 = startC; c2 < endC; c2++) {
						colChars += world[r][c2]
						if (world[r][c2] === '?') questionMark = { r, c: c2 }
					}
					rowChars = rowChars.replace(/\./g, '').replace(/\*/g, '')
					colChars = colChars.replace(/\./g, '').replace(/\*/g, '')
					const rowCharsUnique = [...rowChars.replace(/\?/g, '')].filter((c, i, arr) => arr.indexOf(c) === arr.lastIndexOf(c))
					const colCharsUnique = [...colChars.replace(/\?/g, '')].filter((c, i, arr) => arr.indexOf(c) === arr.lastIndexOf(c))
					const found = [...rowCharsUnique, ...colCharsUnique][0]
					world[r][c] = found
					if (!questionMark) {
						continue
					}
					world[questionMark.r][questionMark.c] = found
					newChars.splice(insertIndex, 1, found)
				}

				if (newChars.length < 16) {
					continue
				}

				for (let i = 0; i < newChars.length; i++) {
					let c = newChars[i]
					const bp = c.charCodeAt(0) - 'A'.charCodeAt(0) + 1
					total += (i + 1) * bp
				}

				solved.add(ikey)
			}
		}
		if (total === prevTotal) break
	}
	return total
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`**PCBS**
**RLNW**
BV....PT
CR....HZ
FL....JW
SG....MN
**FTZV**
**GMJH**`)).toBe('PTBVRCZHFLJWGMNS')
	})

	test('Notes', () => {
		expect(solveQuest(`**WNGT**
**XCFV**
LN....QX
HF....DV
WT....KC
SR....GP
**DPKS**
**RHLQ**`)).toBe('XNLQDHFVWCKTRPGS')
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest2(`**PCBS**
**RLNW**
BV....PT
CR....HZ
FL....JW
SG....MN
**FTZV**
**GMJH**`)).toBe(1851)
	})

	test('Notes', () => {
		expect(solveQuest25(`**JFBN** **RKJG** **TJRG** **HPMR** **FTCB** **JDHC** **QRFV** **DTVN** **VWZP** **MTGD** **GWPK** **FMDL** **QLKH** **XNTP** **XKDM**
**WCXG** **QZBC** **PXCV** **TFSB** **JSZR** **PBFT** **NMXG** **JGPH** **SXQG** **KZXR** **CBZN** **NKTH** **FPMX** **JKCZ** **HJNC**
NR....FS ML....RZ MP....CJ SN....PL QJ....SH WF....BM MF....PN JS....CW VP....TB ZR....WX KF....TZ KL....PN DZ....NQ LP....NJ LZ....VX
LX....CD FK....GN NB....VT GJ....BT GM....ZD VJ....XG QX....GL HB....GD JC....FW GK....DF CV....QB VH....DB FS....HK ZF....HS MG....HK
TV....WK JH....PX DK....XR MC....WX LR....PX LD....HC VC....DJ KF....ZP RN....QS LV....MQ HX....PN JX....FC LJ....WM CX....KD CW....JD
BH....GJ SB....CQ GQ....SZ RH....FV BF....TC ST....PN WH....RK TN....VR GH....ZX ST....CN WG....DR GM....QT PX....GB BT....VM BN....RQ
**DHTL** **XPNL** **QZND** **XGVL** **XDHQ** **WNSM** **JDCP** **FSWC** **HNBR** **WFCQ** **FTDQ** **VBPQ** **GNBZ** **MFLB** **WQVZ**
**SKRV** **FSMH** **KBSM** **NWJC** **GLPM** **LGXV** **HLWK** **RZBK** **JTCF** **SVLN** **HXVR** **GCJX** **JSDW** **SVHD** **RLGB**

**DFBW** **PHXG** **XCFP** **TLZN** **VGRB** **QBLS** **SWHM** **BZPR** **HQVW** **TNJQ** **MTDG** **FPTL** **ZXKW** **LJQZ** **FNHX**
**CQMK** **TZWJ** **JNLT** **XPRK** **MNJZ** **DJPM** **ZFXP** **QDFV** **MXFD** **XZGC** **ZRSW** **QHKB** **BSNG** **NVTX** **DRPB**
RP....VG WZ....PD CH....VG BG....DH XP....QL DS....WH SV....FX WV....TQ TN....GF HB....KJ SZ....QL NS....ZT CZ....PX VW....XQ JB....QW
QN....BK JN....CM LR....WS LK....RW HN....ST MB....ZP ZM....BL BJ....ZF WH....SP TF....CR HC....WB QG....CB GD....NS TZ....BJ ZK....FC
XM....FC GT....QB TX....FN MC....TZ JB....MD FR....XL TH....RJ CN....MD ZJ....QB QP....LZ NR....PV FP....KL BV....KJ KN....SG XH....DN
DW....HT LF....XH JD....MP VP....NX RV....GZ GK....QJ WP....DN LP....RS VM....DX WG....XN DT....MG XW....DH LR....QW MD....LF PG....TR
**NTGX** **CMNL** **WSHV** **WCVB** **LPXT** **ZXHR** **NLDT** **CTNM** **ZTJB** **HBRW** **VLNP** **SZCN** **DJRP** **WFKS** **TKZG**
**RPHV** **FBQD** **GDMR** **DGHM** **HDSQ** **FWKG** **RJBV** **LSWJ** **GSPN** **LFPK** **CHBQ** **XGDW** **LQCV** **BGMD** **JQWC**

**LNCJ** **BZFD** **ZPCG** **GJHV** **DGPR** **PTJW** **FRBJ** **BFML** **TNDF** **KPJH** **MZKC** **HXMD** **QNJL** **ZKBC** **QPZM**
**ZHPX** **QJPX** **HKDB** **XZML** **SMWB** **BZMG** **WPNQ** **TDQK** **WGKZ** **VQLX** **DVSJ** **QWNJ** **WDFS** **LSWG** **WRJS**
XP....ZH RV....FL ZF....KN KP....GL MJ....SW XH....PJ DF....JM VZ....JD CP....DH WL....QF WJ....ZS MR....DW LW....FT GB....QD RS....CN
JB....KQ GH....TZ TW....CB JF....SB BK....TH CW....FN BH....VP XT....QL WK....ZG GK....PJ LP....MN TF....BJ BD....HG FX....NM LX....WB
TN....LR BJ....DP PD....HX VX....DM RP....CG BZ....VG WZ....QC MS....KF FX....VL ZX....DV DT....FB LN....HX QC....NZ WK....CL MF....VJ
MV....CS NX....MQ GV....JR TN....HZ NX....DV LT....MQ XN....KR GH....PB TN....JQ SH....BN QV....CK CS....QP RP....SJ RS....ZJ KQ....PZ
**VMRT** **RNMV** **WTFX** **BDFS** **TNVJ** **LXNQ** **XMDH** **SGZH** **LPQJ** **SDZW** **WLBN** **FSPL** **GTZC** **FMJX** **NFCK**
**BQKS** **GLTH** **RVJN** **TPKN** **CHKX** **FCVH** **VCZK** **JXPV** **HXVC** **FBNG** **QTPF** **RTBC** **PRBH** **DQNR** **VBXL**

**LXGP** **LFSR** **BNFW** **TBMD** **LDRB** **FWNK** **PSFH** **GHSN** **QBRM** **VRNJ** **FBJV** **DZHR** **JTVX** **MFHL** **DNBQ**
**BHMR** **WHQB** **JGXQ** **HNZC** **ZFHV** **QJGC** **KQTL** **KTQX** **TVGC** **DFTX** **RCWS** **SBWV** **QLGF** **TDZS** **TMLX**
BZ....KF KB....MP QZ....JG WJ....MD RT....LV QK....JV QP....MV GD....QX RM....TN VZ....FB JK....FQ JT....SW XK....QZ LB....QD MX....DR
GP....LT VZ....NW RT....MD ZH....KN GS....HQ BL....ZW HK....NS VH....FL CZ....XS WR....XT GV....TN DZ....VM LN....WP GM....ZC LS....CV
CX....VS RH....SL FW....NH VG....TB FB....KP MR....FG TW....XB JW....RP JQ....VF DP....ML XH....LB LC....PQ GD....SF NK....JV BP....WN
RH....NM FJ....QC CX....BP PX....SC MC....DZ XN....CS FZ....LG TN....KS GB....DP KS....NJ CW....RS HR....XB JV....MT SH....TF QK....TJ
**NTZF** **JVPN** **DRTM** **SXPK** **QSPC** **BMVL** **GZMV** **PDWF** **SNFP** **WLZB** **LKXH** **QJPT** **SDZP** **KJVG** **PVJW**
**CKSV** **MKZC** **HCZP** **WJGV** **KTMG** **XSZR** **BXNW** **VRLJ** **DXZJ** **SKMP** **GTNQ** **XCML** **WKNM** **BCQN** **SKRC**

**SBKP** **QPMW** **MGHD** **CZGP** **HFJT** **FMVL** **JHBX** **HMSQ** **MFWT** **GJLD** **ZSBL** **QGZM** **FHNJ** **CJFP** **JZCF**
**TCXL** **TLVR** **KQJZ** **QWRT** **VKDQ** **ZSTQ** **CDSP** **ZXJF** **HXRP** **CXHW** **FDJR** **KNWJ** **MPDR** **DTRM** **KQRB**
RH....MT LX....JN RB....JD NH....PW KG....WZ TL....SC WS....CT KQ....SP NF....MT GL....TX BV....DM MW....QP JH....DS KS....XG HQ....JB
LK....WG VR....QP NG....HZ DM....RQ HM....CT NH....WF DK....LM JG....XZ CR....HQ SD....KC SH....ZL DC....KT QW....XL JC....PR LC....NZ
BS....PD MF....CK PC....QM TZ....LB NS....DB GR....KP PH....BQ CV....LT JB....DG VW....HJ FK....GP JS....NL VT....BF TD....LM SG....XR
QC....NX BT....HW WS....KT SG....CX FJ....QV ZV....MQ JR....XZ HD....FM KP....XW ZN....FB RQ....JC FZ....HG RP....NM FB....WN KF....PM
**NHMQ** **JKBF** **NSWT** **NSHD** **GNWS** **KGNW** **QRZK** **TKLG** **KDGJ** **FKST** **QCHP** **HDTF** **XBVT** **NWGB** **SMPG**
**WGDR** **CHNX** **RBCP** **BMLX** **BMCZ** **CHRP** **MWLT** **PVDC** **BQNC** **VZNB** **VKGM** **SPLC** **SWQL** **XKLS** **NXHL**

**NQTL** **DVBS** **QHWN** **SDXK** **CBGN** **QBWL** **PNZD** **QMCX** **MFSK** **PBDF** **MJQP** **PDHF** **NHFS** **TNXM** **DKZN**
**CXRK** **NFWJ** **MTLB** **PZCM** **SFKJ** **MTJK** **SBWM** **KRJH** **VDRX** **LQXK** **BZFR** **SMGN** **TKJV** **PHRB** **QJGT**
JZ....NH PG....SV XF....PH MV....GX GH....CM QL....BJ DB....QP RJ....XQ XD....WH CJ....NT BT....RC RN....MP WR....NL LT....NB GN....WD
RK....QP TC....QK TL....SN PL....TD KQ....FP XG....SK XS....WM HV....MN FV....SZ XQ....PK LJ....WF FH....SD VT....KJ GX....MH ZQ....BT
XL....CT BR....DJ BQ....JK QW....ZK RJ....DS PZ....HM HL....KC SC....FW QP....MJ GB....LH GP....DQ LJ....QW SH....CM RZ....FW HR....MK
GD....SB ZF....NW GD....WM SJ....CB NV....BZ RW....VT TN....ZV BK....PL RK....TG ZW....FD ZX....VM GT....BC PF....DQ DP....SJ JX....VL
**PDHB** **TKGQ** **FKJD** **GJWT** **PDRQ** **XZHP** **HKCT** **WFLS** **TGJQ** **ZWGH** **GCVL** **WTRC** **MDCP** **ZSJW** **RBLM**
**SJGZ** **PRCZ** **SGPX** **QVLB** **ZHVM** **VSGR** **VXQL** **VBNP** **HPWZ** **NJTC** **WDTX** **BQJL** **QLWR** **GFLD** **XWHV**

**WVLX** **CDPR** **QSHZ** **BFRP** **WKGS** **MQBN** **ZMST** **XKLP** **VPSW** **ZWBJ** **MZXQ** **TJPF** **WCHK** **NZPK** **HVLK**
**ZNMS** **NKZF** **DFGC** **MQVH** **RVPL** **TVHX** **NBLF** **CBMF** **NLRJ** **TRKP** **VFJH** **DKZW** **FTLJ** **FWQS** **MWNC**
MZ....VR ZK....SN JV....TW KR....BT MV....WG TQ....XG TC....QS TB....GL WR....DL ZF....DH QB....XR TP....JF LV....NQ QG....SF BQ....FW
QK....WN CG....WL KH....CS FZ....VH BP....HS BM....VW LF....MZ JP....KX NK....SC XT....ML SN....ZM BV....ZQ TJ....FH VW....XC CV....HN
TF....SJ VP....RD GQ....FM PC....QM XT....KN NP....HZ DX....GN FC....MR TQ....ZP GR....KP PT....WV WK....GC MC....DG RM....PH ZJ....LP
LX....CP JX....FT ZD....BX LW....SJ JL....QR CK....RS PH....BK ZD....HS XV....HJ BW....JN HL....FJ HS....MD PZ....WK NK....ZJ MT....RK
**FPQK** **VXJG** **JBXT** **SLCK** **XBTN** **ZPGC** **HQXP** **DHJZ** **DCHZ** **NHFD** **BRNW** **BVCS** **NZPG** **HGJV** **FJQP**
**CJTR** **TWLS** **KVWM** **ZTJW** **HQJM** **RSKW** **CDKG** **GRST** **QXTK** **GXML** **LTPS** **GMHQ** **MQDV** **CRXM** **ZTRB**`.trim())).toBe(194889)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`**XFZB**DCST**
**LWQK**GQJH**
?G....WL....DQ
BS....H?....CN
P?....KJ....TV
NM....Z?....SG
**NSHM**VKWZ**
**PJGV**XFNL**
WQ....?L....YS
FX....DJ....HV
?Y....WM....?J
TJ....YK....LP
**XRTK**BMSP**
**DWZN**GCJV**`)).toBe(3889)
	})

	test('Notes', () => {
		expect(solveQuest3(`**GMBJ**NXGB**KRNJ**RSPC**GCBM**MJND**WGXB**CZGQ**NXJT**RJQT**FBVK**LRDZ**BTMV**JZVB**HDFW**CVJG**KWLH**PCXG**WLZC**FTKX**
**?K?Z**RDFH**TLWM**MWNG**HJQF**TVPX**FSMH**LWVD**FHMW**PFKS**DNMG**WQBM**HXZR**QGKR**VTLZ**HXNR**TCXF**DNZT**TSHJ**WZDB**
XW....JV....H?....QJ....GP....?W....D?....HF....G?....HF....ZR....?V....?P....CV....Z?....DS....CG....?S....?C....SQ....KB
NR....BZ....FP....?M....?V....HL....?X....BC....DT....P?....T?....MX....Q?....XM....G?....HT....XZ....D?....?N....LW....XR
KF....GT....?S....TL....SN....?F....N?....WS....LJ....W?....J?....GN....LD....?H....R?....VL....NQ....?H....PM....?T....FM
SP....MQ....?D....BW....?R....JB....?T....KM....Z?....MX....?S....CF....WR....S?....FK....M?....RJ....?K....?Z....JV....ZD
**R?TS**PVJM**BQFX**LVKB**XNLV**HLWB**PCZV**KHJS**ZDPG**CDNW**RTQX**PVKC**QCSL**FTXM**NKSR**QWSZ**ZDNR**SKMB**XGNB**VRLJ**
**PVX?**TZQS**HPSD**QJXT**SWPR**QZGF**KDNT**FTBM**LCQV**MXZH**JCSZ**XNFG**PWDK**CSHN**MJQG**MDTL**SQJG**WHFL**VMQP**SQMH**
MH....XS....YD....F?....?J....QT....N?....?L....NY....CJ....VH....NY....DX....XL....LV....Q?....?G....XF....NM....LY....BQ
VG....TB....?H....GR....PR....CX....FM....BC....?C....ZX....GY....?J....CL....?Y....JD....YV....YR....N?....YR....J?....ZC
PL....QN....BR....XL....QV....YZ....CY....XY....KM....D?....FC....GM....YR....PB....?X....FJ....PB....WY....?W....WS....N?
DC....FR....XF....YS....YH....L?....XV....KH....WB....YH....X?....CS....N?....WD....YC....SZ....HL....QG....CD....RC....YH
**?DLQ**XGCN**DJPL**FXRW**BZPN**XWFD**NLWH**HDCZ**GBRK**FQZV**HWNR**XTHN**BKJS**QNTL**CGNX**MTVJ**HZKV**PZDG**FCML**NVSK**
**HMCG**LSJW**TKGC**LMKZ**CVJD**KSQH**BVMG**KXNG**XTVS**LJGH**SDBG**QPBL**RVNX**RZJW**WRDT**LRGF**QBPC**WLXJ**TPRG**QJMH**
FP....QH....?W....DK....?C....NT....H?....MQ....HX....?M....PZ....D?....?J....GS....WQ....?G....TW....?Q....JX....F?....MQ
ZC....MJ....G?....BJ....W?....DJ....FC....?B....?C....BR....?L....VR....QP....N?....HJ....N?....J?....PS....ZM....P?....KL
NG....LT....CR....?V....ZX....?Q....S?....VN....DW....T?....?F....BG....?L....RV....F?....XD....LF....?K....DL....R?....BJ
XW....BD....X?....LT....?M....VP....?W....LR....ZK....G?....W?....KS....H?....MK....LT....C?....?V....GB....W?....GT....VN
**Z?W?**ZTDM**VNXS**PJVT**WRQH**BTVZ**QXZR**FLQM**FNZC**NRTW**FVKZ**WSRK**GQMP**HKGB**ZFBJ**WXDK**JLMS**KBVH**HWVS**LPTG**
**TF?X**QBHR**ZRWB**BDHC**MTFX**CJNP**KFCS**VBRW**WHDM**PMBS**PQLJ**DGJV**HTWL**MSVF**HLQK**NBZC**GWTF**QCSM**ZDXJ**RFBC**
HM....WN....LT....VN....SW....WQ....?D....HK....Y?....DQ....YJ....C?....VJ....L?....PK....?P....BJ....QV....Q?....?L....VY
RQ....JP....MB....RC....YM....MY....RP....BY....XB....ZK....TQ....VR....R?....NC....Y?....YH....LX....FY....TY....SQ....HQ
FV....ZL....DX....FS....VN....NX....CJ....TM....GS....?Y....R?....QM....LY....ZK....TM....ZQ....T?....NK....GS....BJ....GS
TD....XB....GH....ZW....L?....?D....GY....?W....JP....GJ....PZ....YJ....NQ....YF....VC....NF....ZY....?R....HB....YN....L?
**HB??**WJMD**MHTL**FVRG**HGKS**DNWX**GRCB**XPMG**ZSRL**DZTF**LQBN**DVCT**KSGF**KQBM**DCXS**GJLB**VBZC**PTFB**KCGD**TDRN**
**Q?DV**Y?QH**FDCG**TWNP**RZCL**PZLT**MFVX**QWZH**BJKM**GHMR**ZWSK**RFJP**MCRL**FZRH**BVZK**XKWQ**RDKM**ZJSX**MRBZ**XSWF**
ZP....QM....ZV....M?....VQ....?S....?D....FC....?W....MV....X?....BN....?D....PM....FW....S?....GQ....?C....?P....KC....NT
BW....LN....S?....WH....XR....?L....G?....VH....TX....R?....?T....SC....T?....KS....ZJ....?N....BL....?X....TN....?M....SX
FT....DV....PX....?C....P?....ZK....X?....ML....?G....BC....Z?....PW....R?....LN....BQ....T?....ZJ....S?....B?....DL....BW
HS....XR....?J....LB....G?....BH....P?....RB....QP....?S....HF....?L....JV....G?....HR....?V....WP....?V....?Z....RQ....PF
**?ZSX**VTYN**XVBZ**XCDQ**FVBN**GHBM**TNPW**FVTC**QVCP**KQCB**CXFP**SWQK**VNPJ**LCWJ**NQHT**PDTV**JQGW**WDCV**FWPJ**BPCM**
**NFPW**QX?C**WJSP**BLMH**QMXP**KSQC**DLQH**LJRB**TXWG**LVSX**DHGT**LHNB**QDHT**GPSN**RFWJ**NCSZ**XSPL**KMNR**LTQN**QKGL**
WJ....NL....GZ....SN....WL....FN....KS....FR....W?....YB....BS....N?....HY....YX....FY....YV....QW....WX....CD....WZ....?Y
MD....FT....BD....VM....GX....TP....YW....?J....XG....FT....Y?....YF....JR....WB....JH....LZ....JC....Y?....XY....X?....JG
KP....RX....RT....WJ....VJ....BD....QZ....VC....NV....L?....LC....JW....MS....MJ....GB....XG....NY....LM....K?....FH....HV
BQ....ZS....HL....PX....SK....MQ....D?....PY....YF....NP....FD....KC....?D....D?....?V....?C....?M....GQ....HQ....YN....SW
**BR??**WL?Y**DLRT**NZYS**GWLK**KMZX**GQSK**BLTN**HQZD**XPJB**XTHR**FPLD**QHGF**WSBT**LFZH**VQXT**WHFR**QFGX**KFBJ**WPZN**
**K?DM**VGBJ**NGHM**XK?L**DTSJ**TCPL**WHXT**JMGK**TBVR**HSKF**QSDV**CXVN**TMCK**RVGC**CGJP**MBZH**PLZV**ZHMS**ZVDR**MLFK**
WN....KQ....XF....?R....B?....DS....?P....GV....LX....D?....?P....DT....LS....G?....CX....?N....XC....?L....Q?....DK....WS
GD....MX....D?....MB....?J....LH....MR....?Q....?B....ZW....SJ....Q?....CN....D?....?R....ZP....QF....D?....?J....BH....ML
RT....LH....T?....GC....M?....KF....XB....?K....TC....F?....?C....MR....FP....?Q....WV....?J....?B....ZN....?F....CR....FP
CV....JB....Q?....LH....?R....GW....ZC....?H....NJ....R?....?K....VH....BX....?H....SF....L?....?T....PR....M?....VZ....QN
**?XNC**GD?B**CXZK**HV?R**FHQV**RDHS**MFVZ**VFSQ**XLJF**WRQL**KLCJ**SQMB**NPBX**HKFJ**VRXW**CKJF**NBMD**JRLD**GHTQ**VQSB**
**HWVT**LYPW**QPBF**JPYC**ZBMR**GFBW**BPCR**CWHX**WNCM**VCDZ**PMWB**HTWR**SDJL**XMQD**BNKS**PNLG**QTCX**PWNT**CSMX**RDHC**
FV....BX....ST....QP....LG....RQ....DG....PB....GC....RG....BL....KM....?Y....YB....ZK....FQ....PY....GP....SP....D?....YK
PK....HW....ZV....XM....BW....MX....TR....FX....Y?....Y?....YP....T?....QX....DW....?W....YZ....VS....?L....NK....VT....VL
ZS....CG....GF....BJ....NF....HS....WC....ZH....LQ....ZX....?V....NY....LV....H?....YD....?J....B?....JQ....RG....QK....XF
MT....QN....DH....KC....PC....ZV....LQ....MV....RZ....PB....XQ....JQ....CZ....TM....LJ....CB....CX....ZY....?Y....YG....?D
**FMKB**TCHG**JDTM**VMRY**XCNS**BYWX**TQXD**BQVP**NWMD**QRDF**BWTJ**RVPQ**BHXT**BCPZ**RTPN**CZXP**SMJF**XJBL**CFNG**CBXG**
**???P**LYW?**VGHS**CZ?K**GLPW**HJ?C**HWGL**WFRD**ZCQF**BPKW**GHQX**BZHW**NDJF**LHWX**VSJZ**GVJL**PHNV**RPQC**HBST**MPTJ**
DW....MK....R?....GM....HJ....?S....VP....D?....G?....DZ....FL....?H....?S....NF....?B....NQ....PC....T?....P?....TH....BV
PT....ZJ....HZ....?L....W?....NV....F?....LN....FV....?M....?R....XT....BV....H?....?W....JT....LM....?Q....D?....FQ....MP
QC....BV....JK....T?....?K....ZX....?S....MW....J?....XC....PB....M?....PD....X?....CD....S?....?X....JV....?B....NZ....JC
HL....SF....F?....VS....?R....GC....?J....XH....R?....WN....?S....GN....R?....JT....Z?....RF....GZ....H?....XL....?G....RX
**DLV?**CZV?**QKRZ**PY?T**DVJZ**RWC?**MJNK**HTML**JVRP**ZLSM**LRMN**DMNS**RQZM**MFJG**WQFG**TMQS**XDCL**MHNT**ZLDM**RSFV**
**JCTH**WFYX**LFWP**RKGH**HKRQ**VMYJ**FPVS**NXGJ**HBGX**HNCX**KSFP**JGXT**KSVP**DTKN**BLDC**DNFR**ZTQG**SDFV**XRPQ**HNZQ**
HZ....VQ....SG....WZ....CX....DZ....CL....JF....XK....NG....HM....QP....WH....VM....KS....LW....SP....GX....JS....QD....X?
TG....PC....CK....HR....RT....QG....SX....MW....MC....VP....WV....KF....KN....PL....PD....ZQ....VL....NC....GZ....WM....YW
RX....DL....LD....FN....VN....FJ....VR....KT....ZS....BJ....BX....LS....ST....RC....CM....TF....QJ....DH....RT....XN....DZ
FM....JW....BX....QP....MS....KH....HD....PN....RT....LH....NG....RZ....GX....QZ....HV....GB....MW....ZT....VC....LP....HT
**GZXP**?VFY**GSXC**?XMW**TXCN**YDZJ**RTWH**DKNQ**KNSL**WLXF**GHXB**MZJB**WLCG**KJP?**PHKZ**TX?F**JSPH**?ZNK**SWGV**YPSV**
**QFMR**JWMR**HBDN**HRYJ**FGMS**NV?R**DXLC**?VTY**MTCZ**MYC?**QWZV**?YFH**XHNT**DHWY**TMVS**ZWYJ**NVWM**JTLY**CJNT**HB?L**`)).toBe(216118)
	})
})
