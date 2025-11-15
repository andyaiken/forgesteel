import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

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
					feature: FactoryLogic.feature.create({
						id: 'solar-2-9',
						name: 'Flight',
						description: 'You possess wings made of fire and light powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While using your wings to fly at 3rd level or lower, you have damage weakness 5.'
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
	ancestryPoints: 3
};

export const communityPrerelease: Sourcebook = {
	id: 'community-prerelease',
	name: 'Community (pre-release)',
	description: 'Selected community creations',
	type: SourcebookType.ThirdParty,
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
	description: 'Selected community creations',
	type: SourcebookType.ThirdParty,
	ancestries: [
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
