import { Encounter } from './encounter';
import { Montage } from './montage';
import { Negotiation } from './negotiation';

export interface Playbook {
	encounters: Encounter[];
	negotiations: Negotiation[];
	montages: Montage[];
}

export type PlaybookElementKind = 'encounter' | 'negotiation' | 'montage';
