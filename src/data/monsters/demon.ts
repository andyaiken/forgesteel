import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon: MonsterGroup = {
	id: 'monster-group-demon',
	name: 'Demon',
	description: `
Creatures of incarnate hate, demons spawn naturally in the Abyssal Wasteland. They crave violence and suffering the way other creatures need food. A demon cares only for themself, and they torture and tear lesser demons apart for fun.

The bestial appearance of each demon is unique, composed of a chaotic arrangement of teeth, claws, and limbs meant for killing. Even demons of the same kind have unique features. One might bear an extra set of eyes or teeth, while another has a humanoid arm growing from their forehead.`,
	picture: null,
	information: [
		{
			id: 'demon-1st-info-1',
			name: 'Mortal Alliances',
			description: 'Demons form temporary alliances with evil mortals in exchange for souls to consume. Such alliances create carnage with alarming efficiency, though they inevitably collapse when the demons decide to devour their foolish partners. The only creature who can truly keep a demon in line is a more powerful demon.'
		},
		{
			id: 'demon-1st-info-2',
			name: 'Soul Reavers',
			description: 'Demons feast not on food or liquids, but on souls. Souls fuel their anarchic powers, and while a demon is starved for souls, they can scarcely think. Whenever a demon kills a creature who has a soul, they consume that soul and keep its energy within their body. A demon can then burn that soul energy to enact their most devastating abilities.'
		},
		{
			id: 'demon-1st-info-3',
			name: 'Lethe',
			description: 'When a demon’s soul energy begins to flag, they fall into a state known as lethe—a violent hunger wherein they can only lash out in a desperate search for sustenance. Demons who have fallen into lethe become single-minded and violent, seeking only to consume.'
		},
		{
			id: 'demon-1st-info-4',
			name: 'Demonic Hierarchy',
			description: `
Mortal scholars have classified demons into ten categories, each increasingly more powerful. Though demons don’t use these classifications themselves, this system reflects their hierarchy, as stronger demons bully the weak into service.

Each time a demon consumes a soul, there’s a chance they might evolve into a more powerful demon. The evolution from one category to the next can be instantaneous, or it can take years. This inconsistency has led to much scholarly debate on whether all souls are equal, or whether demonic evolution is aided by the consumption of souls that are especially corrupt—or heroic.`
		},
		{
			id: 'demon-1st-info-5',
			name: 'Demon Languages',
			description: 'Lower categories of demons speak Proto-Ctholl. As demons evolve and reach category 3 or higher, their speech turns into proper Tholl.'
		},
		{
			id: 'demon-1st-info-6',
			name: 'Demons — 1st Echelon',
			description: `
A number of lesser demons have been identified across categories 1 to 3:

• **Pitlings** resemble rodents or insects, but possess gleaming green eyes and terrible body odor, and disgorge a viscous, toxic phlegm.

• **Ensnarers** are the result of pitlings getting hold of an unfortunate soul. A pitling in the process of digesting the soul of a creature has that soul physically bore through their head to become a fanged appendage. Mouths form across the creature’s body, each attacking with long,barbed tongues.

• **Frenzied** are similar to ensnarers, but their transformation into a true demon is more advanced. This results in a fast and vicious creature full of energy and hungry for more souls.

• **Bendraks** (BEN-drax) appear as an amalgamation of flesh and the shards of broken mirrors, which they use to distract and confuse their foes. A bendrak can divert an enemy’s attack to another enemy, and can hide themselves or allies behind dazzling reflections.

• **Mucerons** (MIU-sur-onz) are the result of an ensnarer going through repeated demon evolutions to become a brutish creature. They are covered in multiple mouths that shoot out barbed tongues, tearing at enemies as they are dragged out of position.

• **Remasches** (REE-mash-iz) have physical forms blended with the nature of the wastes where they dwell. A remasch teleports around the battlefield, inflicting chaos on their enemies directly or through the minions they control. These demons are rumored to be the initial source of the teachings of all shadows through the College of Black Ash.

• **Ruinants** (rew-in-ANSE) are possessed of glowing eyes and tendrilringed maws, their bodies covered in inflamed scars and their breath coming as a sickening wheeze. A ruinant can inflict fresh wounds and burns on their victims in a pattern mirroring those on the demon’s own body.

• **Torlases** (TORR-lahs-iz) are piecemeal abominations whose physical forms don’t obey the mundane laws of geometry. They control the battlefield by using living flesh and whipping allies and enemies alike into advantageous position.

• **Chorogaunts** (cor-roh-GAWNTS) are terrifying demon leaders. Each is an amalgamation of several demon bodies formed into a mobile musical instrument. Several heads are arranged into a chorus embedded in the demon’s chest, and their ribs are upturned into a fleshy pipe organ. Their attacks entrance and confuse enemies, making them more vulnerable to other demons.`
		},
		{
			id: 'demon-2nd-info-1',
			name: 'Demons — 2nd Echelon',
			description: `
• **Grulqins** (GRUHL-kinz) consist of a bulbous head, two powerful arms, and a circular serrated blade of bone that runs down the middle of their head.

• **Orliq** (or-LEEK) are made of shifting bone plates surrounding a swirling core of corruptive energy.

• **Wobalas** (WOH-buh-luss) prefer to kill from afar while protected by allies, firing psychic bolts from bows shaped of their own flesh and sinew.

• **Bale eyes**, sometimes called “flesh moons,” are colossal floating orbs of roiling, dripping flesh. A weeping seam in that flesh opens to reveal a demonic eye whose gaze turns creatures’ mental and physical faculties upside down.

• **Fangling** have bodies overgrown with teeth, fangs, and tusks from countless creatures. They are deadly in close quarters, to attackers and bystanders alike.

• **Fiktin** (FIK-ten) are cunning hunters who disguise themselves as mundane objects, leaving a foul-smelling oily red residue wherever they have been. Their true form is a humanoid shape made of red oil.

• **Gunge** (GUHNJ) demons are horrifically distended, with maws that can swallow a horse whole. A gunge vomits up bilious slime that traps and dissolves any creature unlucky enough to get caught in it.

• **Tourmenauks** (tor-min-AUX) resemble a hulking ape with a dozen or more extra mouths distributed around their body. Though their brute force is formidable, this demon also inflicts raw psychic pain by wailing from their mouths in different voices—often the agonized voices of souls the tormenauk has devoured.

• **Lumbering Egress** are mobile masses of warped flesh set around an enormous whirling portal to the demonic realms. Lesser demons pour out through these portals at alarming rates, letting these creatures act as devastating siege engines.`
		},
		{
			id: 'demon-3rd-info-1',
			name: 'Demons — 3rd Echelon',
			description: `
• **Soulraker scouts** are the vile progeny of a soulraker hivequeen—demonic wasps who emerge from her distended abdomen with an earsplitting buzz.

• **Soulraker soldiers** are demonic wasps armored in dense chitin who favor driving foes before them.

• **Soulraker stingers** are wasps covered in poisonous barbed stingers that they launch like quills, their wings atrophied and unusable.

• **Blight phages** were once angelic creatures. Corrupted by demonic forces, each is now a cruel, distended mockery of a cherubic form, covered in pestilent boils that seep ruinous blight.

• **Chimerons** (kai-MEHR-ons) are a horrifying amalgam of multiple demonic forms melded into a unique monstrosity, driven by an unslakable hunger for souls.

• **Styrichs** (STEE-rix) feature lanky bodies covered with manes of long, razor-sharp hair, which they whip around the battlefield to shred their enemies.

• **Soulraker handmaidens** are abyssal parasites implanted in victims by a soulraker hivequeen. Handmaidens gestate inside a host until they’re ready to emerge from the body, then consume souls until they’re strong enough to transform into a new hivequeen.

• **Soulraker praetorians** are the elite guards of a hivequeen, dripping foul-smelling ichor and using their barbed stingers to lay waste to foes.

• A **soulraker hivequeen** is a demonic wasp whose abdomen houses their own soulraker wasp hive, and whose stinging ovipositor implants victims with handmaiden parasites.`
		},
		{
			id: 'demon-4th-info-1',
			name: 'Demons — 4th Echelon',
			description: `
• **Optacus** (OHP-tih-cus) demons are abyssal eyes atop a spindly flesh stalk supported by innumerable legs. Able to affix to any surface, they shoot deadly beams of fire at distant foes.

• **Tyburakis** (tee-berr-AH-kees) appear as a horrifying cross between a thresher shark and a terror lizard, their tails lined with tiny shark maws that allow them to bite multiple foes at once.

• **Unguloids** (UHN-jyl-oids) have a centaur-like form, with a body and head resembling a demonic rhinoceros. They are known for their devastating charge.

• **Izyaks** (ee-zi-YAHKS) have a mercurial form that ripples with psionic energy, making these demons appear different to all those who observe them. Their true form is a brain supported on four bone legs.

• **Vicisitators** (vih-SIS-ih-tay-tors) are dangerous and horrifically unstable, the flesh and bone of their bodies trapped in a state of perpetual agonizing flux. Their very touch results in excruciating pain as it warps flesh, bone, and soul.

• **Aurumvas** (FIK-ten) (or-UM-vahs) the demon king stands alone among named demons for craving not only wealth, but highly avaricious souls. A towering figure with a stack of crowns atop his ophidian head, he is a vision of opulence, excess, and absolute debasement. He lords over other powerful demons by virtue of the wealth held in his vast vaults in the Abyssal Wasteland, acquired through the slaughter of countless creatures. But even as he gazes upon his riches and supernatural treasures, Aurumvas wants for more. He draws lesser demons and wicked mortals to his service with the promise of minor treasures, knowing full well that one needs to spend wealth to make it. If left unchecked, Aurumvas’s servile armies and glittering hoards might one day encompass the entire timescape.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-1',
			name: 'Soulburn',
			cost: 3,
			sections: [
				'Each demon acting this turn has a double edge on their abilities.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-3',
			name: 'Abyssal Evolution',
			cost: 7,
			sections: [
				'A demon minion of your choice transforms into a non-minion horde demon of the same level.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-2',
			name: 'Abyssal Rift',
			cost: 7,
			sections: [ 'Two size 2 rifts to the Abyssal Wasteland appear at locations of your choice. Any demon can use an abyssal rift as a portal to another abyssal rift in the encounter, moving into any space in one rift and appearing immediately in any unoccupied space in the other rift. A non-demon who enters a rift for the first time in a round or starts their turn there takes corruption damage equal to the level of the highest-level demon on the encounter map. An abyssal rift is an immovable object that has 25 Stamina, damage immunity 2, and holy weakness 5. The rift closes when there are no demons remaining on the encounter map. Additionally, a creature who has the Magic or Psionics skill can make a **Reason test** or **Intuition test** as a maneuver while adjacent to a rift to destabilize and close it.',
				FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
					tier1: 'The rift remains open and regains 5 Stamina.',
					tier2: 'The rift remains open.',
					tier3: 'The rift closes.'
				}) ]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-2nd-malice-2',
			name: 'Abyssal Jaunt',
			cost: 3,
			sections: [
				'One demon acting this turn folds space around them, temporarily slipping in and out of the Abyssal Wasteland. Until the start of the demon’s next turn, they ignore difficult terrain, can move through solid matter, and don’t provoke opportunity attacks by moving. If the demon ends their turn inside solid matter, they are shunted out into the space from which they entered it.'
			],
			echelon: 2
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-3rd-malice-2',
			name: 'Seeping Blight',
			cost: 5,
			sections: [
				'One demon acting this turn expels blight—digested soul juice—onto the ground around them in a 3 burst that lingers until the start of their next turn. Any enemy who enters the area or starts their turn there takes 6 corruption damage, and has a double bane on power rolls until the start of their next turn.'
			],
			echelon: 3
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-4th-malice-2',
			name: 'Soul Flense',
			cost: 7,
			sections: [
				'One demon acting this turn unleashes their pent-up agony and pain on every non-demon in a 5 burst. Each target makes a **Presence test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Presence,
					tier1: '10 corruption damage; the target is soul flensed',
					tier2: 'The target is soul flensed',
					tier3: 'No effect'
				}),
				'The demon removes all conditions and effects on themself that can be ended by a saving throw, and transfers all those effects to each creature soul flensed this way.'
			],
			echelon: 4
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-1st-1',
			name: 'Ensnarer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to melee distance',
			characteristics: FactoryLogic.createCharacteristics(2, 0, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-1-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; pull 1',
								tier2: '4 damage; pull 2',
								tier3: '5 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('If the target is pulled adjacent to the ensarer, the ensnarer makes a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-1-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-2',
			name: 'Frenzied',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(0, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-2-feature-1',
						name: 'Rip and Tear',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-2-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-3',
			name: 'Pitling',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(-2, 2, -2, -2, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-3-feature-1',
						name: 'Spit',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 poison damage',
								tier2: '4 poison damage',
								tier3: '5 poison damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-3-feature-2',
					name: 'Horrid Stench',
					description: 'Any enemy who has three or more pitlings within 2 squares of them can\'t regain Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-3-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-3-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-4',
			name: 'Bendrak',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-4-feature-1',
						name: 'Warp Perception',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 psychic damage',
								tier2: '5 psychic damage; P<1 weakened (save ends)',
								tier3: '7 psychic damage; P<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the target makes a strike while weakened this way, the bendrak can choose a second target within distance for the strike. The first target takes half of any damage from the strike and the second target takes any remaining damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-4-feature-2',
						name: 'Vanish',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is invisible until the start of their next turn. They can then move up to 3 squares and attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-4-feature-3',
					name: 'Lethe',
					description: 'While the bendrak is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the bendrak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-5',
			name: 'Muceron',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-5-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; pull 2',
								tier2: '7 damage; pull 3',
								tier3: '8 damage; pull 4'
							})),
							FactoryLogic.createAbilitySectionText('If the target is pulled adjacent to the muceron, the muceron can either make a free strike or use the Grab maneuver against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-5-feature-2',
						name: 'Tongue Pull',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Three creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('The muceron pulls each target up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-5-feature-3',
					name: 'Lethe',
					description: 'While the muceron is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the bendrak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-6',
			name: 'Remasch',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-6-feature-1',
						name: 'Abyssal Strike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; the remasch can teleport up to 2 squares',
								tier2: '6 damage; the remasch can teleport up to 3 squares',
								tier3: '8 damage; the remasch can teleport up to 5 squares'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The remasch takes an adjacent creature with them when they teleport. The creature appears in an unoccupied space adjacent to the remasch’s destination.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-6-feature-2',
						name: 'Grasping Shadows',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The remasch can teleport up to 2 squares and uses Abyssal Strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-6-feature-3',
					name: 'Lethe',
					description: 'While the remasch is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the remasch can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-7',
			name: 'Ruinant',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-7-feature-1',
						name: 'Bloodletting Claw',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage; M<2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-7-feature-2',
						name: 'Salt Wounds',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** Each target must be at less than full Stamina.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 corruption damage',
								tier2: '2 corruption damage',
								tier3: '3 corruption damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-7-feature-3',
					name: 'Lethe',
					description: 'While the ruinant is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-7-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ruinant can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-8',
			name: 'Torlas',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-8-feature-1',
						name: 'Floor to Flesh',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'Slide 3',
								tier2: 'Slide 4',
								tier3: 'Slide 5'
							})),
							FactoryLogic.createAbilitySectionText('The ground in the area turns into a morass of spongy flesh before the targets are force moved. Until the start of the torlas’s next turn, the area is difficult terrain, and each creature who moves in the area takes 1 damage for each square moved.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-8-feature-2',
						name: 'Grasping Tendons',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('The torlas pulls each target up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-8-feature-3',
					name: 'Lethe',
					description: 'While the torlas is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-8-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the torlas can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-8-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-9',
			name: 'Chorogaunt',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, 2, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-1',
						name: 'Agonizing Harmony',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 psychic damage; I<1 slowed (save ends)',
								tier2: '7 psychic damage; I<2 slowed (save ends)',
								tier3: '10 psychic damage; I<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 10 squares of the chorogaunt shifts up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-2',
						name: 'Chaotic Entrancing Harmony',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt slides each target up to 3 squares, ignoring stability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-3',
						name: 'I Thrive on Pain',
						cost: 3,
						type: FactoryLogic.type.createTrigger('The chorogaunt is targeted by a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Any damage from the strike is halved, and the chorogaunt’s abilities deal an extra 3 damage until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the chorogaunt can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-5',
					name: 'Lethe',
					description: 'While the chorogaunt is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-6',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the chorogaunt can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-9-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-8',
						name: 'Frightening Tones',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three enemies',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must choose between taking 5 psychic damage, or being frightened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-9',
						name: 'Bully the Weak',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt kills the target, and each other ally in the encounter deals an extra 3 damage with strikes until the end of the round. The Director gains Malice equal to the number of heroes in the encounter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-10',
						name: 'Running Cacophony',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt shifts up to their speed, uses Agonizing Harmony, shifts up to their speed, and then uses Agonizing Harmony again.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-1',
			name: 'Grulqin',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 9,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(3, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-1-feature-1',
						name: 'Spinning Bone Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '5 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('The grulqin gains an edge on this ability if they previously moved 3 or more squares in a straight line on their turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-1-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the grulqin can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-2',
			name: 'Orliq',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(-1, 3, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-2-feature-1',
						name: 'Soul Prism',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 corruption damage; slide 2',
								tier2: '4 corruption damage; vertical slide 2',
								tier3: '6 corruption damage; vertical slide 4'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-2',
					name: 'Imposing Energy',
					description: 'Any enemy who starts their turn with two or more orliq adjacent to them is slowed (EoT).'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the orliq can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-3',
			name: 'Wobalas',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(1, 3, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-3-feature-1',
						name: 'Despair Bolt',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 psychic damage',
								tier2: '5 psychic damage',
								tier3: '7 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('The target takes a bane on their next strike. If the target is winded, they have a double bane on their next strike instead.')
						]
					})
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-4',
			name: 'Bale Eye',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 30,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 3, 3, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-4-feature-1',
						name: 'Wilting Visions',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 psychic damage',
								tier2: '8 psychic damage',
								tier3: '9 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('The target has corruption weakness 5 (EoT).'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The target has I<2 corruption weakness 5 (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-4-feature-2',
						name: 'Demonwarp Tears',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The bale eye must create the cube beneath themself.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 psychic damage, A<1 the target is warped (save ends)',
								tier2: '5 psychic damage, A<2 the target is warped (save ends)',
								tier3: '6 psychic damage, A<3 the target is warped (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While warped, a creature has a double bane on power rolls using any characteristic higher than 0, and has a double edge on power rolls using any characteristic lower than 0.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-3',
					name: 'Lethe',
					description: 'While the bale eye is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of the bale eye can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-5',
			name: 'Fangling',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-5-feature-1',
						name: 'Tooth! Tusk! Claw!',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '9 damage'
							})),
							FactoryLogic.createAbilitySectionText('Each enemy adjacent to the fangling takes 2 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-5-feature-2',
						name: 'Tumbling Gore',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 3, within: 1 }) ],
						target: 'All enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage; pull 1; A<1 bleeding (save ends)',
								tier2: '3 damage; pull 1; A<2 bleeding (save ends)',
								tier3: '4 damage; pull 1; A<3 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-3',
					name: 'Made of Teeth',
					description: 'Whenever an adjacent enemy grabs the fangling or uses a melee ability against the fangling, they take 2 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-4',
					name: 'Lethe',
					description: 'While the fangling is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-5',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the fangling can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-5-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-6',
			name: 'Fiktin',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 2, 2, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-6-feature-1',
						name: 'Violent Transformation',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 corruption damage',
								tier2: '6 corruption damage',
								tier3: '7 corruption damage; I<3 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The fiktin violently changes shape, dealing an extra 6 damage to any target they were hidden from with their Aggressive Mimicry ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-6-feature-2',
						name: 'Aggressive Mimicry',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The fiktin transforms into a mundane object of their size or smaller and is automatically hidden. They can revert to their true form as a free maneuver.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-3',
					name: 'Lethe',
					description: 'While the fiktin is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the fiktin can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-7',
			name: 'Gunge',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 25,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 1, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-1',
						name: 'Bilious Expulsion',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 })
						],
						target: 'One creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 acid damage; M<1 slowed (save ends)',
								tier2: '7 acid damage; M<2 slowed (save ends)',
								tier3: '9 acid damage; M<3 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The ground and any surfaces in the area pool with slime. The slime is difficult terrain for enemies, and any enemy is bleeding while in the area.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-2',
						name: 'Spew Slide',
						type: FactoryLogic.type.createTrigger('The gunge takes damage from a melee strike.', { free: true }),
						cost: 1,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The gunge vomits with great force, letting them shift up to their speed and ignore any additional effects from the strike. The space the gunge occupied before the shift is covered in slime that is difficult terrain for enemies. Additionally, any enemy is bleeding while in the slime.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-3',
					name: 'Lethe',
					description: 'While the gunge is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the gunge can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-8',
			name: 'Tormenauk',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 45,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 2, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-8-feature-1',
						name: 'Many Maws',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 damage',
								tier2: '9 damage',
								tier3: '11 damage; grabbed, and the target takes a bane on the Escape Grab maneuver'
							})),
							FactoryLogic.createAbilitySectionText('Any target grabbed this way takes 4 psychic damage at the start of each of the tormenauk’s turns.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-8-feature-2',
						name: 'Agony Wail',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 psychic damage; I<2 dazed (save ends)',
								tier2: '6 psychic damage; I<3 dazed (save ends)',
								tier3: '8 psychic damage; I<4 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The potency increases by 1 if the target is grabbed by the tormenauk.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-3',
					name: 'Lethe',
					description: 'While the tormenauk is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the tormenauk can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-8-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-9',
			name: 'Lumbering Egress',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 180,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(4, -1, 1, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-1',
						name: 'Ensnarer Cannon',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 corruption damage; A<2 restrained (save ends)',
								tier2: '16 corruption damage; A<3 restrained (save ends)',
								tier3: '19 corruption damage; A<4 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Two **ensnarers** appear in unoccupied spaces adjacent to each target. On a tier 3 outcome, four ensnarers appear.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-2',
						name: 'Demonic Egress',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Four level 1 demon minions (most commonly **ensnarers**, **frenzieds**, and **pitlings**) burst forth from the egress and appear in unoccupied squares in the area.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Four level 4 demon minions (most commonly **orliq**, **grulqins**, and **wobalas**) appear instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-3',
						name: 'Abyssal Protectors',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The last ally minion on the encounter map dies, or the egress is reduced below 25 Stamina.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Eight **ensnarers** appear anywhere in the area.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-9-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the egress can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-9-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-8',
						name: 'Frenzied Deluge',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 corruption damage',
								tier2: '12 corruption damage',
								tier3: '15 corruption damage; two **frenzieds** appears in an unoccupied spaces adjacent to each target.'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-9',
						name: 'Fold Space',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The egress folds into their own portal and teleports to an unoccupied space within distance. Four level 4 demon minions (most commonly **orliq**, **grulqins**, and **wobalas**) appear in squares in the egress’s former space.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-10',
						name: 'Blood of the Abyss',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 3, within: 1 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 corruption damage; R < 2 weakened (save ends)',
								tier2: '11 corruption damage; R < 3 weakened (save ends)',
								tier3: '14 corruption damage; R < 4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The egress recalls and instantly destroys any minion allies on the encounter map. A torrent of churned-up minion bodies, blood, and ichor erupts from the egress, dealing an extra 1 damage for each minion destroyed this way.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-1',
			name: 'Soulraker Scout',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(2, 4, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-1-feature-1',
						name: 'Soul Stinger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 poison damage',
								tier2: '5 poison damage; the scout can shift 1 square',
								tier3: '7 poison damage: the scout shifts up to 3 square'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-1-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-2',
			name: 'Soulraker Soldier',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(4, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-2-feature-1',
						name: 'Chitin Bash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage; push 2',
								tier2: '7 damage; push 2',
								tier3: '8 damage; push 4'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-2-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-3',
			name: 'Soulraker Stinger',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(0, -1, 4, 4, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-3-feature-1',
						name: 'Barb Launch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 poison damage',
								tier2: '7 poison damage',
								tier3: '8 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('All soulraker demons have concealment from the target until the start of the stinger’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-3-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-4',
			name: 'Blight Phage',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 4, 3, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-4-feature-1',
						name: 'Blight Pus',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 corruption damage',
								tier2: '10 corruption damage',
								tier3: '11 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('A puddle of blight—digested soul juice—covers the ground in the target’s square, which is affected as if by **Seeping Blight** (see the Level 7+ **Demon Malice** feature).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-4-feature-2',
						name: 'Blight Rain',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The blight phage must create the cube beneath themself.'),
							FactoryLogic.createAbilitySectionText('The blight phage spins and sheds corruptive blight to fill the area, which is treated as if affected by **Seeping Blight**.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The blight phage chooses three 2 cube areas within 10 squares of the phage. Each area is covered with blight and treated as if affected by **Seeping Blight**.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-4-feature-3',
					name: 'Lethe',
					description: 'While the blight phage is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the blight phage can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-5',
			name: 'Chimeron',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 90,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(4, 0, 2, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-5-feature-1',
						name: 'Flux Gnash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '9 cold, fire, or sonic damage',
								tier2: '11 cold, fire, or sonic damage',
								tier3: '13 cold, fire, or sonic damage; M<4 bleeding, dazed, or slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Special:** After making the power roll, the chimeron decides what damage type the ability deals and which condition it imposes.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-5-feature-2',
						name: 'Pain Absorption',
						type: FactoryLogic.type.createTrigger('The chimeron is targeted by a damage-dealing strike.'),
						cost: 1,
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimeron halves the damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-5-feature-3',
					name: 'Lethe',
					description: 'While the chimeron is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the chimeron can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-6',
			name: 'Styrich',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 45,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 4, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-6-feature-1',
						name: 'Hair Whip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(4) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage; pull 1',
								tier2: '10 damage; pull 2, grabbed',
								tier3: '12 damage; pull 3, grabbed'
							})),
							FactoryLogic.createAbilitySectionText('Any target restrained by the styrich’s Tangled Nest ability can be pulled the distance determined by the power roll.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-6-feature-2',
						name: 'Tangled Nest',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'A<2 slowed (save ends)',
								tier2: 'Slowed (EoT) or A<3 3 damage and restrained (EoT)',
								tier3: 'Restrained (EoT) or A<4 3 damage and restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-6-feature-3',
					name: 'Lethe',
					description: 'While the styrich is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the styrich can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-7',
			name: 'Soulraker Praetorian',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 4, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-7-feature-1',
						name: 'Barbed Stinger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 poison damage; push 2',
								tier2: '10 poison damage; push 2',
								tier3: '11 poison damage; push 4; A<4 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The praetorian can shift into each square the target leaves.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-7-feature-2',
						name: 'Stinging Departure',
						type: FactoryLogic.type.createTrigger('A creature ends the praetorian’s grab.'),
						cost: 2,
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The praetorian makes a free strike against the target, breaks off part of their stinger in the target, and shifts up to half their speed. The target is bleeding until they remove the stinger fragment as a free maneuver, taking 6 damage in the process.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-7-feature-3',
					name: 'Lethe',
					description: 'While the praetorian is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-7-feature-4',
					name: 'Praetorian Buzzing',
					description: 'Any creature who starts their turn with two or more praetorians adjacent to them takes 6 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-8',
			name: 'Soulraker Handmaiden',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(0),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 2, 2, 4),
			features: [
				FactoryLogic.feature.create({
					id: 'demon-3rd-8-feature-1',
					name: 'Implanted Parasite',
					description: `
A host creature implanted by a soulraker hivequeen’s **Stinging Ovipositor** has no physical or mental signs of the handmaiden gestating inside the host’s body.

After 1d3 + 1 weeks of gestation, the handmaiden fully forms inside the host. The handmaiden always moves with and occupies the same space as the host and can’t be separated from them. While totally within the creature, the handmaiden doesn’t have line of effect to the host or targets outside the host and vice versa.

As a maneuver, the handmaiden can emerge from the host as a horrifying tower of flesh and bone that remains attached to the host’s insides. While emerged, the handmaiden can use a move action to make the host move up to their speed and has access to the host’s signature abilities, using the host’s modifiers for any power rolls. The handmaiden has the same Stability as the host. If the handmaiden or host is force moved, the other moves with them. While emerged, the handmaiden can be targeted independently of the host. The handmaiden can retreat totally within the host’s body as a maneuver. If the handmaiden dies, their remains separate from the host.

The Find a Cure downtime project in *Draw Steel: Heroes* can be used to find a cure that removes a handmaiden from a host. The cure kills the handmaiden when consumed.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-8-feature-2',
						name: 'Emergent Horrors',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '8 corruption damage',
								tier2: '11 corruption damage',
								tier3: '13 corruption damage; M<4 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the handmaiden was totally within their host’s body at the start of this turn, the ability deals an extra 8 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-8-feature-3',
					name: 'Lethe',
					description: 'While the handmaiden is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-8-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-9',
			name: 'Soulraker Hivequeen',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(5),
			speed: FactoryLogic.createSpeed(6),
			stamina: 240,
			stability: 2,
			freeStrikeDamage: 9,
			characteristics: FactoryLogic.createCharacteristics(5, -1, 3, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-1',
						name: 'Stinging Ovipositor',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '14 poison damage; M<3 bleeding (save ends)',
								tier2: '19 poison damage; M<4 bleeding (save ends)',
								tier3: '23 poison damage; M<5 the target is implanted'
							})),
							FactoryLogic.createAbilitySectionText('An implanted target has a **soulraker handmaiden** parasite gestating in them (see the handmaiden’s **Implanted Parasite** trait).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-2',
						name: 'Forced Gestation',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each implanted handmaiden parasite in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The hivequeen lets loose a subsonic call to each target, forcing them to immediately emerge from their host’s body as a mature **soulraker handmaiden** and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-3',
						name: 'For the Queen!',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The hivequeen is targeted by a strike for the second time on an attacker’s turn, whether by the attacker or another creature acting on the attacker’s turn.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Two soulraker minions appear within distance.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'A **soulraker praetorian** also appears within distance.'
							})

						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-9-feature-4',
					name: 'Cannibal Queen',
					description: 'At the end of their turn, the hivequeen can consume an adjacent soulraker demon to end one effect on them that can be ended by a saving throw (no action required).'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-9-feature-5',
					name: 'Hive Soulsight',
					description: 'Any creature within 2 squares of a soulraker demon within 100 miles of the hivequeen can’t be hidden from the hivequeen. The hivequeen has line of effect to such creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-9-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-7',
						name: 'Kicking the Nest',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each soulraker minion in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can move their speed and make a free strike. If no minions are present, four soulraker minions are summoned into unoccupied spaces within distance before the hivequeen uses this villain action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-8',
						name: 'Buzz Off!',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'Push 3; I<3 dazed (save ends)',
								tier2: 'Push 3; I<4 dazed (save ends)',
								tier3: '11 sonic damage; push 3; I<5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The hivequeen shifts up to her speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-9',
						name: 'Bomber Wasp Warfare',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Four 2 cubes within 10') ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 poison damage; M<3 bleeding (save ends)',
								tier2: '11 poison damage; M<4 bleeding (save ends)',
								tier3: '14 poison damage; M<5 bleeding (save ends)'
							}))
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-1',
			name: 'Optacus',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 5,
			withCaptain: '+4 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(1, 3, 1, 5, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-1-feature-1',
						name: 'Optical Flare',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 fire damage',
								tier2: '8 fire damage',
								tier3: '10 fire damage; this damage ignores immunity'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores concealment. A winded target takes an extra 5 damage.')
						]
					})
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-1-feature-2',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-2',
			name: 'Tyburaki',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8, 'swim'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: '+4 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(2, 5, 0, 3, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-2-feature-1',
						name: 'Tail Bite',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '9 damage'
							})),
							FactoryLogic.createAbilitySectionText('The tyburaki can make a free strike against each enemy adjacent to the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-2-feature-2',
					name: 'Breacher',
					description: 'While swimming, the tyburaki can jump 5 squares as part of their movement.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-2-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the tyburaki can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-3',
			name: 'Unguloid',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 17,
			stability: 3,
			freeStrikeDamage: 5,
			withCaptain: 'Have a double edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(5, 5, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-3-feature-1',
						name: 'Gore Horn',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; push 2',
								tier2: '8 damage; push 4',
								tier3: '10 damage; push 6'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of a charge for which the unguloid moves 2 squares or more, it deals an extra 10 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-3-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the unguloid can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-4',
			name: 'Izyak',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6, 'teleport'),
			stamina: 55,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 5, 2, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-4-feature-1',
						name: 'Nostalgic Wanderlust',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '9 psychic damage; R<3 restrained (save ends)',
								tier2: '12 psychic damage; R<4 restrained (save ends)',
								tier3: '14 psychic damage; R<5 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The izyak can slide any target restrained this way up to 3 squares.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'The izyak can vertical slide any target restrained this way up to 6 squares instead. A target left in midair doesn’t fall until the restrained condition ends.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-4-feature-2',
						name: 'Ruinous Temptation',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 psychic damage; I<3 dazed (save ends)',
								tier2: '7 psychic damage; I<4 dazed (save ends)',
								tier3: '9 psychic damage; I<5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any target dazed this way must use a move action to move their speed toward the izyak on their next turn.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The area increases to a 6 cube.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-4-feature-3',
					name: 'Lethe',
					description: 'While the izyak is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of the izyak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-5',
			name: 'Vicisitator',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(9),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: FactoryLogic.createCharacteristics(4, 5, -1, -2, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-5-feature-1',
						name: 'Warp Touch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '9 damage',
								tier2: '12 damage',
								tier3: '14 damage; I<5 the target is slowed and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Special:** The effects of being slowed and weakened this way can’t be ignored.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-5-feature-2',
						name: 'Soul Flay',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 psychic damage; P<3 bleeding (save ends)',
								tier2: '7 psychic damage; P<4 bleeding (save ends)',
								tier3: '9 psychic damage; P<5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any creature who is bleeding from this ability loses 2d6 Stamina instead of 1d6.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-5-feature-3',
					name: 'Lethe',
					description: 'While the vicisitator is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the vicisitator can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-6',
			name: 'Aurumvas',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(5, 2, 5, 3, 5),
			features: [
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-1',
					name: 'Absorb Soul',
					description: 'Whenever any demon is reduced to 0 Stamina within 10 squares of Aurumvas, the Director gains 1 Malice. Aurumvas loses this trait while he is dazed.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-2',
						name: 'Greedy Hands',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 corruption damage; R<4 weakened (save ends)',
								tier2: '20 corruption damage; R<5 weakened (save ends)',
								tier3: '24 corruption damage; R<6 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Aurumvas regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-3',
						name: 'Covetous Bolts',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 psychic damage; P<4 dazed (save ends)',
								tier2: '20 psychic damage; P<5 dazed (save ends)',
								tier3: '24 psychic damage; P<6 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'While dazed this way, a target can’t gain Heroic Resources.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-4',
						name: 'Greed Is Good',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas chooses a supernatural treasure or an item made of gold and teleports to an unoccupied space adjacent to that object, then ends one effect on him that can be ended by a saving throw.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-5',
					name: 'More … More …',
					description: 'While Aurumvas is winded, he has a double edge on strikes.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-6',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of Aurumvas can’t be hidden from him.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-6-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-8',
						name: 'Time Is Money',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 20 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas warps time with his abyssal avarice. Each target can teleport up to their speed and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-9',
						name: 'Hostile Acquisition',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas chooses up to three treasures within distance that he has line of effect to and that aren’t artifacts. Until the end of the encounter, ethereal golden snakes swirl around the target treasures. While an affected treasure is worn or held by a hero, each time that hero gains any amount of their Heroic Resource, the Director gains 1 Malice.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-10',
						name: 'No Matter the Cost',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Four 3 cubes within 10') ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas summons treasures from his vaults into the area, then causes them to explode.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '10 fire damage; push 1',
								tier2: '15 fire damage; push 2',
								tier3: '19 fire damage; push 3'
							}))
						]
					})
				})
			]
		})
	],
	addOns: []
};
