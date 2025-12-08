export interface PatreonSession {
	authenticated: boolean;
	connections: PatreonConnection[];
}

export interface PatreonConnection {
	name: string;
	status: PatronStatus | null;
}

export interface PatronStatus {
	patron: boolean;
	tier_cents: number;
	start: string;
}
