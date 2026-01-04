import { PatreonSession, PatronTier } from '@/models/patreon-connection';
import { describe, expect, test } from 'vitest';
import { PatreonLogic } from './patreon-logic';

describe('PatreonLogic', () => {
	describe('hasWarehouseAccess', () => {
		test('returns false if not authenticated with patreon', () => {
			const session = {
				authenticated: false
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session)).toBe(false);
		});

		test('returns false if authenticated, but not a member of the Forge Steel patreon', () => {
			const session1 = {
				authenticated: true,
				connections: [ {
					id: 'not_forgesteel'
				} ]
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session1)).toBe(false);

			const session2 = {
				authenticated: true,
				connections: [ {
					id: 'forgesteel',
					status: {
						patron: false
					}
				} ]
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session2)).toBe(false);
		});

		test('returns false if authenticated and a patreon member, but not at the right tier', () => {
			const session1 = {
				authenticated: true,
				connections: [ {
					id: 'forgesteel',
					status: {
						patron: true,
						tiers: ([] as PatronTier[])
					}
				} ]
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session1)).toBe(false);

			const session2 = {
				authenticated: true,
				connections: [ {
					id: 'forgesteel',
					status: {
						patron: true,
						tiers: [ {
							id: 'not-correct'
						} ]
					}
				} ]
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session2)).toBe(false);
		});

		test('returns true if authenticated, and a member of the correct tier', () => {
			const session = {
				authenticated: true,
				connections: [ {
					id: 'forgesteel',
					status: {
						patron: true,
						tiers: [ {
							id: '27589669',
							title: 'Forge Steel'
						} ]
					}
				} ]
			} as PatreonSession;

			expect(PatreonLogic.hasWarehouseAccess(session)).toBe(true);
		});
	});
});
