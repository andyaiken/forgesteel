export interface PatreonSession {
	authenticated: boolean;
	connections: PatreonConnection[];
}

export interface PatreonConnection {
	name: string;
	status: PatronStatus | null;
}

export interface PatronTier {
	id: string;
	title: string;
}

export interface PatronStatus {
	patron: boolean;
	tiers: PatronTier[];
	tier_cents: number;
	start: string;
}
