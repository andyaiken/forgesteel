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

export const beastfolk: Ancestry = {
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
								id: 'beastfolk-2-14a',
								selected: [ 'Hide' ]
							}),
							FactoryLogic.feature.create({
								id: 'beastfolk-2-14b',
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
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
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

export const deva: Ancestry = {
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

export const ironbound: Ancestry = {
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
			selectAt: 'respite'
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
								FactoryLogic.createAbilitySectionText('You can spend a Recovery to take one additional main action.'),
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

export const siabhra: Ancestry = {
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
