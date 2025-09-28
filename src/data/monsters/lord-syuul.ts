import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const lordSyuul: MonsterGroup = {
	id: 'monster-group-lord-syuul',
	name: 'Lord Syuul',
	description: `
“Yours is an interesting mind, Tyract. I wonder what it tastes like?”

Chief Design Architect of the living synlirii high science vessel *Waking Nightmare*, Lord Syuul (*see-YOU-ull*) scours the timescape looking for novel genetic specimens he can torture into new species. His spies, informants, and allies are always on the lookout for subjects with unique hereditary traits the Interlace might extract.`,
	picture: null,
	information: [
		{
			id: 'lord-syuul-info-1',
			name: 'The Extractors',
			description: `
Syuul’s most trusted servants form his elite surgical commandos, the Extractors. Whenever his ship detects the presence of some novel or unique genetic ability, they dispatch a small team of synlirii genetic surgeons and a single scanner.

Scanners are 4-foot-tall floating glass cylinders filled with solid brain material and cerebrospinal fluid. They hover in place, scanning and cataloging every living being in the area in an instant.

The scanner identifies any creatures with valuable hereditary abilities so the Extractors can apply the Interlace, siphoning off the victim’s unique abilities.

Miraculously, some subjects survive this process. Those who do find they no longer have access to whatever hereditary traits the Extractors stole.`
		},
		{
			id: 'lord-syuul-info-2',
			name: 'Mind Masters of the Timescape',
			description: `
Known to his servants and thralls as the Architect of Change, Syuul’s research is no mere academic pursuit. He works tirelessly to build a catalog of mutations and hereditary traits. Talents, with their innate ability to turn thoughts into raw power, are his current obsession.

Lord Syuul remembers a time when his people ruled the world of Proteus, the Sea of Eternal Change, as gods. Before the time raiders rebelled, before the synlirii retreated to the World Below. While his fellow genetic architects are content to rule the Dark Under All, Syuul burns with hatred.

Hatred not just of the time raiders and the ungrateful proteans, but of every living being not under his direct control.

He no longer values his original technological marvel, the Body Banks, and so was happy to trade that obsolete invention to Ajax’s wizard Mortum in exchange for more genetic material.

The Body Banks were limited. They required manually feeding specimens into the tanks. His new device allows Lord Syuul to dynamically rewrite a living being’s genetic material from a distance. From *any* distance.

In his mind, everything that is not Lord Syuul is flawed. When his new device is complete, he will remake the timescape in his own image. Every living being, a formless mass of mind and flesh thinking only Syuul’s thoughts.`
		},
		{
			id: 'lord-syuul-info-3',
			name: 'Lord Syuul’s Languages',
			description: 'Lord Syuul communicates telepathically using Mindspeech and speaks Variac.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-1',
			name: 'Guise',
			cost: 3,
			sections: [
				'Lord Syuul projects a psionic screen over his body, preventing other creatures from treating him as an enemy until the end of his next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-2',
			name: 'Do It For Me',
			cost: 5,
			sections: [
				'Lord Syuul psionically plunders the minds of each creature within 2 squares of him. Each such creature makes a **Reason test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '13 psychic damage; the target uses a signature ability against a creature of Lord Syuul’s choice',
					tier2: '10 psychic damage; the target makes a free strike against a creature of Lord Syuul’s choice',
					tier3: 'No effect.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'Lord Syuul takes an additional main action on his turn. He can use this feature even if he is dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-4',
			name: 'Overpower',
			cost: 7,
			sections: [
				'Lord Syuul sends out a psionic burst to completely overpower his greatest threats. He makes a **Reason test**.',
				FactoryLogic.createPowerRoll({
					bonus: 4,
					tier1: 'Lord Syuul has damage weakness 5.',
					tier2: 'Lord Syuul has damage immunity 2.',
					tier3: 'Lord Syuul has damage immunity 5.'
				}),
				'Once per round as a maneuver, Lord Syuul can repeat this test, replacing the previous Overpower effect.',
				'Whenever an Overpower effect is active, any hero who has one or more psionic abilities can use a maneuver to push back by making a **Reason test**, replacing the previous Overpower effect.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: 'Lord Syuul has damage immunity 5',
					tier2: 'Lord Syuul has damage immunity 2',
					tier3: 'Lord Syuul has damage weakness 5'
				}),
				'The Overpower effect lasts until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lord-syuul-1',
			name: 'Lord Syuul',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 96,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'hover, teleport'),
			stamina: 450,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 4, 4, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'lord-syull-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'lord-syuul-feature-1',
					name: 'Lord Syuul',
					gender: 'm',
					endEffect: 10
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-2',
						name: 'Tentacle Grab',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage; A<2 grabbed',
								tier2: '17 damage; A<2 grabbed',
								tier3: '20 damage; A<2 grabbed'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The distance of this ability increases to melee 10. Each target grabbed by Lord Syuul is pulled up to 10 squares.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-3',
						name: 'Dampening Grenade',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage; the effect ends after 2 turns',
								tier2: '10 damage; the effect ends at the end of Lord Syuul’s next turn',
								tier3: '13 damage; the effect lasts until the end of the encounter'
							})),
							FactoryLogic.createAbilitySectionText('Any supernatural ability used by a creature in the area has a double bane. All reactive tests made against magic or psionic effects in the area have a double edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-4',
						name: 'Mind Blown',
						type: FactoryLogic.type.createMain(),
						cost: 7,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One grabbed enemy',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage',
								tier2: '20 damage',
								tier3: '24 damage'
							})),
							FactoryLogic.createAbilitySectionText('If this action reduces the target to 0 Stamina and they have a brain, their brain explodes, instantly killing them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-5',
						name: 'You Come With Me',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Lord Syuul can teleport up to 5 squares along with each creature and object he has grabbed. He can release grabbed creatures and objects before or after teleporting.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-6',
						name: 'Adaptability',
						type: FactoryLogic.type.createTrigger('Lord Syuul takes damage that has a damage type.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of his next turn, Lord Syuul gains immunity 5 to the triggering damage type.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lord-syuul-feature-7',
					name: 'Mind Over Manners',
					description: 'Whenever Lord Syuul uses a psionic ability, he can do so as if he were in the space of any creature within his line of effect who he has observed using a psionic ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-8',
						name: 'See Only Me',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Intuition Test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Intuition,
								tier1: '16 psychic damage; the target has no line of effect to any creature except Lord Syuul, and takes a bane on strikes targeting Lord Syuul (save ends)',
								tier2: '13 psychic damage; the target has no line of effect to any creature except Lord Syuul (save ends)',
								tier3: '7 psychic damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-9',
						name: 'Phantom Pain',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Lord Syuul becomes invisible, can teleport up to 10 squares, and projects an illusory double within 10 squares. The double can’t move or act, but Lord Syuul can use psionic abilities as if he were in its square. Whenever a creature touches or damages the double with a melee strike, they take 10 psychic damage. If Lord Syuul takes damage, his invisibility ends and the double disappears.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-10',
						name: 'Mindshatter',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 psychic damage',
								tier2: '13 psychic damage',
								tier3: '16 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, each target has damage weakness 3.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
