import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';

export class ExplorationPerkData {
	static brawny: Perk = {
		id: 'perk-brawny',
		name: 'Brawny',
		description: 'Whenever you fail a Might test, you can lose Stamina equal to 1d6 + your level to improve the outcome of the test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static camouflageHunter: Perk = {
		id: 'perk-camouflage-hunter',
		name: 'Camouflage Hunter',
		description: 'Whenever you are in wilderness, once you are hidden from a creature, you don’t need cover or concealment to stay hidden from them.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static dangerSense: Perk = {
		id: 'perk-danger-sense',
		name: 'Danger Sense',
		description: 'Whenever you are in a natural environment (but not in a settlement in that environment), you gain an edge on tests made using the Alertness skill, and you can’t be surprised. Additionally, you have a connection to nature that warns you if any natural disaster is imminent within the next 72 hours, though you don’t know exactly what it will entail (an earthquake, a wildfire, and so forth).',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static friendCatapult: Perk = {
		id: 'perk-friend-catapult',
		name: 'Friend Catapult',
		description: 'You hurl your ally through the air.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-friend-catapult-1',
				name: 'Friend Catapult',
				description: 'You hurl your ally through the air.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('You grab a willing adjacent ally or object of your size or smaller, then vertical push that target up to a number of squares equal to twice your Might score. If a creature you push falls as a result of this movement, the effective distance of the fall is reduced by a number of squares equal to twice your Might score. When you use this perk, you can’t use it again until you earn 1 or more Victories.')
				]
			})
		},
		list: PerkList.Exploration
	};

	static iveGotYou: Perk = {
		id: 'perk-ive-got-you',
		name: 'I\'ve Got You',
		description: 'You catch a falling ally at the last possible moment.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-ive-got-you-1',
				name: 'I\'ve Got You',
				description: 'You catch a falling ally at the last possible moment.',
				type: FactoryLogic.type.createTrigger('A willing ally lands on you or adjacent to you when they fall.', { free: true }),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('You catch your ally. Neither of you takes damage from the fall.')
				]
			})
		},
		list: PerkList.Exploration
	};

	static monsterWhisperer: Perk = {
		id: 'perk-monster-whisperer',
		name: 'Monster Whisperer',
		description: 'You can use the Handle Animals skill to interact with nonsapient creatures who are not animals.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static putYourBackIntoIt: Perk = {
		id: 'perk-put-your-back-into-it',
		name: 'Put Your Back Into It',
		description: 'During montage tests, whenever you make a test to assist a test and obtain a tier 1 outcome, the assisted test doesn’t take a bane. Additionally, once per montage test, you can turn an ally’s tier 1 test outcome into a tier 2 outcome.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static teamLeader: Perk = {
		id: 'perk-team-leader',
		name: 'Team Leader',
		description: 'At the start of a group test or montage test, you can spend a hero token. If you do, all participants make tests as if they also had any skill you have from the exploration group.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static teamwork: Perk = {
		id: 'perk-teamwork',
		name: 'Teamwork',
		description: 'When you take your first turn during a montage test, you can both make a test and assist another hero’s test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static woodWise: Perk = {
		id: 'perk-wood-wise',
		name: 'Wood Wise',
		description: 'When you make a test using a skill from the exploration skill group and at least one of the d10s rolled is a 1, you can reroll one d10. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};
}
