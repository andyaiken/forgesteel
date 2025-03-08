import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const griffon: MonsterGroup = {
	id: 'monster-group-griffon',
	name: 'Griffon',
	description: 'With the head, front legs, and wings of a bird and the powerful body and haunches of a feline, the griffon hunts anything they desire—even other predators—though they prefer to eat birds, fish, and herd. Griffons sometimes misjudge their prey and attack humanoids passing through their mountain or forest territories. They also fiercely defend themselves against anyone who threatens or gets too close to their nests.',
	information: [
		{
			id: 'griffon-info-1',
			name: 'Coveted Mounts',
			description: `
Attempting to capture a wild griffon typically ends in injury or worse, though humanoids who hatch griffons in captivity and raise them from birth find they make loyal companions. Some humanoid cultures raise griffons as mounts for the military or city guard, and griffon eggs can fetch a fine price.

Daring poachers sometimes attempt to steal griffon eggs from wild aeries, but such thieves typically meet their end by griffon beak or talon. So great is the death toll that many localities have outlawed the poaching of griffon eggs.`
		},
		{
			id: 'griffon-info-2',
			name: 'Inaccessible Aeries',
			description: 'Griffons roost alone or in pairs on craggy mountainsides, in forests, or on cliffs overlooking the ocean. They hide their nests in enormous treetops, scrubby thickets clinging to a cliff, or similarly sheltered nooks that are nearly unreachable for creatures who can’t fly. Each aerie holds up to three eggs during brooding season, which lasts for several months in the early spring. Chicks hatch after forty days of incubation, then they remain in or near the nest as their parents feed the rapidly growing flightless chick. About forty days after hatching, a griffon chick learns to fly—and after that, it’s only a matter of days before they set out from their nest into the wider world, generally making their own nest somewhere nearby.'
		},
		{
			id: 'griffon-info-3',
			name: 'Rare Breeds',
			description: 'Griffons come in many varieties. While the most common griffon is the leonine eagle, others include a falcon-panther variety and a bearded vulture-clouded leopard variety. The latter only feeds on carrion, and experts continue to debate whether they should be considered a true griffon or if they deserve their own categorization. Rumors of a massive condor-tiger griffon have recently sprung up, and whether or not their existence is true, it has opened questions of whether these creatures came about naturally or were fashioned by magic hands. Still, many scholars offer abundant rewards to adventurers who can return with evidence of rare or undiscovered griffon types.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'griffon-malice-1',
				name: 'Swoop',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'The griﬀon ﬂies up to their speed. The griﬃn makes a free strike against each creature that makes an opportunity attack against the griﬀon.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'griffon-malice-2',
			name: 'Piercing Cry',
			cost: 5,
			sections: [
				'A griﬀon acting this turn unleashes a hideous screech at an enemy within 5, forcing the creature to make an **Intuition test**.',
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
			cost: 7,
			sections: [
				'Winds bluster and blow throughout the battle map. Until the end of the encounter, each creature that cannot ﬂy or is not mounted on a ﬂying creature has their stability reduced by 5 and forced movement eﬀects targeting them increase by 5 squares.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'griffon-1',
			name: 'Griffon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Mount),
			keywords: [ 'Beast', 'Griffon' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(9, 'fly'),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, -1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-1',
						name: 'Claw Swipes',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; shift 1',
							tier2: '11 damage; shift 2',
							tier3: '14 damage; shift 3'
						}),
						effect: 'If this ability is used while charging, the griffon grapples one of the targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-2',
						name: 'Crack the Earth',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 8, qualifier: 'while flying' }) ],
						target: 'All enemies',
						preEffect: `
**Special** The griffon must be grabbing a creature or object to use this maneuver.

The griffon flies up to half their speed towards the ground and then sends the creature or object they've grappled hurtling towards the affected area.`,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage; A<1 push 3',
							tier3: '9 damage; A<2 push 4 and prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-1-feature-3',
						name: 'Wing Buffet',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 2, within: 1 }) ],
						target: 'All creatures and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'Push 3; A<0 forced movement is vertical',
							tier2: 'Push 4; A<1 forced movement is vertical',
							tier3: 'Push 5; A<2 forced movement is vertical'
						})
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
						effect: 'The griffon halves the damage, doesn\'t suffer any effect associated with it, and shifts 2 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'griffon-1-feature-5',
					name: 'Beast of Prey',
					description: 'Creatures have a double bane on escaping the griffon\'s grab.'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-1-feature-6',
					name: 'Steady',
					description: 'Creatures have a bane on power rolls that could knock the griffon or their rider prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'griffon-2',
			name: 'Striped Condor Griffon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Beast', 'Griffon' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 100,
			stability: 3,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, -1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-1',
						name: 'Violent Thrashing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; push 1',
							tier2: '11 damage; one target is pushed 2; the other target is vertically pushed 2',
							tier3: '14 damage; one target is pushed 2; the other target is vertically pushed 3'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-2',
						name: 'Bound Ahead',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf('while grounded') ],
						target: 'Self',
						effect: 'The griffon shifts up to their speed in a straight line. Each enemy who comes within 1 of the griffon during the move can choose to either take 5 damage or be knocked prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-3',
						name: 'Wing Buffet',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 3, within: 1 }) ],
						target: 'All creatures and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'Push 2; M<0 forced movement is vertical',
							tier2: 'Push 4; M<1 forced movement is vertical',
							tier3: 'Push 6; M<2 forced movement is vertical'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'griffon-2-feature-4',
						name: 'Circle and Strike',
						type: FactoryLogic.type.createTrigger('The griffon flies above a creature on the ground within 5.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The griffon falls down upon the target, taking no damage from falling. The target takes 3 damage for each square the griffon fell and is A<2 prone or grabbed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-5',
					name: 'Beast of Prey',
					description: 'Creatures have a double bane on escaping the griffon\'s grab.'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-6',
					name: 'Steady',
					description: 'Creatures have a bane on power rolls that could knock the griffon prone.'
				}),
				FactoryLogic.feature.create({
					id: 'griffon-2-feature-7',
					name: 'Banded Predator',
					description: 'The griffon is hidden whenever they have cover or concealment.'
				})
			]
		})
	],
	addOns: []
};
