import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const hag: MonsterGroup = {
	id: 'monster-group-hag',
	name: 'Hag of the Green and Rot',
	description: 'When fear of death or hunger for power grips a mortal spellcaster, often a druid or a witch, they might forge a pact with an evil archfey. The mortal becomes a hag—aged, clawed, and cruel—another ruthlessly powerful fey in their own right. In exchange, hags use their magic to bring about the misery that their archfey wills.',
	information: [
		{
			id: 'hag-info-1',
			name: 'Hiding in Plain Sight',
			description: 'Though hags typically appear as older humanoid women, their true form is as vicious and nasty as their nature. They prefer to show the world a charitable face, but the general wisdom concerning hags is that the more beautiful their appearance, the deeper the rot within. However, this theory has never been confirmed, as few who see a hag’s true form live to tell the tale.'
		},
		{
			id: 'hag-info-2',
			name: 'Dealmakers and Heart-Breakers',
			description: `
As old age can’t kill them, the oldest hags accumulate swathes of knowledge, magic, and repute over time. They are happy to share their wares … for the right price. Rather than ask for paltry coin, a hag usually bargains for something dear to the customer—perhaps their ability to love, the sound of their child’s laugh, or their left pinky toe.

Adding insult to injury, those who deal with hags almost always discover the product is worse than advertised. Mortals should pay close attention to the precise wording of their agreements, lest they end up with a hex they thought would be a gift. Such curses often lead to the corruption of good but desperate folk, and some get so twisted up in fey deals that they become hags themselves.`
		},
		{
			id: 'hag-info-3',
			name: 'What\'s in a Name?',
			description: 'Hags give themselves whimsical names, and older hags often select monikers like Auntie, Granny, or Nanny. Such relatable names help entice their favorite prey: the innocent. Who would fear Granny Gumdrops or Auntie Twothumbs?'
		},
		{
			id: 'hag-info-4',
			name: 'Loyal Underlings',
			description: 'Hags are treacherous by nature, and they only recruit creatures they trust to be loyal underlings. Most of these creatures lack sapience (such as animals, constructs, and undead), though hags sometimes command weaker fey who are too scared to betray them.'
		},
		{
			id: 'hag-info-5',
			name: 'Hag Languages',
			description: 'Most hags speak Caelian, Anjali, Khelt, and Yllyric, but often go on to learn several more.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'hag-malice-1',
			name: 'Cage of Thorns',
			cost: 3,
			sections: [
				'The hag utters terrible words that push each enemy within 2 squares of her up to 3 squares.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'hag-malice-2',
				name: 'Hag Wyrd',
				type: FactoryLogic.type.createAction(),
				cost: 5,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
				target: 'All enemies in the line',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 3,
					tier1: '5 fire damage; R<1 frightened (save ends)',
					tier2: '8 fire damage; R<2 frightened (save ends)',
					tier3: '11 fire damage; R<3 frightened (save ends)'
				}),
				effect: 'After rolling power, the hag can choose to replace the damage type and eﬀect of the attack with lightning and dazed or cold and slowed.'
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'hag-malice-3',
				name: 'House Call',
				description: `
The hag’s hut springs to life. It enters the encounter map within 10 of the hag if it isn’t already there and takes its turn. The hut is Size-4, has 75 Stamina and damage immunity 3, a speed of 8, and a set of powerful animal legs. This feature can’t be used if the hut is reduced to 0 Stamina. The house can only take the following action.

**KICK**`,
				type: FactoryLogic.type.createAction(),
				cost: 7,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 2 }) ],
				target: 'All enemies in the line',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 3,
					tier1: '6 damage; push 3; M<1 prone',
					tier2: '10 damage; push 4; M<2 prone',
					tier3: '13 damage; push 5; M<3 prone'
				})
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'hag-1',
			name: 'Hag of the Green and Rot',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Fey', 'Hag' ],
			encounterValue: 50,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 300,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 1, 3, 3),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'hag-feature-1',
					name: 'the hag'
				}),
				FactoryLogic.feature.create({
					id: 'hag-feature-2',
					name: 'Supernatural Resistance',
					description: 'Magic and Psionic abilities used against the hag have a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-3',
						name: 'Corrosive Claws',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 corruption damage; A<1 weakened (save ends)',
							tier2: '13 corruption damage; A<2 weakened (save ends)',
							tier3: '16 corruption damage; A<3 weakened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-4',
						name: 'Soul Steal',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 1 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 corruption damage; P<1 4 corruption damage',
							tier2: '8 corruption damage; P<2 5 corruption damage',
							tier3: '10 corruption damage; P<3 6 corruption damage'
						}),
						effect: 'This ability has an edge against creatures with a soul.',
						spend: [
							{
								value: 3,
								effect: 'The hag regains Stamina equal to half the damage dealt.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-5',
						name: 'Shapeshifter',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The hag alters their body to become any Size-1 creature, such as a house cat. If the hag uses this ability while outside of an enemy’s line of eﬀect, the hag is considered hidden. The hag can return to their original form as a free maneuver.',
						spend: [
							{ value: 5, effect: 'The hag becomes a Size-2 creature instead, such as a bear. While in this form, the distance of their melee abilities increases by 1 and deal an additional 4 damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-6',
						name: 'Turned Upside Down',
						type: FactoryLogic.type.createTrigger('A creature hits the hag with a melee strike.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in burst',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'Slide 2; R<1 slide is vertical',
							tier2: 'Slide 3; R<2 slide is vertical, restrained (EoT)',
							tier3: 'Vertical slide 5; R<3 restrained (EoT)'
						}),
						effect: 'A creature restrained by this ability that is force moved vertically is suspended in midair until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-7',
						name: 'Snackies for Sweeties',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All creatures',
						preEffect: 'The hag A<2 attaches an ornate explosive pastry to each target. Roll power at the end of the round, targeting each creature with a pastry attached to them.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 poison damage',
							tier2: '10 poison damage',
							tier3: '13 poison damage'
						}),
						effect: '**Special** A creature wearing a pastry or adjacent to a creature wearing a pastry can attempt a hard Agility test to remove the pastry as a maneuver. On success, the pastry is destroyed without exploding. On failure, the hag rolls power for all pastries immediately.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-8',
						name: 'Animal Alacrity',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in burst',
						effect: 'The hag shifts up to their speed before using this action, uses Corrosive Claws against each target of this ability, pushes each target 2 squares, then shifts up to their speed again.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hag-feature-9',
						name: 'Open the Oven',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 1 }) ],
						target: 'All creatures in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 fire damage; A<1 weakened (save ends)',
							tier2: '10 fire damage; A<2 weakened (save ends)',
							tier3: '13 fire damage; A<3 weakened (save ends)'
						}),
						effect: 'The hag turns the affected area into a roiling oven. The hag deals an additional 5 damage on abilities that target creatures in the affected area.'
					})
				})
			]
		})
	],
	addOns: []
};
