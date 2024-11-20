import { describe, expect, test } from 'vitest'


function solveQuest(notes: string, start = 'A', dayCount = 4) {
	const g = {}
	notes.split('\n').map(l => {
		const [from, rawTo] = l.split(':')
		g[from] = rawTo.split(',');
	});

	let populations = {[start]: 1};
	for (let d = 0; d < dayCount; d++){
		const newPop = {};
		for (const from in populations){
			for (const to of g[from]){
				if (!(newPop[to])) newPop[to] = 0
				newPop[to] += populations[from]
			}
		}
		populations = newPop
	}
	return Object.values(populations).reduce((a, b) => a + b, 0);
}

function solveQuest3(notes: string, start = 'A', dayCount = 4) {
	const ttypes = new Set<string>()
	const g = {}
	notes.split('\n').map(l => {
		const [from, rawTo] = l.split(':')
		g[from] = rawTo.split(',');
		ttypes.add(from)
		for (const each of g[from]){
			ttypes.add(each)
		}
	});

	let least = Number.MAX_SAFE_INTEGER
	let most = Number.MIN_SAFE_INTEGER
	for (const char of ttypes){
		let populations = {[char]: 1};
		for (let d = 0; d < dayCount; d++){
			const newPop = {};
			for (const from in populations){
				for (const to of g[from] ?? []){
					if (!(newPop[to])) newPop[to] = 0
					newPop[to] += populations[from]
				}
			}
			populations = newPop
		}
		const ttl =  Object.values(populations).reduce((a, b) => a + b, 0);
		least = Math.min(least, ttl)
		most = Math.max(most, ttl)
	}
	return most - least
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`A:B,C
B:C,A
C:A`)).toBe(8)
	})

	test('Notes', () => {
		expect(solveQuest(`Y:I,E
O:I,E
U:A,I
E:Y,U,O
I:O,Y,A
A:Y,O,U`)).toBe(39)
	})
})

