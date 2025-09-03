import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonOmen: MonsterGroup = {
	id: 'monster-group-dragon-omen',
	name: 'Dragon, Omen',
	description: 'They have been known by many names: Reaper, Blight, Sorrow, Stillness, Vengeance, Grief. The omen dragons carry as many meanings and interpretations as death itself—for they are death embodied. This dragon is a coalescing of wayward souls, the stench of death solidified, that clings to the last vestiges of this world—to the detriment of their surroundings.',
	picture: null,
	information: [
		{
			id: 'dragon-omen-info-1',
			name: 'Life and Death',
			description: `
The opposite of life isn’t death—it’s stagnation. When a soul refuses to move on, it lives outside the cycle of life. Souls can have any number of reasons to linger: anger, fear, sadness, a thirst for revenge. One skilled at dealing with the undead might even be able to shepherd such a soul back into its cycle. But when hundreds of souls with hundreds of unique motivations bind themselves to an elemental and form an omen dragon, the only practical way to stop them is to destroy what they’ve become.

As the embodiment of these wayward souls, the omen dragon wields them like weapons. They can send restless souls to grab creatures and pull them in, or to possess their attackers, compelling them to distraction in the middle of a fight. They even wrap themselves in the most durable of souls, creating a stifling aura.`
		},
		{
			id: 'dragon-omen-info-2',
			name: 'Life Outside Life',
			description: `
Just as the omen dragon exists outside the cycle of life, so too does their domain. The omen dragon’s dragonseal brings desolation and stagnancy to all living things. Growth does not happen. Living things that grow or creatures who dwell near an omen dragon’s domain do not age. One can often find secret societies researching lichdom residing in such sites, for what better place to study than a stagnant wasteland that grants one infinite time?

The effects that surround an omen dragon also mean that new life cannot begin. Civilization cannot exist, let alone prosper, without a reliable food source. When living creatures die in these dragons’ domains, their bodies do not decompose. Their souls are sucked into the omen dragon, granting the creature ever more power.`
		},
		{
			id: 'dragon-omen-info-3',
			name: 'Wicked Visions',
			description: 'To face off against an omen dragon is to stare down death itself. One can spend only so long near a choir of restless souls before being compelled to sing. For the sin of defiance, this dragon bestows upon their attackers an omen of their own death. Tarry too long near the creature, and a hero risks fulfilling that prophecy, even if they can weather the dragon’s unrelenting attacks.'
		},
		{
			id: 'dragon-omen-info-4',
			name: 'Omen Dragon Languages',
			description: 'An omen dragon speaks with the voices of all the souls they have collected. In addition to Vastariax, the dragon speaks and understands whatever languages those souls knew in life.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-omen-malice-1',
			name: 'Black Skies',
			cost: 3,
			sections: [
				'The dragon expands their wings to create a shroud of shadow. Until the start of the dragon’s next turn, any strike made against them takes a bane.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-omen-malice-2',
			name: 'Rise and Fall',
			cost: 5,
			sections: [
				'The dragon flies up to 10 squares and carries fated souls with them. Each creature in the area of the dragon’s Stagnant Wyrmscale Aura trait makes a **Presence test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Presence,
					tier1: 'Vertical pull 10',
					tier2: 'Vertical pull 6',
					tier3: 'Vertical pull 4'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-omen-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The dragon takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-omen-malice-4',
			name: 'Burn It Right Down',
			cost: 10,
			sections: [
				'Each edge of the encounter map burns with intangible purple flames until the end of the encounter. The flames expand by 1 square at the end of every turn. Any enemy takes 5 corruption damage for each square of flames they enter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-omen-1',
			name: 'Omen Dragon',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 120,
			size: FactoryLogic.createSize(5),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 550,
			stability: 6,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(3, 4, 2, 3, 5),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-omen-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-omen-feature-2',
					name: 'the dragon',
					endEfect: 15
				}),
				FactoryLogic.feature.create({
					id: 'dragon-omen-feature-3a',
					name: 'Deathcount',
					description: 'Several of the dragon’s abilities impose a Deathcount on a target. At the end of every turn, a creature with a Deathcount who is within the area of the dragon’s Stagnant Wyrmscale Aura has that Deathcount reduced by 1. When a creature’s Deathcount hits 0, they die. If multiple Deathcounts are imposed on a creature, they don’t stack. Only the lowest Deathcount takes effect. All Deathcounts are lost when the dragon is reduced to 0 Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'dragon-omen-feature-3b',
					name: 'Stagmant Wyrmscale Aura',
					description: 'The dragon’s scales create a 4 aura of supernatural stagnancy around them. The area is difficult terrain for enemies, and no creature except the omen dragon can regain Stamina while in the area. Any creature dragonsealed by the omen dragon who starts their turn in the dragon’s aura and doesn’t have a Deathcount gains a Deathcount of 12.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-4',
						name: 'Corroding Breath',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Each creature and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Agility,
								tier1: '18 corruption damage; the target is dragonsealed (save ends)',
								tier2: '14 corruption damage; the target is dragonsealed (save ends)',
								tier3: '9 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('Only creatures with souls can be dragonsealed by the omen dragon. A dragonsealed creature appears ghastly and pale, their Presence score is treated as 1 lower for the purpose of resisting potencies, and they can’t treat other creatures as allies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-5',
						name: 'Barbed Tail Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(4) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '14 damage; M<3 bleeding (save ends)',
								tier2: '19 damage; M<4 bleeding (save ends)',
								tier3: '23 damage; M<5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'The potency increases by 2, and each target is also pulled up to 5 squares.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-omen-feature-6',
					name: 'Death or Victory',
					description: 'Once per turn, the dragon chooses one creature with a Deathcount within line of effect. That creature can choose to take 1d6 damage and lose a recovery to increase their Deathcount by 5.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-7',
						name: 'Detonation',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. Each target takes 9 corruption damage, and the omen dragon regains Stamina equal to half the total damage dealt. The target then loses their dragonseal.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-8',
						name: 'Don’t Turn Away',
						type: FactoryLogic.type.createTrigger('A creature leaves the area of the dragon’s Stagnant Wyrmscale Aura trait.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon shifts up to their speed, and the Deathcount of each dragonsealed creature who comes adjacent to the dragon during this shift is reduced by 1.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-9',
						name: 'Repent!',
						type: FactoryLogic.type.createTrigger('A dragonsealed creature within distance deals damage to the dragon.', { free: true }),
						cost: 2,
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target must choose between making a free strike against themself or gaining a Deathcount of 5.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-omen-feature-10',
					name: 'Omen Dragon’s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, any creature on the map who regains Stamina regains only half the expected amount. Additionally, when a creature on the map who has a soul dies, the dragon absorbs the soul, granting the Director 1 Malice. The creature can’t be brought back to life until the dragon is destroyed.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-11',
						name: 'What You Deserve',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'Pull 1; the target has a Deathcount of 10',
								tier2: 'Pull 2; the target has a Deathcount of 8',
								tier3: 'Pull 3; the target has a Deathcount of 6'
							})),
							FactoryLogic.createAbilitySectionText('Each target receives a premonition of their imminent death.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-12',
						name: 'Souls of the Broken',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Five creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon spits fragments of souls to attempt to possess the targets, making a separate power roll for each target.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'P<5 frightened (save ends)',
								tier2: 'P<5 the target moves up to their speed toward the dragon',
								tier3: 'P<5 the target makes a free strike against the nearest ally'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-omen-feature-13',
						name: 'So Long and Goodnight',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. The dragon’s eyes glow with unequalled malevolence, and any target who has a Deathcount has that Deathcount reduced to 1.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
