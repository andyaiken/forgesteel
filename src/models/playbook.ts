import { Encounter } from './encounter';
import { Negotiation } from './negotiation';

export interface Playbook {
	encounters: Encounter[];
	negotiations: Negotiation[]
}

export type PlaybookElementsKey = 'encounters' | 'negotiations';
export type PlaybookElementKind = 'encounter' | 'negotiation';
