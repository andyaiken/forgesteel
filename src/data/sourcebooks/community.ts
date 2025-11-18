import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const aranox: Ancestry = {
	id: 'aranox',
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

const solar: Ancestry = {
	id: 'solar',
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

export const communityPrerelease: Sourcebook = {
	id: 'community-prerelease',
	name: 'Community (pre-release)',
	description: 'Selected community creations (pre-release).',
	type: SourcebookType.Community,
	ancestries: [],
	careers: [],
	classes: [],
	complications: [],
	cultures: [],
	domains: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	perks: [],
	projects: [],
	subclasses: [],
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
	ancestries: [
		aranox,
		solar
	],
	careers: [],
	classes: [],
	complications: [],
	cultures: [],
	domains: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	perks: [],
	projects: [],
	subclasses: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
