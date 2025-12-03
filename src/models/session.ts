import { Counter } from '@/models/counter';
import { Encounter } from '@/models/encounter';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { TacticalMap } from '@/models/tactical-map';

export interface Session {
	counters: Counter[];
	encounters: Encounter[];
	montages: Montage[];
	negotiations: Negotiation[];
	tacticalMaps: TacticalMap[];
	playerViewID: string | null;
}
