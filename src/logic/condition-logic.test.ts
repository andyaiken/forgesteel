import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { ConditionExtractionLogic, ExtractedCondition } from '@/logic/condition-extraction-logic';
import { describe, expect, test } from 'vitest';
import { Condition } from '@/models/condition';
import { ConditionData } from '@/data/condition-data';
import { ConditionLogic } from '@/logic/condition-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Utils } from '@/utils/utils';
import { censor } from '@/data/classes/censor/censor';

const createCondition = (type: ConditionType, text: string, ends = ConditionEndType.UntilRemoved): Condition => {
	return { id: Utils.guid(), type: type, text: text, ends: ends };
};

const hexed: ExtractedCondition = {
	name: 'Hexed',
	rules: 'A hexed target glows green.',
	ends: ConditionEndType.SaveEnds,
	owner: 'Ajax',
	abilities: [ 'Decree by the Jade Hand' ],
	related: []
};

describe('getName', () => {
	test('uses the type of a standard condition', () => {
		expect(ConditionLogic.getName(createCondition(ConditionType.Dazed, ''))).toBe('Dazed');
	});

	test('uses the text of a quick condition', () => {
		expect(ConditionLogic.getName(createCondition(ConditionType.Quick, 'Judged'))).toBe('Judged');
	});

	test('uses the leading bold text of a custom condition', () => {
		expect(ConditionLogic.getName(createCondition(ConditionType.Custom, '**Hexed** *(Ajax)*\n\nA hexed target glows green.'))).toBe('Hexed');
	});

	test('uses the text of a custom condition that is a single short line', () => {
		expect(ConditionLogic.getName(createCondition(ConditionType.Custom, 'Poisoned by the spider'))).toBe('Poisoned by the spider');
	});

	test('falls back to a generic name for a custom condition with longer text', () => {
		expect(ConditionLogic.getName(createCondition(ConditionType.Custom, 'Covered in sticky webbing that makes it hard to move or attack.'))).toBe('Custom Condition');
		expect(ConditionLogic.getName(createCondition(ConditionType.Custom, 'Webbed\nCan’t move'))).toBe('Custom Condition');
		expect(ConditionLogic.getName(createCondition(ConditionType.Custom, ''))).toBe('Custom Condition');
	});
});

describe('getText', () => {
	test('gives the description of a standard condition', () => {
		expect(ConditionLogic.getText(createCondition(ConditionType.Slowed, ''))).toBe(ConditionData.slowed);
	});

	test('gives nothing for a quick condition', () => {
		expect(ConditionLogic.getText(createCondition(ConditionType.Quick, 'Marked'))).toBe('');
	});

	test('gives the text after the name of a custom condition', () => {
		expect(ConditionLogic.getText(createCondition(ConditionType.Custom, '**Hexed** *(Ajax)*\n\nA hexed target glows green.'))).toBe('*(Ajax)*\n\nA hexed target glows green.');
		expect(ConditionLogic.getText(createCondition(ConditionType.Custom, 'Poisoned by the spider'))).toBe('');
		expect(ConditionLogic.getText(createCondition(ConditionType.Custom, 'Webbed\nCan’t move'))).toBe('Webbed\nCan’t move');
	});
});

describe('getFullDescription', () => {
	test('adds the duration to the name', () => {
		const text = '**Hexed** *(Ajax)*\n\nA hexed target glows green.';
		expect(ConditionLogic.getFullDescription(createCondition(ConditionType.Custom, text, ConditionEndType.EndOfTurn))).toBe('Hexed (EoT)');
		expect(ConditionLogic.getFullDescription(createCondition(ConditionType.Custom, text, ConditionEndType.SaveEnds))).toBe('Hexed (Save ends)');
		expect(ConditionLogic.getFullDescription(createCondition(ConditionType.Custom, text, ConditionEndType.UntilRemoved))).toBe('Hexed');
	});
});

describe('createFromExtracted', () => {
	test('creates a custom condition whose name, source, and rules can be read back', () => {
		const condition = ConditionLogic.createFromExtracted(hexed);

		expect(condition.type).toBe(ConditionType.Custom);
		expect(condition.ends).toBe(ConditionEndType.SaveEnds);
		expect(ConditionLogic.getName(condition)).toBe('Hexed');
		expect(ConditionLogic.getText(condition)).toBe('*(Ajax · Decree by the Jade Hand)*\n\nA hexed target glows green.');
	});

	test('names only the owner when several abilities apply the condition', () => {
		const condition = ConditionLogic.createFromExtracted({ ...hexed, abilities: [ 'Hex Bolt', 'Hex Storm' ] });

		expect(ConditionLogic.getText(condition)).toBe('*(Ajax)*\n\nA hexed target glows green.');
	});

	test('round-trips a condition extracted from a hero', () => {
		const hero = FactoryLogic.createHero();
		hero.name = 'Aria';
		hero.class = Utils.copy(censor);
		hero.class.level = 1;

		const judged = ConditionExtractionLogic.getConditionsForHero(hero, []).find(c => c.name === 'Judged')!;
		const condition = ConditionLogic.createFromExtracted(judged);

		expect(ConditionLogic.getName(condition)).toBe('Judged');
		expect(ConditionLogic.getFullDescription(condition)).toBe('Judged');
		expect(ConditionLogic.getText(condition)).toMatch(/^\*\(Aria · Judgment\)\*\n\nThe target is judged by you/);
	});
});

describe('getSource', () => {
	test('reads the name, owner, and ability of a condition created from an extracted condition', () => {
		expect(ConditionLogic.getSource(ConditionLogic.createFromExtracted(hexed))).toEqual({ name: 'Hexed', owner: 'Ajax', ability: 'Decree by the Jade Hand' });
		expect(ConditionLogic.getSource(ConditionLogic.createFromExtracted({ ...hexed, abilities: [ 'Hex Bolt', 'Hex Storm' ] }))).toEqual({ name: 'Hexed', owner: 'Ajax', ability: null });
	});

	test('copes with an owner whose name contains parentheses', () => {
		const condition = ConditionLogic.createFromExtracted({ ...hexed, owner: 'Ajax (Young)' });
		expect(ConditionLogic.getSource(condition)).toEqual({ name: 'Hexed', owner: 'Ajax (Young)', ability: 'Decree by the Jade Hand' });
	});

	test('gives nothing for any other condition', () => {
		expect(ConditionLogic.getSource(createCondition(ConditionType.Custom, 'Poisoned by the spider'))).toBeNull();
		expect(ConditionLogic.getSource(createCondition(ConditionType.Custom, '**Note:** this one is hand-typed'))).toBeNull();
		expect(ConditionLogic.getSource(createCondition(ConditionType.Quick, 'Surprised'))).toBeNull();
		expect(ConditionLogic.getSource(createCondition(ConditionType.Dazed, ''))).toBeNull();
	});
});
