import { Complication } from '../models/complication';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from '../logic/feature-logic';
import { SkillList } from '../enums/skill-list';

export class ComplicationData {
	static cultVictim: Complication = {
		id: 'comp-cult-victim',
		name: 'Cult Victim',
		description: 'Cultists captured you while raiding your home, then began an unholy ritual to turn your body into an undead spirit. The ritual failed, but your body became infused with corrupted magic, turning you partially incorporeal.',
		features: [
			FeatureLogic.feature.createFeature({
				id: 'comp-cult-victim-b',
				name: 'Cult Victim Benefit',
				description: 'Once per turn, you can move through a solid mundane object no more than 1 square thick. If you end your turn inside the object, you take 5 damage and are shunted out into the space where you entered the object.'
			}),
			FeatureLogic.feature.createDamageModifierFeature({
				id: 'comp-cult-victim-d',
				modifiers: [
					{
						damageType: 'Corruption',
						type: DamageModifierType.Weakness,
						value: 5,
						valuePerLevel: 0,
						valuePerEchelon: 0
					}
				]
			})
		]
	};

	static devilDeal: Complication = {
		id: 'comp-devil-deal',
		name: 'Devil Deal',
		description: 'Your ancestors made a deal with an archdevil that has tied you to that fiend’s service. When you first learned of this deal, you were taken to the Seven Cities of Hell, where some of the timescape’s best minds taught you the ways of battle or magic. The archdevil allows you to use these gifts as you will … until they require a favor from you.',
		features: [
			FeatureLogic.feature.createFeature({
				id: 'comp-devil-deal-b',
				name: 'Devil Deal Benefit',
				description: 'Whenever you are present for a battle in which all the creatures on one side are not surprised, your side goes first on a result of 4 or greater on the d10 roll.'
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-devil-deal-d',
				name: 'Devil Deal Drawback',
				description: 'The archdevil occasionally asks you to defeat enemies on their behalf. If you refuse, your fiendish patron sends devils after you and those you care about.'
			})
		]
	};

	static elementalAbsorption: Complication = {
		id: 'comp-elemental-absorption',
		name: 'Elemental Absorption',
		description: 'When an evil mage threatened someone you loved, you blocked your foe’s summoning of an elemental creature by absorbing their magic with your body. You are now infused with the power of that elemental—and they’re not happy about it.',
		features: [
			FeatureLogic.feature.createBonusFeature({
				id: 'comp-elemental-absorption-b',
				name: 'Elemental Absorption Benefit',
				field: FeatureField.Stamina,
				value: 6,
				valuePerLevel: 1
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-elemental-absorption-d',
				name: 'Elemental Absorption Drawback',
				description: 'When you are dying, your possessing elemental takes control of your body. The elemental yearns for destruction, causing you to attack the closest creature they notice without regard for your desires or your body’s safety.'
			})
		]
	};

	static fireAndChaos: Complication = {
		id: 'comp-fire-and-chaos',
		name: 'Fire And Chaos',
		description: 'A great monster who breathed fire burned your home to the ground. While everything around you was consumed, you somehow stood strong amid the inferno, your body adapting to ignore the effects of the flames.',
		features: [
			FeatureLogic.feature.createDamageModifierFeature({
				id: 'comp-fire-and-chaos-b',
				modifiers: [
					{
						damageType: 'Fire',
						type: DamageModifierType.Immunity,
						value: 5,
						valuePerLevel: 0,
						valuePerEchelon: 0
					},
					{
						damageType: 'Cold',
						type: DamageModifierType.Weakness,
						value: 5,
						valuePerLevel: 0,
						valuePerEchelon: 0
					}
				]
			})
		]
	};

	static primordialSickness: Complication = {
		id: 'comp-primordial-sickness',
		name: 'Primordial Sickness',
		description: 'You once contracted a terrible illness for which no one could find a cure. You sought out a primordial swamp said to be either incredibly poisonous or miraculously salubrious. It turned out to be both, keeping your illness at bay while corrupting your body with its unnatural energy.',
		features: [
			FeatureLogic.feature.createDamageModifierFeature({
				id: 'comp-primordial-sickness-b',
				modifiers: [
					{
						damageType: 'Poison',
						type: DamageModifierType.Immunity,
						value: 5,
						valuePerLevel: 0,
						valuePerEchelon: 0
					},
					{
						damageType: 'Corruption',
						type: DamageModifierType.Immunity,
						value: 5,
						valuePerLevel: 0,
						valuePerEchelon: 0
					}
				]
			}),
			FeatureLogic.feature.createBonusFeature({
				id: 'comp-primordial-sickness-d',
				name: 'Primordial Sickness Drawback',
				field: FeatureField.Recoveries,
				value: -1
			})
		]
	};

