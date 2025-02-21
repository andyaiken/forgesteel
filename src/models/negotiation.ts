import { Element } from './element';
import { NegotiationTrait } from '../enums/negotiation-trait';

export interface Negotiation extends Element {
	impression: number;
	interest: number;
	patience: number;
	motivations: { trait: NegotiationTrait, description: string }[];
	pitfalls: { trait: NegotiationTrait, description: string }[];
}

/*
export const banditChief: Negotiation = {
	id: '',
	name: 'Bandit Chief',
	description: `
The bandit chief is a bully and a braggart, and most negotiate using intimidation and bluster before softening.
The bandit chief archetype can be used for any other local big shot, such as the privileged child of a local lord, an arrogant tavern darts champion, or any bully.`,
	impression: 1,
	interest: 0,
	patience: 0,
	motivations: [
		{
			trait: NegotiationTrait.Freedom,
			description: 'No one tells me what to do—not if they want to keep their head on their shoulders. And no one tells my toughs what to do, except ME!'
		},
		{
			trait: NegotiationTrait.Greed,
			description: 'Gold! I love the feel of shining, clinking coins running between my fingers. I never found something to spend it on that I like as much as the gold.'
		},
		{
			trait: NegotiationTrait.Power,
			description: 'I want a stronger hideout, more toughs, and a bigger share of the loot. Get me that, and I’ll do your dirty work for you. You can keep your fancy titles and lands.'
		},
		{
			trait: NegotiationTrait.Revelry,
			description: 'If you don’t get drunk after a raid, then why have a raid?'
		}
	],
	pitfalls: [
		{
			trait: NegotiationTrait.HigherAuthority,
			description: 'By order of the baron? I give the orders around here!'
		},
		{
			trait: NegotiationTrait.Justice,
			description: 'Only the weak whine for justice—the strong make their own rules.'
		},
		{
			trait: NegotiationTrait.Legacy,
			description: 'Listen, I don’t care what happens when I’m gone. I want my toughs shouting my name now, not in a hundred years.'
		},
		{
			trait: NegotiationTrait.Peace,
			description: 'In times of peace, if you pick up a silver coin that’s not yours, the sheriff comes knocking on your door. In war, whole caravans disappear and nobody blinks. Give me war.'
		}
	]
};
*/
