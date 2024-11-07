import { describe, expect, test } from 'vitest'


function planNeededPotions(incomingCreatures: string, groupSizes: number, potionsNeededByCreature = {
	A: 0,
	B: 1,
	C: 3,
	D: 5,
}) {
	if (incomingCreatures.length % groupSizes !== 0) {
		throw new Error('groupSizes must be divisible by the length of incomingCreatures');
	}
	let potionsNeeded = 0
	for (let i = 0; i < incomingCreatures.length; i += groupSizes) {
		const creatureGroup = incomingCreatures.substring(i, i + groupSizes).replace(/x/g, '')
		const extraPotionsNeededPerCreature = creatureGroup.length - 1
		for (const creature of creatureGroup) {
			potionsNeeded += potionsNeededByCreature[creature] + extraPotionsNeededPerCreature
		}
	}
	return potionsNeeded
}

test('throws error when groupSizes is not divisible by incomingCreature count', () => {
	expect(() => planNeededPotions('ABC', 2)).toThrow()
})

describe('Part 1', () => {
	test('Example', () => {
		expect(planNeededPotions('ABBAC', 1)).toBe(5)
	})

	test('Notes', () => {
		expect(planNeededPotions('BBBCBAABAACABBCCCABBCBCBBABBACABCBBCCAABCACBBCBAACACCBAABAABABAABACCCABABABCCCBBAACABCABACCCBACBBBCBCACACAAACBCBABABCACBCCCBACBCCBBBCCBCAACABABAACBABCCBCCCBCABABBBCBBCACBAAACBABAAAACCCBCAABACBBCBBAABACBAABBACCCABACCCACABCBACBCAACAAACBACBCCCBAAAAABACAAABBBBAABABABBBBCBBACACBAACABACCBACABBAAABBACACAAACCAABBACBAAAABBCACBAACCBACACAAACBBBBBAACBABBBABACACCABCCAAACBCCAACCACCBAABBABACCBAAABAACCABAACACBBCACAAACCBCCABCACBBBBCBABABBCACBABCAABACCCABBBABBCCCBBAABCBBCBCCABBCBACACACBCBBAACAABACCBCCBAACABCABAACBCCCBBBBAACBAAACCACCBAACBBABABCCBAABAAAACCAABBBBBACCCAACAAABBCBBBACABACBCABCCCABBCACCCABCAAACACACAAAACAABABCACBCBAACCACACAABABCABBBCABCCCCBACBBCBCACAAACCABCBBCBAABAAAACCCBBABAACABCACCBCAAAACCACBBACBACCBCBCACCBBAACBBAABBABABBCBABAABABABCAACCCCCABCAACBBCACABAABCAACBCABCBBAABABCCCCBBABCABBABCCABCCBCACACAABAACABACCCABBBCBABBACCACACACACBCACACCABBCCACCABCCBAABCCAACAABBABBABBCABCCCBBAABCBAAABBAACBCBBAABAABABCCCCACABACBCACCBBBCAACAABCBBBCBBCACCCCBBCABBBBAAABCAACBCACBAACABBCBBCCBCBAACBAAACABACCCACCBACACC', 1)).toBe(1289)
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(planNeededPotions('AxBCDDCAxD', 2)).toBe(28)
	})

	test('Notes', () => {
		expect(planNeededPotions('ABCACxDDCBCxxCDADBxCAADxDDBBCCDxACBAxDCCBAxBDDDBxAABCACDABACCBADBxBCDBBDBDDDCDCBADCBADBBDCBAABxDCBBCDDCCADACAxBCDxxBBDABCDCDCBBxBBCAADxDDxxCBDBBDCCDADBDBBBBABCBBBCBDAxDxBACBBxCAxACAxCDxBAABCCBBBBDxxCDxABxBBBCCDCCADADDBDCAxBACCDAxBADBxBDDCCDDAADDCDCBAxBCBCCCCACADCADxDxxxBxDDCDxBxBBCCDxAACADCBCBCBBABCADAxCBxBDACCDBADxCAxCxxBDDCACBxDxACBxCDxABBDDBxxABCCxCDCCCDBBxAACBBBDAxBDBCDDBxCBACCBAAxAACCxDCDACDBCBDBCABDCDBCBCDBAABxACADCCBABDDABAACBBDADABBCDDADDBDxxxACBDBxCDCCDABBxDCCABABBDACxBCCxCDBACCCDCCBCDxDAxCxDCACBBBxBAABxAxBAADDBDABDDDxDAAACBDBBAABACCAACBDBDCDxBDDBDxxDACCBAACCDxBADBCDCAACDCACCDBBBABCABxBAADADBCBCCABxCDACCACADADDADCCDCBAABABBDDCBDACDBxBBCADxDDABBxAADDABACCBDDCBCBCDBCADCxCBBCBABABCBDAABCCDAABBAABADxxBAxDABxDCAxxABBBBADDAABAADAxDBCxABBBBCBABBDBDCCDBADDBDDDDAAACACxACCDCDDDDxAAxDBDBxCADxBCBCCDxDAxCDAAAABBBCBxABADDAAABCxBDxDCBABABCxCABBBADCDDCxADAACBDDCDACCxADABBDxCCACCACADCCDABBDCACACABxDADCxCDACACBBBCAABBAxBxBAxCxCBxCxABDDCACABCDxCABCADCCCADCDBACxCxBDBCDAADBADACCDCBCAADCDBBCCxBDCCxABBBDCxCCBDBDDCCBxDAAxCCACBxACCxACCBADCBADCBBCxxDCDCBCBABCxCCxCDCCCACxBAAxABBADBBxCBAACAxDAAAAAxBCBCDDDDCxAADADDDBAxCCDCBAxAADBADACCACBDADxBAACAAABxBBDBCADxACAxBDBCCDDAxCCCxBDBCBDxCBDBCDxDBBDBCCACDCBBABAABDCBCAADCxABxBAABDCDCCACDDBDDDBCCDxBDADxCCBxCDDDAACBCCACBDCxCADCABCxABAxAABxDDCDCxACCCCDCCxADBCCADADADCBDDAxCBCCCCDABAACCxCDABxDADCDDCACCDCACDDACDBCBxCxAxAABDCDBBABABADACCBACBBBACBDCBCADxxBCxDCAADABAADBCACDDDBDACCCADxBBCBBABACBACBCxCDCxAACDBACxABCBCCDCCABCBBDBBAAADAxACCDACBADACDDDAACACBCCBBBDAxBABBCBBDBDDDBCDBAxDxCBDBCCCxABDABBDCAxDxxDDACxBABBAxCCABADDDCCADACxAADACCBAAAABCBDDCABAABDCBCxxBCBAACBxACBBADDxxACBDCCBADCBBDxABABDCBCAABADACBBACxBxBxBACDBACCBCDAABDCDCABDxBDBCDBABDBCCBAADDDBDDCABxAAACxCADBxAADxBxDAxBCADDBCABBCCBxxDACDCDCBBCCxBCBxBCADBBCABBDBDBCABDBxABxACAABDDxBxACBCDDBABDDBDBCAxAACAACCxAxACCBCAxDACCCBCxBCABDBCxBCDCBADBADDCDxADBADBxBxACBDCDDDCCCBxDxACCABADDBACCBCBBDCCCADBCBxCACBAxBCCABCDAADBDCACDDDxDBAADCAABCBxAABCBBAADDABxBCDDxDAACxCBDDBDAxCBCBDxDADDBBABDDBxDACxABCDCDADDxABABBAB', 2)).toBe(5506)
	})
})

