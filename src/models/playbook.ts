import { Adventure } from './adventure';
import { Encounter } from './encounter';
import { Montage } from './montage';
import { Negotiation } from './negotiation';

export interface Playbook {
	adventures: Adventure[];
	encounters: Encounter[];
	negotiations: Negotiation[];
	montages: Montage[];
}

export type PlaybookElementKind = 'adventure' | 'encounter' | 'negotiation' | 'montage';
