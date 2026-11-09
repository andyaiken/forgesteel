import { describe, expect, test } from 'vitest';
import { CultureType } from '@/enums/culture-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { Language } from '@/models/language';
import { LanguageLogic } from '@/logic/language-logic';
import { LanguageType } from '@/enums/language-type';

const languages: Language[] = [
	{ name: 'Kalliak', description: '', type: LanguageType.Cultural, related: [] },
	{ name: 'Caelian', description: '', type: LanguageType.Common, related: [] }
];

describe('language options', () => {
	test('ancestral cultures offer only their default language', () => {
		const culture = FactoryLogic.createCulture('Test', '', CultureType.Ancestral, undefined, undefined, undefined, 'Kalliak');
		expect(culture.language.data.selected).toEqual([ 'Kalliak' ]);
		expect(LanguageLogic.isAllowed('Kalliak', culture.language.data, languages)).toBe(true);
		expect(LanguageLogic.isAllowed('Caelian', culture.language.data, languages)).toBe(false);
		expect(culture.language.description).toContain('Kalliak');
	});

	test('cultures without a default retain unrestricted language choices', () => {
		const culture = FactoryLogic.createCulture('Test', '', CultureType.Ancestral);
		expect(languages.every(language => LanguageLogic.isAllowed(language.name, culture.language.data, languages))).toBe(true);
	});

	test('accepts named options and allowed types, including named custom languages', () => {
		const feature = FactoryLogic.feature.createLanguageChoice({ id: 'test', options: [ 'Custom' ], allowedTypes: [ LanguageType.Common ] });
		expect(LanguageLogic.isAllowed('Custom', feature.data, languages)).toBe(true);
		expect(LanguageLogic.isAllowed('Caelian', feature.data, languages)).toBe(true);
		expect(LanguageLogic.isAllowed('Kalliak', feature.data, languages)).toBe(false);
	});
});