	static punishmentCurse: Complication = {
		id: 'comp-punishment-curse',
		name: 'Punishment Curse',
		description: 'Through ignorance, fear, spite, or selfishness, you refused to help someone in need. To teach you a lesson, a deity offered you what seemed to be a blessing—extra power to help you heal yourself in times of need, but harsh consequences should your need become excessive. You took the deal, and now benefit from the blessing but also suffer from a curse.',
		features: [
			FeatureLogic.feature.createBonusFeature({
				id: 'comp-punishment-curse-b',
				name: 'Punishment Curse Benefit',
				field: FeatureField.Recoveries,
				value: 2
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-punishment-curse-d',
				name: 'Punishment Curse Drawback',
				description: 'When you are out of Recoveries, you are dying, no matter what your current Stamina is.'
			})
		]
	};

	static shipwrecked: Complication = {
		id: 'comp-shipwrecked',
		name: 'Shipwrecked',
		description: 'You are the sole survivor of a shipwreck that left you stranded on a remote and inhospitable island for years. Your struggle to survive there granted you insight into the natural world but distanced you from who you once were.',
		features: [
			FeatureLogic.feature.createSkillChoiceFeature({
				id: 'comp-shipwrecked-b',
				name: 'Shipwrecked Benefit',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-shipwrecked-d',
				name: 'Shipwrecked Drawback',
				description: 'You have forgotten one language you know.'
			})
		]
	};

	static vividDreams: Complication = {
		id: 'comp-vivid-dreams',
		name: 'Vivid Dreams',
		description: 'You broke a magic amulet that immersed your mind in weird magic. This magic has given you the power of premonition, but you struggle to control this new gift.',
		features: [
			FeatureLogic.feature.createFeature({
				id: 'comp-vivid-dreams-b',
				name: 'Vivid Dreams',
				description: `
Whenever you take a respite, make a Reason power roll.

| Roll    | Effect                                                                                                                                                           |
|:--------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 11 -    | You receive a painful vision that is fractal and inscrutable. When the respite ends, you immediately lose 1 Recovery.                                            |
| 12 - 16 | You experience a vision of an event currently happening in your world. The vision lasts for just a few seconds, but the information you glean is helpful to you. |
| 17 +    | You receive a full minute or more of the scene.                                                                                                                  |`
			})
		]
	};

	static ward: Complication = {
		id: 'comp-ward',
		name: 'Ward',
		description: 'Your childhood sweetheart was royalty, and the two of you stayed close throughout the years. When your former sweetheart died, you swore an oath to dedicate your life to become a tutor for their child, advising them in the ways of being a benevolent monarch.',
		features: [
			FeatureLogic.feature.createFeature({
				id: 'comp-ward-b',
				name: 'Ward Benefit',
				description: 'You know how to talk to monarchs, aristocrats, and other wealthy leaders. When you engage with any such NPC during a negotiation, their patience increases by 1 (to a maximum of 5).'
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-ward-d',
				name: 'Ward Drawback',
				description: 'Your royal ward regularly calls upon you for advice and takes that advice to heart—for better or for worse.'
			})
		]
	};

	static warOfTheGuilds: Complication = {
		id: 'comp-war-of-the-guilds',
		name: 'War Of The Guilds',
		description: 'Being in the wrong place at the wrong time saw you caught in the middle of a conflict between two warring thieves’ guilds. Whether by choice or by accident, you wound up helping one faction at the expense of the other.',
		features: [
			FeatureLogic.feature.createFeature({
				id: 'comp-war-of-the-guilds-b',
				name: 'War Of The Guilds Benefit',
				description: 'Having gained the favor of the faction who you helped, you can call on its members three times for favors. If a favor is reasonable and within the faction’s power to grant, they’ll do it, no questions asked.'
			}),
			FeatureLogic.feature.createFeature({
				id: 'comp-war-of-the-guilds-d',
				name: 'War Of The Guilds Drawback',
				description: 'The faction you wronged hates you, and its members would love to see you pay for your transgression.'
			})
		]
	};
}
