import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonGloom: MonsterGroup = {
	id: 'monster-group-dragon-gloom',
	name: 'Dragon, Gloom',
	description: 'Where twilight spills long and cold over the lands and chilling fog hangs heavy and wet through long autumns and winters, there you will find gloom dragons. Wreathed in churning shadows and glittering dark scales, gloom dragons bring with them heavy fog and mist that manifest hallucinations, trapping their prey in nightmares.',
	information: [
		{
			id: 'dragon-gloom-info-1',
			name: 'Thrill of the Hunt',
			description: `
While many dragons command grand enclosed spaces, gloom dragons make their lair within sprawling, murky wilds, commanding vast territories. As clever as ravens and as cunning as hunting beasts, they use mimicry and hallucinations to draw unsuspecting travelers further and further into the mists of their domain, until the fog swallows the sound of their prey’s screams. 

Where gloom dragons settle, people are known to have more nightmares than usual. `
		},
		{
			id: 'dragon-gloom-info-2',
			name: 'Intangible Treasures',
			description: `
Gloom dragons are eerie collectors of voices, memories, nightmares, and items. As they can only repeat exactly what they’ve heard, they prize their vast collections of voices, tongues, and phrases, using these sounds to lure in mortals so they might draw out their memories and fears. Endlessly curious and fascinated by terror, they are keen to see what hallucinations terrorize their prey before they slaughter them. 

When they have slain their foe, they take not just whatever is valuable from their person, but also whatever is *meaningful* to their fears. A broken mirror from a dead lover will always fascinate a gloom dragon more than a perfect ruby brooch.`
		},
		{
			id: 'dragon-gloom-info-3',
			name: 'Unnerving Neighbors',
			description: `
Instinct and curiosity drive these enshrouded hunters. It is rare to find one that can be reasoned with, but some may develop an understanding with a nearby town, each leaving the other to their business. Since gloom dragons focus on individual terrorizing over mass destruction, it is easier to coexist with one lurking in the swamps nearby—but then these dragons become myths and stories told to children, ensuring they never follow voices into the fog.

When such an understanding is not reached, gloom dragons are feared for their command over illusions, darkness, and trickery. They have been known to torment entire regions, and as their knowledge grows, they only become more dangerous.`
		},
		{
			id: 'dragon-gloom-info-4',
			name: 'Gloom Dragon Languages',
			description: 'Eerie myths surround gloom dragons, as they wield languages they do not themselves speak. These draconic nightmares can mimic any sound they’ve heard, but more mysteriously, the magic that produces their hallucinations also mimics the sounds their foe’s mind produces, no matter their tongue. Should a hero hallucinate their kin dying, everyone—friend or foe—would hear their screams for help.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-1',
			name: 'Dread and Terror',
			cost: 3,
			sections: [
				'The dragon thickens the supernatural fog and the horrors within it, imposing a bane on strikes made against them until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-2',
			name: 'Doleful Visions',
			cost: 5,
			sections: [
				'The dragon manifests four 2 cubes of nightmarish apparitions across the encounter map. Each creature in an aﬀected square must make an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: '14 damage; dazed (save ends)',
					tier2: '11 damage; dazed (EoT)',
					tier3: '6 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-3',
			name: 'Phantasmagoria!',
			cost: 7,
			sections: [
				'The dragon causes the area within 5 of them to warp into macabre, disquieting phantasms. Each enemy who enters an aﬀected square or starts their turn in one takes 6 psychic damage, or 11 psychic damage if they are dragonsealed, and their Intuition score is considered 1 lower when resisting potencies until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-gloom-1',
			name: 'Gloom Dragon',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 60,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8, 'fly, hover'),
			stamina: 350,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 4, 1, 3, 4),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-gloom-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-gloom-feature-2',
					name: 'gloom dragon'
				}),
				FactoryLogic.feature.create({
					id: 'dragon-gloom-feature-3',
					name: 'Gloaming Wyrmscale Aura',
					description: 'The dragon’s scales emit a 4 aura of dark fog. An enemy who starts their turn in an aﬀected area takes 2 psychic damage, and the dragon deals an additional 2 psychic damage on abilities per number of enemies in the aura (to a maximum of 6).'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-4',
						name: 'Breath of Brume',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'All enemies',
						cost: 'signature',
						preEffect: 'Each target makes an **Agility test**.',
						// based on other dragons, this is probably supposed to be a test, instead of a power roll, which would have the tiers reversed. Leaving as written for now.
						/*
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: '14 cold damage; P<5 dragonsealed (save ends)',
							tier2: '11 cold damage; P<4 dragonsealed (save ends)',
							tier3: '6 cold damage; P<3 dragonsealed (save ends)'
						}),
						*/
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 cold damage; P<3 dragonsealed (save ends)',
							tier2: '11 cold damage; P<4 dragonsealed (save ends)',
							tier3: '14 cold damage; P<5 dragonsealed (save ends)'
						}),
						effect: 'The affected area becomes an area of magical darkness. The dragon ignores concealment granted by the darkness. A creature dragonsealed by the dragon has psychic weakness 3 and cold weakness 3 until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-5',
						name: 'Phantom Tail Swing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two enemies or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 psychic damage; pull 2',
							tier2: '15 psychic damage; pull 4',
							tier3: '18 psychic damage; pull 6'
						}),
						spend: [
							{
								value: 2,
								effect: 'The pull becomes a vertical slide.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-6',
						name: 'Visions in the Dark',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All dragonsealed enemies',
						cost: 5,
						effect: 'Each target takes 3 psychic damage and is I<3 compelled to immediately make a free strike against one of their allies within range as they hallucinate a threat.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-7',
						name: 'Shadow Skulk',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [],
						distance: [],
						target: '',
						effect: 'Once per turn, the dragon shifts up to their speed and leaves behind a 4 cube area of magical darkness. The dragon ignores concealment granted by the darkness. An enemy that ends their turn in the aﬀected area is I<3 frightened of the dragon.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-8',
						name: 'Shroud',
						type: FactoryLogic.type.createTrigger('The dragon takes damage.'),
						cost: 1,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The dragon reduces the damage by 2 for each enemy in their aura.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-9',
						name: 'Encroaching Darkness',
						type: FactoryLogic.type.createTrigger('A creature moves.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The dragon moves two cubes of magical darkness up to 10.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-gloom-feature-10',
					name: 'Gloom Dragon\'s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, illusory magic drenches the air such that even the scenery emanates malice. Each creature other than the dragon in the aﬀected area has a -2 on saving throws made to end the frightened condition. A frightened enemy in the aﬀected area takes an additional 3 psychic damage whenever they take damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-11',
						name: 'Enveloping Umbrage',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Pull 2; I<3 frightened (save ends)',
							tier2: 'Pull 4; I<4 frightened (save ends)',
							tier3: 'Pull 6; I<5 frightened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-12',
						name: 'Pall of Nightmares',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All dragonsealed enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 psychic damage',
							tier2: '11 psychic damage',
							tier3: '14 psychic damage'
						}),
						effect: 'The targets are I<4 dazed as they are assaulted by their hallucinations.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-13',
						name: 'Absence of All Light',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Special',
						effect: 'The dragon disappears, then reappears anywhere on the encounter map, as do three hallucinatory versions of it at other points on the encounter map (the director determines which one is real). The dragon and each hallucinatory version of it immediately uses Breath of Brume. A creature who deals damage to a hallucination of the dragon causes it to immediately dissipate.'
					})
				})
			]
		})
	],
	addOns: []
};
