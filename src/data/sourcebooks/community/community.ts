import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

// #region Ancestries

const aranox: Ancestry = {
	id: 'ancestry-aranox',
	name: 'Aranox',
	description: `
*By Marc Aranha*

The Aranox are direct decendents of Minotaurs. After the rebellion against the Beast Lords of Kham, most Minotaurs scattered, driven by a bestial urge to hunt and settle on labyrinthine terrain. Wandering alone or in small tribes, the Minotaurs were slowly consumed by the beast within, until little remained but a constant hunger and rage, turning them into the monstrous creatures many know today.

However, some Minotaur resisted this hunger, seeking to find balance with their inner beast in order to retain their sense of self and their human origins. Bonded by purpose and community, these Minotaur formed larger clans, far from the eyes of civilization, and became the Aranox.

The Aranox ability to stave off the beast for so long is attributed to their Life Oath. While Minotaurs possess a fierce loyalty to those they bond with, the Aranox discovered a means to tap into that bond, pledging themselves to another with ritual and Shamanic ceremony. The beast in each was stifled by sharing it with another. Together, two souls became a shield and a salvation.

Aranox generally look upon Minotaurs with sadness, often referring to them as 'those who are lost'. Aranox shun their forebears and some even hunt solitary Minotaur, considering death a mercy. This belief may be explained by rumors suggesting that when an Aranox loses their bonded partner, the loss of the Life Oath begins an irreversible descent into madness and rage.

It is whispered that, with the Life Oath broken, it is not a matter of 'if' but 'when' the beast takes hold again, for each Aranox can only ever have one Life Oath. Thus, an afflicted Aranox will go into self-exile to spare the larger community. It is a fate no Aranox will speak of, that each will one day become Minotaur once again. In the end, the beast within is always there. Waiting.`,
	features: [
		FactoryLogic.feature.createSize({
			id: 'aranox-1',
			name: 'Beast Within',
			description: 'Your Minotaur forebears were consumed by the beast, giving them their monstrous size. Your tenuous control has made you smaller by comparison, but the beast within is still there, waiting.',
			sizeValue: 1,
			sizeMod: 'L'
		}),
		FactoryLogic.feature.createChoice({
			id: 'aranox-2',
			name: 'Aranox Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2a',
						name: 'Always Angry',
						description: 'The beast rages within you, and its anger makes you incredibly strong. You gain an edge on tests made to lift and haul heavy objects. In addition, whenever you force move a creature or object, the forced movement distance gains a +1 bonus.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2b',
						name: 'Goring Horns',
						description: 'Your horns aren\'t just imposing, they\'re also sharp. Once per round when you make a melee strike, you can deal extra damage with the strike equal to your highest characteristic score.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'aranox-2c',
						name: 'Leaping Strides',
						description: 'Your powerful legs make you faster.',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aranox-2d',
						name: 'Stubborn Resolve',
						description: 'You\'ll move when you want to, and not a moment sooner.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2e',
						name: 'That Tickles',
						description: 'You are able to shrug off the puny blows of your enemies. Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature\'s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aranox-2f',
							name: 'Unleash',
							description: 'With a ferocious roar, you strike out with fist and hoof.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 damage',
										tier2: '5 damage; push 1',
										tier3: '7 damage; push 2'
									})
								)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Aranox', 'Secluded, communal, labor.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.communal, UpbringingData.labor, 'Khamish')
};