describe('Part 2', () => {
	test('Notes', () => {
		expect(solveQuest(`V:D,S,H,T
N:Z,G,Q
H:R,X,Z,T
G:Q,L,K,Z
C:H,K,J
P:K,S,T,Q
M:N,V,P,X
Q:L,W,V
D:T,K,M,P
T:R,N,W,S
B:S,D,P,M
X:K,M,V
K:N,M,J
F:S,M,D
J:D,Q,B,N
Z:V,V,F
S:G,J,J
L:F,S,D
R:C,D,F,P
W:H,Q,T`, 'Z', 10)).toBe(279138)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(solveQuest3(`A:B,C
B:C,A,A
C:A`, '', 20)).toBe(268815)
	})

	test('Notes', () => {
		expect(solveQuest3(`XMP:GBH,CKK,KLM,XHH,ZCT
CVL:SWV,CWK,LHH
FTP:SWV,XHH,TCN
JWR:DJL,JJH,DDC
LVN:NDB,QWR,MVP
MRG:KNN,BVJ,TDL
GXS:FTP,PTS,MJF,TBQ,LJQ
TCN:DJL,JCK,HCM,CVL,HNT
VCC:KLM,DCF,HCM
DRC:JWR,KZP,TCN,JWR,BBF
JQZ:WMT,NXN,GJN,PWX,BNB
SNT:JWR,PWX,DVM
WMX:NDB,SSQ,KLM
XJW:QWR,NLD,JJH
LFH:GQZ,MCX,VWW,CKK,GXS
GBH:ZLM,SWV,MGR,TTT,VCC
GTX:SSQ,TVB,BVJ,ZLM,RNH
CWK:DDC,GJN,VCC
KZP:BNB,WXH,SRB,RNH,CLK
VWW:SMM,LHH,SMM,PNN,MRG
WMT:PNN,ZNS,DDC
PWX:CVL,LCQ,CWK
FHH:HSC,WXH,DVM,HNT,SKJ
JCK:WMT,NLD,CWK,ZCT,XJQ
CLK:WPZ,NNW,LHH,GJN,BBF
ZJV:TDL,PTS,GJN
NNW:LHH,BTT,PWX,PTS,MJF
MGR:SMM,KNN,JQZ,VWW,SMM
FVX:JCK,VCJ,DDC,DJL,MJF
LCK:CKK,TVB,WPS
LHH:WPZ,PWX,LFH,WMT,KWD
ZNS:FTW,BNB,PWX
FTW:LFH,KQJ,HZR
KHB:DDC,LHH,WMT
GQZ:GFJ,HNT,XDF
LCQ:MJF,FHH,GXS
DVM:LHH,TTT,JCK
XDF:PTS,PWX,LFH,PNN,NLD
ZCT:FVX,WPZ,DDC
KLM:WMT,LCQ,CWK,BVJ,TTT
HVD:XHH,MVP,MJF,MRG,BVJ
HCM:WMX,NXN,TMQ
TMQ:KCV,GFJ,GFJ
ZLM:BTT,LCK,XHH,XMP,ZNS
KWD:HNT,HZR,BTT,CWZ,QWR
BBF:BVJ,TMQ,XDF
TVB:FRW,LCK,PFK
HRC:VCJ,VCJ,NDB
CKK:VWW,CWK,PFK,SKJ,ZJV
BTT:WXH,CTC,FHH
TTT:FTW,TKG,NDB,LHH,GXS
GJN:XDF,LCQ,KQJ,MGR,TKG
MVP:FVX,WPS,KHB
WXH:JJH,VCJ,XZC,GQZ,FHH
KCV:KRP,TLH,NDB,PTS,LCQ
KQJ:HZR,SWV,CWK,PFK,DDC
RNH:HSC,SWV,SRB
WPZ:SWV,WPS,KRP
KNN:JQZ,MVP,KLM,VCJ,TBQ
BVJ:CLK,TTT,FTW
SKJ:HRC,LJQ,SWV
XJQ:LCK,MVP,NDB
PTS:LHH,TKG,XDF,XJW,KCV
JSB:LFH,NDB,PNN,KLM,SRB
TDL:PTS,LCK,GQZ,GQZ,SWV
BNB:WDJ,GFJ,XMP
QWR:ZCT,FRW,BNB
SWV:RNH,VCC,KLM
NDB:JQZ,LHH,TCN,VCJ,LFH
CTC:PNN,WPZ,VCJ
HZR:JSB,GFJ,CWZ,HVD,DRC
FRW:TKG,MCX,TVB,KQJ,LJQ
DDC:HCM,ZLM,KNN
XZC:BVJ,ZCT,DVM
SRB:KCV,ZCT,WXH
VCJ:WPS,CWZ,JQZ
CWZ:NNW,JCK,XJQ,ZCT,XMP
GFJ:JSB,TKG,TMQ
JJH:HNT,FVX,PNN,KWD,SRB
NXN:LCQ,NLD,TKG,BBF,KRP
LJQ:JJH,HVD,SMM,VCJ,XZC
PNN:TBQ,NNW,HRC,JCK,KRP
HNT:JCK,BTT,CWK
RPP:CTC,XDF,SKJ
HSC:HCM,FTW,XMP,ZJV,FTP
SSQ:GXS,NLD,DJL
NLD:WMT,CTC,KCV
KRP:DJL,FVX,GJN
SMM:MRG,BVJ,MGR,LVN,BVJ
TBQ:HNT,VCJ,DCF,XDF,JCK
DJL:TMQ,HZR,JSB
WDJ:WMX,KLM,FTW,FVX,DDC
XHH:JWR,HNT,SMM,LJQ,SSQ
WPS:XHH,KLM,WXH,GXS,TTT
MJF:HNT,PNN,FTP
TLH:LVN,XMP,KNN,TLH,WPZ
TKG:KRP,DJL,VCC,KRP,WMX
DCF:KZP,RNH,DCF
MCX:QWR,DRC,TTT,GBH,FTW
PFK:KHB,ZCT,MGR,GXS,SNT`, '', 20)).toBe(1178699688052)
	})
})
