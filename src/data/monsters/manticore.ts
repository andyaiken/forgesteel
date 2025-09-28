import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const manticore: MonsterGroup = {
	id: 'monster-group-manticore',
	name: 'Manticore',
	description: 'A weary traveler hears a call through the forest or friendly voices from a rocky shelter, and their heart leaps at the promise of refuge—only to find themself at the mercy of serrated teeth and poisonous spikes. In a manticore’s territory, people go missing without a trace. These fearsome creatures carve out their hunting grounds in forests near small villages, mountain passes where caravans travel, and other locations with plentiful wildlife. Though manticores can subsist on a carnivorous diet of any nearby prey, their choicest meal is humanoid flesh.',
	picture: null,
	information: [
		{
			id: 'manticore-info-1',
			name: 'Uncanny Appearances',
			description: 'A manticore has a lion’s body, a dragon’s wings, and a scorpion’s tail barbed with spines, but their most unnerving trait is their humanoid face. Owing to a quirk of magical evolution, manticores develop the features of common ancestries that populate their region of birth. For example, a manticore in an area densely populated by devils inherits fiendish eyes and devilish horns. Manticores are born with an inherent understanding of a regional language, but they can speak only through mimicking that which they’ve heard—a talent manticores use to lure in prey.'
		},
		{
			id: 'manticore-info-2',
			name: 'Heralds of Death',
			description: 'Manticores have a magical howl like a trumpet blast. This haunting sound unnerves and terrifies creatures, making them more susceptible to the manticore’s bite. While on the hunt, manticores often take to the skies, shooting poison-tipped spikes from their tail to weaken their victims before howling and closing in.'
		},
		{
			id: 'manticore-info-3',
			name: 'Ferocious Companions',
			description: 'A manticore who develops a taste for humanoids can rarely be tamed. But a young manticore who has yet to cut their teeth on such flesh can be raised into a fearsome ally. Even after a trained manticore companion finally tastes delicious humanoid flesh, they typically remain loyal to their caregiver.'
		},
		{
			id: 'manticore-info-4',
			name: 'Manticore Languages',
			description: 'Most manticores can mimic Caelian and one language commonly spoken in the region where they dwell. Except in rare cases, manticores don’t communicate in full sentences and are too driven by hunger to engage in negotiation.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-1',
			name: 'Uncanny Mimicry',
			cost: 3,
			sections: [
				'The manticore uses their mimicry in an attempt to unnerve one creature within their line of effect. If the target has R<4, they take a bane on power rolls against the manticore (save ends). Each time this feature is used against the same target during the encounter, its potency decreases by 2.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-2',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The manticore takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-3',
			name: 'Desperate Howl',
			cost: 5,
			sections: [
				'The manticore lets out an unnerving cry. Each enemy within the manticore’s line of effect makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'Frightened (save ends)',
					tier2: 'Frightened (EoT)',
					tier3: 'No effect'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-4',
			name: 'Barrage of Barbs',
			cost: 7,
			sections: [
				'The manticore sprays tail spikes across the ground within 5 squares of them. Each enemy in that area who has A<3 is bleeding (save ends). Additionally, the area is difficult terrain, and any enemy takes 3 poison damage for each square of the area they enter. An enemy who takes 9 poison damage this way on one turn is weakened until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'manticore-1',
			name: 'Manticore',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Beast', 'Manticore' ],
			encounterValue: 72,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 350,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(4, 3, -0, 0, -1),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'manticore-feature-1',
					name: 'the manticore',
					endEffect: 10
				}),
				FactoryLogic.feature.create({
					id: 'manticore-feature-2',
					name: 'Agile Predator',
					description: 'Whenever the manticore deals damage to a creature, they don’t provoke opportunity attacks from that creature during that turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-3',
						name: 'Carniverous Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; A<2 bleeding (save ends)',
								tier2: '17 damage; A<3 bleeding (save ends)',
								tier3: '21 damage; A<4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the target is frightened, this ability gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-4',
						name: 'Tail Spike',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage; M<2 4 poison damage',
								tier2: '11 damage; M<3 4 poison damage, weakened (save ends)',
								tier3: '14 damage; M<4 8 poison damage, weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'While weakened this way, a target takes 1d6 poison damage at the start of each of their turns.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-5',
						name: 'Harrying Claws',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Slide 1; A<2 3 damage',
								tier2: 'Slide 2; A<3 5 damage',
								tier3: 'Slide 4; A<4 7 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-6',
						name: 'Reflexive Instinct',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the manticore.'),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('The manticore shifts up to 5 squares into the air, then can use Tail Spike against the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-7',
						name: 'Trumpeting Howl',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Frightened (EoT); if the target has I<2 they are instead frightened (save ends)',
								tier2: 'Frightened (EoT); if the target has I<3 they are instead frightened (save ends)',
								tier3: 'Frightened (EoT); if the target has I<4 they are instead dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-8',
						name: 'Cornered Predator',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The manticore shifts up to their speed, then can use Tail Spike against each enemy within distance of that ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-9',
						name: 'Debilitating Poison',
						type: FactoryLogic.type.createVillainAction(3),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The manticore sours their poison with enmity. Until the end of the encounter, the manticore has a double edge on power rolls against weakened creatures. Additionally, any creature weakened by the manticore’s Tail Spike ability has their speed halved and takes an extra 3 poison damage at the start of each of their turns.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
