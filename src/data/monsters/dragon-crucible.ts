import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonCrucible: MonsterGroup = {
	id: 'monster-group-dragon-crucible',
	name: 'Dragon, Crucible',
	description: `
Crucible dragons are born from metallic elementals touched by the toxic combination of fiery rage and ice-cold grief—often the result of failure in the pursuit of perfection. Each dragon is a dark forge of abandoned creativity melted down in fires of spite, jealousy, and hate.

These metallic dragons are massive, heavy creatures requiring an immense release of heat to engage in flight. Their scales range from gleaming silver to blackened iron, depending on how fastidious they are about cleaning, and are occasionally gilded with more-precious metals. Their long tails terminate with a massive, hammer-like tip that can freeze over and instantly cool hot metal.`,
	picture: null,
	information: [
		{
			id: 'dragon-crucible-info-1',
			name: 'Bastions of Steel',
			description: 'Crucible dragons make their homes high in the mountains, most commonly in peaks cut through with thick veins of iron ore. Occasionally, one will take over a fortress or outpost, but wherever they settle, the first thing a crucible dragon sets in place is a colossal anvil. From there, the dragon consumes vast amounts of iron, slagging that iron in their belly to create a fortress of steel around them. Much of the slag is expelled into heated vats for forging, but a dragon keeps a small reserve inside their gut in case they need to melt any intrusive adventurers.'
		},
		{
			id: 'dragon-crucible-info-2',
			name: 'Discerning Collectors',
			description: `
Crucible dragons are obsessive collectors, and have a habit of narrowly focusing on a singular creation when it comes to collection and replication. Bynirak, the Rain of Ten Thousand Spears, is known to collect only the most finely crafted and powerful magic polearms in Vasloria. Joris’nyrathi, the Scorching Aegis, is said to have a collection of shields that would rival any god of the forge.

All crucible dragons manage to accrue large amounts of armaments and armor in their hoards. They care little for gems and gold, other than for melting down as filigree or embossing the weapons and armor they forge.`
		},
		{
			id: 'dragon-crucible-info-3',
			name: 'Flawed Pursuits',
			description: 'The failure that spawned a crucible dragon drives their obsessive pursuits. They endlessly attempt to reproduce the perfect treasures they count among their most prized possessions, but can only recreate flawed copies at a fraction of their original power. Discarded projects, melted heaps of raw iron, and scrap angrily embedded into cavern walls perpetually surround a crucible dragon as examples of their failures, perpetuating a cycle of obsessive rage, grief, and inescapable decline.'
		},
		{
			id: 'dragon-crucible-info-4',
			name: 'Crucible Dragon Languages',
			description: 'The oldest of crucible dragons are known to speak some Vastariax, though younger dragons are typically silent. However, survivors of an encounter with a younger crucible dragon sometimes report the monster using the Caelian phrases “not enough” and “mine.”'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-1',
			name: 'Swordfall',
			cost: 3,
			sections: [
				'While the dragon is flying, they shape themself into a blade and fall. Each creature and object in the dragon’s space when they hit the ground and in a 6 × 4 line within 1 square of the dragon takes 7 damage. A creature who takes this damage and has A<4 takes 4 extra damage per square the dragon fell and is restrained (save ends). A creature not restrained this way can move into the nearest unoccupied space.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-2',
			name: 'Shower of Blades',
			cost: 5,
			sections: [
				'The dragon shakes loose a cloud of shattered weapons in a 6 × 4 line within 1 square of them. Each creature and object in the area makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '16 damage; bleeding (save ends)',
					tier2: '13 damage; bleeding (EoT)',
					tier3: '7 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The dragon takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-4',
			name: 'Meltdown',
			cost: 7,
			sections: [
				'The dragon superheats the ground across the encounter map until the end of the round. Any enemy who starts their turn on the ground is slagged as if affected by the dragon’s Slag Spew ability.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-crucible-1',
			name: 'Crucible Dragon',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 96,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 450,
			stability: 6,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 3, 3, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-crucible-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-crucible-feature-2',
					name: 'the dragon'
				}),
				FactoryLogic.feature.create({
					id: 'dragon-crucible-feature-3',
					name: 'Magnetized Wyrmscale Aura',
					description: 'The dragon’s scales create a 3 aura of magnetism around them that affects large masses of metal. Any creature who enters the area for the first time in a round or starts their turn there while wearing metal or while slagged (see **Slag Spew**) is pulled up to 2 squares toward the dragon. A creature pulled this way who has M<3 is unable to willingly move away from the dragon.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-4',
						name: 'Slag Spew',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 1 }) ],
						target: 'Each creature and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '13 fire damage; the target is slagged (save ends)',
									tier2: '10 fire damage; the target is slagged (save ends)',
									tier3: '6 fire damage'
								})
							),
							FactoryLogic.createAbilitySectionText('A slagged target is coated in molten metal and takes 2d6 fire damage at the start of each of their turns. If a slagged target has M<3 they are restrained (save ends) whenever they take cold damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-5',
						name: 'Forge Hammer Tail Slam',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage; M<2 prone',
								tier2: '17 damage; M<3 prone',
								tier3: '20 damage; M<4 prone'
							})),
							FactoryLogic.createAbilitySectionText('The dragon can make a free strike against each slagged target knocked prone this way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The strike deals 1d6 cold damage.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-crucible-feature-6',
					name: 'Heat Buffer',
					description: 'Once per round while the dragon is flying using their Thermodynamic Flight ability, they give off a blast of steam to extend the duration of their flight until the end of the next round. Each creature in a 4 cube within 1 underneath the dragon when they use this ability takes 7 fire damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-7',
						name: 'Thermodynamic Flight',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon expels blistering steam, dealing 7 fire damage to each target in the area. The dragon then shifts up to their speed vertically and can fly until the end of the round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-8',
						name: 'Hammer and Anvil',
						type: FactoryLogic.type.createTrigger('While flying, the dragon starts their turn or moves.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon drops to the ground and uses Forge Hammer Tail Slam, which deals an extra 4 damage for each square they descended.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-9',
						name: 'Polarize Aura',
						type: FactoryLogic.type.createTrigger('The dragon is targeted by two melee strikes in the current turn.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each creature and object in the area',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionField({
								name: 'Special',
								effect: 'The target must be size 2 or smaller.'
							}),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Push 5',
								tier2: 'Push 7',
								tier3: 'Push 10, ignoring stability'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-crucible-feature-10',
					name: 'Crucible Dragon’s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, melted metal and blades coat nearly every surface. Any creature other than the dragon who starts their turn in physical contact with a surface on the encounter map takes 5 damage. Such creatures take an additional 5 damage when they take damage from being force moved into a surface on the map. Whenever an enemy in the encounter uses an ability that deals lightning damage, they take 1d6 damage to themself and each enemy and object adjacent to them.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-11',
						name: 'Heart of the Forge',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 fire damage, I<2 frightened (save ends)',
								tier2: '6 fire damage, I<3 frightened (save ends)',
								tier3: '8 fire damage, I<4 frightened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-12',
						name: 'Subdermal Shielding',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Shields embedded under the dragon’s scales emerge, and the dragon gains damage immunity 6 at the start of each round until the end of the encounter. If the dragon takes any damage, they lose this immunity until the end of the current round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-13',
						name: 'Polarity Chaos',
						type: FactoryLogic.type.createVillainAction(3),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '16 damage, pull 10 or push 10',
									tier2: '13 damage, pull 8 or push 8',
									tier3: '7 damage, pull 5 or push 5'
								})
							)
						]
					})
				})
			]
		})
	],
	addOns: []
};
