import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const manticore: MonsterGroup = {
	id: 'monster-group-manticore',
	name: 'Manticore',
	description: 'A weary traveler hears a clarion call through the forest or friendly voices from a rocky shelter, and their heart leaps at the promise of refuge—only to find themself at the mercy of serrated teeth and poisoned spikes. In a manticore’s territory, people go missing without a trace. These fearsome creatures carve out their hunting grounds in forests near small villages, mountain passes where caravans travel, and other locations with plentiful wildlife. While manticores can subsist on a carnivorous diet of any nearby prey, their choicest meal is humanoid flesh.',
	information: [
		{
			id: 'manticore-info-1',
			name: 'Uncanny Appearances',
			description: 'A manticore has a lion’s body, a dragon’s wings, and a scorpion’s tail barbed with spines, but their most unnerving trait is their humanoid face. Owing to a quirk of magical evolution, manticores develop the features of common ancestries that populate their region of birth. For example, a manticore in an area densely populated by devils inherits fiendish eyes and devilish horns. Manticores are born with an inherent understanding of a regional language, but they can speak only through mimicking that which they’ve heard—a talent manticores use to lure in prey.'
		},
		{
			id: 'manticore-info-2',
			name: 'Heralds of Death',
			description: 'Manticores have a magical howl like a trumpet. This haunting sound not only terrifies creatures, but makes them more susceptible to the manticore’s bite. While on the hunt, manticores often take to the skies, shooting poison-tipped spikes from their tail to weaken their victims before howling and closing in.'
		},
		{
			id: 'manticore-info-3',
			name: 'Ferocious Companions',
			description: 'A manticore who develops a taste for humanoids can rarely be tamed. But a young manticore who has yet to cut their teeth on such flesh can be raised into a fearsome ally. After a trained manticore companion finally tastes delicious humanoid flesh, they typically remain loyal to their caregiver.'
		},
		{
			id: 'manticore-info-4',
			name: 'Manticore Languages',
			description: 'Most manticores can mimic Caelian and one language commonly spoken in the region they dwell in. Outside of a rare few, manticores are not intelligent enough to communicate in full sentences and are too driven by hunger to engage in negotiations.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-1',
			name: 'Uncanny Mimicry',
			cost: 3,
			sections: [
				'The manticore uses their mimicry to unnerve a creature they have line of eﬀect to. The target R<4 has a bane on power rolls made against the manticore (save ends). The potency of this feature decreases by 2 when it’s used against the same target.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-2',
			name: 'Desperate Howl',
			cost: 5,
			sections: [
				'The manticore lets out an unnerving cry. Each enemy within 3 of the manticore makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: 'Frightened (save ends)',
					tier2: 'Frightened (EoT)',
					tier3: 'No effect'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'manticore-malice-3',
			name: 'Barrage of Barbs',
			cost: 7,
			sections: [
				'The manticore sprays needles across the ground within 5 squares of them. Each enemy within 5 squares is A<3 bleeding (save ends). The aﬀected area becomes diﬃcult terrain. An enemy that enters an aﬀected square takes 3 poison damage. If an enemy takes 10 poison damage this way in a single turn, they are weakened until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'manticore-1',
			name: 'Manticore',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.NoRole, MonsterOrganizationType.Solo),
			keywords: [ 'Beast', 'Manticore' ],
			encounterValue: 60,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 350,
			stability: 3,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(4, 3, -0, 0, -1),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'manticore-feature-1',
					name: 'the manticore'
				}),
				FactoryLogic.feature.create({
					id: 'manticore-feature-2',
					name: 'Agile Predator',
					description: 'When the manticore deals damage to a creature, they don’t provoke opportunity attacks from that creature during that turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-3',
						name: 'Carniverous Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage; A<2 bleeding (save ends)',
							tier2: '17 damage; A<3 bleeding (save ends)',
							tier3: '21 damage; A<4 bleeding (save ends)'
						}),
						effect: 'This ability has an edge against frightened targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-4',
						name: 'Tail Spike',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 damage; M<2 3 poison damage',
							tier2: '15 damage; M<3 7 poison damage, weakened (save ends)',
							tier3: '19 damage; M<4 10 poison damage, weakened (save ends)'
						}),
						spend: [
							{
								value: 1,
								effect: 'A target weakened from this ability takes 1d6 poison damage at the start of each of their turns until the condition ends.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-5',
						name: 'Harrying Claws',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Slide 1; A<2 3 damage',
							tier2: 'Slide 2; A<3 5 damage',
							tier3: 'Slide 4; A<4 7 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-6',
						name: 'Reflexive Instinct',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the manticore.'),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'Triggering creature',
						cost: 2,
						effect: 'The manticore shifts up to 5 into the air, then uses their Tail Spike ability against the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-7',
						name: 'Trumpeting Howl',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Frightened (EoT) or I<2 (save ends)',
							tier2: 'Frightened (EoT) or I<3 (save ends)',
							tier3: 'Frightened (save ends); I<4 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-8',
						name: 'Cornered Predator',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The manticore shifts up to their speed, then uses their Tail Spike ability against each enemy within 10 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'manticore-feature-9',
						name: 'Debilitating Poison',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Special',
						effect: 'The manticore sours their own poison with enmity. Until the end of the encounter, the manticore has a double edge on power rolls targeting weakened creatures. A creature weakened by the manticore’s Tail Spike ability has their speed halved and takes an additional 1d3 poison damage at the start of each of their turns until the condition ends.'
					})
				})
			]
		})
	]
};