describe('Part 3', () => {
	test('Example', () => {
		expect(planNeededPotions('xBxAAABCDxCC', 3)).toBe(30)
	})

	test('Notes', () => {
		expect(planNeededPotions('AxxACxADxCAxBDCABCBDBxDCCABCCBCAxCBDxCBDBAxBAxBDDDCCxAABCADCBACAACCxCDCBBDDCCDxDBBxxACABCBDDCAxCCxAxCDDACCCCxDxBBBBBCxCBBCxBDAABBxCCCAAAABBDDBxDCBAxxBDCxADAxCCBDABCDBxxxACBDBxADDABDxACCABCxxCABDAAAxCDDBxDACCABxBCBABBCDxCxDDCCDxBDAxABxxABADCDABBxDCBxxAADAAxCDCCxxBABAAxDxBABxBBADDDAAABBBCDDDCBxDxADCDCDDBDDxCCDDDxCBACBABADABCCxxCCADBADDxCDADBABBBxCxBBDAABBxABBDAxCADCBDDxBACxDxDBBDDADDBAxADDACDBCBBBBxADDDBBDAABDBBxABABAxDxBxDABCADDCBADxCxDBAAxBDACxBACAxCxBxBDxCBBADDAxCBDAACCxACBDCDxBxDBDCBCABBBAxACBCBADCxDCDDCDDDxxCBCCCCDDDAxDABBDDBxBCBBBCCBCCDADBDDADDBDxCAABCCAAAxAxCABACxBCCxxBBACxABAxCCCCxAxAxCCxACCAxxAxBDDDBCDDAxDxCDBCBDBDBDBDBDAADxxCBADCxxBxACACACCABAABBxCxCCCBBDAACBBxBDDxAAxDDACCBCDDABABBADBxCBxCxBDDDADABAxxCCABxCBxxDAACBCCxBxCDAADBBBDCABBDxBBCACDACxBCCCCxCBBBCDAADDCBxDxAADCCxDBxDBDBCDCAxDAAxBAxCxAACDAAABDBABAAABCBAADCAACDAAADABABBACBDABCDADBxxxADDABADDCxDxxDDCBxAxCAACxDxBAADCDACxDCBxxCBxDDABCAxBxxBBBAAACxBADAABAADDCxxBxAxCAxAAABDDCxCACAADxCCCDBBCCxxAxBxADxxCAADCDDxCCxxBBxxDxDBxDxBADABACAACAxAxADCBBAxxxxxxxBAxxDxDBDDDDABBAACxAxCCCCxxAxCCAAxCBCBxCCAxCACCxxxxxBAADBxCCCCADACDCxAxCDCDCDBCBAAxxBxDBCBDABACCAACxBBCCAADDCDDACBCBCDBDxxxCBBxxDADACDBCBxDDCDCBDAADCBADxCxADDAAxBDCDxBCADxACABxDABxxACCCBBCCCAADBBxBBDBADCxCCCCBAxAACACAABBCCACxxCDADxACxAxDDxDCAAxBABBxCAxBDDAADBBDxBBBCDxCCBBABBCAACxBxBDxACBBxCBCxBADADxADADDBBxDDCABDADDAABBBCAxxCDCDBCBBBCCxCAAxBACDAABDACxDAxDxBCDBDDBABADAxDACDCAxAAxxBAADABCACADDBDxADDxCDDAxxABAxxBAADCBBDAxxxDDADAADBCAxCCDBBCDAxBDCxxDADBBDxxxBADBBCBAACCDAADABAxBxxxAxxBBCCCBCCDDDBACDAxCxDxDAABCCBAxCBDCxCBDAADBxBCxDxCCxBAAADBAxCACDxxAxDDxxCBBxCDAxAxDCABADDBxBCxDABBBADAxxCxCCAABBBABBxBBCCBDBBxxACCBxxBBxDAxBxxCCCCDBDCAAxCDDBxDDDDBDAxDCxADDDxDBABxxBCACxAACDDBCBDBCCCCxxCDCABABCDABxCCADxAAAAxBCCDBAABxxBBCACBAxCxAABBAxBxxBxDBDCAxAxDxxBACCCABDBCCCxADCCCxCBxDACDBCxxxCBxBBxDCxxACACBBxxDACDCCxxDxCxBACxBCxABBAxDDCACCDBDAABBxDAxDADBBBBBDAAxAACCADDABDCxxDDCACDAxxCCxDCDABxBAADBCAxxDCAABDBAACAADABxBAAxABxBBxDAACADAADDxABBACDDCAADBDABDCBCCACBBxxACCAAxCBAxCABABCDDACADCxAACCDADABAAAxxDxxDDCxDBADCBDBCCCxBBBCBCxCCAxADxCBACDDCCCACxCADBBCDDBCxDCBxDDABCDAxCxxCDCBCACxADxCACCDABxCxCBBDCCABABACBxCCACxxCxDDBADABxxCBBCxCBACBCDDBCDBDBAxxCDCBCxCCxBxAxDDxBCDBxDDADxDBDxDxDAAxBxBCACxxAxxBBxDDDxBDACDABBAABxxBBAAxDACAACDACBBBCAxADBCDDACABCBCxBADxxBCADBBCBDCBCCCBCxDxxCDBDDDDDBBCCCACxACDBCxxBCAABDBCDCBCxCABCACxADCCxxBxACABAxCAxDxBDxxxCADxCADDACxDxCDCCDCDACxxABDBxCBDDCACADxDAAAADBBDCxxAAxxCBxBDCDBBDxxADAAxBCxAABDCBBDAxBCBxxDxCBxABDDDCBABxBCAABxxDBBBxDBCDxxDACBACCABDCxBACCxCBCCDCDBDCCxACBCADDBDACDBDCDDDCxxCxxCAxCDDDBAxxDDxxCDADDxAxxxDDBAAxBADxBCxBDAxCAxBAxCAxDABCADCCBDxADxBxBBxCDDBAAxBAxAAACDADBDCAACDxxDABADxBAAxxAxDCBBBxxBxxCADAAAAxxBCDCxABxCCACDDACCBADCDCBCACABBAxCABxxCADBACCCACBACxABCBxDAxBBxACCDDCxADBDCBBACxxDDxxBxCDABxxDACBxAxBBBABDDCxAxCCDxBxBBxACABCAAxBxCDxBAxxxDAABDCDBCCCBDBxCxBCBBCDCCCAxDADBCxBBCAAABxDxBAADxxAxDACDABxCxDAxBxACxDBxxxDxAxBDBAxCCCxDxBCCCBDBDCBDACCBABAACCCDBBBAxADAABDDxCBDBBxxABAAxDABDxBxxCxxDDxxBBABCxBCCDCDBDCADDBxBABDCBCACBCCADxADDBxDBAxCxBxxBxAAAxxCCxDxDCDxBDDAxDDDDxxCDxBxCDDACACDDDxBBACDBBxDxABAABCBBxDxBCCCDCAABDAACADAxDCCDxCACAAxAxAAAABxACDCBxBBBABDxDBCBBCxDCCCACBxDxDDCCACBDADCAAABxxCDCCAxDBCxAADAxDxACCACADCBAxAxBAAxCACBCCCxBDxDDBCDBDCDADDABxxBBxCCCBBDxDDxBxDxADABDBDxDBDCACxCABCADCBBBBABxDBxAAABxBxCBBCBxADAABADADACDBAABDCCBDBCxDCDxBADDDBCxCBDxCxxCBxDBADDxCDDBABDDBxCACCCDBxDDAAxADxBCBCBDCxxCCCAxBBCCDBBBCxBCDDDBDADxxxDBCCADBCABDCxDBCBDCBxDACxxAACxDDxDxDxCxxCBCCDCAAADDCACAAxxDBBCAxDxAAABCBDACxBxCxDxDAACABBDCDAAxAAxCBxDDBBADxAxAABxACxDBBxBAxxDABxDACCAABADBBxABDBAADCCxxCxADADxAxBDABBxDBBxBDDBBCCABAAABBAxBBAAxADxBAxCDxBCCBxDCDCBxDBxDACCDBBBCCDDCDAADxCxxxDxAxAADAxxDDADDDBxBCCDDxDABBCCCAxABCxBBCxDADCDCAAABDDCACAAAxADCCABAABCACDxDBCxADxADBCxAACxDADDDCxDxACCxxDAADABBBCxxxABAxCACAxADBxDxxDCBDxDCADxxDxxADCDxxCBAAxDBDBACCBAxCAAxABBDxxDADCBDCCBxDxBABAACCCBxDCxCACDACABDBDBDDDDABDAxDCDAAxBDxxxDCCDDBDxDDxCDCAxCCDBxADACBCCBDBDBDxABDACAADCxBBBCCDBADDCxAxAABCABBDCCCCBCBxCDDxAxDCADBBCxAxxxABDxAxAACxCxCxCDAACCxxBDDAAACxDCDxCBBxACBxxBxDABCAxBCCDAABAACADACCxBDxBxABBCBBCBCAxBAACBCxBAxDBCAAAACxxCCDDDDxBDBBABAxACxAAxxBDCACDCCDCxACAACCxAxxDCDDxCDBxxBCBBACBBBBCABAABxCBBxAxCDDCCDCADBABBBDxBxDAAADxAAxAAxBBxCAACCxAABDBDBCBAxxABBBCDxCCDDBCBDBxDBBCAADAADAxBCBCDBxAxBBDBDDBAAxAABDBxxCxCACCDCCDADDCxxCACDDxABABxCBDDBBDBDABCBxDBBxxDBxxDxBCxBBxCBCBACADxCACBDAAxBCDBCBxACCCACxDDCDADDxxAxxxxCADCBAAAxCxxxxCxCxACxDAACAADCDBCxDDxCxBxAABAABABBBCDDBABDACDCBxBADCxBDBADBCAxAAAABBDxCAxCCDCDxCCCxDxBACACBAAxDCADAABBDDACDAxDCxAABCxABADAABDDCCAxDDDxACBDDABCxDDxCCxADCxBBAxABAxDDDxDxCABDBxBBABBABAAxBDxDDAAAxADBDDBxDCBACDACDACBCDxxBDDCBDBxCAAxCxDxCAxBDADxCBxABCACxBCDAxxBDDCACBxBCxDAxxxxCDBDxDAABCAAxCDBDBADxxxADxACxBADxxADxADxAADDxCBBBCCxBDAxABDBxDCDBDxABDAABABCACCBDBACABxxBABDDxCDBBxBBxBCxDxBCBDAACAxxxCABxDABxACxDDxCxCxCDxADBCDBCxCxDCDBCDCADABxCBBxADADxxxCAABAxAAAxBDCDBBDACCABBBCABACDBCCBCADACBCCABxDBDAxCADxBBxABAAxADADAAxDCACDxADCABxBCCCABBCxACCxDDABDCBABAABxxxBxBCAAABBABCCCAADBAxBxBDABCADCxBBBDxBBAxCxxBBxBCBABDAADDCBxAxACBDxDxABABxBxBCxAxBCACABCDxDDCCxxxxDBCBDCBCCDBBDxBBBDBxDDACCAxCABxxCxABABCABABADABDAxADxDAxAACBxxDACABCBDDxBxACBBADxADAxCAxDxDCCBACDxBBxBBxACDDBBADBCAxDAxACBCxDDDABBDBCBBxCBAACBAABxDxCDxDxBxxDBxCxDDBCAABCDDCBBxAxCBACCxBACBDDCxACxCCBxCxDBABxDxxDxDCABDxCADCCDDCABxAxDCDCCxDxxBxBAxBBACBxxAABxxDABBDABBxCxCxABADDBxxCAAxABAxBADCADCCCxDCCCxxxxCAxDCADxDBABxxCxDCCDCCxADADDABCCDDDDCxxCxCBxAxBABCCBDBCAAADxxABCCAADxDDBxxDACDBDxxCBABACDBAAxxxACCxxCCDDxADBDBAABxBBBABxCCDCCBxxABBDxBDBxBDBDBxxABABDABDxxBCBDCCxCACCDADDDADBBBBAxDCABADxCBCCDxAAxCCACBBBxBDABxDDBCBxABADxBBxBxBxCBDADBDBxBBDDDADCCDDADDCABBBDAADxxDxBDDxxDAxCCDBDBADDDCACBCxCCCBADAxxDBCDBCDCCADxDADxDBAxxCCBxDCDDDAxxxABCCDBAABxBAABxDDDDDxCBxBCCBCDAxCBDDACxACCACABDBBBDDDxCxCBBBxBBBBABDDCDxDxDDCxBAxDxCxAxCCAADADBCCCxDABxDBCCxDBCxDBxxxABBCxDDACAxxBCDxBxCADDCDCCCxBDABDBDBBABxBCCCCxDACABCDxxBBCADxBBxBABABDDADCDxDCDxDACBCxxCBACDCBCDCADxBxABADCCCBBDCxxDBACCDxDxBAACDBCDxxDxxAAAAxDxxxABCDCxCDBxADAxABDDBDCCBABxCxDxDDxABCCDABxDCADCxCCBADDADAxBDACDxBxDCAACDADxAADCDCxDBACBAxxDAAxBCACBxBCDxACxxAxBBCxxxBCxCCBABCDxBCDABACABBxACDDBCCCxxBDCxDDBCBCDCBxACxDDxBCCBDADBxDxBCxACDDADxDxCxDBxAABDBADCBABxxxxBBBBCDCDBxADBABDxBCCxBDBACCDBxCCACxACDBDADxDAADDxABDDxACADABxDCAxDADBBxBCAxAADCxDAAxCxDCBxCBxCBDBCCDxxBxDBCABxCBCCxDBCxxxDDxACBAxxCBDAADCACABBBCAxxDxCBDxDCxCDDCDBDBDCBBDBCABxBCABCBxxBDCDDDBBxCBBCCDCAABCDAABDxxACDABBCBBAxxBBBADDCBxAADCAABADABBAxACxDBDDxBCCDCxCCBCBCBAxACxDxADDDACCBAxBxCCBBCCADAxBxBxxCxxAADADCxxDABxBxDDBABCCxCABAAACAAAxAxADBxAADBBBCBACxBADDCBxAxxADBxBBDCABxDBDAAxDDBBCxxCACxAAxACDBxACCDDDDDDCBxBxDDAACCxxxBDxCxAxCDAADDxDCDxBAADAxxADDAADBBBCDDAADBAACCAxCAxDAACDxBxABAAAxxDDxxDCCADADDxBBxCDxAxCxBAADCxAACDCADBDBCBCBAAABxCBDDABADADxxAxDxBDDBCDxxBDABDCCBDDACCBBAACAACDBACDCxABBADCxCBAxDxDBCCCBCCBxxACxAxBCDCAxCABDAxxACACDCxxBCAAAAAxDBCABxxBCDCABDBBxxBDDAxxCABAAAxBDADDCBCCDBDACDCAxCxABCABACBBACAxACxBBDxDCCCDDCBDxBBBDBxxBDxBADACxBCCBAxCBDxAAAxDxDBCxCDCADCDDBCCBBCBCCCDDAxCACCCBBBBCDCDBCADCCDxACADxCDABCAAxDACxxxAxABBBCCxAxCADDBDBxBxDBxxBDBCDAACACBCDCACABBCCDAAxADBABCBCBDDBxCAxCxABABBDAADBxCCBDDABBCCBBBxCDxCDDCCxADCxxBCDACBDxBxxBDDBxDBBBDCCABxBAxCACABxAxDABxBBxxCAxACACACDCBBAxBDDDCBBCCADCBADDDDxCBDCCxBDBxDBCACACCCADDCDxBBBAAxDDxxCAxCxAxxCxxCBBxAxCCADDDCxCBDACBxDADCDBxCxBBDxCBCxDBCDDxxAxACDxxxBDADDACCACCDCxDCBDBCBxBCBAxACCBDACDxCBBBCACBDxCAAxxAxDCBACxDCDCxDCCCDxCBDxBAxAAxCBxxBxBBAAxxBAABDAxDxDDAABCxxBBBCxCCADCAADDACDDBDBxxDCBDCCBACDCAxBBxCCCAxABCBDxAABBCAAxABDBxABDDADCxCAADCxDDABCBAxDADDCxBDBBABBCDDBAxDBxCxCBDDBACADACBDAAxBBADBAAxxDAxDDAAxDxxADxxAxBCxAxABxCDADxCAxDBBABBBxxBBAxDxDDxDBBCCBCABDADCDBABDADCABADDxABCDAxBDxCxxCDDCxCBBACCBxDDBCDDBAACAACAAACxABxACxDDCBDABDCDCDDCCxxAxxxCBDBBAxDCxABAACDDBBCABCxxxDxxxBBDCDDCABCACCDBCBCBxxxBCCCxxDxCADxBBDCCxBBxBACBDDBBxBDADBxxxCCDxDCCACCBDCDAxAxxAACABxCCBCBxCxDACBBDCDDxAADBABDCDABDBxxxADDCCDABADxDxBBDxDBDCDADAAxABBxxxxBCDBBBBBxCDxBBABBBABABDCBDDDABABxxxABxCAxAAADxABCABxCAxCxAABBABDBADCADAxADDCAxAxDxCCAxCxABDBBxCACxxDCBxxDBAABAxAABxCADDABABABxBBCACDAAAxDBCDDACxAACBxxABDBDADCADxAxxBxADBADxDCCDxBCBxxADCBABxCDxAAxxxCxBxBBBCDxAACCACCCCDBCBDxDBxxBDCxBCAABBxCCACDCACxxCCBDDAABDDDCBACxxBADDCBxADDxBBCCACACxDxBBCAxCDxAAADBxxBCABxBxCxBBBCACDDCDABDxDxDxBDCABxDBCDBCBBCAxDDDDDAAxBDBBxCDAACCCBxACCBxCBADBCADCCCBACCADBABxBABADDBCBDAxADAAxAABBCAABxDBCCDxCxCCCxDxACxBBDCBxxxCABCCADAxABADDADCxxACBBBBxCBBBCBCxDCCxACCCBxxDDCCCBDDBxABCADADCDCxABABABCCCAxDCCDCDBBCBxADxDxDxCCDBAxDDABCBABCACACAxBDDCCBDAxxDDDACAxBBAADCADACCCxDDBCCADDxCADDBxADxDDADxBABxBBADAABACDADDCBADDBBCCDACDCCAxDDDBBDCDBAAxxxDCCxCCBADDCCxxABDBDDDxAAABDxADDxxDxADBBDDAxDBDxDxDxADCADBBDBBDBAAxBBCAxDBCCBxCDBDDCABCxxBAxAxBAxDCCAACDAAxDDDCACxxxBBDAACBxCDCDDDxDBBBCACxACCxxAABCxxBADxCxCxxDxDDDABxDCBCAAxxBAxCxCDBCAABDDAxCACDBAxxCDxCCBACACBxxCDBDAxABBCACCDDBADABAAAADCxBDxxACBAxAxCDCCBCBCBBxCCBCDxBxDCDCDCBxBxCAADBDxDDDDxBDBAAAxDBxCACAxAABCDABxADDACxxBADAxxxCCxADAxDAAADDCCAACDxCDCBABAxCDBBDBDDCAABDDCBxxBCDDBCCBCxCBABCxCACCBDDACDxDACCCBBAAACABBDBDBCxDxBCBCAxCBDCDAxxBDxDxDCxBAACxBAAxABDBABADBBDACDDAxBACxCCxxBCxBABDBDDxBAxxxABCBBCxAADADABBAxxAAxADxADxBCxABDxDADDDACxxxBCBCCADDxDADBxADAxCxxx', 3)).toBe(27843)
	})
})