const asomath: Ancestry = {
	id: 'ancestry-asomath',
	name: 'Asomath',
	description: `
*by Dima Serbin*

Far from the center of the multiverse lies the obscure, toxic world of Hazzox, the homeworld of beings known throughout the timescape as asomaths — sentient, formless clouds composed entirely of gas. Their gaseous nature does not prevent them from building cities or shaping the world around them to suit their needs, as they are capable of compressing their forms to generate pressure. Particularly valued within asomath society are those gifted with psionic talent, able to shape and create matter with nothing more than a thought.

After encountering visitors from outer space, the asomaths came to realize that other worlds existed beyond their own — worlds largely inhospitable to the sentient gases of Hazzox. The only protection they possess against dissipating in these alien atmospheres are their environmental suits, which they control through subtle shifts in internal pressure. Now, though rarely, one might encounter a walking heap of metal in the shape of a person — and hope that the asomath inside is one of the good ones.`,
	features: [
		FactoryLogic.feature.createChoice({
			id: 'asomath-feature-1',
			name: 'Purchased Traits',
			description: '',
			options: [
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'asomath-feature-1a',
						name: 'Grounded',
						description: 'Your heavy metal suit makes it difficult for others to move you.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'asomath-feature-1b',
						name: 'Hard Body',
						description: 'Whenever you are force moved or fall, any creature or object you collide with takes an additional 2 damage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'asomath-feature-1c',
						name: 'Hardened Plates',
						description: 'Your envirosuit is reinforced with hardened metal plates.',
						field: FeatureField.Stamina,
						valuePerEchelon: 6
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'asomath-feature-1d',
						name: 'Stand Tough',
						description: 'Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature’s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'asomath-feature-1e',
							name: 'Teleplasty',
							description: 'As the gas fills the mechanism, it suddenly starts to move.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'Special',
							sections: [
								FactoryLogic.createAbilitySectionText(`
Your gaseous body can enter an inanimate mechanical object, gaining an edge on any power roll made to interact with it. You don’t need any additional tools that you would usually need to interact with the object, such as requiring lockpicks to pick a lock.

Alternatively, you can enter an intact corpse of a creature, taking full control over it until the end of your turn. You can spend 1 Recovery at the end of that turn to continue controlling the corpse until you leave it. While you are controlling the corpse, you are considered unconscious, except that you perceive your surroundings through the corpse. The corpse acts on your turn, using the creature’s stat block with its Stamina at winded value, and your Reason, Intuition, and Presence scores. You can't use the creature's main action and your main action on the same turn. If you leave the corpse or it is destroyed, you immediately stop being unconscious, standing up from prone as a free maneuver. You can leave the corpse as a free maneuver.

You can’t use this ability again until you earn 1 or more Victories.`)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		}),
		FactoryLogic.feature.createMultiple({
			id: 'asomath-feature-2',
			name: 'Envirosuit',
			features: [
				FactoryLogic.feature.create({
					id: 'asomath-feature-2a',
					name: 'Envirosuit',
					description: 'You possess an environmental suit that serves as your container, allowing you to better interact with the environment alien to your ancestry. You can’t suffocate, and you don’t need to eat or drink to stay alive.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'asomath-feature-2b',
					name: 'Poison Immunity',
					modifiers: [
						FactoryLogic.damageModifier.createPerLevel({
							damageType: DamageType.Poison,
							modifierType: DamageModifierType.Immunity,
							value: 1
						})
					]
				})
			]
		}),
		FactoryLogic.feature.create({
			id: 'asomath-feature-3',
			name: 'Heavyweight',
			description: 'Whenever another creature attempts to force move you, you treat your size as one size larger than it is.'
		})
	],
	ancestryPoints: 3
};

const beastfolk: Ancestry = {
	id: 'ancestry-beastfolk',
	name: 'Beastfolk',
	description: `
*By Andy Aiken*

Across the world - and across many worlds - humanoid cultures sometimes arise that resemble the animals around them.

"Beastfolk" is not the name of a single people; it is a convenient term used by scholars and travelers to describe a wide variety of humanoid peoples who bear the traits of animals. Wolf-headed hunters, feathered skyfolk, scaled serpentkin, nimble catfolk, and countless others are all grouped under this broad label.`,
	features: [
		FactoryLogic.feature.createChoice({
			id: 'beastfolk-1',
			name: 'Primal Instinct',
			description: 'The animal spirit within you emerges in moments of danger.',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-1',
						name: 'Pack Instinct',
						description: `
*You fight best beside your allies.*

You gain an edge on melee strikes against enemies who are  adjacent to at least two of your allies.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-2',
						name: 'Predator Instinct',
						description: `
*You know how to finish the hunt.*

You gain a bonus to strike damage equal to your echelon against winded enemies. 

You gain an edge on Track tests.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-3',
						name: 'Rampager Instinct',
						description: `
*You overwhelm enemies through sheer force.*

When you force move a creature, you deal damage to it equal to the distance moved.

You gain an edge on Intimidate tests.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-1-4',
						name: 'Skirmisher Instinct',
						description: 'You strike and vanish before retaliation',
						features: [
							FactoryLogic.feature.createBonus({
								id: 'beastfolk-1-4a',
								field: FeatureField.Disengage,
								value: 1
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-1-4b',
								name: 'Skirmisher Instinct',
								description: 'You gain an edge on Gymnastics and Jump tests.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-5',
						name: 'Stalker Instinct',
						description: `
*You are patient and unseen.*

You gain an edge on Hide and Sneak tests.

Your first strike against a creature that hasn’t acted yet this encounter gains an edge.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-6',
						name: 'Survivor Instinct',
						description: `
*You refuse to fall.*

When you become winded, you gain temporary Stamina equal to your level.

You gain an edge on Alertness and Endurance tests.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-1-7',
						name: 'Trickster Instinct',
						description: `
*You survive through misdirection and cleverness.*

When a creature misses you with a strike, you can use a triggered action to shift up to 2 squares. 

You gain an edge on Lie and Persuade tests.`
					}),
					value: 1
				}
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'beastfolk-2',
			name: 'Purchased Traits',
			options: [
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'beastfolk-2-1',
						name: 'Natural Armor',
						description: 'Your skin is dense or leathery, or you have an exoskeleton.',
						field: FeatureField.Stamina,
						value: 3,
						valuePerLevel: 3
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-2',
						name: 'Regeneration',
						description: `
*Your body heals with unnatural speed.*

If you are winded at the start of your turn, you immediately regain Stamina equal to your echelon.`
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-3',
						name: 'Slippery Body',
						description: 'Your scales or skin make you difficult to restrain.',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-3a',
								selected: [ 'Escape Artist' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-3b',
								name: 'Slippery Body',
								description: 'Enemies suffer a bane on attempts to grab you.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-4',
						name: 'Spines',
						description: `
*Your body is covered in quills or barbs.*

When a creature attempts to grab you, it takes damage equal to your echelon.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-5',
						name: 'Echolocation',
						description: `
*You perceive your surroundings through reflected sound.*

You ignore concealment and invisibility against creatures within 3 squares that are not hidden.

You suffer a bane on Alertness and Eavesdrop tests in areas of loud noise.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-6',
						name: 'Tremor Sense',
						description: `
*You feel vibrations through the ground.*

You can detect the location of any creatures touching the ground within 3 squares, even if they are hidden or invisible or you lack line of effect to them.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-7',
						name: 'Airborne',
						description: 'You can fly.',
						features: [
							FactoryLogic.feature.create({
								id: 'beastfolk-2-7a',
								name: 'Airborne',
								description: 'While flying, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While flying at 3rd level or lower, you have damage weakness 5.'
							}),
							FactoryLogic.feature.createMovementMode({
								id: 'beastfolk-2-7b',
								mode: 'Fly'
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-8',
						name: 'Amphibious',
						description: 'You are at home in the water.',
						features: [
							FactoryLogic.feature.create({
								id: 'beastfolk-2-8a',
								name: 'Amphibious',
								description: 'You can hold your breath for 1 hour.'
							}),
							FactoryLogic.feature.createMovementMode({
								id: 'beastfolk-2-8b',
								mode: 'Swim'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-9',
						name: 'Climber',
						description: 'You move easily across vertical surfaces.',
						features: [
							FactoryLogic.feature.createMovementMode({
								id: 'beastfolk-2-9a',
								mode: 'Climb'
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-9b',
								name: 'Climber',
								description: `
When a creature misses you with a melee strike while you are adjacent to a climbable surface, you can shift 1.

You gain an edge on Climb tests.`
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-10',
						name: 'Fey Stepper',
						description: `
*Your instincts echo the strange movement of fey beasts.*

When you take the Disengage move action, you can teleport that distance rather than shifting.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-11',
						name: 'Leaper',
						description: 'Your legs are built for explosive jumps.',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-11a',
								selected: [ 'Jump' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-11b',
								name: 'Leaper',
								description: 'When you jump, increase the distance by 2 squares.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMovementMode({
						id: 'beastfolk-2-12',
						name: 'Tunnel-Dweller',
						description: 'Using claws or mandibles, you can move through the earth.',
						mode: 'Burrow'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createSize({
						id: 'beastfolk-2-13',
						name: 'Big!',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-14',
						name: 'Camouflage',
						description: 'Your body blends naturally with your surroundings.',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-14',
								selected: [ 'Hide' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-14',
								name: 'Camouflage',
								description: 'You gain an edge on Hide tests.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-15',
						name: 'Hold Fast',
						description: `
*Your body is adapted for seizing prey.*

When you take the Grab maneuver you have an edge on your power roll; when you have a creature grabbed, they take a bane on their roll to escape your grab.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-16',
						name: 'Pack Tactics',
						description: `
*You and your allies know how to bring prey down together.*

When you use the Knockdown maneuver against an enemy adjacent to one of your allies, you gain an edge on the power roll.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-17',
						name: 'Powerful Build',
						description: 'You possess the mass and strength of powerful beasts.',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-17a',
								selected: [ 'Lift' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-17b',
								name: 'Powerful Build',
								description: 'You gain an edge on Might tests, and your Might score is treated as 1 higher for the purpose of resisting potencies.'
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-18',
						name: 'Prehensile Tail',
						description: 'Your tail is dexterous.',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-18a',
								selected: [ 'Climb', 'Gymnastics' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-18b',
								name: 'Prehensile Tail',
								description: 'You can retrieve small items without using your hands.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'beastfolk-2-19',
							name: 'Terrifying Roar',
							description: 'Your roar carries the authority of a primal predator.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionText('The target suffers a bane on its next strike.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-20',
						name: 'Ambush Predator',
						description: `
*You strike hardest from concealment.*

If you are hidden when you use a strike ability, you gain a double edge on your power roll (rather than the single edge you would normally get for being hidden).`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-21',
						name: 'Constrictor',
						description: `
*Your body coils with crushing strength.*

Creatures you have grabbed take damage equal to your echelon at the start of their turn.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-22',
						name: 'Gore',
						description: `
*You possess horns, antlers, tusks, or similar natural weapons built for driving attacks.*

When you take the Charge action, your strike gains +1d6 damage.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'beastfolk-2-23',
						name: 'Pounce',
						description: 'You leap upon prey with predatory force.',
						features: [
							FactoryLogic.feature.create({
								id: 'beastfolk-2-23a',
								name: 'Pounce',
								description: 'When you score a tier 3 result with a melee strike, you can knock the target prone.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'beastfolk-2-23b',
								selected: [ 'Jump' ]
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-24',
						name: 'Ram',
						description: `
*You strike with horns or antlers.*

Whenever you force move a creature or object, the forced movement distance gains a +1 bonus.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-25',
						name: 'Rending Claws',
						description: `
*Your claws tear flesh with savage force.*

When you score a tier 3 result with a melee strike, the target becomes bleeding (save ends).`
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'beastfolk-2-26',
							name: 'Tail Lash',
							description: 'Your hands aren’t the only things they need to watch out for.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Melee ],
							distance: [ FactoryLogic.distance.createMelee(2) ],
							target: 'One enemy',
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility ],
									tier1: '4 + M or A damage; push 1; M < 0 prone',
									tier2: '4 + M or A damage; push 1; M < 1 prone',
									tier3: '4 + M or A damage; push 1; M < 2 prone'
								}))
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'beastfolk-2-27',
						name: 'Venomous',
						description: `
*You can inject poison from your fangs, claws, or spines.*

When you score a tier 3 result with a melee strike, you can deal an additional 1d6 poison damage.`
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Beastfolk', 'Wilderness, communal, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.martial, 'Khamish')
};

const gallGuardian: Ancestry = {
	id: 'ancestry-gall-guardian',
	name: 'Gall Guardian',
	description: `
*By Heart of Arcana*

Some oaklings choose to walk a different path than their kin. Though it often results in their departure from the wode, these oaklings choose to gain knowledge and power at the expense of permitting parasitic wasps to lay their eggs within their wooden flesh. This choice results in a transformation that turns them from a being of leaf and acorn into a distorted gall creature, riddled and pockmarked with holes, a guardian of the wode`,
	features: [
		FactoryLogic.feature.createMultiple({
			id: 'gall-guardian-1',
			name: 'Wode Ward',
			features: [
				FactoryLogic.feature.createSize({
					id: 'gall-guardian-1a',
					sizeValue: 1,
					sizeMod: 'S'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'gall-guardian-1b',
					conditions: [ ConditionType.Frightened ]
				}),
				FactoryLogic.feature.create({
					id: 'gall-guardian-1c',
					name: 'Language of Insects',
					description: 'You can speak the language of insects.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'gall-guardian-1d',
					options: [
						{
							feature: FactoryLogic.feature.createDamageModifier({
								id: 'gall-guardian-1da',
								modifiers: [
									FactoryLogic.damageModifier.createValuePlusPerLevel({
										damageType: DamageType.Poison,
										modifierType: DamageModifierType.Immunity,
										value: 5,
										perLevel: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createDamageModifier({
								id: 'gall-guardian-1db',
								modifiers: [
									FactoryLogic.damageModifier.createValuePlusPerLevel({
										damageType: DamageType.Fire,
										modifierType: DamageModifierType.Immunity,
										value: 5,
										perLevel: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'gall-guardian-1e',
					name: 'Wode Ward',
					description: 'You gain an edge on Presence tests made to intimidate, coerce, or bully, but have a bane on Presence tests made to empathize or persuade.'
				})
			]
		})
	],
	ancestryPoints: 0,
	culture: FactoryLogic.createCulture('Gall Guardian', 'Wilderness, communal, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.martial, 'Yllyric')
};

const ironbound: Ancestry = {
	id: 'ancestry-ironbound',
	name: 'Ironbound',
	description: `
*By Andy Aiken*

The ironbound are living machines: bodies of iron, brass, and rune-etched steel animated by a mysterious spark. Though they resemble humanoids in shape, their forms are unmistakably artificial.`,
	features: [
		FactoryLogic.feature.createChoice({
			id: 'ironbound-1',
			name: 'Adaptive Chassis',
			description: 'Your body is built from modular mechanisms that can reconfigure into different modes when needed.',
			options: [
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'ironbound-1a',
						name: 'Assault Mode',
						features: [
							FactoryLogic.feature.createAbilityDamage({
								id: 'ironbound-1a-1',
								keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
								valuePerEchelon: 1
							}),
							FactoryLogic.feature.createBonus({
								id: 'ironbound-1a-2',
								field: FeatureField.Speed,
								value: 1
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'ironbound-1b',
						name: 'Bulwark Mode',
						features: [
							FactoryLogic.feature.create({
								id: 'ironbound-1b-1',
								name: 'Bulwark Mode',
								description: 'You gain an edge on tests to keep your footing on unstable surfaces such as ice, narrow ledges, swaying bridges, or collapsing ground.'
							}),
							FactoryLogic.feature.createBonus({
								id: 'ironbound-1b-2',
								field: FeatureField.Stability,
								value: 1
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-1c',
						name: 'Guardian Mode',
						description: 'When an adjacent ally is targeted by a strike, you can use a triggered action to swap places with the ally and become the new target of the strike, provided you are a valid target'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-1d',
						name: 'Infiltration Mode',
						description: `
* You can move at full speed while sneaking
* You gain an edge on Hide and Sneak tests`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-1e',
						name: 'Precision Mode',
						description: `
* Your attacks ignore partial cover
* You gain an edge on Eavesdrop and Track tests`
					}),
					value: 1
				}
			],
			respiteChange: true
		}),
		FactoryLogic.feature.createMultiple({
			id: 'ironbound-2',
			name: 'Iron Body',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'ironbound-2a',
					modifiers: [
						FactoryLogic.damageModifier.createPerLevel({
							damageType: DamageType.Poison,
							modifierType: DamageModifierType.Immunity,
							value: 1
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Lightning,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.create({
					id: 'ironbound-2b',
					name: 'Iron Body',
					description: 'You can’t suffocate, and you don’t need to eat or drink to stay alive.'
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'ironbound-3',
			name: 'Purchased Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-3a',
						name: 'Ablative Plating',
						description: 'When an enemy scores a tier 3 result against you with a strike, you can use a triggered action to lose Stamina equal to 1d6 plus your level and turn the tier 3 result into a tier 2 result.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-3b',
						name: 'Appraisal Engine',
						description: `
Your senses are built to read stress, weakness, and structural failure.

You gain an edge on tests to understand or analyze constructs, mechanisms, vehicles, and damaged objects.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSize({
						id: 'ironbound-3c',
						name: 'Big!',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-3d',
						name: 'Internal Reserves',
						description: `
Your body stores emergency power for moments of strain.

The first time in an encounter you become winded, you gain temporary Stamina equal to your level.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'ironbound-3e',
							name: 'Overdrive',
							description: 'You can briefly push your mechanisms beyond safe limits, for a cost.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionField({
									name: 'Note',
									effect: 'You cannot use this maneuver if you are dazed or weakened.'
								}),
								FactoryLogic.createAbilitySectionText('You can take one additional main action.'),
								FactoryLogic.createAbilitySectionText('When your turn ends, you lose Stamina equal to 1d6 plus your level and become dazed (save ends); when the dazed condition ends, you become weakened (save ends).')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-3f',
						name: 'Replay Memory',
						description: 'You gain an edge on tests made to recall previous events.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'ironbound-3g',
						name: 'Restoration Engine',
						description: `
When your Stamina reaches the negative of your winded value, you become inert instead of dying. You fall prone and can’t stand.

You continue to observe your surroundings, but you can’t speak, take main actions, maneuvers, move actions, or triggered actions. While inert this way, if you take any lightning damage, your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value.`
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2,
	culture: FactoryLogic.createCulture('Ironbound', 'Urban, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.martial, 'Rallarian')
};

const oakling: Ancestry = {
	id: 'ancestry-oakling',
	name: 'Oakling',
	description: `
*By Heart of Arcana*

*Children of the oak. Wild soul-sparks dancing in the trees. Wonder and joy, their arms stretching upwards and outwards. Ever seeking. Their hearts like green tendrils grasping for light.*
- Elder Druid Mogh Roith

Native to the great wodes of Orden, oaklings are the children of great-grandmother oak trees. Sprouting like acorns from her branches, they live in her trunk and defend both her and the wode from threats. Though they are tiny in stature, they hold within them the strength and vigor of the mightiest, sturdiest oaks.

Oaklings are as diverse as the oaks that bear them. Their distinction is evident in the color, size, and texture of their acorn cap. The combinations of the caps result in a colorful and diverse array of oakling presentations.`,
	features: [
		FactoryLogic.feature.create({
			id: 'oakling-1a',
			name: 'Acorn Retreat',
			description: 'Whenever you take damage from a creature, you can use a triggered action to retreat into your acorn cap and halve the damage. While in your acorn cap, your stability is 0, your speed is 0, you have psychic immunity equal to 5 plus your level, and fire weakness equal to 5 plus your level. You automatically exit your acorn cap at the end of your next turn.'
		}),
		FactoryLogic.feature.createSize({
			id: 'oakling-1b',
			name: 'Tiny!',
			description: 'Your stature is compact and dense.',
			sizeValue: 1,
			sizeMod: 'T'
		}),
		FactoryLogic.feature.createChoice({
			id: 'oakling-2',
			name: 'Oakling Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'oakling-2a',
						name: 'Poison Protector',
						description: 'The leaves on your body are vibrant and poisonous. Whenever you take damage from a creature within 2, you can use a triggered action to cause that creature to gain poison weakness equal to twice your highest characteristic score (EoT).'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'oakling-2b',
						name: 'Ritual Host',
						description: 'You permit poison mistletoe to grow within and on your wooden body. Whenever you deal damage with an ability, you can have it deal poison damage instead of its original damage type.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'oakling-2c',
						name: 'Roots of the Blue Oak',
						description: 'The wood that makes up your body is as sturdy as the most ancient oak.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'oakling-2d',
						name: 'Strength of the White Oak',
						description: 'The sinew of your wooden body is as strong as iron! Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature’s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'oakling-2e',
						name: 'Heartwood',
						description: 'Your core is unshakable.',
						conditions: [ ConditionType.Frightened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'oakling-2f',
						name: 'Gift of Woodspeech',
						description: 'You naturally speak the language of trees and plant creatures. In addition, once per day, you can touch a piece of wood and learn the name of the last person who touched it before you.'
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4,
	culture: FactoryLogic.createCulture('Oakling', 'Wilderness, communal, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.martial, 'Yllyric')
};

const deva: Ancestry = {
	id: 'ancestry-deva',
	name: 'Deva',
	description: `
*By Andy Aiken*

Across many lands there are those whose bodies and spirits carry the imprint of the world’s primal forces. Known collectively as devas, these individuals embody an elemental principle in their blood - if indeed they have blood, as it would perhaps be more accurate to think of them as the very manifestations of the elements themselves.`,
	features: [
		FactoryLogic.feature.createChoice({
			id: 'deva-1',
			name: 'Elemental Core',
			options: [
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-1',
						name: 'Air',
						description: 'Air is the element of movement. Devas with this elemental core are known as Storm-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-1a',
								switch: 'Elemental Core',
								value: 'Air'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-1b',
								name: 'Aura',
								description: 'If the target is an enemy, you push the target a number of squares equal to your echelon.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-1c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals lightning damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-2',
						name: 'Earth',
						description: 'Earth is the element of permanence. Devas with this elemental core are known as Stone-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-2a',
								switch: 'Elemental Core',
								value: 'Earth'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-2b',
								name: 'Aura',
								description: `
If the target is an ally, the target gains +1 Stability until they leave your aura.

If the target is an enemy, each square adjacent to you is considered to be difficult terrain for that enemy until the start of its next turn.`,
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-2c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals untyped damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-3',
						name: 'Fire',
						description: 'Fire is the element of destruction. Devas with this elemental core are known as Ember-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-3a',
								switch: 'Elemental Core',
								value: 'Fire'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-3b',
								name: 'Aura',
								description: 'If the target is an enemy, the target takes fire damage equal to your echelon.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-3c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals fire damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-4',
						name: 'Green',
						description: 'Green is the element of creation and growth. Devas with this elemental core are known as Wild-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-4a',
								switch: 'Elemental Core',
								value: 'Green'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-4b',
								name: 'Aura',
								description: 'If the target is an ally, the target gains temporary Stamina equal to your level.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-4c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals poison damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-5',
						name: 'Rot',
						description: 'Rot is the element of decay. Devas with this elemental core are known as Grave-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-5a',
								switch: 'Elemental Core',
								value: 'Rot'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-5b',
								name: 'Aura',
								description: 'If the target is an enemy, the target takes a bane on their next power roll.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-5c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals corruption damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-6',
						name: 'Void',
						description: 'Void is the element of the mystery. Devas with this elemental core are known as Rift-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-6a',
								switch: 'Elemental Core',
								value: 'Void'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-6b',
								name: 'Aura',
								description: 'You teleport the target to a different unoccupied square adjacent to you. This affects both allies and enemies.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-6c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals psychic damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'deva-1-7',
						name: 'Water',
						description: 'Water is the element of change. Devas with this elemental core are known as Tide-kin.',
						features: [
							FactoryLogic.feature.createSwitchValue({
								id: 'deva-1-7a',
								switch: 'Elemental Core',
								value: 'Water'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-7b',
								name: 'Aura',
								description: 'You slide the target 1 square. This affects both allies and enemies.',
								tag: 'elemental-aura'
							}),
							FactoryLogic.feature.createPackageContent({
								id: 'deva-1-7c',
								name: 'Instability',
								description: 'Your Elemental Instability ability deals cold damage.',
								tag: 'elemental-instability'
							})
						]
					}),
					value: 1
				}
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'deva-2',
				name: 'Elemental Instability',
				description: 'You explode with barely-controlled energy.',
				type: FactoryLogic.type.createTrigger(`
Any of the following:

* You roll a natural 19 or 20
* The first time you become winded in an encounter
* The first time you become dying in an encounter
* You die`, { free: true }),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [],
						tier1: '2 damage',
						tier2: '3 damage',
						tier3: '5 damage'
					})),
					FactoryLogic.createAbilitySectionText('When this ability’s trigger condition is met, you must use this ability.'),
					FactoryLogic.createAbilitySectionText('When you use this ability, you can spend a surge to affect only enemies.'),
					FactoryLogic.createAbilitySectionPackage('elemental-instability')
				]
			})
		}),
		FactoryLogic.feature.createChoice({
			id: 'deva-3',
			name: 'Purchased Traits',
			options: [
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'deva-3-1',
							name: 'Elemental Aura',
							description: '“You want to see what I’m made of? Poor choice of words.”',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 1 }) ],
							target: 'Each creature in the area',
							sections: [
								FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, each target that enters or starts its turn in the area is subjected to an effect determined by your elemental core (see Aura in your element description). A creature can only be affected by this aura once per round.'),
								FactoryLogic.createAbilitySectionPackage('elemental-aura')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSwitchOptions({
						id: 'deva-3-2',
						name: 'Elemental Gift',
						description: 'You gain a feature related to your element.',
						switch: 'Elemental Core',
						options: [
							{
								value: 'Air',
								feature: FactoryLogic.feature.createBonus({
									id: 'deva-3-2a',
									field: FeatureField.Disengage,
									value: 1
								})
							},
							{
								value: 'Earth',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2b',
									name: 'Elemental Gift',
									description: 'When you take damage, you can use a triggered action to reduce it by your level.'
								})
							},
							{
								value: 'Fire',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2c',
									name: 'Elemental Gift',
									description: 'When you reduce an enemy to 0 Stamina, your next strike deals bonus damage equal to your echelon.'
								})
							},
							{
								value: 'Green',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2d',
									name: 'Elemental Gift',
									description: 'If you are winded at the start of your turn, you immediately regain 1 Stamina.'
								})
							},
							{
								value: 'Rot',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2e',
									name: 'Elemental Gift',
									description: 'When you reduce an enemy to 0 Stamina, one adjacent enemy takes damage equal to your echelon.'
								})
							},
							{
								value: 'Void',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2f',
									name: 'Elemental Gift',
									description: 'Once per encounter when you are targeted by a strike, you may teleport 3 squares before the attack resolves.'
								})
							},
							{
								value: 'Water',
								feature: FactoryLogic.feature.create({
									id: 'deva-3-2g',
									name: 'Elemental Gift',
									description: 'When you shift, you can slide one adjacent creature 1 square. If the creature is willing, you can slide it one additional square.'
								})
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSwitchOptions({
						id: 'deva-3-3',
						name: 'Elemental Nature',
						description: 'You manifest an affinity for your element.',
						switch: 'Elemental Core',
						options: [
							{
								value: 'Air',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-1d',
									features: [
										FactoryLogic.feature.createSkillChoice({
											id: 'deva-1-1d-skill',
											selected: [ 'Jump' ]
										}),
										FactoryLogic.feature.createBonus({
											id: 'deva-1-1d-speed',
											field: FeatureField.Speed,
											value: 1
										})
									]
								})
							},
							{
								value: 'Earth',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-2d',
									features: [
										FactoryLogic.feature.createSkillChoice({
											id: 'deva-1-2d-skill',
											options: [ 'Architecture', 'Blacksmithing', 'Carpentry', 'Endurance', 'Jewelry', 'Lift' ],
											count: 2
										}),
										FactoryLogic.feature.create({
											id: 'deva-1-2d-carry',
											name: 'Elemental Nature',
											description: 'Your carrying capacity is doubled.'
										})
									]
								})
							},
							{
								value: 'Fire',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-3d',
									features: [
										FactoryLogic.feature.createSkillChoice({
											id: 'deva-1-3d-skill',
											selected: [ 'Sabotage' ]
										}),
										FactoryLogic.feature.create({
											id: 'deva-1-3d-grab',
											name: 'Elemental Nature',
											description: 'When an enemy attempts to grab you, they take fire damage equal to your echelon.'
										})
									]
								})
							},
							{
								value: 'Green',
								feature: FactoryLogic.feature.createSkillChoice({
									id: 'deva-1-4d',
									options: [ 'Handle Animal', 'Monsters', 'Nature', 'Ride' ],
									count: 2
								})
							},
							{
								value: 'Rot',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-5d',
									name: 'Nature',
									description: 'When an adjacent creature drops to 0 Stamina, you gain Stamina equal to your echelon.'
								})
							},
							{
								value: 'Void',
								feature: FactoryLogic.feature.createSkillChoice({
									id: 'deva-1-6d',
									selected: [ 'Magic', 'Psionics' ]
								})
							},
							{
								value: 'Water',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-7d',
									features: [
										FactoryLogic.feature.createSkillChoice({
											id: 'deva-1-7d-skill',
											selected: [ 'Swim' ]
										}),
										FactoryLogic.feature.createBonus({
											id: 'deva-1-7d-disengage',
											field: FeatureField.Disengage,
											value: 1
										})
									]
								})
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSwitchOptions({
						id: 'deva-3-4',
						name: 'Elemental Passage',
						description: 'You gain a special mobility feature based on your elemental core.',
						switch: 'Elemental Core',
						options: [
							{
								value: 'Air',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-1e',
									features: [
										FactoryLogic.feature.createMovementMode({
											id: 'deva-1-1e-fly',
											mode: 'Fly'
										}),
										FactoryLogic.feature.create({
											id: 'deva-1-1e-flying',
											name: 'Elemental Passage',
											description: 'While flying, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While flying at 3rd level or lower, you have damage weakness 5.'
										})
									]
								})
							},
							{
								value: 'Earth',
								feature: FactoryLogic.feature.createMovementMode({
									id: 'deva-1-2e',
									mode: 'Burrow'
								})
							},
							{
								value: 'Fire',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-3e',
									name: 'Passage',
									description: `
If you are adjacent to a square of fire, you can use one square of movement to teleport adjacent to any other square of fire on the encounter map.

In addition, you can use a maneuver to summon a magical ember in an adjacent square; this ember lasts until the end of the encounter and counts as a square of fire for the purposes of your Passage teleportation feature, but has no other mechanical effect.`
								})
							},
							{
								value: 'Green',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-4e',
									name: 'Passage',
									description: `
If you are adjacent to a square of vegetation, you can use one square of movement to teleport adjacent to any other square of vegetation on the encounter map.

In addition, you can use a maneuver to summon vines that fill an adjacent square; these vines last until the end of the encounter and counts as a square of vegetation for the purposes of your Passage teleportation feature, but has no other mechanical effect.`
								})
							},
							{
								value: 'Rot',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-5e',
									name: 'Passage',
									description: 'If you are adjacent to a dead creature (at least size 1M), you can use a move action to teleport adjacent to any other dead creature within 5 squares'
								})
							},
							{
								value: 'Void',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-6e',
									name: 'Passage',
									description: `
If you are adjacent to a square in darkness, you can use one square of movement to teleport adjacent to any other square in darkness on the encounter map.

In addition, you can use a maneuver to fill an adjacent square with magical shade; this shade lasts until the end of the encounter and counts as a square of darkness for the purposes of your Passage teleportation feature, but has no other mechanical effect.`
								})
							},
							{
								value: 'Water',
								feature: FactoryLogic.feature.createMultiple({
									id: 'deva-1-7e',
									features: [
										FactoryLogic.feature.createMovementMode({
											id: 'deva-1-7e-swim',
											mode: 'Swim'
										}),
										FactoryLogic.feature.create({
											id: 'deva-1-7e-water',
											name: 'Elemental Passage',
											description: 'Occupied squares do not count as difficult terrain for you.'
										})
									]
								})
							}
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createSwitchOptions({
						id: 'deva-3-5',
						name: 'Elemental Surge',
						description: 'You gain a reactive feature based on your elemental core.',
						switch: 'Elemental Core',
						options: [
							{
								value: 'Air',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-1f',
									name: 'Surge',
									description: 'When an enemy moves adjacent to you, you may spend a surge to immediately shift 1 square.'
								})
							},
							{
								value: 'Earth',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-2f',
									name: 'Surge',
									description: 'When you are subjected to forced movement, you can spend a surge to gain Stability equal to twice your echelon.'
								})
							},
							{
								value: 'Fire',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-3f',
									name: 'Surge',
									description: 'On your turn, you can spend a surge to deal additional fire damage equal to your echelon on all your strikes this turn.'
								})
							},
							{
								value: 'Green',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-4f',
									name: 'Surge',
									description: 'Any time you or an ally within 5 squares spends a Recovery, you can spend a surge to allow an ally within 5 squares to regain Stamina equal to your level.'
								})
							},
							{
								value: 'Rot',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-5f',
									name: 'Surge',
									description: 'When you target an enemy with a strike, you can spend a surge to impose the bleeding condition (EoT).'
								})
							},
							{
								value: 'Void',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-6f',
									name: 'Surge',
									description: 'When an enemy targets you with a strike, you can spend a surge to impose a bane on the power roll.'
								})
							},
							{
								value: 'Water',
								feature: FactoryLogic.feature.create({
									id: 'deva-1-7f',
									name: 'Surge',
									description: 'When you are subjected to a save ends condition, you can spend a surge to change its duration to end of your next turn.'
								})
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSwitchOptions({
						id: 'deva-3-6',
						name: 'Elemental Ward',
						description: 'You gain a resistance feature based on your elemental core.',
						switch: 'Elemental Core',
						options: [
							{
								value: 'Air',
								feature: FactoryLogic.feature.createDamageModifier({
									id: 'deva-1-1g',
									modifiers: [
										FactoryLogic.damageModifier.createPerLevel({
											damageType: DamageType.Lightning,
											modifierType: DamageModifierType.Immunity,
											value: 1
										})
									]
								})
							},
							{
								value: 'Earth',
								feature: FactoryLogic.feature.createConditionImmunity({
									id: 'deva-1-2g',
									conditions: [ ConditionType.Prone ]
								})
							},
							{
								value: 'Fire',
								feature: FactoryLogic.feature.createDamageModifier({
									id: 'deva-1-3g',
									modifiers: [
										FactoryLogic.damageModifier.createPerLevel({
											damageType: DamageType.Fire,
											modifierType: DamageModifierType.Immunity,
											value: 1
										})
									]
								})
							},
							{
								value: 'Green',
								feature: FactoryLogic.feature.createChoice({
									id: 'deva-1-4g',
									options: [
										{
											feature: FactoryLogic.feature.createDamageModifier({
												id: 'deva-1-4ga',
												modifiers: [
													FactoryLogic.damageModifier.createPerLevel({
														damageType: DamageType.Acid,
														modifierType: DamageModifierType.Immunity,
														value: 1
													})
												]
											}),
											value: 1
										},
										{
											feature: FactoryLogic.feature.createDamageModifier({
												id: 'deva-1-4gb',
												modifiers: [
													FactoryLogic.damageModifier.createPerLevel({
														damageType: DamageType.Poison,
														modifierType: DamageModifierType.Immunity,
														value: 1
													})
												]
											}),
											value: 1
										}
									]
								})
							},
							{
								value: 'Rot',
								feature: FactoryLogic.feature.createDamageModifier({
									id: 'deva-1-5g',
									modifiers: [
										FactoryLogic.damageModifier.createPerLevel({
											damageType: DamageType.Corruption,
											modifierType: DamageModifierType.Immunity,
											value: 1
										})
									]
								})
							},
							{
								value: 'Void',
								feature: FactoryLogic.feature.createDamageModifier({
									id: 'deva-1-6g',
									modifiers: [
										FactoryLogic.damageModifier.createPerLevel({
											damageType: DamageType.Psychic,
											modifierType: DamageModifierType.Immunity,
											value: 1
										})
									]
								})
							},
							{
								value: 'Water',
								feature: FactoryLogic.feature.createDamageModifier({
									id: 'deva-1-7g',
									modifiers: [
										FactoryLogic.damageModifier.createPerLevel({
											damageType: DamageType.Cold,
											modifierType: DamageModifierType.Immunity,
											value: 1
										})
									]
								})
							}
						]
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Deva', 'Nomadic, communal, labor.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.labor, 'Low Kuric')
};

const siabhra: Ancestry = {
	id: 'ancestry-siabhra',
	name: 'Síabhra',
	description: `
*By Andy Aiken*

The síabhra (*SHEEV-rah*) are fey shapeshifters, sometimes called changelings or hollowfolk. Few would use these terms kindly.

Síabhra live alongside humans (and, rarely, other humanoids), often undetected for decades. With a touch, a síabhra can mimic a face, a voice, a posture, even the subtle rhythms of speech and gesture that make a person feel *real*. Not perfectly, of course; always there is some subtle giveaway, a tell that the síabhra is somehow... wrong. Some síabhra maintain a single identity for years, carefully crafting lives from stolen mannerisms; others drift through crowded cities like ghosts in borrowed skin, changing their appearance every time they turn a corner.

The síabhra have no homeland, no ancestral cities, no songs that are truly their own. They are a people without a people. Instead, they embed themselves into the cultures of others, adopting customs and mimicking belonging. They see themselves as survivors; others see them as parasites. They learn what is loved, what is feared, what is admired. They slip into roles that already exist and wear them convincingly. They are rarely leaders, rarely revolutionaries. They thrive in the spaces between - in borrowed offices, borrowed homes, borrowed affections.`,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'siabhra-1',
				name: 'Echo',
				description: '"To hold, as ’twere, the mirror up to nature."',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				sections: [
					FactoryLogic.createAbilitySectionText(`
You can use your maneuver to touch an adjacent creature (your **prime**) and echo some aspect of their essence. All síabhra can use *Echo Visage*, but many can echo other aspects.

Touching your prime is automatic if they are a willing ally; if your prime is an enemy or is otherwise unwilling, you and your prime must make an opposed Agility test.

Identity fragmentation comes with a cost: if you use *Echo* on a different creature before the end of your next turn, you take psychic damage equal to your level.`),
					FactoryLogic.createAbilitySectionField({
						name: 'Echo Visage',
						effect: 'You take on the physical appearance of your prime. Your clothing doesn\'t change, but your size can become 1S, 1M, or 1L to match your prime. This is a purely cosmetic change; you don\'t gain any abilities that your prime has due to their physiology. You retain this appearance until you dismiss it (which requires no action), you use *Echo Visage* again to take on a different appearance, or you die.'
					}),
					FactoryLogic.createAbilitySectionPackage('echo')
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'siabhra-2',
			name: 'Lightweight',
			description: 'Due to your unnatural physiology, your body is unnaturally light. Whenever another creature attempts to force move you, you treat your size as one size smaller than it is.'
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'siabhra-3',
			name: 'Social Parasite',
			description: 'Síabhra are adept at learning the customs of those they live alongside and presenting themselves as a different person.',
			options: [ 'Culture', 'Disguise', 'Perform', 'Read Person', 'Society' ],
			count: 2
		}),
		FactoryLogic.feature.createChoice({
			id: 'siabhra-4',
			name: 'Purchased Traits',
			options: [
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-1',
						name: 'Echo Aspect',
						description: 'Select a characteristic; you can use the higher of your value or your prime\'s value for tests using that characteristic until the end of your next turn.',
						tag: 'echo'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-2',
						name: 'Echo Expertise',
						description: 'Select one skill your prime is proficient in; you are proficient in that skill until you use *Echo Expertise* again.',
						tag: 'echo'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-3',
						name: 'Echo Technique',
						description: 'Select one of your prime\'s signature abilities; you can use that ability once before the end of your next turn (you also gain any necessary weapon proficiencies). When you use the echoed ability, you take a bane on any power rolls you make as part of it.',
						tag: 'echo'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-4',
						name: 'Echo Tongue',
						description: 'Select a language your prime knows; you know that language until you use *Echo Tongue* again.',
						tag: 'echo'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-5',
						name: 'Siphon Affliction',
						description: 'Select one condition affecting your prime. That condition is removed from your prime and transferred to you, even if you would ordinarily be immune to it.',
						tag: 'echo'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createPackageContent({
						id: 'siabhra-4-6',
						name: 'Siphon Vitality',
						description: `
If your prime has recoveries, they lose a recovery; you regain stamina equal to their recovery value.

If your prime does not have recoveries, roll 1d10 and add your level; your prime loses that amount of stamina, and you regain that amount of stamina.`,
						tag: 'echo'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: undefined
};

const solar: Ancestry = {
	id: 'ancestry-solar',
	name: 'Solar',
	description: `
*By Jenny [REDACTED]*

Across the upper planes, angelic beings with hearts of light and souls of fire ward off evil within the known universe, smiting those who would attempt to snuff out its light. With fiery hair and skin in hues of yellow, red, blue, or gray, constellations of nebulous space dance beneath their skin.

Solar are the embodiment of justice and divine intervention. Said to be born of dying stars, created by Archimedes, god of marvels, to act as divine arbiters between worlds.

Those who've met a solar could tell you they hail from an alien world, governed by divine morals and a code they call the "Oblivion Singularity". They travel across planes, answering prayers from the lost and the damned, falling from the skies to enact their justice.

Solars have a strong moral code, but a simple one. Treat one with kindness, and you'll receive the same. Few who've ever treated one with cruelty and malice have ever lived to tell the tale.`,
	features: [
		FactoryLogic.feature.createDamageModifier({
			id: 'solar-1',
			name: 'Supernova',
			description: '',
			modifiers: [
				FactoryLogic.damageModifier.createPerLevel({
					damageType: DamageType.Fire,
					modifierType: DamageModifierType.Immunity,
					value: 1
				}),
				FactoryLogic.damageModifier.createPerLevel({
					damageType: DamageType.Holy,
					modifierType: DamageModifierType.Immunity,
					value: 1
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'solar-2',
			name: 'Solar Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-1',
						name: 'Dawnbreaker',
						description: 'The rising sun grants you strength. Whenever you finish a respite, you gain temporary Stamina equal to half your recovery value that lasts until you finish a respite.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-2',
						name: 'Divine Arbiter',
						description: 'Your burning radiance empowers your attacks. Whenever you use an ability that deals untyped damage, that ability can deal fire damage or holy damage instead.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'solar-2-3',
							name: 'Heat Death',
							description: 'A shining star, born anew.',
							type: FactoryLogic.type.createTrigger('The first time in an encounter a creature deals damage to you that leaves you dying', { free: true }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 fire or holy damage; push 1',
										tier2: '5 fire or holy damage; push 2',
										tier3: '7 fire or holy damage; push 3'
									})
								),
								FactoryLogic.createAbilitySectionText('If you reduce a creature to 0 Stamina with this ability, you can spend a Recovery.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'solar-2-4',
						name: 'Starscape Navigator',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'solar-2-4a',
								selected: [ 'Navigate' ]
							}),
							FactoryLogic.feature.create({
								id: 'solar-2-4b',
								name: 'Starscape Navigator',
								description: 'You gain an edge on tests to navigate at night. You always know which way is north and what time of day it is.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-5',
						name: 'Solar Flare',
						description: 'Your burning starlight escapes in violent bursts. The first time on a turn an enemy damages you with a free strike, you can deal fire or holy damage to them equal to your highest characteristic as a free triggered action.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-6',
						name: 'Sunlight Saint',
						description: 'Your divine visage is basked upon by believers. You gain an edge on tests made to interact with priests, acolytes, and other particularly religious individuals.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSize({
						id: 'solar-2-7',
						name: 'Supergiant',
						description: 'You were born from a supergiant star, reflected in your immense stature.',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-8',
						name: 'You Cannot Escape My Grasp',
						description: 'You radiate solar energy that draws your enemies closer to your event horizon. Any enemy that starts its turn within 1 square of you can\'t shift.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'solar-2-9',
						name: 'Flight',
						features: [
							FactoryLogic.feature.create({
								id: 'solar-2-9a',
								name: 'Flight',
								description: 'You possess wings made of fire and light powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While using your wings to fly at 3rd level or lower, you have damage weakness 5.'
							}),
							FactoryLogic.feature.createMovementMode({
								id: 'solar-2-9b',
								mode: 'Fly'
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'solar-2-10',
							name: 'Shooting Star',
							description: 'Like a piece of heaven falling to earth, you descend.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 fire or holy damage',
										tier2: '5 fire or holy damage',
										tier3: '7 fire or holy damage; prone'
									})
								),
								FactoryLogic.createAbilitySectionText('You can use this ability when you land after a fall on your turn. You reduce the effective height of the fall by twice your highest characteristic. You don\'t land prone from the fall, and the damage of this ability increases by 1 for each square you fell.')
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Solar', 'Urban, bureaucratic, noble.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.noble, 'Axiomatic')
};

// #endregion

// #region Classes

const magewright: HeroClass = {
	id: 'class-magewright',
	name: 'Magewright',
	description: `
*By [Zetesofos](mailto:zetesofos@gmail.com)*

To create is to grasp at immortality. From the humblest apprentice to a master artisan. The magewright sits at the line between the mundane and the magical, and seeks to bend the power of the arcane toward infusing objects with supernatural power.

As a magewright, you are able to utilize the majesty of magic and infuse it into the stone and steel of your creations. Bolstered with your enchantments, these tools can alter the nature of your allies assault or deploy constructs as unyielding sentinels upon the battlefield. Your choice of vocation determines which of these approaches you are best equipped to use.`,
	type: 'standard',
	subclassName: 'Vocation',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'magewright-1-1',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'magewright-1-2',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'magewright-1-3',
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'magewright-1-4',
					options: [
						'Heal',
						'Drive',
						'Conceal Object',
						'Escape Artist',
						'Pick Lock',
						'Sabotage',
						'Search'
					],
					listOptions: [
						SkillList.Crafting,
						SkillList.Lore
					],
					count: 3
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'magewright-1-5',
					name: 'Wonder',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: 'ally-surge-damage',
							trigger: 'The first time in an encounter you or an ally spends 3 or more surges on a single ability to increase the damage',
							value: '1d3'
						},
						{
							tag: 'ally-surge-potency',
							trigger: 'The first time in an encounter you or an ally spends 2 surges on a single ability to increase the potency',
							value: '1d3'
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'magewright-1-6',
					name: 'Devoted Artisan',
					description: `
You begin the game with 120 project points as well as project sources for up to three 1st-echelon treasures of your choice. Whenever you gain a level, you immediately gain the project source for one treasure of your echelon or lower.

Additionally, you add your level to project rolls to craft projects and whenever you convert Victories into XP, you gain 5 project points for every point of XP you gain.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'magewright-1-7',
						name: 'Infusion',
						description: 'You imbue an ally\'s equipment with a burst of magic.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [
							AbilityKeyword.Magic,
							AbilityKeyword.Ranged
						],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target gains two surges.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'You can target one additional ally within distance.',
								value: 2
							}),
							FactoryLogic.createAbilitySectionSpend({
								effect: `
For each wonder spent, choose one of the following enhancements:

* A target can spend a Recovery.
* A target can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.
* The target gains one additional surge.`,
								repeatable: true
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'magewright-1-8',
						name: 'Magic Gadget',
						description: 'You compel a mundane object to strike a foe.',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'can be used as a Ranged Free Strike' ], freeStrike: true }),
						keywords: [
							AbilityKeyword.Magic,
							AbilityKeyword.Ranged
						],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Reason,
									tier1: '2 + R damage',
									tier2: '4 + R damage',
									tier3: '6 + R damage'
								})
							),
							FactoryLogic.createAbilitySectionText('When you make this strike, choose the damage type from one of the following options: acid, cold, fire, lightning, poison, or sonic.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'magewright-1-9',
					name: 'Upgrades',
					description: 'You have taken to making custom modifications to your equipment to enhance your statistics. You can choose one of the following upgrades. You can change your upgrade by tinkering with your equipment as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'laR6VpDj9UbeEQIZ',
								name: 'Battle Frame',
								description: `
You have developed a special suit of armor that reinforces your movements and attacks.

You can wear light armor and wield light weapons effectively, even though you don’t have a kit.

While you wear light armor, you gain a +3 bonus to Stamina, and that bonus increases by 3 at 4th, 7th, and 10th levels.

While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.

You can use light armor treasures and light weapon treasures.

If you have a kit, you can’t take this upgrade.`,
								features: [
									FactoryLogic.feature.createProficiency({
										id: 'o87y62ATA2hqxwgJ',
										name: 'Proficiency',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									}),
									FactoryLogic.feature.createBonus({
										id: 'aI4MyhZMPJXIP1PI',
										name: 'Light Armor Stamina',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									}),
									FactoryLogic.feature.createAbilityDamage({
										id: '740D4z9GVRpz4ncf',
										name: 'Light Weapon Damage',
										keywords: [ AbilityKeyword.Weapon ],
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'PkI8vmj2Zq6Ey1bB',
								name: 'Power Capacitors',
								description: 'You have modified your weapons with auxillary batteries. You gain a +1 rolled damage bonus with magic abilities.',
								keywords: [ AbilityKeyword.Magic ],
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: '5VpmYyZste5Mf4fW',
								name: 'Focusing Lenses',
								description: 'You have detailed lenses to increase your aim. You gain a +2 bonus to the distance of your ranged magic abilities.',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'yUZ2eeUaTqhkZW6x',
								name: 'Actuated Joints',
								description: 'You have imbued your armor with servos. You gain a +1 bonus to speed and to the distance you shift when you take the Disengage move action.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'viZ60LWZ30lRVtR5',
										name: 'Speed',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'tjERIjbYqUZuFNkO',
										name: 'Disengage',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'KhmDftQYttVPfi2i',
								name: 'Reinforced Plating',
								description: 'Your armor has been modified to increase its center mass and toughness. You gain a +6 bonus to Stamina, and this bonus increases by 6 at 4th, 7th, and 10th levels. Additionally, you gain a +1 bonus to stability.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'qiJTWUSbPvne14QA',
										name: 'Stamina',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: 'ybD0nwio3ErTlFBo',
										name: 'Stability',
										field: FeatureField.Stability,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'magewright-1-10',
					name: 'Magewright Ward',
					description: 'Your magic allows you to enchant your equipment to provide additional protection. Choose one of the following wards. You can change your ward along with your Upgrade (see Upgrade) by tinkering as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'DbX3XdscebqQP9KQ',
								name: 'Ward of Momentum Transference',
								description: 'Your ward reacts to harm to help you escape danger. Whenever an adjacent creature deals damage to you, you can slide yourself a number of squares equal to your Reason score after the damage is dealt.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: '33BcgUDGQ5rhqNQb',
									name: 'Ward of Volatile Absorption',
									description: 'Your ward converts harmful energy into a protective shield.',
									type: FactoryLogic.type.createTrigger('The first time each round you take acid, cold, fire, poison, sonic, or lighting damage.'),
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('You gain temporary stamina equal to your Reason score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'dEtPQKOLMwY84q9d',
									name: 'Ward of Calculated Negation',
									description: 'Your ward helps you compensate for hostile advantage.',
									type: FactoryLogic.type.createTrigger('A creature targets you with an ability that requires a power roll and and has an edge.'),
									sections: [
										FactoryLogic.createAbilitySectionText('You inflict a bane on triggering power roll.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'oE5wbWKsLfTwEwls',
								name: 'Ward of Exigent Defense',
								description: 'At the start of your turn, you can make a saving throw against one effect that can be ended on a saving throw.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'magewright-1-11',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'magewright-1-12',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'magewright-1-13',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'magewright-2-1',
					lists: [
						PerkList.Crafting,
						PerkList.Lore,
						PerkList.Supernatural
					]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'magewright-3-1',
					name: 'Living Workshop',
					description: 'As a respite activity, you can create a number of trinkets equal to your Reason score that last until you use this feature again, or you die. The total project value of the trinkets you create cannot exceed your level x 50. You must have the project source for these trinkets, but you may ignore the Item prerequisite at your Director’s discretion.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'magewright-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'v7J7Z0juYjT52BtB',
			name: 'Arc Lightning',
			description: 'You unleash a blast of electricity that leaps from one target to another.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Melee,
				AbilityKeyword.Ranged,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '3 + R lightning damage; R < [weak], the target is jolted (save ends)',
						tier2: '5 + R lightning damage; R < [average], the target is jolted (save ends)',
						tier3: '8 + R lightning damage; R < [strong], the target is jolted (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A jolted creature cannot take triggered actions, free triggered actions, or maneuvers.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'QHLE50lg6AuATBT5',
			name: 'Blowtorch',
			description: 'Eyebrows grow back....right?',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 fire damage; A < [weak], burning (save ends)',
						tier2: '4 fire damage; A < [average], burning (save ends)',
						tier3: '6 fire damage; A < [strong], burning (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While burning, a target takes fire damage equal to your Reason score at the start of its turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'FO2ZbMACAm9WJg49',
			name: 'Flash Freeze',
			description: 'You emit a jet of supercooled mist to halt nearby foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 cold damage; M < [weak], slowed (save ends)',
						tier2: '4 cold damage; M < [average], slowed (save ends)',
						tier3: '6 cold damage; M < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While slowed, targets cannot use triggered actions.')
			]
		}),
		FactoryLogic.createAbility({
			id: '0pXSkFKy9JaTyHiw',
			name: 'Heat Seekers',
			description: 'A bundle of bolts burst into the air, unerringly seeking their targets.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Melee,
				AbilityKeyword.Magic,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 damage',
						tier2: '4 damage',
						tier3: '6 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can negate a bane on the power roll, or reduce a double bane to a bane.'),
				FactoryLogic.createAbilitySectionSpend({
					effect: 'You can target one additional creature or object for every 2 wonder spent.',
					value: 2,
					repeatable: true
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'hGcCOVvj8aLcw73v',
			name: 'Iron Eater',
			description: 'It destroys armor in minutes, and removes stains instantly.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '3 + R acid damage; R < [weak], weakened (save ends)',
						tier2: '5 + R acid damage; R < [average], weakened (save ends)',
						tier3: '8 + R acid damage; R < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While weakened this way, whenever you or an ally uses an ability that incorporates 1 or more surges against the target, they gain 1 additional surge they must use on the ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'U9cFspkoJ2hUyocG',
			name: 'The Prototype',
			description: 'It can be a little unreliable, but it can definitely pack a punch.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Melee,
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged,
				AbilityKeyword.Strike
			],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '3 + R damage',
						tier2: '5 + R damage',
						tier3: '11 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain a surge for each natural odd number on your power roll. If you roll doubles, you gain 3 surges instead.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'hedJz4Oqjza6RB4A',
			name: 'Sonic Hammer',
			description: 'This. Is. My. BOOMSTICK.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Melee,
				AbilityKeyword.Magic,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: 'Push 2 + R',
						tier2: 'Push 3 + R',
						tier3: 'Push 5 + R'
					})
				),
				FactoryLogic.createAbilitySectionText('For each square you push the target, they take 1 sonic damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'UM0KfRGkMMdqkhRV',
			name: 'Volatile Flask',
			description: 'Ten, nine, eight... or was it on five...?',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage: M < [strong], prone'
					})
				),
				FactoryLogic.createAbilitySectionSpend({
					effect: 'You increase the size of the area by 1.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'mcpNbpXODJmwtBUf',
			name: 'Dynamo Overload',
			description: 'My hair? Yes, it does normally stand on its end, why do you ask?',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You gain 2 surges and each target takes lightning damage equal to twice your Reason score. Until the start of your next turn, any creature within 2 squares that strikes you takes lightning damage equal to twice your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'HsFZChuhnwfX2cvo',
			name: 'Flash and Bang',
			description: 'They’ll never see what hit them.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 sonic damage; I < [weak], dazed (save ends)',
						tier2: '3 sonic damage; I < [average], dazed (save ends)',
						tier3: '5 sonic damage; I < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While dazed, targets treat other creatures as though they have concealment and do not count as observers.'),
				FactoryLogic.createAbilitySectionSpend({
					effect: 'You increase the size of the area by 1.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: '0w9GOvbk49Ihf1kx',
			name: 'Experimental Compound',
			description: 'The difference between medicine and poison is in the dosage.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('If you target an ally, they gain temporary Stamina equal to three times your Reason score, and they can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '3 + R poison damage; M < [weak], bleeding (save ends)',
						tier2: '6 + R poison damage; M < [average], bleeding (save ends)',
						tier3: '9 + R poison damage; M < [strong], bleeding (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'lp5buarBosjM9Nv5',
			name: 'Mass Accelerator',
			description: 'Time to meet your equal and opposite reaction.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged,
				AbilityKeyword.Strike
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: 'Vertical Slide 3 + R ',
						tier2: 'Vertical Slide 5 + R ',
						tier3: 'Vertical Slide 7 + R '
					})
				),
				FactoryLogic.createAbilitySectionText('This forced movement ignores the target’s stability, and if this forced movement causes the target to slam into an enemy, the target takes no damage from the collision and the enemy takes extra damage equal to the number of squares the target moved. The target then pushes the enemy they collide with a number of squares equal to the distance the target moved.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'Cc8k7l2K5GMJnteO',
			name: 'Cascading Discharge',
			description: 'Ever wondered what it feels like to be a kite in a thunderstorm?',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '6 lightning damage; R < [weak], the target is weakened (save ends)',
						tier2: '9 lightning damage; R < [average], the target is weakened (save ends)',
						tier3: '12 lightning damage; R < [strong], the target is weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Each enemy within 2 squares of at least 1 target takes lightning damage equal to twice your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'YDDeIuJo4aZ4ubpa',
			name: 'Clockwork Conscript',
			description: 'Many mechanical hands make light work.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You conjure a size 1T flying machine that appears in an unoccupied space within distance. The machine’s Stamina is half of yours, and immunity all to poison and psychic damage. It disappears at the end of the encounter, if its Stamina drops to 0, or if you are dying. When the conscript appears, you may use a signature ability or free strike as if you were in the machine’s space. Once on each subsequent turn, you can use a free maneuver to move the machine a number of squares equal to twice your Reason score, then use a signature ability or free strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'nLoYX7FACNoGZlD8',
			name: 'Omni-Tool',
			description: 'Loose belt, open wound, empty quiver... not to worry, I’ve got a fix for you.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Four creatures',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You can target yourself instead of one creature with this ability. Each target gains two of the following options:

* Gain 2 surges
* Spend a Recovery.
* End one effect on a target that is ended by a saving throw or that ends at the end of their turn.
* The next ability roll a target makes before the end of the encounter has an edge.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'tvTnyYFk2PA1kPfp',
			name: 'Rapid Oxidization',
			description: 'A barrel of this stuff will eat through a stone bridge in under ten minutes.',
			type: FactoryLogic.type.createMain(),
			keywords: [
				AbilityKeyword.Area,
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '2 acid damage; M < [weak], the target has damage weakness equal to your Reason score (save ends)',
						tier2: '5 acid damage; M < [average], the target has damage weakness equal to your Reason score (save ends)',
						tier3: '7 acid damage; M < [strong], the target has damage weakness equal to your Reason score (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The gas remains in the area until the end of the end of your next turn. Any creature who ends their turn in the area takes acid damage equal to your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'Y2qzisoSdKIgflBJ',
			name: 'Ablative Shielding',
			description: 'You can never have too many layers.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('You envelop the target in a number of layers of protective shielding equal to twice your Reason score. Each layer provides the target a cumulative damage immunity 1 for each layer. Whenever the target is attacked, they lose 1 layer. Whenever the target loses a layer, they can spend a recovery or end an effect that is ended by a saving throw or ends at the end of their turn. At the start of each of their turns, the target can choose to lose one or more layers as a free maneuver.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'VCRJacpR5z9UQhQF',
			name: 'Cloaking Matrix',
			description: 'The target disappears for a brief moment, behind a practical application of light.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('The target becomes invisible and hidden, even if observed, until they use an ability. Until the end of the encounter or you are dying, the target may use a free maneuver once on their turn to regain the effects of this ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'L8zOSv20czWxhK3V',
			name: 'Hyperdrive',
			description: 'Your magic rapidly accelerates the infused creature.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, the target gains a +3 bonus to speed, their movement doesn’t provoke opportunity attacks, and they can’t be slowed or dazed. If the target is slowed or dazed, those conditions end for them. Additionally, during their turn, the target can choose to take an additional main action. If they do, this effect ends at the end of that turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'YLrONkax4PwJKLVD',
			name: 'Magnify',
			description: 'Bigger IS always better.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ranged
			],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Until the end of the encounter or you are dying, the target gains the following effects:

* Their size and stability increase by 2 (minimum size 2).
* Whenever the target force moves a creature or object, the forced movement distance gains a +1 bonus.
* The target gains an edge on Might tests, as well as the Grab and Knockback maneuvers.
* When the target makes a strike to deal damage, they gain two surges, which they can use immediately.`)
			]
		})
	],
	subclasses: [
		{
			id: 'iFeBhUgRTKkNj0SR',
			name: 'Automancer',
			description: 'Automancers focus on the creation of servitor constructs that serve as shields and weapons for themselves and their allies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'magewright-sub-1-1-1',
							selected: [ 'Mechanics' ]
						}),
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'GJRGJCgzCjqpokR6',
							name: 'Automancer Wonder Gain',
							tag: 'vocation',
							trigger: 'The first time each round that your servitor takes damage',
							value: '1',
							replacesTags: []
						}),
						FactoryLogic.feature.createMultiple({
							id: 'uBzUUxbBTVnjlRmA',
							name: 'Servitor',
							features: [
								FactoryLogic.feature.create({
									id: 'IkiFXtqK3H24cg7b',
									name: 'Servitor',
									description: `
You create a servitor that can join you on your adventure. Your servitor uses one of the statblocks below and the following special rules:

**Servitor Stamina and Recoveries.** Your servitor increases its maximum stamina by 9 for each level after the 1st. Your servitor has no Recoveries of their own. Instead, when an effect would allow your servitor to spend a Recovery, it spends one of your Recoveries.

**Magewright Recoveries.** Increase your number of Recoveries by 4.

**Servitor Actions.** Your servitor is your ally, but they take their turn as a part of your turn. For the purpose of effects that end at the end of the servitor’s turn, or any other rules elements that depend on the start or end of the creature's turn, the start and end of your turn is also the start and end of the servitor’s turn.

You and your servitor each have separate move actions. You have one triggered action which can be taken by either you or your servitor. You split your maneuver and action between you: if you take an action, you can’t take a maneuver but your servitor can. If you take a maneuver, you can’t take an action but your servitor can. Taking an action doesn’t prevent you from taking free maneuvers.

**Adding or Subtracting Actions**. Although you and your servitor share your action economy, you are treated as separate creatures by effects that grant or remove main actions, maneuvers, and moves. For instance, the talent’s Applied Chronometrics grants an extra maneuver. If both you and your companion are targeted by the ability, you both gain extra maneuvers.

Similarly, the dazed condition limits a creature to using only one of a move, maneuver, or main action on their turn. Being dazed works just the same on you or your servitor as it does on other creatures: the dazed creature can only do one thing on their turn (move, maneuver, or main action). You being dazed has no effect on your partner.

**Shared Maneuvers.** When you or your servitor take the following maneuvers, you can choose for both of you to benefit from the maneuver: Catch Breath, Escape Grab, Hide, Stand Up.

**Remote Link.** Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.

**Construct.** Your servitor can’t be frightened.

**Inert.** Your servitor becomes inert at negative half their stamina. While inert, it cannot take actions, maneuvers, triggered actions or move. As a maneuver, you can spend 5 Wonder to restore your Servitor with 1 Stamina, even if their body was destroyed.

**Servitor Abilities.** If an ability has the servitor keyword, it can only be used by an automancer’s servitor.

**Shared Senses.** While you are both within 1 mile of each other, you can communicate telepathically as if you shared a language and share each other’s senses. While sharing senses, each of you also benefit from your own senses at the same time.

**Shared Space.** Both of you can freely move through and stop in each others’ spaces.

**Shared Skills.** Your servitor has any skill that you have, and vice versa. No matter what skills they possess, your servitor can’t take any action that is not allowed by their design.

**Kit.** You can use and gain the benefits of a kit. See Chapter 6: Kits for more information. (*Quick Build: Pugulist*.) When your servitor deals damage with an action that doesn’t have a power roll, the damage bonus from the kit is not added to that damage.

**Shared Perks and Titles.** If you gain a benefit by earning a perk or a title, your servitor gains the same benefit. Your servitor can only use benefits that are logically usable by a construct: for instance, a construct can’t die and therefore can’t benefit from the Doomed perk.

**Surges.** Surges gained by your servitor go to your surge pool, which your servitor shares. Your servitor can spend your surges the same way you can. When the same effect would grant surges to you both, you only gain surges once.

**Changing Your Servitor.** As a respite activity, you can deactivate your current servitor, gaining a new servitor of a different type or re-activating a servitor you previously powered down.

**One Hero.** You and your servitor count as one hero for determining the difficulty of combats, montage tests, and so on.

**Consumables.** While your companion can’t use all consumables, with your help they can benefit from an edible or drinkable consumable, such as a Healing Potion. While wearing a kit, they can also benefit from a consumable that enhances a weapon, such as a Lachomp Tooth. While you are adjacent to your companion, when you use one of these consumables, you can grant the benefit to your companion instead of yourself. You must spend the action required to use the consumable; your companion doesn’t need to take any action.

**Trinkets.** Servitors can wear any trinket a hero can, with all the normal limits on available body slots.

**Leveled Items.** When you wield a leveled weapon, armor, implement, or other leveled item, your servitor gains the benefits of the magic treasure as if they were wielding it. As is true with any character, both of you only benefit from a wieldable magic weapon or armor if its keywords match your kit. Your servitor can also wield one leveled treasure independently of you, as long as its keywords match the kit of your servitor.`
								}),
								FactoryLogic.feature.createSummonChoice({
									id: 'Mub7UFTxLmfx4z1p',
									name: 'Servitor Choice',
									description: 'You gain a servitor to aid you in your adventures.',
									options: [
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'AdrHTSp6AIsIMsiP',
												name: 'Safeguard Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Defender),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'M'),
												speed: FactoryLogic.createSpeed(6),
												stamina: 21,
												stability: 1,
												freeStrikeDamage: 3,
												characteristics: FactoryLogic.createCharacteristics(2, 1, 2, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Security Protocol',
															description: '*Your servitor moves to interdict a foe, and keep its allies safe.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon
															],
															distance: [ FactoryLogic.distance.createMelee() ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('2 + M damage; until the end of your next turn, enemies are weakened while adjacent to the servitor.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'When an enemy would be weakened by this ability, they are taunted instead.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'tTzkH0Ez9g3K7RTT',
														name: 'Skill',
														description: 'Alertness'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Protector',
														description: 'The servitor gains a surge when they deal damage to a creature adjacent to you or an ally.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: '9egIVkCAzAEIFgI4',
												name: 'Scout Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Harrier),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'M'),
												speed: FactoryLogic.createSpeed(7, 'Climb'),
												stamina: 21,
												stability: 0,
												freeStrikeDamage: 3,
												characteristics: FactoryLogic.createCharacteristics(2, 2, 1, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Springloaded Leap',
															description: '*Powerful tensors allow your servitor to bring a target down.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon
															],
															distance: [ FactoryLogic.distance.createMelee() ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('2 + A damage; M< [average], prone.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can jump up to their speed before using this ability. If they jump at least 1 square in this way, a target who is M < [strong] is prone.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'dLmCKAUVRUTLMGvN',
														name: 'Skill',
														description: 'Sneak'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Lithe',
														description: 'When the servitor takes the Advance move action or takes the Charge action, as part of the movement they can jump up to their speed in any direction, including vertically.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'KODZM9DfxOWnJ416',
												name: 'Screen Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Controller),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'L'),
												speed: FactoryLogic.createSpeed(5),
												stamina: 21,
												stability: 1,
												freeStrikeDamage: 3,
												characteristics: FactoryLogic.createCharacteristics(2, 1, 2, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Energy Blast',
															description: '*Your servitor releases a capacitor of stored energy into a focused stream.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Servitor,
																AbilityKeyword.Area,
																AbilityKeyword.Magic
															],
															distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 1, within: 1 }) ],
															target: 'Each enemy in the area',
															sections: [
																FactoryLogic.createAbilitySectionText('M damage of the attuned damage type (see Attuned).'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The ability affects a 5 x 1 line within 1.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'lfU5Hla87C26Jq5M',
														name: 'Skill',
														description: 'Endurance'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Attuned',
														description: 'When you gain this servitor, choose a damage type from acid, cold, fire, lightning, poison, or sonic. The servitor is attunedto that damage type, and gains damage immunity equal to 1 + your Reason score against that type. Attuned also affects their other features.'
													}),
													FactoryLogic.feature.create({
														id: 'EAb6hfXtPMotwewB',
														name: 'Radiator',
														description: 'An enemy that moves adjacent to your servitor, or ends their turn adjacent to them takes M damage of the attuned damage type.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'Fjhxx8bGOzqwM3VT',
												name: 'Shock Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Hexer),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'S'),
												speed: FactoryLogic.createSpeed(6, 'Fly'),
												stamina: 21,
												stability: 0,
												freeStrikeDamage: 3,
												characteristics: FactoryLogic.createCharacteristics(2, 2, 2, 1, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Galvanic Flash',
															description: '*Your servitor unleashes a jolt of electricity that disrupts the target’s senses.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Magic
															],
															distance: [ FactoryLogic.distance.createMelee() ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('3 + M lightning damage; I < [average], dazzled (EoT)'),
																FactoryLogic.createAbilitySectionField({
																	name: 'Special',
																	effect: 'A dazzled creature can’t have line of effect to targets who aren’t adjacent to them.'
																}),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'A dazzled creature also has a bane on strikes.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'cCRfHzUUs6N3mtKp',
														name: 'Skill',
														description: 'Sabotage'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Lightning Rod',
														description: 'The first time each turn that you or your companion deal lightning damage, you gain a surge.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'jPbqhH6iygJ5t3vQ',
												name: 'Signal Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Artillery),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'M'),
												speed: FactoryLogic.createSpeed(6),
												stamina: 21,
												stability: 1,
												freeStrikeDamage: 4,
												characteristics: FactoryLogic.createCharacteristics(2, 2, 1, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Firing Solution',
															description: '*Your servitor fires a bolt that exposes a critical weakness in a foe.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon,
																AbilityKeyword.Ranged
															],
															distance: [ FactoryLogic.distance.createRanged(5) ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('2 + M damage and the next ability roll made against the target has an edge.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor adds their Intuition score to either the damage or the range.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'M00ZMEBk1tkj3tlH',
														name: 'Skill',
														description: 'Search'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Lock On',
														description: 'This servitor’s abilities, as well as magewright abilities used using the remote link feature, ignore cover or concealment.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'slz9NVSTAZlHOfG0',
												name: 'Snare Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Support),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'L'),
												speed: FactoryLogic.createSpeed(6),
												stamina: 21,
												stability: 2,
												freeStrikeDamage: 3,
												characteristics: FactoryLogic.createCharacteristics(2, 1, 2, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Grappling Tether',
															description: '*A hooked grapnel latches onto a target, and reels them in*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon
															],
															distance: [ FactoryLogic.distance.createMelee(3) ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('M damage; pull 3; if the target is pulled adjacent to the servitor, they are M < [average] grabbed'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The target is pulled up to an additional number of squares equal to the servitor’s Might score; M < [strong], grabbed'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'bShMF29uuHT9FOmx',
														name: 'Skill',
														description: 'Climb'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Pully System',
														description: 'The servitor can move at full speed while they have a creature grabbed, no matter the grabbed creature’s size.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'iQmDMRsLj9jALRCZ',
												name: 'Stalwart Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Brute),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'L'),
												speed: FactoryLogic.createSpeed(5),
												stamina: 21,
												stability: 2,
												freeStrikeDamage: 4,
												characteristics: FactoryLogic.createCharacteristics(2, 1, 2, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Battering Ram',
															description: '*Your servitor unleashes stored pressure to eject a foe from their position.*',
															type: FactoryLogic.type.createManeuver({ freeStrike: true }),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon
															],
															distance: [ FactoryLogic.distance.createMelee() ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('3 + M damage; push 2.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The target is pushed up to an additional number of squares equal to the servitor’s Might score.'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'i6LtE53lDVMwO1it',
														name: 'Skill',
														description: 'Lift'
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Durable',
														description: 'While the servitor is winded, they gain damage immunity equal to their Might score and they ignore damage from the Bleeding condition.'
													})
												]
											}),
											cost: 0,
											count: 1
										}),
										FactoryLogic.createSummon({
											monster: FactoryLogic.createMonster({
												id: 'FbiA3IzgjAL74U1q',
												name: 'Stealth Servitor',
												level: 1,
												role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Ambusher),
												keywords: [ 'Construct' ],
												encounterValue: 0,
												size: FactoryLogic.createSize(1, 'S'),
												speed: FactoryLogic.createSpeed(7, 'Climb'),
												stamina: 21,
												stability: 0,
												freeStrikeDamage: 4,
												characteristics: FactoryLogic.createCharacteristics(2, 2, 1, 2, -1),
												features: [
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'vvZYXLGK6ThQcP1D',
															name: 'Kit Attack!',
															type: FactoryLogic.type.createMain(),
															keywords: [
																AbilityKeyword.Weapon,
																AbilityKeyword.Servitor
															],
															distance: [ FactoryLogic.distance.createSpecial('Special') ],
															target: 'Special',
															sections: [
																FactoryLogic.createAbilitySectionText('The servitor uses the signature ability of their equipped kit.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'The servitor can use this ability once per round as a free maneuver.',
																	value: 5
																})
															]
														})
													}),
													FactoryLogic.feature.createAbility({
														ability: FactoryLogic.createAbility({
															id: 'bHKRsxpJu8xMExgH',
															name: 'Insurgent Strike',
															description: '*Your servitor slides into a foes blind spot to strike at exposed foes*',
															type: FactoryLogic.type.createManeuver(),
															keywords: [
																AbilityKeyword.Melee,
																AbilityKeyword.Servitor,
																AbilityKeyword.Weapon
															],
															distance: [ FactoryLogic.distance.createMelee() ],
															target: 'One creature or object',
															sections: [
																FactoryLogic.createAbilitySectionText('3 + M damage; the servitor is invisible to the enemy until the end of the servitor’s next turn or the servitor deals damage to the enemy.'),
																FactoryLogic.createAbilitySectionSpend({
																	effect: 'An enemy affected by Insurgent Strike who is M < strong is dazed (EoT).'
																})
															]
														})
													}),
													FactoryLogic.feature.createConditionImmunity({
														id: 'YSfds9X4IYjgdqsB',
														name: 'Construct',
														conditions: [ ConditionType.Frightened ]
													}),
													FactoryLogic.feature.createDamageModifier({
														id: 'LWe5lnp145fQd3Lf',
														name: 'Construct',
														modifiers: [
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Psychic,
																modifierType: DamageModifierType.Immunity,
																value: 99
															}),
															FactoryLogic.damageModifier.create({
																damageType: DamageType.Poison,
																modifierType: DamageModifierType.Immunity,
																value: 99
															})
														]
													}),
													FactoryLogic.feature.create({
														id: 'NpPjJOouiuITpehO',
														name: 'Remote Link',
														description: 'Whenever you use a magewright ability, you can do so as if you were in the servitor’s space. Doing so counts as the servitor’s action or maneuver for the turn.'
													}),
													FactoryLogic.feature.create({
														id: 'n6QXX5WicXiE3G5R',
														name: 'Ambusher',
														description: 'If your servitor ends its turn in cover or concealment, it becomes hidden, even if observed.'
													}),
													FactoryLogic.feature.create({
														id: '36D7a7FRWqWNUAuY',
														name: 'Skill',
														description: 'Hide'
													})
												]
											}),
											cost: 0,
											count: 1
										})
									]
								}),
								FactoryLogic.feature.createBonus({
									id: 'qvXyTiz9um4G8Gqa',
									name: 'Magewright Recoveries',
									field: FeatureField.Recoveries,
									value: 4
								}),
								FactoryLogic.feature.createKitChoice({
									id: 'yEz97EFZ6id4meil',
									name: 'Kit',
									description: 'Your servitor can gain the benefits of a kit and use the kit’s signature ability. When your servitor deals damage with an action that doesn’t have a power roll, the damage bonus from its kit is not added to that damage. Your servitor can also equip treasures. Any leveled treasure used by your Servitor counts against the number you can carry safely.'
								})
							]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scHBzRWOCjetrmLG',
								name: 'Inexorable Protector',
								description: 'Your servitor is an ever faithful guardian.',
								type: FactoryLogic.type.createTrigger('The target takes damage from a strike.'),
								keywords: [
									AbilityKeyword.Magic,
									AbilityKeyword.Ranged
								],
								distance: [ FactoryLogic.distance.createSpecial('Special') ],
								target: 'Self or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Your servitor can shift its speed toward the target. If the servitor ends this movement adjacent to the target, it can swap places with the target, become the target of the triggering attack, and reduce the damage by half.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'You can spend up to 5 wonder to give it temporary Stamina equal to your Reason score times the number of Wonder you spend in this way.',
										repeatable: true
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vZjc3a3yk84N4NvU',
							name: 'Autonomous Labor',
							description: 'Your servitor gains an edge on any test made to assist another creature with a test. Additionally, if your servitor makes a test to assist a test and gets a tier 1 result, they don’t add a bane to the assisted test.'
						}),
						FactoryLogic.feature.createChoice({
							id: '78uOg9XOaaQr6cMC',
							name: 'Selective Function',
							description: `
You are able to upgrade your servitor to better suit your particular needs.

When you take a respite activity to change your upgrade or choose a new ward, you can select a new selective function feature for your servitor.`,
							options: [
								{
									feature: FactoryLogic.feature.create({
										id: 'vhWxJoPWfkCKiRlq',
										name: 'Steel Defender',
										description: 'Your servitor always treats a save ends effect as an EoT effect and their characteristic scores increase by 1 for the purpose of resisting potencies. It has an edge on Intuition tests.'
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.create({
										id: 'RLvAe8mGZcvwVJeF',
										name: 'Hunter-Seeker',
										description: 'Your servitor gains a bonus to its speed and a bonus to the number of squares it can shift when it takes the Disengage move action equal to your Reason score. It gains a +2 bonus to its free strikes and its rolled damage bonus. It has an edge on Agility tests.'
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.create({
										id: 'ind29kdxGMmxPd1i',
										name: 'War Frame',
										description: 'Your servitor replaces its current role with the mount role. Its size and stability increase by 1, with any size 1 target becoming size 2. While mounted on your servitor, abilities that target you have a double bane, and whenever you use your Infusion ability, your servitor can spend a recovery. It has an edge on Might tests.'
									}),
									value: 1
								}
							]
						}),
						FactoryLogic.feature.createChoice({
							id: 'Sp1qMj4zQKOUN5dl',
							name: '2nd-Level Vocation Ability',
							description: 'Your magewright vocation grants your choice of one of two abilities.',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'wfygSFnP0DGd9cGV',
											name: 'Re-Ignition',
											description: 'When in doubt, turn it off and on again.',
											type: FactoryLogic.type.createTrigger('Your start your turn or your servitor takes damage.'),
											keywords: [
												AbilityKeyword.Magic,
												AbilityKeyword.Servitor
											],
											distance: [ FactoryLogic.distance.createSpecial('Special') ],
											target: 'Your servitor',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('The servitor can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone. Until the end of their next turn, your servitor has a double edge on power rolls.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'ElpNcZM2pprGR5zn',
											name: 'Mechanical Advantage',
											description: 'Work smarter not harder.',
											type: FactoryLogic.type.createMain(),
											keywords: [
												AbilityKeyword.Magic,
												AbilityKeyword.Melee,
												AbilityKeyword.Strike,
												AbilityKeyword.Servitor
											],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: [ Characteristic.Might, Characteristic.Agility ],
														tier1: '6 + M or A damage; grabbed',
														tier2: '9 + M or A damage; grabbed',
														tier3: '12 + M or A damage; grabbed'
													})
												),
												FactoryLogic.createAbilitySectionText('While the target is grabbed by your servitor, ability rolls against them gain an edge, and whenever they take rolled damage, they take extra damage equal to twice your Reason score.')
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		},
		{
			id: 'vAea8UMYH0yaGxx5',
			name: 'Catalyst',
			description: 'Catalysts are magewrights who focus on the impermanence of creation, and learn to embrace the benefits of the ephemeral.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'magewright-sub-2-1-1',
							selected: [ 'Alchemy' ]
						}),
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'hEvu81mPFu8yEyCW',
							name: 'Catalyst Wonder Gain',
							tag: 'vocation',
							trigger: 'The first time each round that a creature uses an elixir or you create an elixir',
							value: '1',
							replacesTags: []
						}),
						FactoryLogic.feature.createMultiple({
							id: 'CtGhTfjsRvY2UTRC',
							name: 'Elixir',
							features: [
								FactoryLogic.feature.create({
									id: 'ArA9yZX0hUfoEWmG',
									name: 'Elixir Pool',
									description: `
You are able to distill your magic into elixirs and create a shared group resource called an Elixir Pool available to you and any ally that finishes a respite with you. At the start of an encounter, the Elixir Pool gains a number of elixirs equal to twice your Reason score, which retain their potency until the end of the encounter.

Once per turn, a creature can consume an elixir as a free maneuver, or use a maneuver to administer an elixir to a willing adjacent creature. They choose one of the following benefits for the elixir to grant when administered:

* **Surge.** The target gains 2 surges.
* **Recovery.** The target can spend a Recovery.
* **Saving Throw.** The target can end one effect on them that is ended by a saving throw or that ends at the end of their turn.

Additionally, you can use a maneuver to create an elixir, which can be added to the Elixir Pool, or used immediately by you or an adjacent ally.`
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: '25b8inIZ5bITHMOo',
										name: 'Administer Elixir',
										description: '',
										type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Once per turn', 'Free Maneuver if target is Self' ] }),
										keywords: [],
										distance: [
											FactoryLogic.distance.createSelf(),
											FactoryLogic.distance.createMelee()
										],
										target: 'Self or one willing creature',
										cost: 1,
										sections: [
											FactoryLogic.createAbilitySectionText(`
You choose one of the following benefits:

* The target gains 2 surges.
* The target can spend a Recovery.
* The target can end one effect on them that is ended by a saving throw or that ends at the end of their turn.`)
										]
									})
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'wGoZBnoJiFEvtkoW',
										name: 'Create Elixirs',
										description: '',
										type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Once per turn' ] }),
										distance: [ FactoryLogic.distance.createSpecial('Special') ],
										target: 'Special',
										sections: [
											FactoryLogic.createAbilitySectionText('You create two elixirs, which are immediately added to the Elixir Pool.')
										]
									})
								})
							]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'qkxM4axuk6bp1UxD',
								name: 'Catalytic Reaction',
								description: 'Never miss an opportunity to experiment...',
								type: FactoryLogic.type.createTrigger('The target would take damage from an ability that is not psychic or holy damage.'),
								keywords: [
									AbilityKeyword.Magic,
									AbilityKeyword.Ranged
								],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature or object',
								sections: [
									FactoryLogic.createAbilitySectionText('Before the damage is applied, the target gains damage immunity or weakness (your choice) to one of the following damage types: acid, cold, fire, lightning, poison, or sonic equal to your Reason score (save ends). The triggering damage is then changed to that same damage type.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'If any effect of the damage has a potency effect, you can increase or decrease the potency by 1.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createMultiple({
							id: 'g4WNC6CGQSQYTu7B',
							name: 'Philosopher\'s Stone',
							features: [
								FactoryLogic.feature.create({
									id: 'TMRtIskHodYTvsLx',
									name: 'Philosopher\'s Stone',
									description: `
When you make a crafting project roll using the Alchemy skill, you gain an edge and you can store the project points in a special alchemical stone. The stone can store a number of project points equal to 50 times your level. As part of this project roll, you can destroy any consumable in your possession and add an equivalent number of project points to the stone.

As a maneuver, you can expend project points from the stone and craft any consumable that you have both an item prerequisite and project source for, as long as you have the points available. Additionally, you may craft a 1st echelon consumable of your choice without spending any project points. When you use the stone in this way, you cannot do so again until you finish a respite.`
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'hbXaIeyYrurLtpyE',
										name: 'Philosopher\'s Stone',
										description: '',
										type: FactoryLogic.type.createManeuver(),
										distance: [ FactoryLogic.distance.createSelf() ],
										target: 'Self',
										sections: [
											FactoryLogic.createAbilitySectionText('You expend project points from the stone and craft any consumable that you have both an item prerequisite and project source for, as long as you have the project points available. Additionally, you may craft a 1st echelon consumable of your choice without spending any project points. When you use the stone in this way, you cannot do so again until you finish a respite.')
										]
									})
								})
							]
						}),
						FactoryLogic.feature.create({
							id: '2REM9W5mOW1RVjt5',
							name: 'Fortified Reagents',
							description: 'Whenever you or an ally drinks an elixir from your elixir pool, that creature gains temporary stamina equal to twice your Reason score.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'Gp0o9JhtGKH6MxR4',
							name: '2nd-Level Vocation Ability',
							description: 'Your magewright vocation grants your choice of one of two abilities.',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'JXcn3hBvoqU5nwkK',
											name: 'Instant Cement',
											description: 'This toxic tar absorbs nearby moisture to reinforce the hardening process.',
											type: FactoryLogic.type.createMain(),
											keywords: [
												AbilityKeyword.Area,
												AbilityKeyword.Magic,
												AbilityKeyword.Ranged
											],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
											target: 'Each enemy in the area',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '2 poison damage; M < [weak], slowed (save ends)',
														tier2: '4 poison damage; M < [average], slowed (save ends)',
														tier3: '5 poison damage; M < [strong], slowed (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('The area is considered difficult terrain. The tar remains in the area until the end of the encounter. Any creature who starts their turn in the area and has M < [average] is slowed (save ends). If the target is already slowed, they are instead restrained (save ends).')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'W57spDwcKuBRoGQT',
											name: 'Elixir of Regeneration',
											description: 'Bleeding out is now optional.',
											type: FactoryLogic.type.createTrigger('The target uses one of your elixirs.'),
											keywords: [
												AbilityKeyword.Magic
											],
											distance: [],
											target: 'Self or one ally',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('The target can spend a recovery, and gains regeneration that lasts until the end of the encounter. While the target has this regeneration, at the start of each of their turns, they gains temporary stamina equal to your Reason score and can spend a Recovery. Additionally, they can’t be made bleeding, even while dying.')
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		},
		{
			id: 'kLkge70odAf2moH5',
			name: 'Gilder',
			description: 'Gilders are artisans that fuse magic and metallurgy to inscribe equipment with powerful glyphs.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'magewright-sub-3-1-1',
							selected: [ 'Blacksmithing' ]
						}),
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'Ru8Fd3eJPJ9V4MC7',
							name: 'Gilder Wonder Gain',
							tag: 'vocation',
							trigger: 'The first time each round that an primed creature takes a main action',
							value: '1',
							replacesTags: []
						}),
						FactoryLogic.feature.create({
							id: 'IS9kph898TL1Xdbh',
							name: 'Sygaldry',
							description: `
You are able to inscribe arms, armor and implements with arcane glyphs that you can later prime during combat to bolster you or your allies. When you use your Infusion ability, one target of your choice becomes primed until the end of the encounter, you use this feature again, you willingly end this effect (no action required), or another magewright primes the target.

While one or more creatures are primed by you, you can spend 1 wonder to take one of the following free triggered actions:

* When a primed creature makes an ability roll, they gain an edge on that roll.
* When a primed creature force moves a creature or object, they can increase the distance by a number of squares equal to your Reason score.
* When a primed creature is force moved, you can reduce the total distance moved (to a minimum of 0) by an amount equal to your Reason score.
* Whenever a primed creature takes the Advance or Disengage action, they can increase the number of squares moved or shifted by your Reason score.

You can choose only one free triggered action option at a time, even if multiple options are triggered by the same effect.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'F9AimO6LsxyokcZi',
								name: 'Warding Glyph',
								description: 'Defensive wards on your allies\' armor activate, shielding them from harm.',
								type: FactoryLogic.type.createTrigger('You or an primed ally takes damage.'),
								keywords: [
									AbilityKeyword.Magic
								],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Special',
								sections: [
									FactoryLogic.createAbilitySectionText('The damage is halved. If any effect of the damage has a potency effect, you decrease the potency by 1.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'The target gains temporary stamina equal to twice your Reason score.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'WRKMJ75nlbTjAC2K',
							name: 'Synergetic Activation',
							description: 'At the start of an encounter, you can use a free triggered action to use your Infusion ability against one ally you have line of effect to, even if you are surprised. Additionally, whenever you use your free triggered action to activate an effect from your Sygaldry feature, you or another primed ally can spend a recovery.'
						}),
						FactoryLogic.feature.create({
							id: 'FfkIgxGcuTurA4Ku',
							name: 'Master Maker',
							description: 'When you make a project roll for a craft project, you may ignore a single bane before the roll. Additionally, you gain a breakthrough on project rolls to craft if you obtain a natural 18 on the project roll.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'f7uha6QreNsgyU8j',
							name: '2nd-Level Vocation Ability',
							description: 'Your magewright vocation grants your choice of one of two abilities.',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'IjgBsBZK6RvLguMq',
											name: 'Glyph of Protection',
											description: 'The best offense is an impenetrable defense.',
											type: FactoryLogic.type.createTrigger('You use your Warding Glyph ability.'),
											keywords: [
												AbilityKeyword.Magic
											],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('The target avoids any effects associated with the damage that triggered your Warding Glyph ability and can spend a Recovery. Each enemy adjacent to the target is pushed a number of squares equal to twice your Reason score.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'bIW9ptn7xpHxbVSo',
											name: 'Glyph of Synchronicity',
											description: 'When these glyphs activate, your allies become able to act as one.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [
												AbilityKeyword.Magic,
												AbilityKeyword.Ranged
											],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'Two creatures',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText(`
You can target yourself instead of one creature with this ability. The targets become primed by you and gain 2 surges.

**Primed Benefit:** Until the end of the encounter, whenever a primed creature uses a Main action, you can spend 1 or more wonder to allow one other primed creature per 1 wonder spent to use a free triggered action to shift up to half their speed and make a free strike.`)
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		},
		{
			id: '3xdaO0CUKzg21BbO',
			name: 'Magitecht',
			description: 'Magitechts are tinkerers and inventors who develop experimental devices that can aid themselves and their allies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'magewright-sub-4-1-1',
							selected: [ 'Jewelry' ]
						}),
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'COx5givvrbck4khY',
							name: 'Magitecht Wonder Gain',
							tag: 'vocation',
							trigger: 'The first time each round that a hero activates one of your experimental devices',
							value: '1',
							replacesTags: []
						}),
						FactoryLogic.feature.create({
							id: 'KQ79MHNTHfyhwZ8S',
							name: 'Experimental Device',
							description: `
During a respite, you are able to create a number of experimental devices equal to twice your Reason score, from among the list below. These experimental devices count as trinkets, and last until you use this feature again. Once per round, whenever a creature with a device uses a signature or heroic ability, they can activate a device (no action required). Additionally, creatures can use a free maneuver to gift or trade a device with a willing adjacent ally.

**Angular Fulcrum.** When you use an ability that pushes or pulls a creature or object with forced movement, you can activate this device to slide them instead. Until the start of your next turn, your stability becomes 0 and any forced movement that affects you has its distance increased by 2.

**Harmonic Resonator.** When you use an ability that has a potency effect, you can activate this device to increase the potency by 1. You then lose Stamina equal to 1d6 + your level.

**Recoil Compensator.** If you use an ability with the Ranged keyword you can activate this device to gain an edge on any power roll and increase the distance of that ability by 5. You are then pushed a number of squares equal to 2 plus the tier of the power roll.

**Recycling Capacitor.** When you use a heroic ability and obtain a tier 1 result, you can activate this device and regain 1 heroic resource.

**Transpositional Matrix.** When you use a signature or heroic ability, you can activate this device to spend 1 surge and teleport a number of squares equal to the magewright’s Reason score before or after the ability.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'rIe1mE932nl2GPGI',
								name: 'Overclock',
								description: 'Just need a little...more...POWER!',
								type: FactoryLogic.type.createTrigger('The target uses an ability.'),
								keywords: [
									AbilityKeyword.Magic,
									AbilityKeyword.Ranged
								],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('You can apply the effect of an additional experimental device to the triggering ability, even if the target doesn’t have the associated device.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'The target gains two surges, which they can use on the triggering ability. They may spend up to four surges on the triggering attack for extra damage, instead of three.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'Hwe0f70pmlT0eFDD',
							name: 'Experimental Mind',
							description: 'You may apply the benefits of your Devoted Artisan feature to project rolls made to research projects in addition to crafting projects.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vBOB466iQUzKmvVp',
								name: 'Jury Rig',
								description: '',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText(`
As a maneuver, you can choose a magewright signature or heroic ability that you would be able to learn if you were one level higher or lower. Provided you meet the ability’s other prerequisites and can spend any required Heroic Resources, you can use this ability once this encounter, and it costs 1d3 fewer wonder to use.

Once you use this feature, you cannot do so again until you gain at least 1 victory, or finish a respite.`)
								]
							})
						}),
						FactoryLogic.feature.createChoice({
							id: 'rbVNVq9X3p0HW5nO',
							name: '2nd-Level Vocation Ability',
							description: 'Your magewright vocation grants your choice of one of two abilities.',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'm5Z011QirmAq8RtR',
											name: 'Force Projection',
											description: 'That SHOULD hold them for a bit.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [
												AbilityKeyword.Area,
												AbilityKeyword.Magic,
												AbilityKeyword.Melee
											],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'Special',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('You can place this wall in occupied squares, sliding each creature in an affected square into the nearest unoccupied space of your choice. The wall remains until the end of the encounter or until you are dying. The wall’s squares are treated as stone squares for the purpose of damage and allies can move freely through the wall. An enemy who is force moved into the wall takes extra damage equal to your Reason score. As long as 1 square remains, you may regenerate up to 5 squares of the wall at the end of your turn.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'Z8nomAtixne7USBP',
											name: 'Local Relativity',
											description: 'You briefly collapse space and time around a foe, redirecting an attack, and shunt them elsewhere.',
											type: FactoryLogic.type.createTrigger('The target uses a signature ability.'),
											keywords: [
												AbilityKeyword.Magic,
												AbilityKeyword.Ranged
											],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'One creature',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('Choose an enemy within range, including the triggering enemy. The strike targets that enemy instead. You can teleport the target up to 3 squares, and they are R < Strong dazed until the end of their turn. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.')
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		}
	],
	level: 1,
	characteristics: []
};

