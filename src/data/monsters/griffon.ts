import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const griffon: MonsterGroup = {
	id: 'monster-group-griffon',
	name: 'Griffon',
	description: 'With the head, front legs, and wings of a bird and the powerful body and haunches of a feline, griffons are the apex predator’s apex predator. Highly territorial with ranges spanning hundreds of leagues, these air-superiority hunters make quick work of any humanoids foolish enough to stumble into griffon lands.',
	picture: null,
	information: [
		{
			id: 'griffon-info-1',
			name: 'Coveted Mounts',
			description: `
Attempting to capture a wild griffon typically ends in injury or worse, though humanoids who hatch griffons in captivity and raise them from birth find they make loyal companions. Some humanoid cultures raise griffons as mounts for the military or city guard, and griffon eggs can fetch a fine price.

Daring poachers sometimes attempt to steal griffon eggs from wild aeries, but such thieves typically meet their end by beak or talon. So great is the death toll that many localities have outlawed the poaching of griffon eggs.`
		},
		{
			id: 'griffon-info-2',
			name: 'Inaccessible Aeries',
			description: 'Griffons roost alone or in pairs on craggy mountainsides, in forests, or on cliffs overlooking the ocean. They hide their nests in enormous treetops, scrubby thickets clinging to a cliff, or similarly sheltered nooks that are nearly unreachable for creatures who can’t fly. Each aerie holds up to three eggs during brooding season, which lasts for three months starting in the early spring. Chicks hatch after forty days of incubation, then remain in or near the nest as their parents feed them. About forty days after hatching, a griffon chick learns to fly—and after that, it’s only a matter of days before they set out from their nest into the wider world, generally making their own nest somewhere nearby.'
		},
		{
			id: 'griffon-info-3',
			name: 'Rare Breeds',
			description: 'Griffons come in many varieties. While the most common griffon is the leonine eagle, others include a falcon-panther variety, a bearded vulture-clouded leopard variety, and a striped condor griffon that combines the features of condor and tiger. Questions abound as to whether these creatures came about naturally or were fashioned by magic hands, and many scholars offer abundant rewards to adventurers who can bring them evidence of rare or undiscovered griffon types.'
		}
	],
	malice: [
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'griffon-malice-1',
				name: 'Swoop',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('The griffon flies up to their speed, and can make a free strike against each creature who makes an opportunity attack against them during this movement.')
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'griffon-malice-2',
			name: 'Piercing Cry',
			cost: 5,
			icon: StatBlockIcon.AuraBurst,
			sections: [
				'A griffon acting this turn unleashes a hideous screech at one enemy within 5 squares of them, forcing that creature to make an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'Frightened (save ends)',
					tier2: 'Frightened (EoT)',
					tier3: 'no effect'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'griffon-malice-3',
			name: 'Wildwinds',
			cost: 10,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'Winds bluster and blow across the encounter map. Until the end of the encounter, each creature who can’t fly or isn’t mounted on a flying creature takes a −3 penalty to stability, and any forced movement effect targeting such a creature moves them an additional 5 squares.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'griffon-1',
			name: 'Griffon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Beast', 'Griffon' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(9, 'fly'),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-1',
						name: 'Claw Swipes',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage; the griffon can shift 1 square',
									tier2: '10 damage; the griffon can shift 2 square',
									tier3: '13 damage; the griffon can shift 3 square'
								})
							),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge main action, the griffon can grab one of the targets.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-2',
						name: 'Crack the Earth',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 8 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The griffon must be flying and must have a creature or object grabbed.'),
							FactoryLogic.createAbilitySectionText('The griffon flies up to half their speed toward the ground, then sends the creature or object they’ve grabbed hurtling down. The creature or object hits the ground to turn the area into an impact crater, and takes falling damage that can’t be reduced in any way.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '6 damage; A<1 push 3',
									tier3: '9 damage; A<2 push 4; prone'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-3',
						name: 'Wing Buffet',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 2, within: 1 }) ],
						target: 'Each creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** A target object must be size 2 or smaller'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'Push 3; A<0 forced movement is vertical',
									tier2: 'Push 4; A<1 forced movement is vertical',
									tier3: 'Push 5; A<2 forced movement is vertical'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-4',
						name: 'Zephyr Feint',
						type: FactoryLogic.type.createTrigger('The griffon takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The griffon halves the damage, ignores any nondamaging effects associated with it, and shifts up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'griffon-1-feature-5',
					name: 'Beast of Prey',
					description: 'While grabbed by the griffon, a creature has a double bane on the Escape Grab maneuver..'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-1-feature-6',
					name: 'Steady',
					description: 'Any power roll that could knock the griffon or their rider prone takes a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'griffon-2',
			name: 'Striped Condor Griffon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Beast', 'Griffon' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 100,
			stability: 3,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-1',
						name: 'Violent Thrashing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage; push 1',
									tier2: '11 damage; one target is pushed up to 2 squares; the other target is vertical pushed up to 2 squares',
									tier3: '14 damage; one target is pushed up to 2 squares and knocked prone; the other target is vertical pushed up to 3 squares'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-2',
						name: 'Bound Ahead',
						type: FactoryLogic.type.createMain(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('The griffon shifts up to their speed along the ground in a straight line. Each enemy who comes adjacent to the griffon during this shift can choose to either take 5 damage or be knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-3',
						name: 'Power Wing Buffet',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 3, within: 1 }) ],
						target: 'Each creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'Push 2; M<0 forced movement is vertical',
									tier2: 'Push 4; M<1 forced movement is vertical',
									tier3: 'Push 6; M<2 forced movement is vertical'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-4',
						name: 'Circle and Strike',
						type: FactoryLogic.type.createTrigger('The griffon flies directly above a creature within distance.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The griffon dives down onto the target, taking no damage from falling if they reach the ground. The target takes 3 damage for each square the griffon dove, and if they have A<2, they are grabbed or knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-5',
					name: 'Beast of Prey',
					description: 'While grabbed by the griffon, a creature has a double bane on the Escape Grab maneuver.'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-6',
					name: 'Steady',
					description: 'Any power roll that could knock the griffon prone takes a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-7',
					name: 'Banded Predator',
					description: 'The griffon can attempt hide even while observed. Additionally, while no enemy has line of effect to them, the griffon can attempt to hide at the end of their turn.'
				})
			]
		})
	],
	addOns: []
};
