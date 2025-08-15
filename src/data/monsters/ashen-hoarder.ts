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
	description: 'Grave robbing is a dangerous business, but necromancers need bodies for their experiments. To procure supplies and stay out of danger, these mages build ashen hoarders—hulking constructs made of magically reinforced humanoid bones.',
	picture: null,
	information: [
		{
			id: 'ashen-hoarder-info-1',
			name: 'Appendages and Spikes',
			description: `Ashen hoarders sport four long legs made from compact columns of bone, allowing them to move quickly and avoid creatures who might try to hinder the construct’s grim work. Powerful clawed arms aid the hoarder in digging up corpses and fighting enemies.

When an ashen hoarder obtains corpses, they impale them on the many sharp bones protruding from their back. These spikes secure the corpses and charge them with corruptive energy, ensuring the cargo is ready for experimentation when it arrives at the necromancer’s door.`
		},
		{
			id: 'ashen-hoarder-info-2',
			name: 'Weaponized Bodies',
			description: 'These automatons are equipped to protect their cargo. If enemies corner an ashen hoarder, the construct can use the energy stored within their corpses to reanimate them as deadly mines, detonating the remains with explosive corruptive energy. Once the threat is dead, the ashen hoarder can retrieve the enemies’ remains and recollect the pieces of their original load.'
		},
		{
			id: 'ashen-hoarder-info-3',
			name: 'Soul Shackle',
			description: 'Creating and powering an ashen hoarder requires a vast amount of necromantic energy. Along with an entire ossuary worth of bones to construct its body, powering the construct requires a soul. That soul is divided between the hoarder and an object known as a Soul Shackle—usually a ring or an amulet—that is used to command the construct. Destroying the Soul Shackle can free the trapped soul, but doing so sends an ashen hoarder into an indiscriminate unshackled rage as they feel part of their stolen soul shredded into oblivion. The construct lashes out against any living creature they can before collapsing in on themself. Freeing the soul still trapped inside the ashen hoarder’s remains requires completing the Find a Cure downtime project in Draw Steel: Heroes and the assistance of a powerful holy figure.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-1',
			name: 'Relentless Strikes',
			cost: 3,
			sections: [
				'The ashen hoarder moves up to their speed and can make a free strike against two targets.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-2',
			name: 'Blade Wall',
			cost: 5,
			sections: [
				'The ashen hoarder summons a 10 wall of bones and blades into unoccupied squares within 5 squares of them. Each square of the wall has 5 Stamina. An enemy who comes adjacent to the wall for the first time in a round or starts their turn there takes 3 damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The ashen hoarder takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ashen-hoarder-malice-4',
			name: 'Bone Storm',
			cost: 7,
			sections: [
				'The ashen hoarder launches bone lances into the air, raining them down on enemies and impaling those unlucky enough to be on the receiving end. Each enemy within 20 squares of the ashen hoarder makes an **Agility test**.',
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
			encounterValue: 72,
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '10 damage; if one target has M < 2 they are bleeding (save ends); if the other target has A < 2 they are grabbed',
								tier2: '15 damage; if one target has M < 3 they are bleeding (save ends); if the other target has A < 3 they are grabbed',
								tier3: '18 damage; M < 4 bleeding (save ends); A < 2 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The ashen hoarder can have up to two size 1 creatures grabbed at a time.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-4',
						name: 'Corpse Bomb',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 20 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage; A < 2 weakened (save ends)',
								tier2: '8 damage; A < 3 weakened (save ends)',
								tier3: '11 damage; A < 4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Any enemy weakened this way is instead slowed and weakened (save ends).'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The ashen hoarder targets a second 4 cube within distance.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-5',
						name: 'Impale',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 corruption damage; M < 2 the target is impaled (save ends)',
								tier2: '11 corruption damage; M < 3 the target is impaled (save ends)',
								tier3: '14 corruption damage; M < 4 the target is impaled (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** An impaled creature is restrained and bleeding, and moves with the ashen hoarder. The ashen hoarder can have three creatures impaled with this ability at a time.'),
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
						sections: [
							FactoryLogic.createAbilitySectionText('Effect: The ashen hoarder moves up to twice their speed in a straight line. Each creature or object in the path of this movement is either pushed into the nearest unoccupied space outside the path, or if they have <code>M < 3</code> is pushed forward until the movement ends. Any creature who is force moved forward into an obstacle is dazed (save ends).')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The ashen hoarder halves the damage. If the ashen hoarder has one or more creatures impaled, the Malice cost of this feature is reduced by 1 and one impaled creature takes the other half of the damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ashen-hoarder-feature-8',
					name: 'Bladed Body',
					description: 'An adjacent enemy who grabs the ashen hoarder or uses a melee ability against them takes 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'ashen-hoarder-feature-9',
					name: 'Soul Singularity',
					description: 'When the ashen hoarder is reduced to 0 Stamina, they explode in a swirling singularity of bone shards and soul energy. Each creature within 5 squares of the ashen hoarder who has <code>M < 3</code> takes 11 corruption damage. A creature killed by this damage has their soul sucked into the vortex and lost somewhere in the Abyssal Wasteland, and can’t be brought back to life until their soul is recovered.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-10',
						name: 'Skeletal Eruption',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],

						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 3, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage, vertical push 2',
								tier2: '11 damage, vertical push 3',
								tier3: '14 damage, vertical push 4'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Each target is force moved straight up, then falls. A target who would normally land prone after falling is instead restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-11',
						name: 'Mobile Mine Field',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 10, within: 20 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The ashen hoarder sprays out six size 1M zombie mines that appear in unoccupied squares within distance. Any enemy who moves adjacent to a zombie mine for the first time in a round or starts their turn there causes the mine to explode, dealing 4 corruption damage to each creature adjacent to the mine. Any other zombie mines adjacent to the exploding mine also explode. At the start of each of the ashen hoarder’s turns, each unexploded zombie mine can be moved up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ashen-hoarder-feature-12',
						name: 'Ossuary Assault',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The ashen hoarder moves up to their speed and uses Claw and Blade with a double edge against one target. On a tier 3 outcome, the ashen hoarder can use Impale without spending Malice.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
