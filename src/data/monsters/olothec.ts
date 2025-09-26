import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const olothec: MonsterGroup = {
	id: 'monster-group-olothec',
	name: 'Olothec',
	description: 'Protean in form, beings of nearly pure intellect, the Old Ones think in alien geometric logic. Their name for themselves is unrecorded, but sages believe they are the oldest beings in the timescape and simply call them “The Old Ones.” Synlirii refer to them as olothec (OH-luh-thek)—“ancient enemies.” But some humanoid scholars have noted this term bears an uncanny similarity to another archaic synlirii word meaning “ancient ancestor.”',
	picture: null,
	information: [
		{
			id: 'olothec-info-1',
			name: 'Immortal Evil',
			description: 'Across countless cultures and ancestries, olothec feature in nightmares and temple friezes alike. While their origins are obscure and may never be known, their hatred of the mundane world and every living thing in it is well recorded. Olothec channel psionic energy beyond any mortal power, surpassing even the voiceless talkers. To them, a living creature who can’t reshape their own flesh is repugnant, an unnatural abomination requiring eradication—or transformation.'
		},
		{
			id: 'olothec-info-2',
			name: 'Agents of Chaos',
			description: 'Olothec consider the primordial chaos that spawned them as the ideal state of existence. They have long warred against the voiceless talkers, loathing their constant manipulation and refinement of evolutionary forces. Where olothec lair in forgotten sea tunnels and beneath ancient ruins, they surround themselves with slime servants—humanoids, beasts, horrors, and others, all devolved to a perfect physical and mental state.'
		},
		{
			id: 'olothec-info-3',
			name: 'Primordial Form',
			description: 'At first sight, an olothec seems like little more than a rippling mass of tentacles, twisting around each other like a shifting shroud. Creatures who get too close discover each of those tentacles ends in a ravenous mouth set with razor-sharp teeth. Each mouth is tipped by a cluster of three eyes that focus the olothec’s relentless attacks. In water or on land, fetid slime coats the horror, protecting them against attackers and acting as a conduit for their fearsome psionic power.'
		},
		{
			id: 'olothec-info-4',
			name: 'Mutations of the Flesh',
			description: 'Millennia of practice have allowed olothec to perfect psionic abilities that devolve and transform their victims into primordial life forms. Exposure to the psionic slime of an olothec’s tentacles can change a creature into a mindless, oozing thrall. The most powerful olothec have unique powers that further warp flesh.'
		},
		{
			id: 'olothec-info-5',
			name: 'Olothec Languages',
			description: 'Most olothec communicate telepathically using Mindspeech and speak Urollialic. Many also know Old Variac and Caelian, but converse in those languages only when necessary.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'olothec-malice-1',
			name: 'Solo Action',
			cost: 4,
			sections: [
				'The olothec takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'olothec-malice-2',
				name: 'Writhing Envelopment',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(3) ],
				target: 'One slimed, transformed, or devolved creature',
				cost: 4,
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 4,
						tier1: '11 psychic damage; A<2 grabbed',
						tier2: '17 psychic damage; A<3 grabbed',
						tier3: '20 psychic damage; A<4 grabbed'
					})),
					FactoryLogic.createAbilitySectionText('The olothec can pull a target grabbed this way adjacent to them. While grabbed this way, a target can’t make saving throws to end any other effects, and the olothec has a double edge on strikes against them.')
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'olothec-malice-3',
			name: 'Memory of Chaos',
			cost: 6,
			sections: [
				'The olothec broadcasts their memory of the universe in its primordial state—a sweeping cacophony of transcendental irrationality and unceasing change. Until the end of the encounter, any creature who starts their turn within 3 squares of the olothec and has R<3 is dazed and slowed until the end of their next turn).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'olothec-1',
			name: 'Olothec',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Horror', 'Olothec' ],
			encounterValue: 96,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(7, 'fly, swim'),
			stamina: 450,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(4, -1, 4, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'olothec-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'olothec-feature-2',
					name: 'the olothec',
					endEffect: 10
				}),
				FactoryLogic.feature.create({
					id: 'olothec-feature-3',
					name: 'Gelatinosis',
					description: 'A creature permanently devolves into a slime servant if they spend 1 continuous minute weakened by **Devolving Tentacles**, they are reduced to 0 Stamina by the psychic damage from Devolving Tentacles, or they suffer all three transformations from **Oozing Transformation**.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-4',
						name: 'Devolving Tentacles',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage; M<2 weakened or the target is slimed (save ends)',
								tier2: '17 damage; M<3 weakened or the target is slimed (save ends)',
								tier3: '20 damage; M<4 weakened and the target is slimed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A slimed target takes 4 psychic damage whenever they make a power roll.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-5',
						name: 'Slime Spew',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 2, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 acid damage; A<2 push special',
								tier2: '10 acid damage; A<3 push special',
								tier3: '13 acid damage; A<4 push special and prone'
							})),
							FactoryLogic.createAbilitySectionText('Each creature pushed this way is pushed to an unoccupied space in the area as far as possible from the olothec.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The area is difficult terrain. Any creature who enters the area or moves within it for the first time on a turn and has A<3 is knocked prone.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-6',
						name: 'Oozing Transformation',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 psychic damage; I<2 the target is transformed (save ends)',
								tier2: '20 psychic damage; I<3 the target is transformed (save ends)',
								tier3: '23 psychic damage; I<4 the target is transformed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Each time a target is transformed, the Director chooses one of the following transformations. When a target ends the transformed effect, all transformations on them end.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Head',
								effect: 'The target’s head becomes a ball of slime. They can’t communicate and have line of effect only within 3 squares.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Legs',
								effect: 'The target’s legs become pillars of ooze. They are slowed while on land and can automatically swim at full speed while moving.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Torso',
								effect: 'The target’s arms become gelatinous. They can’t benefit from edges or double edges and can’t gain or use surges.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-7',
						name: 'Jaunt',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The olothec teleports to an unoccupied space within 10 squares. Alternatively, they swap places with a creature or object within 5 squares of them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-8',
						name: 'Liquify',
						type: FactoryLogic.type.createTrigger('An enemy within distance deals damage to the olothec.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Each enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes 8 psychic damage and has psychic weakness 3 until the end of the olothec’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'olothec-feature-9',
					name: 'Primordial Mind',
					description: 'The olothec can’t be made frightened or taunted.'
				}),
				FactoryLogic.feature.create({
					id: 'olothec-feature-10',
					name: 'Slime Sense',
					description: 'A slimed or transformed creature can’t have concealment from or be hidden from the olothec.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-11',
						name: 'Horrifying Form',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Each enemy',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '10 psychic damage; P<2 frightened (save ends)',
									tier2: '14 psychic damage; P<3 frightened (save ends)',
									tier3: '17 psychic damage; P<4 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While frightened this way, a target can’t make saving throws to end any other effects.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-12',
						name: 'Psychic Pulse',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The olothec slides each target up to 5 squares. Each target takes 12 psychic damage, and if they have M<3 they are weakened and slimed (save ends). A slimed target takes 4 psychic damage whenever they make a power roll. Additionally, until the start of their next turn, the olothec has damage immunity 4.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-13',
						name: 'Return to Perfection',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 psychic damage; R<2 the target is devolved (save ends)',
									tier2: '13 psychic damage; R<3 the target is devolved (save ends)',
									tier3: '16 psychic damage; R<4 the target is devolved (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A devolved creature has a −1 score for all their characteristics other than Reason.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
