import { beforeAll, expect, test, vi } from 'vitest';

beforeAll(() => {
	vi.stubGlobal('localStorage', {
		getItem: vi.fn().mockReturnValue(''),
		setItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn(),
		length: 0,
		key: vi.fn()
	});
});

import { HeroLogic } from '@/logic/hero-logic';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

test('createRandomHero uses only passed sourcebooks', () => {
	const allSourcebooks = SourcebookLogic.getSourcebooks();
	// Pick only a single official sourcebook (e.g. Core)
	const coreSourcebook = allSourcebooks.filter(sb => sb.id === 'core');
	
	if (coreSourcebook.length > 0) {
		const randomHero = HeroLogic.createRandomHero(coreSourcebook);
		
		// Verify that the random hero's sourcebookIDs matches the passed sourcebooks
		expect(randomHero.sourcebookIDs).toEqual(['core']);
		
		// Verify randomized elements are from the core sourcebook
		if (randomHero.ancestry) {
			const coreAncestries = SourcebookLogic.getAncestries(coreSourcebook).map(a => a.id);
			expect(coreAncestries).toContain(randomHero.ancestry.id);
		}
		if (randomHero.class) {
			const coreClasses = SourcebookLogic.getClasses(coreSourcebook).map(c => c.id);
			expect(coreClasses).toContain(randomHero.class.id);
		}
	}
});
