import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const shadowElf: Ancestry = {
	id: 'ancestry-shadow-elf',
	name: 'Shadow Elf',
	description: '',
	features: [
		FactoryLogic.feature.create({
			id: 'shadow-elf-1',
			name: 'Shadow Elf Glamor',
			description: 'Your glamor coats you in the protective veil of the dark. You ignore concealment granted by darkness. Whenever you start your turn in darkness, you gain temporary Stamina equal to your level. This temporary Stamina lasts until the start of your next turn or you enter into direct sunlight.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'shadow-elf-2',
			name: 'Purchased Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'shadow-elf-2a',
						name: 'Dissolve',
						description: 'You can hide while you have concealment, even if you are observed.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'shadow-elf-2b',
							name: 'Lumina Volley',
							description: 'You fire a bolt that causes your target to glow, making them an even easier target.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One creature or object',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility ],
									tier1: '3 + M or A damage',
									tier2: '5 + M or A damage',
									tier3: '8 + M or A damage'
								})),
								FactoryLogic.createAbilitySectionText('You choose whether the next strike made against the target has an edge or a surge.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'shadow-elf-2c',
						name: 'Manifold Piercer',
						description: 'Whenever you inflict a condition on a target with a duration of EoT, you can spend a surge to change the duration to save ends.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createSaveThreshold({
						id: 'shadow-elf-2d',
						name: 'Otherworldly Grace',
						description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
						value: 5
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'shadow-elf-2e',
						name: 'Revisit Memory',
						description: 'Accessing memories is as easy as living in the present for you. You have an edge on all tests made to recall lore.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'shadow-elf-2f',
						name: 'Shadow Step',
						description: 'While you are in darkness or have concealment granted by darkness, you can use a move action to teleport into an unoccupied space also in concealment granted by darkness within 10.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'shadow-elf-2g',
							name: 'The Lay of Lightless',
							description: 'You hum a quiet poem that conjures shade from an unseen tree.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 }) ],
							target: 'Special',
							cost: 1,
							sections: [
								FactoryLogic.createAbilitySectionText('The area becomes veiled in dim, concealing darkness until the end of the encounter or you use this ability again. Outside of combat, you spend 1 minute of uninterrupted singing to use this ability, and the darkness lasts for 10 minutes.'),
								FactoryLogic.createAbilitySectionSpend({
									name: 'Spend',
									value: 1,
									repeatable: true,
									effect: 'The area of the cube increases by 1 for each heroic resource you spend (up to a maximum area of 1 + your highest characteristic)'
								}),
								FactoryLogic.createAbilitySectionField({
									name: 'Special',
									effect: 'If 10 or more creatures use this ability outside of combat while occupying the same 10 cube area, they can choose to spend 1 hour of uninterrupted singing to turn the lay into The Lay of Twilight, shrouding the area within 1 mile of their singing in a twilit, concealing darkness for 1 hour. If this is used in the same area as a creature using a similar feature that impacts the sun or creates weather effects, the features negate each other where their areas overlap. After doing so, they can’t use this ability again until they each complete a respite.'
								})
							]
						})
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};

export const patreon: Sourcebook = {
	id: 'patreon',
	name: 'Patreon Content',
	description: 'Playtest content for Patreon subscribers.',
	type: SourcebookType.Official,
	adventures: [],
	ancestries: [
		shadowElf
	],
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
