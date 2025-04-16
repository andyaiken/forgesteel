import { Element } from './element';
import { NegotiationTrait } from '../enums/negotiation-trait';

export interface Negotiation extends Element {
	impression: number;
	interest: number;
	patience: number;
	motivations: { trait: NegotiationTrait, description: string }[];
	pitfalls: { trait: NegotiationTrait, description: string }[];
	outcomes: string[];
}
