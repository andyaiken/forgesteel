import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const holyIdol: Terrain = {
	id: 'holy-idol',
	name: 'Holy Idol',
	description:
    'An empowering monument to a higher power enables a villain’s machinations.',
	category: TerrainCategory.PowerFixture,
	level: 5,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Support,
		TerrainRoleType.Relic
	),
	encounterValue: 7,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 35,
		perSquare: 0
	},
	size: '2',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The holy idol must be completely destroyed.'
				})
			]
		},
		{
			id: 'empowered-will',
			content: [
				FactoryLogic.feature.create({
					id: 'empowered-will',
					name: 'Empowered Will',
					description: 'At the start of each round while the holy idol is intact, the Director gains a d6 that lasts until the end of the round. When a Director-controlled creature deals or takes damage, the Director can roll the d6 to increase the damage the creature deals or reduce the damage the creature takes by an amount equal to the roll (to a minimum of 2 damage). If multiple idols are in play, only one d6 can be applied to a single instance of damage.'
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

export const psionicShard: Terrain = {
	id: 'psionic-shard',
	name: 'Psionic Shard',
	description: 'A massive humming crystal makes the air around it feel thick.',
	category: TerrainCategory.PowerFixture,
	level: 5,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Defender,
		TerrainRoleType.Fortification
	),
	encounterValue: 7,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 40,
		perSquare: 0
	},
	size: '2',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The psionic shard must be completely destroyed.'
				})
			]
		},
		{
			id: 'trigger-effect',
			content: [
				FactoryLogic.feature.create({
					id: 'trigger',
					name: 'Trigger',
					description: 'The shard is destroyed.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The shard releases a shockwave that briefly tightens the barrier around each creature affected by Psionic Barrier, inflicting dazed (EoT). '
				})
			]
		},
		{
			id: 'psionic-barrier',
			content: [
				FactoryLogic.feature.create({
					id: 'psionic-barrier',
					name: 'Psionic Barrier',
					description: 'A psionic shard is attuned to one side in an encounter. While a psionic shard is intact, any damage dealt to each ally of the shard in the encounter is halved.'
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

export const treeOfMight: Terrain = {
	id: 'terrain-tree-of-might',
	name: 'Tree of Might',
	description: 'A gnarled tree with unearthed roots that writhe and curl.',
	category: TerrainCategory.PowerFixture,
	level: 5,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Hexer,
		TerrainRoleType.Hazard
	),
	encounterValue: 14,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 60,
		perSquare: 0
	},
	size: '3',
	damageMods: [],
	sections: [
		{
			id: 'damage-immunity',
			content: [
				FactoryLogic.feature.create({
					id: 'damage-immunity',
					name: 'Damage Immunity',
					description: '5 to all damage except corruption or fire damage'
				})
			]
		},
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'deactivate',
					description: 'The tree of might must be completely destroyed.'
				})
			]
		},
		{
			id: 'trees-nourishment',
			content: [
				FactoryLogic.feature.create({
					id: 'trees-nourishment',
					name: 'Tree\'s Nourishment',
					description:
            'At the start of each round while the tree of might is intact, each enemy touching the ground in the encounter area who has **M<0** takes 10 corruption damage, and the tree of might grows a fruit. The potency increases by 1 each subsequent round.'
				})
			]
		},
		{
			id: 'mighty-fruit',
			content: [
				FactoryLogic.feature.create({
					id: 'mighty-fruit',
					name: 'Mighty Fruit',
					description:
            'Once per round, any creature adjacent to the tree of might can take a fruit from the tree and eat it (no action required). The creature gains 10 temporary Stamina and has their Might score increased by 1 (to a maximum of 6) until the end of the encounter.'
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
