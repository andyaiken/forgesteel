import { Adventure } from './adventure';
import { Counter } from './counter';
import { Encounter } from './encounter';
import { Montage } from './montage';
import { Negotiation } from './negotiation';

export interface Playbook {
	adventures: Adventure[];
	encounters: Encounter[];
	negotiations: Negotiation[];
	montages: Montage[];
	counters: Counter[];
}

export type PlaybookElementKind = 'adventure' | 'encounter' | 'negotiation' | 'montage';