const vessel: HeroClass = {
	id: 'class-vessel',
	name: 'Vessel',
	description: `
*By ChaoticGoodra*

*“I am a man possessed,” he groaned, “and without this devil-blade I carry I would not be a man at all.”*

You made a pact with an otherworldly being in exchange for power. Thanks to this bargain, a mote of that being’s essence has taken root within you. You have been granted great power, at great price. Whether you revel in your work as a harbinger, or resent the terms of your pact, you use these powers to your own ends - and perhaps, unknowingly, something else’s.

As a vessel, you debilitate your enemies and bolster yourself, sacrificing long-term power for short term gain (or vice versa). You call on otherworldly gifts to rend your foes’ souls, and glimpse into the realms beyond ours.`,
	type: 'standard',
	subclassName: 'Otherworldly Patron',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'vessel-1-1',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'vessel-1-2',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'vessel-1-3',
					name: 'Fervor',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3',
							tag: 'Start 1'
						},
						{
							trigger: 'The first time in a round a creature within 10 squares of you uses an ability with an associated potency',
							value: '1',
							tag: 'Potency 1'
						},
						{
							trigger: 'The first time in an encounter a creature within 10 squares is reduced to 0 Stamina, or the first time in an encounter that a solo creature within 10 squares becomes winded',
							value: '2',
							tag: 'Winded 1'
						},
						{
							trigger: 'The first time in an encounter an enemy within 10 squares makes a power roll with a bane',
							value: '2',
							tag: 'Bane 1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'vessel-1-4',
					listOptions: [ SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'vessel-1-5',
						name: 'Bargain',
						description: 'Offer more to your patron in the hopes of reaping further reward.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You lose 1d6 + your level in Stamina, which ignores temporary Stamina. Choose one of the following benefits that lasts until the end of the encounter, each of which can only be chosen once per encounter:

* You gain a +2 rolled damage bonus with Magic abilities.
* You double the distance of your ranged Magic abilities.
* Your rolled Magic abilities that inflict forced movement increase the distance of the forced movement by 2.
* Your Magic abilities have their potencies increased by 1.
* Your Magic abilities with the Area keyword have the area affected increased by 1. If the area is a line, you increase the size of one dimension, not both.`)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'vessel-1-6',
						name: 'Eldritch Lance',
						description: 'You blast a foe using the energy of your benefactor.',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'can be used as a ranged free strike' ], freeStrike: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Presence,
									tier1: '2 + P damage',
									tier2: '4 + P damage',
									tier3: '6 + P damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The damage this ability deals can be your patron’s damage type.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'vessel-1-7',
					name: 'Boon',
					description: 'Your patron has granted you a specific boon to enhance your defensive capabilities. You can choose one of the following boons. You can change your boon as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.createBonus({
								id: 'vessel-1-7a',
								name: 'Boon of the Mind',
								field: FeatureField.Save,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'vessel-1-7b',
								name: 'Boon of the Flesh',
								description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit. While you wear light armor, you gain a +3 bonus to Stamina and that bonus increases by 3 at 4th, 7th, and 10th levels. While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this boon.',
								features: [
									FactoryLogic.feature.createProficiency({
										id: 'vessel-1-7b-1',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									}),
									FactoryLogic.feature.createBonus({
										id: 'vessel-1-7b-2',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									}),
									FactoryLogic.feature.createAbilityDamage({
										id: 'vessel-1-7b-3',
										keywords: [ AbilityKeyword.Weapon ],
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createBonus({
								id: 'vessel-1-7c',
								name: 'Boon of Blood',
								field: FeatureField.Recoveries,
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'vessel-1-7d',
								name: 'Boon of Bone',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'vessel-1-7d-1',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: 'vessel-1-7d-2',
										field: FeatureField.Stability,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'vessel-1-7e',
								name: 'Boon of the Soul',
								description: 'Your soul burns with rage. When you take damage for the first time in a round, you gain 1 surge.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'vessel-1-7f',
								name: 'Boon of Shadow',
								description: 'Your shadow encompasses your form. You gain a +1 bonus to speed and to the distance you shift when you take the Disengage move action.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'vessel-1-7f-1',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'vessel-1-7f-2',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-1-8',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-1-9',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-1-10',
					cost: 5,
					fromClass: true,
					fromSubclass: false
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'vessel-2-1',
					lists: [ PerkList.Interpersonal, PerkList.Intrigue, PerkList.Special ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-2-2',
					cost: 5,
					fromClass: false,
					fromSubclass: true
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'vessel-3-1',
						name: 'Curse',
						description: 'You hex an opponent, bringing ruin to their name.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('You curse the target, causing them to have a bane on their next power roll before the end of their next turn.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'Double bane instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'vessel-3-2',
					name: 'Soul Witness',
					description: 'You can see the souls of those you face, peering into the true essence of their being to seek their vulnerabilities. Once per turn, you can choose a creature you can see within 10 as a free maneuver to learn which of their characteristic scores are < [weak].'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-3-3',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'vessel-4-1a',
					name: 'Characteristic Increase',
					description: 'Your Presence score increases to 3.',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'vessel-4-1b',
					name: 'Characteristic Increase',
					description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 3.',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'vessel-4-1b-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'vessel-4-1b-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'vessel-4-1b-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'vessel-4-1b-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'vessel-4-2',
					name: 'Eternal Fragment',
					tag: 'Potency 2',
					trigger: 'The first time in a round a creature within 10 squares of you uses an ability with an associated potency',
					value: '2',
					replacesTags: [ 'Potency 1' ]
				}),
				FactoryLogic.feature.create({
					id: 'vessel-4-3',
					name: 'Hear Me!',
					description: 'When you Bargain, you can choose up to two enhancements. You lose an additional 1d6 Stamina if you choose a second.'
				}),
				FactoryLogic.feature.create({
					id: 'vessel-4-4',
					name: 'Hexbinder',
					description: 'Once per turn, when a creature is unaffected by a potency you inflict, you gain a surge, which you can choose to immediately use on any damage associated with the ability. Alternatively, you can forgo a successful potency to gain the same benefit.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'vessel-4-5'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'vessel-4-6'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vessel-5-1',
					cost: 9
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'vessel-ability-1',
			name: 'Bone Burst',
			description: 'A wave of bones smash into your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'All enemies and objects',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage; M < [strong], prone'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-2',
			name: 'Drain Vitality',
			description: 'You absorb the life essence of a creature through your grasp.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '5 + P corruption damage',
						tier2: '8 + P corruption damage',
						tier3: '11 + P corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to your Presence score until the start of your next turn. If the attack kills the target, you get temporary Stamina equal to thrice your Presence score until the start of your next turn instead.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-3',
			name: 'Flash From Beyond',
			description: 'A glimpse of realms beyond sends your foes fleeing.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
			target: 'All enemies',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '2 patron damage; push 1',
						tier2: '3 patron damage; push 2',
						tier3: '4 patron damage; push 3'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-4',
			name: 'From Pain, Power',
			description: 'Your suffering becomes theirs.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '5 + P psychic damage',
						tier2: '7 + P psychic damage',
						tier3: '9 + P psychic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If you’ve taken damage since the start of your last turn, you gain 1 surge before making the power roll.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-5',
			name: 'Wither',
			description: 'A bolt of unholy energy saps the life from a foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '3 + P corruption damage; P < [weak], the target takes a bane on their next power roll',
						tier2: '5 + P corruption damage; P < [average], the target takes a bane on their next power roll',
						tier3: '8 + P corruption damage; P < [strong], the target takes a bane on their next power roll'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-6',
			name: 'Anima Extraction',
			description: 'A tendril of shadow repurposes life essence.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '4 + P corruption damage',
						tier2: '7 + P corruption damage',
						tier3: '10 + P corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You or an ally within range gain temporary Stamina equal to half the damage dealt.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-7',
			name: 'Growing Corruption',
			description: 'You plant a hex, withering plants and darkening the earth.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Special',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('The area becomes cursed with your patron’s energy. The area lasts until the end of the encounter or you are dying. At the start of each round, the area grows by 1 square in every direction. Any enemy in the area or who targets a creature in the area takes a bane on power rolls due to concealment. The area is difficult terrain for enemies.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-8',
			name: 'Induce Paranoia',
			description: 'You’re all alone; your allies are seconds from betrayal.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '4 + P psychic damage; R < [weak], frenzy',
						tier2: '6 + P psychic damage; R < [average], frenzy',
						tier3: '9 + P psychic damage; R < [strong], frenzy'
					})
				),
				FactoryLogic.createAbilitySectionText('A frenzied target makes a melee free strike against all your enemies within their range, including themself.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-9',
			name: 'Misfortune',
			description: 'You curse your foe to a horrible fate.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '6 + P patron damage; P < [weak], weakened (save ends)',
						tier2: '10 + P patron damage; P < [average], weakened (save ends)',
						tier3: '14 + P patron damage; P < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While weakened this way, the creature can’t benefit from edges or a critical hit.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-10',
			name: 'Bloodletting',
			description: 'New wounds appear from nowhere.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Up to three creatures',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '3 damage; M < [weak], bleeding (save ends)',
						tier2: '4 damage; M < [average], bleeding (save ends)',
						tier3: '6 damage; M < [strong], bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If a target is affected by the potency and is already bleeding, it takes additional damage equal to your Presence score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-11',
			name: 'Emanate Dread',
			description: 'Fear seeps from you like a fog.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'All enemies',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '4 psychic damage; I < [weak], frightened (save ends)',
						tier2: '5 psychic damage; push 1; I < [average], frightened (save ends)',
						tier3: '6 psychic damage; push 2; I < [strong], frightened (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-12',
			name: 'Embrittle',
			description: 'Spirits are easily drained, bones are easily broken.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '4 + P damage; M < [weak], slowed and the target has damage weakness 2 (EoT)',
						tier2: '6 + P damage; M < [average], slowed and the target has damage weakness 3 (EoT)',
						tier3: '8 + P damage; M < [strong], slowed and the target has damage weakness 5 (EoT)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-13',
			name: 'Enter the Beyond',
			description: 'You bring a part of your patron’s realm to yours.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
			target: '',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '2 patron damage',
						tier2: '4 patron damage',
						tier3: '5 patron damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The area becomes difficult terrain for your enemies. Each square willingly moved through causes the enemy to take 1 patron damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-14',
			name: 'Blight',
			description: 'Use your magic to undercut a foes’ ability to fend you off.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '8 + P corruption damage; P < [weak], slowed (save ends)',
						tier2: '11 + P corruption damage; P < [average], slowed (save ends)',
						tier3: '15 + P corruption damage; P < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While slowed this way, the target rolls two d10s on saving throws and takes the lower, and takes double damage from ending it using End Effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-15',
			name: 'The Harrowing',
			description: 'Focus your patron’s power into dismantling a foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '9 + P patron damage',
						tier2: '12 + P patron damage',
						tier3: '16 + P patron damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the target is harrowed. You can use a maneuver on your turn to cause all creatures harrowed by you to take patron damage equal to thrice your Presence score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-16',
			name: 'Hungering Rift',
			description: 'Tear a rift between realms that beckons the unwise.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('You open a 3-cube portal to your patron’s realm that lasts until the end of the encounter. As you conjure the portal and at the start of each round, make a power roll that affects all enemies within 5 of the portal. Then, any enemy in the portal’s space takes damage of your patron’s type equal to your Presence score.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: 'vertical pull 1 towards the portal’s center; I < [weak], vertical pull 3 instead',
						tier2: 'vertical pull 2 towards the portal’s center; I < [average], vertical pull 4 instead',
						tier3: 'vertical pull 3 towards the portal’s center; I < [strong], vertical pull 5 instead'
					})
				),
				FactoryLogic.createAbilitySectionText('A target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-17',
			name: 'Life Absorption',
			description: 'You draw in the life essence of enemies around you, empowering yourself.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'All enemies',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '3 corruption damage',
						tier2: '4 corruption damage',
						tier3: '6 corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to half the total damage dealt.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-18',
			name: 'Banish to the Beyond',
			description: 'You send an unfortunate soul to meet your patron’s home realm.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The target is sent to your patron’s native manifold, removing it from the encounter until the end of their next turn, reappearing in their original space or the nearest available space. Make a power roll upon its return.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '6 + P patron damage; I < [weak], dazed (save ends)',
						tier2: '9 + P patron damage; I < [average], dazed (save ends)',
						tier3: '12 + P patron damage; I < [strong], dazed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-19',
			name: 'Heartstopper',
			description: 'Reach into their chest and rip out their still-beating heart.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '8 + P damage',
						tier2: '10 + P damage',
						tier3: '13 + P damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is winded after damage resolves, they die if they rely on a heart to live and aren’t a leader, solo or boss. Otherwise, a winded creature is bleeding (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-20',
			name: 'Maddening Whispers',
			description: 'It’s hard to focus over the voices in your head.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'All enemies',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Presence,
						tier1: '5 psychic damage; R < [weak], wracked (save ends)',
						tier2: '7 psychic damage; R < [average], wracked (save ends)',
						tier3: '10 psychic damage; R < [strong], wracked (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A wracked creature must spend twice as much malice to use any ability that costs malice, at the start of their turn or as part of their statblock.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vessel-ability-21',
			name: 'Wall of the Damned',
			description: 'You conjure a wall of your patron’s victims.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10, within: 10 }) ],
			target: 'Special',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You can place this wall in occupied squares, with each creature in an affected place sliding to the nearest unoccupied square of your choice. The wall lasts until the end of the encounter or you are dying. The wall squares count as stone squares for purposes of damage. You can move freely through the wall squares. Whenever a creature dies within 10 of the wall, it grows an additional segment.

Any enemy who moves into the area for the first time in a combat round or starts their turn there takes patron damage equal to twice your Presence score and is M < [weak], restrained by the wall (save ends). An enemy that is force moved into the wall is M < [strong], restrained by the wall (save ends) instead, and the creature doing the forced movement can choose for the wall to not break if the excess movement would cause it to. A creature that saves against being restrained this way can shift 1 square.`)
			]
		})
	],
	subclasses: [
		{
			id: 'vessel-subclass-1',
			name: 'The Infernal',
			description: 'You bartered with a devil from the hells.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-1-1-dmg',
							name: 'Patron Damage Type',
							description: 'Your patron\'s damage type is fire.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'vessel-subclass-1-1-skill',
							selected: [ 'Persuade' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-1-1-1',
								name: 'Blistering Hellfire',
								description: 'Sear your foes’ soul with the fires of hell.',
								type: FactoryLogic.type.createMain(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature or object',
								cost: 'signature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: Characteristic.Presence,
											tier1: '2 + P fire damage; I < [weak], weakened (save ends)',
											tier2: '4 + P fire damage; I < [average], weakened (save ends)',
											tier3: '7 + P fire damage; I < [strong], weakened (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'While a target is weakened, they take fire damage at the start of each of their turns equal to your Presence score.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-1-1-2',
								name: 'Infernal Rebuke',
								description: 'Blast your enemy for daring to touch what’s yours.',
								type: FactoryLogic.type.createTrigger('A creature damages the target.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or 1 ally',
								sections: [
									FactoryLogic.createAbilitySectionText('The damaging creature takes fire damage equal to twice your Presence score, and is pushed 1 square from the target.')
								]
							})
						}),
						FactoryLogic.feature.create({
							id: 'vessel-subclass-1-1-3',
							name: 'Forked Tongue',
							description: 'You have an edge on tests made to influence NPCs during negotiations.'
						}),
						FactoryLogic.feature.create({
							id: 'vessel-subclass-1-1-4',
							name: 'Infernal Aspect',
							description: `
| Fervor      | Benefit |
|:============|:========|
| 2           | You have fire immunity equal to twice your Presence score. |
| 4           | You automatically succeed on saving throws to end the charmed or taunted conditions. |
| 6           | Your Infernal Rebuke’s damage increases to three times your Presence score, and its push increases to 3 squares. |
| 8           | You can’t be charmed or taunted. |
| 10          | You gain a +2 bonus to speed and to the distance you shift when you take the Disengage move action. |
| 12 (lvl 4+) | Your Infernal Rebuke’s damage increases to four times your Presence score, and its push increases to 5 squares. |`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-1-2-1',
							name: 'Hellsight',
							description: 'You don’t take a bane on attacks against concealed creatures. You can see in darkness.'
						})
					]
				},
				{
					level: 3,
					features: []
				},
				{
					level: 4,
					features: []
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-1-5-1',
							name: 'Devilish Luck',
							description: 'Your patron has taught you how to bargain with fate. Before you make a power roll, you can take 1d6 damage to gain an edge on the roll.'
						})
					]
				}
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'vessel-subclass-1-ability-1',
					name: 'Devilish Charm',
					description: 'Perhaps we can work this out in a more… civilised manner?',
					type: FactoryLogic.type.createTrigger('A creature damages you with a rolled ability.', { free: true }),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One enemy',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('The target obtains a tier 1 result on the power roll against you. You can add one additional target within the range or area to the ability, including enemies or the target themself. Then, roll power.'),
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'P < [weak], charmed (save ends)',
								tier2: 'P < [average], charmed (save ends)',
								tier3: 'P < [strong], charmed (save ends)'
							})
						)
					]
				}),
				FactoryLogic.createAbility({
					id: 'vessel-subclass-1-ability-2',
					name: 'Hellfire Mote',
					description: 'Hellfire coats the battlefield, igniting the souls of your foes.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
					target: 'All enemies',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: '5 fire damage; I < [weak], aflame (EoT)',
								tier2: '7 fire damage; I < [average], aflame (EoT)',
								tier3: '11 fire damage; I < [strong], aflame (EoT)'
							})
						),
						FactoryLogic.createAbilitySectionText('The first time an aflame target willingly moves, they take fire damage equal to twice your Presence score and the condition ends.')
					]
				})
			],
			selected: false
		},
		{
			id: 'vessel-subclass-2',
			name: 'The Undying',
			description: 'Your spirit or flesh have been changed by a necromantic being, such as a lich.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-2-1-dmg',
							name: 'Patron Damage Type',
							description: 'Your patron\'s damage type is corruption.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'vessel-subclass-2-1-skill',
							selected: [ 'Endurance' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-2-1-1',
								name: 'Enveloping Shadow',
								description: 'Encompass your enemy in a shroud of undeath.',
								type: FactoryLogic.type.createMain(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
								distance: [
									FactoryLogic.distance.createMelee(),
									FactoryLogic.distance.createRanged(5)
								],
								target: 'One creature',
								cost: 'signature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: Characteristic.Presence,
											tier1: '3 + P corruption damage; P < [weak], slowed (save ends)',
											tier2: '4 + P corruption damage; P < [average], slowed (save ends)',
											tier3: '6 + P corruption damage; P < [strong], slowed (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'You additionally frighten (save ends) any target that’s slowed.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-2-1-2',
								name: 'Incorporeality',
								description: 'One foot in the spirit realm.',
								type: FactoryLogic.type.createTrigger('You take damage.'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to twice your Presence score and reduce any potency of effects associated with the damage by 1.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-2-1-3',
								name: 'Eyes of the Grave',
								description: 'You witness the final moments of the recently deceased.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'Special',
								sections: [
									FactoryLogic.createAbilitySectionText('You can sense the last things seen by a corpse or head of a dead creature that you can touch.')
								]
							})
						}),
						FactoryLogic.feature.create({
							id: 'vessel-subclass-2-1-4',
							name: 'Undying Aspect',
							description: `
| Fervor      | Benefit |
|:============|:========|
| 2           | You have corruption immunity equal to twice your Presence score. |
| 4           | You automatically succeed on saving throws to end the frightened condition. |
| 6           | Your Incorporeality’s temporary Stamina increases to three times your Presence score. |
| 8           | You can’t be frightened. |
| 10          | You can’t be made bleeding, including via dying. |
| 12 (lvl 4+) | Your Incorporeality’s temporary Stamina increases to four times your Presence score. |`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-2-2-1',
							name: 'Indestructible Life',
							description: 'You’re not fully alive. When you can take the Catch Breath maneuver or are the target of a Heal action, you can spend as many Recoveries as you like instead of just one. If you hold a severed body part in place and spend a recovery to regain Stamina, the body part reattaches, and any part of your dead body can count as your full remains.'
						})
					]
				},
				{
					level: 3,
					features: []
				},
				{
					level: 4,
					features: []
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-2-5-1',
							name: 'Return from the Brink',
							description: 'Your connection to death allows you to subvert it. You and allies within 10 of you die when their negative Stamina equals their Stamina total, rather than their winded total.'
						})
					]
				}
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'vessel-subclass-2-ability-1',
					name: 'Circle of Death',
					description: 'All lives are but your playthings.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
					target: 'All enemies',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: '5 corruption damage',
								tier2: '7 corruption damage',
								tier3: '9 corruption damage'
							})
						),
						FactoryLogic.createAbilitySectionText('Choose Rotting Zombie or Shade. If you kill one or more creatures with this ability, they return in their spaces under your control as the chosen minion type. They can’t take their turns until your next turn.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vessel-subclass-2-ability-2',
					name: 'Rejuvenation',
					description: 'Your wounds knit and close on their own.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of the encounter, when you use this and at the start of your turn, you can spend any number of Recoveries. If you spend none, you gain temporary Stamina equal to thrice your Presence score that lasts until the start of your next turn.')
					]
				})
			],
			selected: false
		},
		{
			id: 'vessel-subclass-3',
			name: 'The Aberrant',
			description: 'Your mind slipped as you witnessed a being far beyond your comprehension.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-3-1-dmg',
							name: 'Patron Damage Type',
							description: 'Your patron\'s damage type is psychic.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'vessel-subclass-3-1-skill',
							selected: [ 'Psionics' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-3-1-1',
								name: 'Tentacle from Outside',
								description: 'Something outside reaches in.',
								type: FactoryLogic.type.createMain(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.createMelee(2) ],
								target: 'One creature or object',
								cost: 'signature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: Characteristic.Presence,
											tier1: '4 + P psychic damage; M < [weak], grabbed',
											tier2: '6 + P psychic damage; M < [average], grabbed',
											tier3: '9 + P psychic damage; M < [strong], grabbed'
										})
									),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'You additionally slide a grabbed creature a number of squares equal to your Presence score. It remains grabbed if it ends within the Melee distance of this ability.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vessel-subclass-3-1-2',
								name: 'Perplex',
								description: 'The minds of those around you are easily manipulated.',
								type: FactoryLogic.type.createTrigger('An enemy starts or ends their turn.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One enemy',
								sections: [
									FactoryLogic.createAbilitySectionText('You slide the target a number of squares up to your Presence score.')
								]
							})
						}),
						FactoryLogic.feature.create({
							id: 'vessel-subclass-3-1-3a',
							name: 'Warped Telepathy',
							description: 'You can telepathically communicate with creatures within 10 of you if they share a language with you and you know of each other. The receiver of your telepathic communications can choose to respond telepathically. In addition, if a creature attempts to instigate telepathic communication with you, you can choose to not allow it and cause them to take psychic damage equal to your level.'
						}),
						FactoryLogic.feature.createLanguage({
							id: 'vessel-subclass-3-1-3b',
							language: 'Mindspeech'
						}),
						FactoryLogic.feature.create({
							id: 'vessel-subclass-3-1-4',
							name: 'Aberrant Aspect',
							description: `
| Fervor      | Benefit |
|:============|:========|
| 2           | You have psychic immunity equal to twice your Presence score. You can use your Presence instead of Might to Grab or Knockback, and can grab an additional creature at a time. |
| 4           | You automatically succeed on saving throws to end the dazed condition. |
| 6           | Your Perplex’s slide increases to twice your Presence score. |
| 8           | You can’t be dazed. |
| 10          | Your Melee abilities have their distance increased by 2. |
| 12 (lvl 4+) | Your Perplex’s slide increases to thrice your Presence score. |`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-3-2-1',
							name: 'Sense Minds',
							description: 'You know the general location of all creatures within 10 of you, regardless of line of effect. This does not impact their ability to hide from you, but you have a double edge on the Search for Hidden Creatures maneuver to find creatures in this range.'
						})
					]
				},
				{
					level: 3,
					features: []
				},
				{
					level: 4,
					features: []
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'vessel-subclass-3-5-1',
							name: 'Mind Piercer',
							description: 'Your increasingly alien mind allows you to slip past mental defenses as if they weren’t there. If you use an ability that has a Reason, Intuition or Presence potency associated with it, you can choose before using the ability to change the potency to another of those characteristics.'
						})
					]
				}
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'vessel-subclass-3-ability-1',
					name: 'Unfathomable Geometries',
					description: 'Your form is warped and twists into spaces that don’t exist.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever an enemy uses an ability on you that requires line of effect or Searches while it can perceive you, the creature takes psychic damage equal to thrice your Presence score unless it takes a double bane on the roll.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vessel-subclass-3-ability-2',
					name: 'Wrack the Mind',
					description: 'BEHOLD! THE INFINITE COSMOS!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: '8 + P psychic damage; I < [weak], can’t take triggered actions (EoT)',
								tier2: '11 + P psychic damage; I < [average], dazed (EoT)',
								tier3: '14 + P psychic damage; I < [strong], dazed (save ends)'
							})
						)
					]
				})
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};

