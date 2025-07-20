import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const theBlackObelisk: Terrain = {
	id: 'terrain-the-black-obelisk',
	name: 'The Black Obelisk',
	description: 'A foreboding black obelisk that knows more about you than you would like.',
	category: TerrainCategory.ArcaneObject,
	level: 3,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
	encounterValue: 20,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 100,
		perSquare: 0
	},
	size: '2',
	damageMods: [],
	sections: [
		{
			id: 'disable',
			content: [
				FactoryLogic.feature.create({
					id: 'disable',
					name: 'Disable',
					description: 'Make a hard Reason test when you are adjacent to the object. Magic will generally apply. On a success the object is disabled for the rest of the encounter. Failure with a consequence means you immediately trigger Your Fears Become Manifest with a bane. Success with a consequence means the object is disabled, but you are slowed (save ends).'
				})
			]
		},
		{
			id: 'trigger-effect',
			content: [
				FactoryLogic.feature.create({
					id: 'trigger',
					name: 'Trigger',
					description: 'A round begins.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'Each enemy within 10 of the Black Obelisk suffers the Your Fears Become Manifest ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'your-fears-become-manifest',
						name: 'Your Fears Become Manifest',
						type: FactoryLogic.type.createTrigger(''),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Object ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'P<1 slowed (EoT)',
									tier2: 'P<2 slowed (EoT), weakened (EoT)',
									tier3: 'P<3 slowed (EoT), weakened (EoT), frightened (EoT)'
								})
							),
							FactoryLogic.createAbilitySectionText('The target is pushed 2.')
						]
					})
				})
			]
		}
	],
	upgrades: [],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const theChronalHypercube: Terrain = {
	id: 'terrain-the-chronal-hypercube',
	name: 'The Chronal Hypercube',
	description: 'A shape that is impossible for most creatures to understand.',
	category: TerrainCategory.ArcaneObject,
	level: 3,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
	encounterValue: 20,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 80,
		perSquare: 0
	},
	size: '1M',
	damageMods: [],
	sections: [
		{
			id: 'disable',
			content: [
				FactoryLogic.feature.create({
					id: 'disable',
					name: 'Disable',
					description: 'Only a creature trained in Psionics can attempt to disable the Chronal Hypercube. Make a hard Reason test when within 10 of the Hypercube. On a success, the Hypercube teleports adjacent to your square at the start of the next round and becomes your ally. On a failure with a consequence you take 1d6 psychic damage.'
				})
			]
		},
		{
			id: 'dimensional-flicker',
			content: [
				FactoryLogic.feature.create({
					id: 'dimensional-flicker',
					name: 'Dimensional Flicker',
					description: 'At the start of the round, roll 1d10. On a 7+ the Hypercube teleports to a square of your choice within 10 and is hidden. A creature with the Psionics skill can use those skills to attempt to ﬁnd it.'
				})
			]
		},
		{
			id: 'chronal-superhighway',
			content: [
				FactoryLogic.feature.create({
					id: 'chronal-superhighway',
					name: 'Chronal Superhighway',
					description: 'Allies within 10 squares of the Hypercube can teleport in place of any normal movement they take, using the same distance as the normal movement. They have an edge on any attacks they make after teleporting.'
				})
			]
		}
	],
	upgrades: [],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const theThroneOfAAn: Terrain = {
	id: 'terrain-the-throne-of-aan',
	name: 'The Throne of A\'An',
	description: 'A’An was the Sun God of the Antical Protectorate in what was now Vanigar. She was slain along with the other Nine Star Gods, ending the Age of Suns, plunging the region into eternal winter.',
	category: TerrainCategory.ArcaneObject,
	level: 4,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
	encounterValue: 24,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 140,
		perSquare: 0
	},
	size: '2',
	damageMods: [],
	sections: [
		{
			id: 'disable',
			content: [
				FactoryLogic.feature.create({
					id: 'disable',
					name: 'Disable',
					description: 'The Throne can only be disabled by attuning to it, casting out the current occupant, and sitting in it, becoming the new Hierophant of A’An. The Hierophant can make a hard Presence test with a bane to disable the Throne. Failure with a consequence triggers Nova.'
				})
			]
		},
		{
			id: 'light-of-the-northern-sun',
			content: [
				FactoryLogic.feature.create({
					id: 'light-of-the-northern-sun',
					name: 'Light of the Northern Sun',
					description: `
In the Age of Suns there was no darkness and no night. Even among the many suns of that time, the light of A’An was the brightest.
The Throne manifests the Sun powers of A’An, even when no one is seated in it. The following eﬀects occur within 10 squares of the Throne: 
• The Throne casts a bright light, preventing any form of concealment or darkness from existing or manifesting, even from a god. 
• No creature can hide. 
• Any creature with cold immunity gains fire weakness 10. 
• Any creature that uses an ability that does cold damage takes 11 fire damage.`
				})
			]
		},
		{
			id: 'sitting-on-the-throne',
			content: [
				FactoryLogic.feature.create({
					id: 'sitting-on-the-throne',
					name: 'Sitting on the Throne',
					description: `
“Awaken me! The Sun must shine again!” 
Only a creature attuned to the throne can sit in it. A creature can attune to the throne as an action, if adjacent to the Throne, by succeeding at a hard Presence test. Failing this test with a consequence inﬂicts 11 ﬁre damage. 

A creature seated in the throne becomes the Hierophant of A’An and gains the following beneﬁts: 
• The Hierophant, and their allies within 10 squares, gain fire immunity 10 
• The Hierophant, and their allies within 10 squares, can choose to do fire damage instead of their normal damage 
• You gain +5 stability and all attacks against you suffer a bane, unless the attacker is also attuned to the Throne. 
• They gain the Primordial Flare and Solar Accretion abilities.`
				})
			]
		},
		{
			id: 'primordial-flare',
			content: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'primordial-flare',
						name: 'Primordial Flare',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '6 fire damage',
									tier2: '11 fire damage',
									tier3: '14 fire damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The target gains fire weakness 10 until the beginning of the Hierophant’s next turn.')
						]
					})
				})
			]
		},
		{
			id: 'solar-accretion',
			content: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'solar-accretion',
						name: 'Solar Accretion',
						type: FactoryLogic.type.createTrigger('A target within distance is winded or reduced to 0 Stamina by fire damage.', { free: true }),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('If the Hierophant is a hero, they gain 3 heroic resources. If Hierophant is a villain, the Director gains 3 malice.')
						]
					})
				})
			]
		},
		{
			id: 'nova',
			content: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'nova',
						name: 'Nova',
						type: FactoryLogic.type.createTrigger('The Throne is destroyed or the Hierophant fails with a consequence when disabling it.', { free: true }),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All creatures and objects',
						sections: [
							FactoryLogic.createAbilitySectionText('Targets take 14 fire damage. The Hierophant gains the Incubator of A’An complication. If there is no Hierophant, a creature within 10 squares of the Throne, and chosen by the Director, gains the Incubator of A’An complication.')
						]
					})
				})
			]
		}
	],
	upgrades: [],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};
