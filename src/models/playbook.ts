import { Encounter } from './encounter';
import { Negotiation } from './negotiation';

export interface Playbook {
	encounters: Encounter[];
	negotiations: Negotiation[]
}

export type PlaybookElementKind = 'encounter' | 'negotiation';