// #endregion

// #region Perks

const customModifications: Perk = {
	id: 'perk-custom-modifications',
	name: 'Custom Modifications',
	description: `
*This perk can only be taken by Magewright heroes*

You are able to craft small gadgets and specialized gear to aid you on your adventures. As a respite activity, choose one skill from the exploration or intrigue skill group that you don’t have. You have that skill until you finish your next respite. Alternatively, you can choose one ally that takes a respite with you to gain this benefit instead.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Supernatural
};

const livingMachinery: Perk = {
	id: 'perk-living-machinery',
	name: 'Living Machinery',
	description: `
*This perk can only be taken by Magewright heroes*

You gain the Heal skill, and it is considered a crafting skill for you instead of an exploration skill for you. Whenever you make a test to inspect a dead creature, or harvest ingredients from it, you have an edge on that attempt.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Supernatural
};

const nonLinearThinking: Perk = {
	id: 'perk-non-linear-thinking',
	name: 'Non-linear Thinking',
	description: `
*This perk can only be taken by Magewright heroes*

When an ally within 5 squares fails a Reason test, you can make a Reason test that takes a bane, with your roll replacing the ally’s roll. This perk can be used only once per test, even if more than one character has it.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Lore
};

const projectManager: Perk = {
	id: 'perk-project-manager',
	name: 'Project Manager',
	description: `
*This perk can only be taken by Magewright heroes*

When you take a respite activity, you can make a roll to assist a test of any number of allies or followers that make a crafting project roll, as long as you’re in the same settlement. Additionally, when you take a respite, choose one ally or retainer. They gain the benefit of any feature or perk related to crafting project rolls during that respite.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Crafting
};

