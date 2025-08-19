import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Characteristic } from '../../enums/characteristic';

export const warDog2nd: MonsterGroup = {
    id: 'monster-group-wardog-2nd',
    name: 'War Dog - 2nd Echelon',
    description: 'War dogs, like any soldiers, are outfitted to carry out warfare with weapons, armor, and no end of ghastly tools. But Ajax’s war dog forces are no ordinary army, and they bear extraordinary equipment.',
    picture: null,
    information: [
        {
			id: 'wardog-2nd-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
        {
            id: 'wardog-2nd-info-1',
            name: 'Shrikeguns',
            description: 'The shrikegun is a new kind of weapon fit for a new kind of soldier. Each shrikegun is a rapid-firing bolt-thrower that replaces the draw of a crossbow with the compact energy of torsion springs. When loosed, a standard shrikegun throws a five-inch, iron-tipped wooden stake hard enough to reliably pierce steel plate at 50 yards. The stabilization grooves cut into the stakes create a shrill whistle when they are fired, leading to many less-disciplined armies breaking upon hearing the “shrike scream” of a loosed volley.'
        },
        {
            id: 'wardog-2nd-info-2',
            name: 'Fuse-Iron',
            description: 'Some war dogs use fuse-iron weapons that emit flames or cause explosions. While the exact properties of fuse-iron depend on its specific alloy and shape, the material is known for turning physical force into heat and light. Special arrangements of fuse-iron utilize crush cavities to create concussive detonations that are incredibly powerful, if not particularly reliable. Fuse-iron is expensive, accident-prone, and almost impossible to work with in large quantities, so that fuse-iron equipment is granted only to war dog specialists.'
        },
        {
            id: 'wardog-2nd-info-3',
            name: 'Houndweapons',
            description: 'Insubordinate war dogs are usually punished with a trip back to the Body Banks, but individuals who need to be made an example of are condemned to an even harsher fate: becoming a houndweapon. These living weapons are horrific blends of flesh, machine, and spirit created as powerful and terribly cruel tools of war. Only the highest-ranking and most capable war dogs can requisition houndweapons, given those living armaments’ power and the time and difficulty involved in making them.'
        },
    ],
    malice: [
        FactoryLogic.feature.createMalice({
			id: 'wardog-2nd-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-2nd-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
                        characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage',
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-2nd-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
        FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-2nd-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
                        characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2',
					}))
				]
			})
		})
    ],
    monsters: [
        FactoryLogic.createMonster({
			id: 'wardog-2nd-1',
			name: 'War Dog Sparkslinger',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Lightning Spread increases by 1 square',
			characteristics: MonsterLogic.createCharacteristics(0, 0, 3, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-1-feature-1',
						name: 'Galvanic Arc',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(7) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 lightning damage',
								tier2: '5 lightning damage; the lightning spreads 1 square',
								tier3: '7 lightning damage; the lightning spreads 2 squares'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The lightning’s spread is the distance it arcs from a target to nearby enemies. Each enemy within that distance takes 2 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the sparkslinger is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-1-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				})
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-2',
			name: 'War Dog Sweeper',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 3, 0, 2, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-3',
			name: 'War Dog Frog',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'Climb, swim'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 0, 2, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-4',
			name: 'War Dog Arachnite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'Climb'),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 2, 2, -1),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-5',
			name: 'War Dog Doomtheif',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 3, 1),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-6',
			name: 'War Dog Equivite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 53,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, 3, -1, -2, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-7',
			name: 'War Dog Hypokrite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 0, 2),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-8',
			name: 'War Dog Mischievite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 2, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-9',
			name: 'War Dog Thanatite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 2, 3, 1),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-10',
			name: 'War Dog Tormentite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 3, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-11',
			name: 'War Dog War Doc',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 3, 2, 0),
			features: [
			]
		}),
        FactoryLogic.createMonster({
			id: 'wardog-2nd-11',
			name: 'War Dog Tetrarch',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 2, 3, 4),
			features: [
			]
		}),
    ],
    addOns: []
}
