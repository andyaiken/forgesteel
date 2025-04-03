import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const ashenHoarder: MonsterGroup = {
	id: 'monster-group-ashen-hoarder',
	name: 'Ashen Hoarder',
	description: 'Grave robbing is dangerous business, but necromancers need bodies for their experiments. To procure supplies and stay out of danger, these mages build ashen hoarders— hulking constructs made of magically reinforced humanoid bones.',
	information: [
		{
			id: 'ashen-hoarder-info-1',
			name: 'Appendages and Spikes',
			description: `
Ashen hoarders sport four long legs made from compact columns of bone, allowing them to move quickly and avoid creatures who might try to hinder the construct’s grim work. Articulated arms with attached tools and weapons aid the hoarder in digging up corpses and fighting enemies.
  
When an ashen hoarder obtains a corpse, the construct impales it on one of the many sharp bones protruding from their back. These spikes secure the corpses and charge them with necrotic energy, ensuring the cargo is ready for experimentation when it arrives at the necromancer’s door.`
		},
		{
			id: 'ashen-hoarder-info-2',
			name: 'Weaponized Bodies',
			description: 'These automatons are equipped to protect their cargo. If enemies corner an ashen hoarder, the construct can use the energy stored within their corpses to reanimate them as deadly mines, detonating the remains with explosive corruptive energy. Once the threat is dead, the ashen hoarder can retrieve the enemies’ remains and recollect the pieces of their original load. '
		},
		{
			id: 'ashen-hoarder-info-3',
			name: 'Soul Shackle',
			description: 'Ashen hoarders require a vast amount of necromantic energy to create but also to power continuously. Along with an entire ossuary worth of bones to construct its body, powering it requires a soul. The soul is partially bound into an object known as a Soul Shackle, usually a ring or an amulet, and is used to command the construct. It’s an agonizing process for the victim and freeing them is no easy task. Destroying the Soul Shackle is enough to send an ashen hoarder into an indiscriminate unshackled rage, as it can feel part of its soul shredded into oblivion. It will kill any living creature it can before collapsing in on itself. Freeing the soul trapped inside requires a long-term project and the assistance of a powerful holy figure.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-1',
			name: 'Relentless Strikes',
			cost: 3,
			sections: [
				'The ashen hoarder moves up to its speed and makes a free strike against two targets.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-2',
			name: 'Blade Wall',
			cost: 5,
			sections: [
				'The ashen hoarder unearths a 10 wall of bones and blades into unoccupied squares within 5. Each segment of the wall has 5 Stamina. An enemy that enters a square adjacent to a wall segment or starts their turn in one takes 4 damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-3',
			name: 'Bone Storm',
			cost: 7,
			sections: [
				'The ashen hoarder launches several bone lances into the air, raining them down on enemies and impaling those unlucky enough to be on the receiving end. Each enemy within 20 of the ashen hoarder must make an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '14 damage; restrained and bleeding (save ends)',
					tier2: '11 damage; bleeding (EoT)',
					tier3: '6 damage'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'ashen-hoarder-1',
			name: 'Ashen Hoarder',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Construct', 'Undead' ],
			encounterValue: 60,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'burrow'),
			stamina: 350,
			stability: 3,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(4, -2, -2, 0, -5),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'ashen-hoarder-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'ashen-hoarder-feature-2',
					name: 'the ashen hoarder'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-3',
						name: 'Claw and Blade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 damage; one target M<2 bleeding (save ends); other target A<2 grabbed',
							tier2: '15 damage; one target M<3 bleeding (save ends); other target A<3 grabbed',
							tier3: '18 damage; one target M<4 bleeding (save ends); other target A<4 grabbed'
						}),
						effect: 'The ashen hoarder can have up to two Size 1 creatures grabbed at the same time.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-4',
						name: 'Corpse Bomb',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 20 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage; A<2 weakened (save ends)',
							tier2: '8 damage; A<3 weakened (save ends)',
							tier3: '11 damage; A<4 weakened (save ends)'
						}),
						spend: [
							{
								value: 3,
								effect: 'The ashen hoarder targets a second 4 cube within distance.'
							},
							{
								value: 2,
								effect: 'An enemy weakened by a Corpse Bomb is also slowed (save ends).'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-5',
						name: 'Impale',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1, within: 1 }) ],
						target: 'All creatures in the line',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 corruption damage; M<2 impaled (save ends)',
							tier2: '11 corruption damage; M<3 impaled (save ends)',
							tier3: '14 corruption damage; M<4 impaled (save ends)'
						}),
						effect: 'An impaled creature is restrained and bleeding until the condition ends. Each impaled creature moves whenever the ashen hoarder moves. The ashen hoarder can have no more than 3 creatures impaled with this ability at a time.',
						spend: [
							{
								value: 2,
								effect: 'A creature impaled by this ability can be used with the Armor of Corpses ability instead of paying Malice.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-6',
						name: 'Bone Dozer',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The ashen hoarder moves up to twice their speed in a straight line. Each creature and object in the ashen hoarder’s way is either moved into the nearest unoccupied square to the side or M<3 is pushed forward until the end of the ashen hoarder’s movement. A target that is force moved into an obstacle is dazed (save ends).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-7',
						name: 'Armor of Corpses',
						type: FactoryLogic.type.createTrigger('The ashen hoarder takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 2,
						effect: 'The ashen hoarder halves the incoming damage. If an impaled creature was used in place of spending Malice on this ability, the impaled creature takes the other half of the damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ashen-hoarder-feature-8',
					name: 'Unshackled Rage',
					description: 'The ashen hoarder is commanded by whoever holds its Soul Shackle. A Soul Shackle is a size 1T object with 5 Stamina.  If the Soul Shackle is destroyed, the ashen hoarder ﬂies into an unshackled rage. While raging, the ashen hoarder has a double edge on their abilities, damage Immunity 5, ignores all commands, and is hostile to all living creatures within line of eﬀect. At the start of each of their turns, the ashen hoarder takes 10 damage that can’t be reduced.'
				}),
				FactoryLogic.feature.create({
					id: 'ashen-hoarder-feature-9',
					name: 'Bladed Body',
					description: 'Whenever an enemy makes physical contact with the ashen hoarder or uses a melee ability against the ashen hoarder, they take 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'ashen-hoarder-feature-10',
					name: 'Soul Singularity',
					description: 'When the Ashen Hoarder is reduced to 0 Stamina it explodes in a swirling singularity of bone shards and soul energy. Each creature within 5 takes M<3 11 corruption damage. If a creature is killed by this explosion, their soul is sucked into the vortex and is lost somewhere on the plane of the dead. They cannot be resurrected until their soul is recovered.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-11',
						name: 'Skeletal Eruption',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 3, within: 1 }) ],
						target: 'All creatures in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 damage, vertical push 2 staight upward',
							tier2: '11 damage, vertical push 3 staight upward',
							tier3: '14 damage, vertical push 4 staight upward'
						}),
						effect: 'Each target that would normally fall prone is instead restrained (save ends). '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-12',
						name: 'Mobile Mine Field',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 10, within: 20 }) ],
						target: 'Special',
						effect: 'The Ashen Hoarder sprays out a rain of zombie mines brimming with necrotic energy. Six size 1M zombie mines appear in unoccupied squares within distance. An enemy that moves into a square adjacent to a zombie mine or starts their turn there causes the zombie mine to explode, dealing 4 corruption damage to each creature adjacent to the mine. A zombie explosion can trigger other zombie mines adjacent to it to also explode. At the start of each of the ashen hoarders’s turns, each zombie mine can be moved 2 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-13',
						name: 'Ossuary Assault',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The Ashen Hoarder moves up to their speed and makes a Claw and Blade attack with a double edge against a single target. On a tier-3 result, the ashen hoarder then uses Impale without spending malice.'
					})
				})
			]
		})
	],
	addOns: []
};
