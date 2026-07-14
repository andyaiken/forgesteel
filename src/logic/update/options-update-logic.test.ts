import { expect, test } from 'vitest';
import { Options } from '@/models/options';
import { OptionsUpdateLogic } from '@/logic/update/options-update-logic';

test('initializes defaultSourcebookIDs if undefined', () => {
	const partialOptions = { cookieConsent: false } as Options;
	OptionsUpdateLogic.updateOptions(partialOptions);
	expect(partialOptions.defaultSourcebookIDs).toBeDefined();
	expect(partialOptions.defaultSourcebookIDs).toEqual(['core']);
});
