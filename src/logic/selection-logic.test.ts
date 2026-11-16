import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { LanguageType } from '@/enums/language-type';
import { SelectionLogic } from '@/logic/selection-logic';
import { SkillList } from '@/enums/skill-list';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { core } from '@/data/sourcebooks/official/core';
import { orc } from '@/data/ancestries/orc';
import { orden } from '@/data/sourcebooks/official/orden';

describe('selection warnings', () => {
	test('skill and language warnings are dismissed independently', () => {
		const warnings = { skills: [ 'Magic' ], languages: [ 'Ananjali' ] };
		expect(SelectionLogic.hasUndismissedWarnings(warnings)).toBe(true);
		expect(SelectionLogic.hasUndismissedWarnings(warnings, { skills: true, languages: false })).toBe(true);
		expect(SelectionLogic.hasUndismissedWarnings(warnings, { skills: false, languages: true })).toBe(true);
		expect(SelectionLogic.hasUndismissedWarnings(warnings, { skills: true, languages: true })).toBe(false);
		expect(SelectionLogic.hasUndismissedWarnings({ skills: [], languages: [] })).toBe(false);
	});

	test('detects overridden languages using the same limits as the selection picker', () => {
		const hero = FactoryLogic.createHero();
		hero.culture = structuredClone(orc.culture!);
		hero.culture.language.data.selected = [ 'Ananjali' ];
		hero.features = [];
		const sourcebooks = [ core, orden ];
		expect(SourcebookLogic.getLanguage('Ananjali', sourcebooks)).not.toBeNull();
		expect(SelectionLogic.getWarnings(hero, sourcebooks).languages).toEqual([ 'Ananjali' ]);
		hero.selectionWarningsDismissed = { skills: false, languages: true };
		expect(SelectionLogic.getWarnings(hero, sourcebooks).languages).toEqual([ 'Ananjali' ]);
		expect(SelectionLogic.hasUndismissedWarnings(SelectionLogic.getWarnings(hero, sourcebooks), hero.selectionWarningsDismissed)).toBe(false);
	});
});

describe('selection slots', () => {
	test('skill slots combine named and list options without counting known named skills twice', () => {
		const feature = FactoryLogic.feature.createSkillChoice({
			id: 'skills', options: [ 'Magic', 'Custom' ], listOptions: [ SkillList.Lore ], count: 2, selected: [ 'Custom' ]
		});
		const [ slot ] = SelectionLogic.getSkillSlots([ feature ], [
			{ name: 'Magic', description: '', list: SkillList.Lore },
			{ name: 'History', description: '', list: SkillList.Lore },
			{ name: 'Lift', description: '', list: SkillList.Exploration }
		]);

		expect(slot).toMatchObject({ id: 'skills', capacity: 2, selected: [ 'Custom' ], rank: 3 });
		expect(slot.accepts('Magic')).toBe(true);
		expect(slot.accepts('History')).toBe(true);
		expect(slot.accepts('Custom')).toBe(true);
		expect(slot.accepts('Lift')).toBe(false);
		expect(slot.accepts('Unknown')).toBe(false);
	});

	test('language slots combine named and type options and preserve unlimited capacity', () => {
		const feature = FactoryLogic.feature.createLanguageChoice({
			id: 'languages', options: [ 'Caelian', 'Custom' ], allowedTypes: [ LanguageType.Common ], count: -1, selected: [ 'Custom' ]
		});
		const [ slot ] = SelectionLogic.getLanguageSlots([ feature ], [
			{ name: 'Caelian', description: '', type: LanguageType.Common, related: [] },
			{ name: 'Kalliak', description: '', type: LanguageType.Cultural, related: [] }
		]);

		expect(slot).toMatchObject({ id: 'languages', capacity: -1, selected: [ 'Custom' ], rank: 2 });
		expect(slot.accepts('Caelian')).toBe(true);
		expect(slot.accepts('Custom')).toBe(true);
		expect(slot.accepts('Kalliak')).toBe(false);
		expect(slot.accepts('Unknown')).toBe(false);
	});

	test('warns about unsupported skills while excluding languages granted by another feature', () => {
		const hero = FactoryLogic.createHero();
		hero.features = [
			FactoryLogic.feature.createSkillChoice({ id: 'skills', options: [ 'Magic' ], selected: [ 'Custom Skill' ] }),
			FactoryLogic.feature.createLanguageChoice({ id: 'languages', options: [ 'Kalliak' ], allowedTypes: [], count: 2, selected: [ 'Granted', 'Unsupported' ] }),
			FactoryLogic.feature.createLanguage({ id: 'granted', language: 'Granted' })
		];

		expect(SelectionLogic.getWarnings(hero, [ core, orden ])).toEqual({
			skills: [ 'Custom Skill' ], languages: [ 'Unsupported' ]
		});
	});
});