const reverseEngineering: Perk = {
	id: 'perk-reverse-engineering',
	name: 'Reverse Engineering',
	description: `
*This perk can only be taken by Magewright heroes*

As a respite activity, you can take apart any complex mundane object or non-artifact treasure, destroying it. If you do, you immediately gain the project source for that object, and you gain project points equal to half the treasure’s goal that you can apply to any other crafting project.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Crafting
};

const technobabble: Perk = {
	id: 'perk-technobabble',
	name: 'Technobabble',
	description: `
*This perk can only be taken by Magewright heroes*

When you make a test that uses the Brag, Intimidate, or Lie skill, you can use Reason instead of any other characteristic the test calls for.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Lore
};

// #endregion

export const communityPrerelease: Sourcebook = {
	id: 'community-prerelease',
	name: 'Community (pre-release)',
	description: 'Selected community creations (pre-release).',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};

export const community: Sourcebook = {
	id: 'community',
	name: 'Community',
	description: 'Selected community creations.',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [
		aranox,
		asomath,
		beastfolk,
		deva,
		gallGuardian,
		ironbound,
		oakling,
		siabhra,
		solar
	],
	careers: [],
	classes: [
		magewright,
		vessel
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [
		customModifications,
		livingMachinery,
		nonLinearThinking,
		projectManager,
		reverseEngineering,
		technobabble
	],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
