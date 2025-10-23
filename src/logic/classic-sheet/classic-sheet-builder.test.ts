import { describe, expect, test } from 'vitest';
import { ClassicSheetBuilder } from './classic-sheet-builder';
import { goblin } from '@/data/monsters/goblin';

describe('buildCharacteristicsSheet', () => {
	test('builds sheet when nothing is passed in', () => {
		const sheet = ClassicSheetBuilder.buildCharacteristicsSheet(undefined);
		expect(sheet.might).toBe(0);
		expect(sheet.agility).toBe(0);
		expect(sheet.reason).toBe(0);
		expect(sheet.intuition).toBe(0);
		expect(sheet.presence).toBe(0);
	});

	test('builds sheets for Monsters as expected', () => {
		const monster = goblin.monsters.find(m => m.id === 'goblin-1');// Goblin Runner

		const sheet = ClassicSheetBuilder.buildCharacteristicsSheet(monster);
		expect(sheet.might).toBe(-2);
		expect(sheet.agility).toBe(2);
		expect(sheet.reason).toBe(0);
		expect(sheet.intuition).toBe(0);
		expect(sheet.presence).toBe(-1);
	});
});
