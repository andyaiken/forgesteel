import { Complication } from '../models/complication';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureField } from '../enums/feature-field';
import { SkillList } from '../enums/skill-list';

export class ComplicationData {
	static cultVictim: Complication = {
		id: 'comp-cult-victim',
		name: 'Cult Victim',
		description: 'Cultists captured you while raiding your home, then began an unholy ritual to turn your body into an undead spirit. The ritual failed, but your body became infused with corrupted magic, turning you partially incorporeal.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-cult-victim-b',
				name: 'Cult Victim Benefit',
				description: 'Once per turn, you can move through a solid mundane object no more than 1 square thick. If you end your turn inside the object, you take 5 damage and are shunted out into the space where you entered the object.'
			}),
			FactoryLogic.feature.createDamageModifierFeature({
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

	static elementalInside: Complication = {
		id: 'comp-elemental-inside',
		name: 'Elemental Inside',
		description: 'When an evil mage threatened someone you loved, you blocked your foe’s summoning of an elemental creature by absorbing their magic with your body. You are now infused with the power of that elemental—and they’re not happy about it.',
		features: [
			FactoryLogic.feature.createBonusFeature({
				id: 'comp-elemental-inside-b',
				name: 'Elemental Inside Benefit',
				field: FeatureField.Stamina,
				valuePerEchelon: 3
			}),
			FactoryLogic.feature.create({
				id: 'comp-elemental-inside-d',
				name: 'Elemental Inside Drawback',
				description: 'When you are dying, your possessing elemental takes control of your body. The elemental yearns for destruction, causing you to attack the closest creature they notice without regard for your desires or your body’s safety. The Director or you can control the hero, but whoever does must do their best to kill any creature they notice until you are no longer dying.'
			})
		]
	};

	static fireAndChaos: Complication = {
		id: 'comp-fire-and-chaos',
		name: 'Fire And Chaos',
		description: 'A great monster who breathed fire burned your home to the ground. While everything around you was consumed, you somehow stood strong amid the inferno, your body adapting to ignore the effects of the flames.',
		features: [
			FactoryLogic.feature.createDamageModifierFeature({
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
			FactoryLogic.feature.createDamageModifierFeature({
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
			FactoryLogic.feature.createBonusFeature({
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
			FactoryLogic.feature.createBonusFeature({
				id: 'comp-punishment-curse-b',
				name: 'Punishment Curse Benefit',
				field: FeatureField.Recoveries,
				value: 1
			}),
			FactoryLogic.feature.create({
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
			FactoryLogic.feature.createSkillChoiceFeature({
				id: 'comp-shipwrecked-b',
				name: 'Shipwrecked Benefit',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.create({
				id: 'comp-shipwrecked-d',
				name: 'Shipwrecked Drawback',
				description: 'You have forgotten one language you know.'
			})
		]
	};

	static wakingDreams: Complication = {
		id: 'comp-waking-dreams',
		name: 'Waking Dreams',
		description: 'You broke a magic amulet that immersed your mind in weird magic. This magic has given you the power of premonition, but you struggle to control this new gift.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-waking-dreams-bd',
				name: 'Waking Dreams',
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

	static warOfAssassins: Complication = {
		id: 'comp-war-of-assassins',
		name: 'War Of Assassins',
		description: 'Being in the wrong place at the wrong time saw you caught in the middle of a conflict between two warring thieves’ guilds. Whether by choice or by accident, you wound up helping one faction at the expense of the other.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-war-of-assassins-b',
				name: 'War Of Assassins Benefit',
				description: 'Having gained the favor of the faction who you helped, you can call on its members three times for favors. If a favor is reasonable and within the faction’s power to grant, they’ll do it, no questions asked.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-war-of-assassins-d',
				name: 'War Of Assassins Drawback',
				description: 'The faction you wronged hates you, and its members would love to see you pay for your transgression.'
			})
		]
	};

	static ward: Complication = {
		id: 'comp-ward',
		name: 'Ward',
		description: 'Your childhood sweetheart was royalty, and the two of you stayed close throughout the years. When your former sweetheart died, you swore an oath to dedicate your life to become a tutor for their child, advising them in the ways of being a benevolent monarch.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-ward-b',
				name: 'Ward Benefit',
				description: 'You know how to talk to monarchs, aristocrats, and other wealthy leaders. When you engage with any such NPC during a negotiation, their patience increases by 1 (to a maximum of 5).'
			}),
			FactoryLogic.feature.create({
				id: 'comp-ward-d',
				name: 'Ward Drawback',
				description: 'Your royal ward can be a burden. When you start a respite, roll a d10. On a roll of 1, your ward contacts you and requires your help during the respite, requiring you to spend your time helping them instead of taking a respite activity.'
			})
		]
	};
}
