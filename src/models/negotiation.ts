import { Element } from './element';
import { NegotiationTrait } from '../enums/negotiation-trait';

export interface Negotiation extends Element {
	interest: number;
	patience: number;
	motivations: NegotiationTrait[];
	pitfalls: NegotiationTrait[];
}
