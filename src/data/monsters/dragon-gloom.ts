import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const dragonGloom: MonsterGroup = {
	id: 'monster-group-dragon-gloom',
	name: 'Dragon, Gloom',
	description: 'Where twilight spills long and cold over the lands and chilling fog hangs heavy and wet through long autumns and winters, there you will find gloom dragons. Wreathed in churning shadows and wrapped in glittering dark scales, gloom dragons bring with them heavy fog and mist that manifests hallucinations, trapping their prey in nightmares.',
	picture: null,
	information: [
		{
			id: 'dragon-gloom-info-1',
			name: 'Thrill of the Hunt',
			description: `
While many dragons command grand enclosed spaces, gloom dragons make their lairs within sprawling, murky wilds, commanding vast territories. As clever as ravens and as cunning as hunting beasts, they use mimicry and hallucinations to draw unsuspecting travelers ever farther into the mists of their domain, until the fog swallows the sound of those travelers’ screams.

In areas where gloom dragons settle, people are known to have more nightmares than usual.`
		},
		{
			id: 'dragon-gloom-info-2',
			name: 'Intangible Treasures',
			description: `
Gloom dragons are eerie collectors of voices, memories, and nightmares, as well as material items. Though able to speak, they can only repeat exactly what they’ve already heard, and so they prize their vast collections of voices and phrases, using these sounds to lure mortals close enough to draw out their memories and fears. Endlessly curious and fascinated by terror, gloom dragons are keen to see what hallucinations terrorize their prey before they slaughter them.

When a gloom dragon slays a victim, they take not just their valuables, but also whatever is most meaningful to their fears. A broken mirror from a dead lover will always fascinate a gloom dragon more than a perfect ruby brooch.`
		},
		{
			id: 'dragon-gloom-info-3',
			name: 'Unnerving Neighbors',
			description: 'Instinct and curiosity drive these enshrouded hunters. It is rare to find a gloom dragon who can be reasoned with, but some might develop an understanding with nearby settlements, such that each leaves the other to their business. Since gloom dragons focus on individual terrorizing over mass destruction, it is relatively easy to coexist with one lurking in the swamps nearby. But in such cases, these dragons become the subject of stories told to children, warning them to never follow voices into the fog.'
		},
		{
			id: 'dragon-gloom-info-4',
			name: 'Gloom Dragon Languages',
			description: 'Eerie myths surround the gloom dragons, for they wield languages they do not themselves speak. These draconic nightmares can mimic any sound they’ve heard. But more mysteriously, the magic that produces their hallucinations also mimics the sounds a foe’s mind produces, no matter their language. If a hero hallucinates a loved one dying, everyone around will hear that loved one’s screams for help.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-1',
			name: 'Dread and Terror',
			cost: 3,
			icon: StatBlockIcon.Trait,
			sections: [
				'The dragon thickens the fog of their Gloaming Wyrmscale Aura trait and the horrors within it. Each creature in the area takes a bane on strikes made against the dragon until the start of the dragon’s next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-2',
			name: 'Doleful Visions',
			cost: 5,
			icon: StatBlockIcon.Area,
			sections: [
				'The dragon manifests four 2 cubes of nightmarish apparitions anywhere on the encounter map. Each creature in the area when it appears makes an **Intuition test**.',
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
			name: 'Solo Action',
			cost: 5,
			icon: StatBlockIcon.Villain,
			sections: [
				'The dragon takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-gloom-malice-4',
			name: 'Phantasmagoria!',
			cost: 7,
			icon: StatBlockIcon.Area,
			sections: [
				'The dragon summons macabre, disquieting phantasms in a 10 cube within 1 square that lasts until the end of the encounter. Any enemy who enters the area for the first time in a round or starts their turn there takes 6 psychic damage, or 8 psychic damage if they are dragonsealed by the gloom dragon. Additionally, the enemy’s Intuition score is treated as 1 lower for the purpose of resisting potencies until the end of the encounter.'
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
			encounterValue: 72,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8, 'fly, hover'),
			stamina: 350,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 4, 1, 3, 4),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-gloom-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-gloom-feature-2',
					name: 'the dragon',
					endEffect: 10
				}),
				FactoryLogic.feature.create({
					id: 'dragon-gloom-feature-3',
					name: 'Gloaming Wyrmscale Aura',
					description: 'The dragon’s scales create a 3 aura of dark supernatural fog around them that feeds on their victims’ fears and provides concealment to the dragon only. Each enemy who starts their turn in the area takes 2 psychic damage. Additionally, whenever one or more enemies is in the area, the dragon’s abilities deal an extra 3 psychic damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-4',
						name: 'Breath of Brume',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Agility,
								tier1: '14 cold damage; the target is dragonsealed (save ends)',
								tier2: '11 cold damage; the target is dragonsealed (save ends)',
								tier3: '6 cold damage'
							})),
							FactoryLogic.createAbilitySectionText('A dragonsealed creature has psychic weakness 3 and cold weakness 3. Additionally, the area is filled with magical darkness. The dragon ignores concealment created by this darkness.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-5',
						name: 'Phantom Tail Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '10 psychic damage; pull 2',
								tier2: '15 psychic damage; pull 4',
								tier3: '18 psychic damage; pull 6'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The pull becomes a vertical slide.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-gloom-feature-6',
					name: 'Shadow Skulk',
					description: 'Once per turn, the dragon can shift up to their speed, leaving behind a 4 cube area of magical darkness in their starting space that lasts until the end of the encounter. The dragon ignores concealment created by this darkness. Any enemy who ends their turn in the area and has I<3 is frightened of the dragon until the end of their next turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-7',
						name: 'Visions in the Dark',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. Each target takes 3 psychic damage, and if they have I<3 they immediately make a free strike against one ally of the dragon’s choice.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-9',
						name: 'Encroaching Darkness',
						type: FactoryLogic.type.createTrigger('A creature within 10 squares moves.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon moves two existing cubes of magical darkness up to 10 squares each.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-gloom-feature-10',
					name: 'Gloom Dragon’s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, illusory magic suffuses the location with shadowy malevolence. Each creature on the encounter map other than the dragon takes a −2 penalty to saving throws made to end the frightened condition. Additionally, whenever a frightened enemy on the encounter map takes damage, they take an extra 3 psychic damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-11',
						name: 'Enveloping Umbrage',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Pull 2; I<2 frightened (EoT)',
								tier2: 'Pull 4; I<3 frightened (save ends)',
								tier3: 'Pull 6; I<4 frightened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-12',
						name: 'Pall of Nightmares',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 psychic damage',
								tier2: '11 psychic damage',
								tier3: '14 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. Any target who has I<3 is also dazed (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-gloom-feature-13',
						name: 'Absence of All Light',
						type: FactoryLogic.type.createVillainAction(3),
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon disappears from the encounter map. The dragon and three hallucinatory illusions of themself then immediately reappear in unoccupied spaces on the encounter map, and the dragon and each illusion uses Breath of Brume. Each illusion is indistinguishable from the dragon except by supernatural means, has 1 Stamina, and has the dragon’s speed. An illusion acts on the dragon’s turns but can take only move actions. Once per round before or after using an ability, the dragon can trade places with any duplicate.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
