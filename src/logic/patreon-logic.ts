import { PatreonSession } from '@/models/patreon-connection';

export class PatreonLogic {
	static hasWarehouseAccess = (session: PatreonSession): boolean => {
		const FORGESTEEL_PATRON_TIER_ID = '27589669';

		if (session && session.authenticated) {
			const fs_connection = session.connections.find(con => con.id === 'forgesteel');
			if (fs_connection
					&& fs_connection.status
					&& fs_connection.status.patron
					&& fs_connection.status.tiers) {
				return fs_connection.status.tiers.map(t => t.id).includes(FORGESTEEL_PATRON_TIER_ID);
			}
		}
		return false;
	};
};
