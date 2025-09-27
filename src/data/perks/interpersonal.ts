import { FeatureType } from '@/enums/feature-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';

export class InterpersonalPerkData {
	static charmingLiar: Perk = {
		id: 'perk-charming-liar',
		name: 'Charming Liar',
		description: 'If you fail a test using the Lie skill, you don’t suffer any consequences associated with the failure. Additionally, during a negotiation, you can be caught in one lie without negative consequences. When you use either benefit of this perk, you can’t use this perk again until you earn 1 or more Victories.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static dazzler: Perk = {
		id: 'perk-dazzler',
		name: 'Dazzler',
		description: 'Whenever a creature watches you sing, dance, or perform a role (as an actor, not just in disguise) for 1 uninterrupted minute or more, you gain an edge on any test made to influence that creature for 1 hour after the performance ends.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static engrossingMonologue: Perk = {
		id: 'perk-engrossing-monologue',
		name: 'Engrossing Monologue',
		description: 'Whenever you are not in combat, you can shout to get the attention of hearing creatures within 10 squares of you. Each such creature who is not hostile toward you listens to what you have to say for 1 uninterrupted minute or more, or until they sense danger or any form of imminent harm. While creatures are listening to you, each of your allies gains an edge on tests made to avoid being noticed by those creatures.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static harmonizer: Perk = {
		id: 'perk-harmonizer',
		name: 'Harmonizer',
		description: 'You can make a Presence test using the Music skill to influence creatures who don’t have emotions or can’t understand you. Additionally, once during a negotiation when an ally makes an argument, you can play music to give that ally an edge on their test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static lieDetector: Perk = {
		id: 'perk-lie-detector',
		name: 'Lie Detector',
		description: 'In response to another creature communicating information to you, you can spend a hero token to determine whether that information contained any knowing lies. If so, you know what the lies are, but not what the truth is.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static openBook: Perk = {
		id: 'perk-open-book',
		name: 'Open Book',
		description: 'Whenever you speak one-on-one with a creature, you can ask them one question about themself that might typically offend them or raise suspicion. If they choose not to answer honestly, they simply deflect or redirect the question, with no further complications. If they choose to answer honestly, the creature can immediately ask you a question about yourself in turn, which you must answer honestly.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static pardonMyFriend: Perk = {
		id: 'perk-pardon-my-friend',
		name: 'Pardon My Friend',
		description: 'When an ally within 5 squares fails a Presence test, you can step in and make a Presence test that takes a bane, with your roll replacing the ally’s roll. This perk can be used only once per test, even if more than one character has it.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static powerPlayer: Perk = {
		id: 'perk-power-player',
		name: 'Power Player',
		description: 'Whenever you make a test that uses the Brag, Flirt, or Intimidate skills, you can use Might instead of any other characteristic the test calls for.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static soTellMe: Perk = {
		id: 'perk-so-tell-me',
		name: 'So, Tell Me ...',
		description: 'Whenever you succeed on a Presence test to influence one or more creatures, you can ask one creature you influenced a follow-up question after the test resolves, which they must answer honestly. At the Director’s discretion, the creature doesn’t have to answer the question completely—or at all—if the response would put them or a loved one in danger.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static spotTheTell: Perk = {
		id: 'perk-spot-the-tell',
		name: 'Spot The Tell',
		description: 'Whenever you make a test to read a person and obtain a tier 3 outcome, you notice several tells that give away their true feelings. Any test you make to read that person in the future gains an edge.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};
}
