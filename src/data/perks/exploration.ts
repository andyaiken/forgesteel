import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class ExplorationPerkData {
	static brawny: Perk = {
		id: 'perk-brawny',
		name: 'Brawny',
		description: 'When you fail a Might test, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static camouflageHunter: Perk = {
		id: 'perk-camouflage-hunter',
		name: 'Camouflage Hunter',
		description: 'While in the wilderness, once you are hidden from a creature, you don’t need cover or concealment from them to stay hidden.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static dangerSense: Perk = {
		id: 'perk-danger-sense',
		name: 'Danger Sense',
		description: 'When in a natural environment that isn’t in a settlement, you have an edge on all tests made with the Alertness skill, and you cannot be surprised. Additionally, you’re attuned to the instincts of wildlife and know if a natural disaster is imminent within the next 72 hours. You don’t know exactly what it will entail.',
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
					FactoryLogic.createAbilitySectionText('You grab a willing, adjacent ally or object of your size or smaller and hurl them a number of squares equal to twice your Might score in any direction. If they fall as a result of this movement, their fall distance is reduced by a number equal to twice your Might score. You can\'t use this perk again until you gain at least 1 Victory.')
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
				type: FactoryLogic.type.createTrigger('A willing ally lands on you when they fall.'),
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
		description: 'You can use the Handle Animals skill to interact with non-sapient monsters who are not animals.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static putYourBackIntoIt: Perk = {
		id: 'perk-put-your-back-into-it',
		name: 'Put Your Back Into It',
		description: 'Once per montage test, you can turn an ally’s tier 1 test result into a tier 2 result. Additionally, if you make a test to assist a test and a get a tier 1 result, you don’t add a bane to the assisted test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static survivalist: Perk = {
		id: 'perk-survivalist',
		name: 'Survivalist',
		description: 'While in the wilderness, you can spend 1 hour searching a 1-mile-radius area of land and find a safe location suitable for a respite (if one exists).',
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

	static teamLeader: Perk = {
		id: 'perk-team-leader',
		name: 'Team Leader',
		description: 'At the start of a group test or montage test, you can spend a hero token. If you do, all participants make tests as if they also had your exploration skills.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static woodWise: Perk = {
		id: 'perk-wood-wise',
		name: 'Wood Wise',
		description: 'When you make a test with an exploration skill and at least one of the d10s rolled is a 1, you can reroll one d10. You can only use this perk once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};
}
