import { Adventure } from '@/models/adventure';
import { Counter } from '@/models/counter';
import { Encounter } from '@/models/encounter';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { TacticalMap } from '@/models/tactical-map';

export interface Playbook {
	adventures: Adventure[];
	encounters: Encounter[];
	negotiations: Negotiation[];
	montages: Montage[];
	tacticalMaps: TacticalMap[];
	counters: Counter[];
	playerViewID: string | null;
}

export type PlaybookElementKind = 'adventure' | 'encounter' | 'negotiation' | 'montage' | 'tactical-map';
