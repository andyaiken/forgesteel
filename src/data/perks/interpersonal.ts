import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class InterpersonalPerkData {
	static charmingLiar: Perk = {
		id: 'perk-charming-liar',
		name: 'Charming Liar',
		description: `
If you fail a test with the Lie skill, you don’t suffer any consequences associated with the failure. You can’t benefit from this perk again until you gain at least 1 Victory.

During a negotiation, you can be caught in one lie without negative consequences. You can’t benefit from this perk again until you gain at least 1 Victory.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static cunningPlan: Perk = {
		id: 'perk-cunning-plan',
		name: 'Cunning Plan',
		description: 'When you have at least 10 minutes to plan before going into a negotiation, you can declare a goal and offer up at least one piece of information you have about that NPC that will enable you to achieve that goal. If this intel is accurate and meaningful, you gain 1 Hero token which can be used to achieve that goal. If you have additional information, or your information is particularly extensive, you can gain a second Hero token at the Director’s discretion.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static dazzler: Perk = {
		id: 'perk-dazzler',
		name: 'Dazzler',
		description: 'When a creature watches you perform a song, dance, or role (as an actor, not in disguise) for at least 1 minute, you gain an edge on tests made to influence that creature for 1 hour after the performance ends.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static engrossingMonologue: Perk = {
		id: 'perk-engrossing-monologue',
		name: 'Engrossing Monologue',
		description: 'When you are not in combat, you can shout to get the attention of all creatures within 10 squares of you. Each creature who is not hostile toward you listens to what you have to say for at least the next minute, or until they sense danger or any form of imminent harm. While creatures are listening to you, your allies gain an edge on tests made to avoid being noticed by those creatures.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static fastNegotiator: Perk = {
		id: 'perk-fast-negotiator',
		name: 'Fast Negotiator',
		description: 'At the start of a negotiation, you can learn one negotiation motivation or pitfall (your choice) of an NPC in the negotiation.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static harmonizer: Perk = {
		id: 'perk-harmonizer',
		name: 'Harmonizer',
		description: `
For you, music is a universal language.

* You can make a Presence test with the music skill to influence creatures even if you don’t share a language.
* Once during a negotiation when an ally makes an argument, you can play music to give them an edge on their test.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static lieDetector: Perk = {
		id: 'perk-lie-detector',
		name: 'Lie Detector',
		description: 'After another creature communicates with you, you can spend a hero token to determine whether what that creature communicated had any lies. If so, you know what the lies are, but not what the truth is.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static openBook: Perk = {
		id: 'perk-open-book',
		name: 'Open Book',
		description: 'When you have a chance to speak one-on-one with someone, you can ask them one question about themself. If they choose to answer honestly, they can immediately ask you a question about yourself in turn, which you must answer honestly. If they choose not to answer honestly, they simply deflect or redirect the question, no further complications result from the prying.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static pardonMyFriend: Perk = {
		id: 'perk-pardon-my-friend',
		name: 'Pardon My Friend',
		description: 'When an ally within 5 squares of you fails a Presence test, you can step in and make a Presence test with a bane. Your new roll replaces their roll. This feature can only be used once per test, regardless of how many heroes have it.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static persistent: Perk = {
		id: 'perk-persistent',
		name: 'Persistent',
		description: 'In a negotiation, when a creature’s patience reaches 0, you can make one last argument before the negotiation is over. Only one hero can use this perk per negotiation.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static powerPlayer: Perk = {
		id: 'perk-power-player',
		name: 'Power Player',
		description: 'When you make a test that uses the Brag, Flirt, or Intimidate skills, you can use Might in place of another characteristic used as part of the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static soTellMe: Perk = {
		id: 'perk-so-tell-me',
		name: 'So, Tell Me ...',
		description: 'When you succeed on a Presence test to influence another creature, you can ask one creature you influenced a follow-up question after the test resolves, which they must answer honestly. At the Director’s discretion, the creature doesn’t have to answer the question completely or at all if the response would put them or a loved one in danger.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static spotTheTell: Perk = {
		id: 'perk-spot-the-tell',
		name: 'Spot The Tell',
		description: 'When you make a test to read a person and get a tier 3 result, you notice several tells that give away their true feelings. Any test you make to read that person in the future, you gain an edge on the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};
}
