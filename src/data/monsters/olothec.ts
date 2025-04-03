import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const olothec: MonsterGroup = {
	id: 'monster-group-olothec',
	name: 'Olothec',
	description: 'Protean in form, beings of nearly pure intellect, the Old Ones think in alien geometric logic. Their name for themselves is unrecorded, but sages believe they are the oldest beings in the timescape and simply call them “The Old Ones.” Synlirii refer to them as olothec (OH-luh-thek)— “ancient enemies.” But some humanoid scholars have noted this term bears an uncanny similarity to another archaic synlirii word meaning “ancient ancestor.”',
	information: [
		{
			id: 'olothec-info-1',
			name: 'Immortal',
			description: 'Across countless cultures and ancestries, olothec feature in nightmares and temple friezes alike. While their origins are obscure and may never be known, their hatred of the Mundane World and every living thing in it is well recorded. Olothec channel psionic energy beyond any mortal power, surpassing even the voiceless talkers. To them, a living creature who can’t reshape their own flesh is repugnant, an unnatural abomination requiring eradication—or transformation.'
		},
		{
			id: 'olothec-info-2',
			name: 'Agents of Chaos',
			description: 'Olothec consider the primordial chaos that spawned them as the ideal state of existence. They have long warred against the voiceless talkers, loathing their constant manipulation and refinement of evolutionary forces. Where olothec lair in forgotten sea tunnels and beneath ancient ruins, they surround themselves with slime servants—humanoids, beasts, aberrations, and others, all devolved to a perfect physical and mental state.'
		},
		{
			id: 'olothec-info-3',
			name: 'Primordial Form',
			description: 'At first sight, an olothec seems like little more than a rippling mass of tentacles, twisting around each other like a shifting shroud. Creatures who get too close discover each of those tentacles ends in a ravenous mouth set with razor-sharp teeth. Each mouth is tipped by a cluster of three eyes that focus the olothec’s relentless attacks. In water or on land, fetid slime coats the aberration, protecting them against attackers and acting as a conduit for their fearsome psionic power.'
		},
		{
			id: 'olothec-info-4',
			name: 'Mutations of the Flesh',
			description: 'Millennia of practice allow olothec to perfect their psionic abilities that devolve and transform their victims into primordial life forms. Exposure to the psionic slime of an olothec’s tentacles can change a creature into a mindless, oozeing thrall. The most powerful olothec have unique powers that further warp flesh.'
		},
		{
			id: 'olothec-info-5',
			name: 'Olothec Languages',
			description: 'Most olothec speak Urollialic and use Mindspeech exclusively. Only when necessary do olothec converse in Old Variac and Caelian.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'olothec-malice-1',
			name: 'Psychic Shock',
			cost: 3,
			sections: [
				'The olothec reaches into the minds of anyone falling under their inﬂuence to deliver a debilitating mental attack. Each slimed, transformed, or devolved creature makes a **Reason test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '16 psychic damage; frightened (save ends)',
					tier2: '13 psychic damage; frightened (EoT)',
					tier3: '7 psychic damage'
				})
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'olothec-malice-2',
				name: 'Writhing Envelopment',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(3) ],
				target: 'One slimed, transformed or devolved creature',
				cost: 5,
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 4,
					tier1: '11 psychic damage; A<2 grabbed',
					tier2: '17 psychic damage; A<3 grabbed',
					tier3: '20 psychic damage; A<4 grabbed'
				}),
				effect: 'The olothec pulls a target grabbed as part of this ability adjacent to them. The olothec has a double edge on strikes against a creature grabbed this way, and a grabbed target can’t save against any other eﬀects until they are no longer grabbed.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'olothec-malice-3',
			name: 'Memory of Chaos',
			cost: 7,
			sections: [
				'The olothec broadcasts their memory of the universe in its primordial state, a sweeping cacophony of transcendental irrationality and unceasing change utterly anathema to the ordered mind. Until the end of the encounter, any creature that starts their turn within 3 of the olothec is R<3 slowed and dazed (EoT).'
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
			encounterValue: 80,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(7, 'fly, swim'),
			stamina: 450,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 4, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'olothec-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'olothec-feature-2',
					name: 'the olothec'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-3',
						name: 'Devolving Tentacle',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; M<2 weakened or slimed',
							tier2: '17 damage; M<3 weakened or slimed',
							tier3: '20 damage; M<4 weakened or slimed'
						}),
						effect: 'A slimed target takes 4 psychic damage whenever they roll power until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-4',
						name: 'Slime Spew',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 2, within: 1 }) ],
						target: 'All creatures and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 acid damage; A<2 push (special)',
							tier2: '10 acid damage; A<3 push (special)',
							tier3: '13 acid damage; A<4 push (special), prone'
						}),
						effect: 'A creature pushed by this ability is pushed to the squares within the line that are furthest from the olothec.',
						spend: [
							{
								value: 1,
								effect: 'The affected area becomes difficult terrain. A creature that enters an affected square for the first time during a turn is A<3 knocked prone.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-5',
						name: 'Oozing Transformation',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '13 psychic damage; I<2 transformed (save ends)',
							tier2: '20 psychic damage; I<3 transformed (save ends)',
							tier3: '23 psychic damage; I<4 transformed (save ends)'
						}),
						effect: `
Each time a creature is transformed, the Director chooses one of the following transformations. When a creature ends the transformed effect, all transformations end.

**Head** The creature’s head becomes a ball of slime. They cannot communicate and they can’t establish line of effect beyond 3 squares.

**Legs** The creature’s legs become pillars of ooze. They are slowed while on land and add the swim keyword to their speed.

**Torso** The creature’s arms become gelatinous. They can’t benefit from edges or surges.`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-6',
						name: 'Jaunt',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The olothec teleports to an unoccupied square within 10 or swaps places with a creature or object within 5.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-7',
						name: 'Liquify',
						type: FactoryLogic.type.createTrigger('Target deals damage to the olothec.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						effect: 'The target takes 8 psychic damage and gains psychic weakness 3 until the end of the olothec’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'olothec-feature-8',
					name: 'Primordial Mind',
					description: 'The olothec is immune to the frightened and taunted conditions.'
				}),
				FactoryLogic.feature.create({
					id: 'olothec-feature-9',
					name: 'Slime Sense',
					description: 'A slimed or transformed creature can’t be hidden or concealed from the olothec.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-10',
						name: 'Horrifying Form',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 psychic damage; P<2 frightened (save ends)',
							tier2: '14 psychic damage; P<3 frightened (save ends)',
							tier3: '17 psychic damage; P<4 frightened (save ends)'
						}),
						effect: 'This ability targets each enemy the olothec has line of effect to. A frightened enemy can’t save against any other effect until they are no longer frightened.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-12',
						name: 'Psychic Pulse',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All creatures',
						effect: 'Each target takes 12 psychic damage, slides 5, and is M<3 weakened and slimed (save ends) (see devolving tentacles). The olothec has damage immunity 4 until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'olothec-feature-13',
						name: 'Return to Perfection',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 psychic damage; R<2 devolved (save ends)',
							tier2: '13 psychic damage; R<3 devolved (save ends)',
							tier3: '16 psychic damage; R<4 devolved (save ends)'
						}),
						effect: 'A devolved creature has a -1 modifier to all their characteristic scores other than Reason until the condition ends.'
					})
				})
			]
		})
	],
	addOns: []
};
