import { CultureType } from '@/enums/culture-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';

export class EnvironmentData {
	static nomadic = FactoryLogic.feature.createSkillChoice({
		id: 'env-nomadic',
		name: 'Nomadic',
		description: 'A nomadic culture travels from place to place to survive.',
		listOptions: [
			SkillList.Exploration,
			SkillList.Interpersonal
		]
	});

	static rural = FactoryLogic.feature.createSkillChoice({
		id: 'env-rural',
		name: 'Rural',
		description: 'A rural culture is one located in a town, village, or smaller settled enclave.',
		listOptions: [
			SkillList.Crafting,
			SkillList.Lore
		]
	});

	static secluded = FactoryLogic.feature.createSkillChoice({
		id: 'env-secluded',
		name: 'Secluded',
		description: 'A secluded culture is based in one relatively close-quarters structure — a building, a cavern, and so forth — and interacts with other cultures only rarely.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Lore
		]
	});

	static urban = FactoryLogic.feature.createSkillChoice({
		id: 'env-urban',
		name: 'Urban',
		description: 'An urban culture is always centered in a city.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Intrigue
		]
	});

	static wilderness = FactoryLogic.feature.createSkillChoice({
		id: 'env-wilderness',
		name: 'Wilderness',
		description: 'A wilderness culture doesn’t try to tame the terrain in which its people live, whether desert, forest, swamp, tundra, ocean, or more exotic climes.',
		listOptions: [
			SkillList.Crafting,
			SkillList.Exploration
		]
	});

	static getEnvironments = () => {
		return [
			this.nomadic,
			this.rural,
			this.secluded,
			this.urban,
			this.wilderness
		];
	};
}

export class OrganizationData {
	static bureaucratic = FactoryLogic.feature.createSkillChoice({
		id: 'org-bureaucratic',
		name: 'Bureaucratic',
		description: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Intrigue
		]
	});

	static communal = FactoryLogic.feature.createSkillChoice({
		id: 'org-communal',
		name: 'Communal',
		description: 'A communal culture is a place where all members of the culture are considered equal.',
		listOptions: [
			SkillList.Crafting,
			SkillList.Exploration
		]
	});

	static getOrganizations = () => {
		return [
			this.bureaucratic,
			this.communal
		];
	};
}

export class UpbringingData {
	static academic = FactoryLogic.feature.createSkillChoice({
		id: 'up-academic',
		name: 'Academic',
		description: 'Your hero was raised by people who collect, study, and share books and other records.',
		listOptions: [
			SkillList.Lore
		]
	});

	static creative = FactoryLogic.feature.createSkillChoice({
		id: 'up-creative',
		name: 'Creative',
		description: 'A hero with a creative upbringing was raised among folk who create art or other works valuable enough to trade.',
		options: [
			'Music',
			'Perform'
		],
		listOptions: [
			SkillList.Crafting
		]
	});

	static lawless = FactoryLogic.feature.createSkillChoice({
		id: 'up-lawless',
		name: 'Lawless',
		description: 'Your hero grew up among folk who performed activities that other people — whether within or outside their culture — considered unlawful.',
		listOptions: [
			SkillList.Intrigue
		]
	});

	static labor = FactoryLogic.feature.createSkillChoice({
		id: 'up-labor',
		name: 'Labor',
		description: 'Your hero came of age in a culture where people labored for a living.',
		options: [
			'Blacksmithing',
			'Handle Animals'
		],
		listOptions: [
			SkillList.Exploration
		]
	});

	static martial = FactoryLogic.feature.createSkillChoice({
		id: 'up-martial',
		name: 'Martial',
		description: 'A hero with a martial upbringing was raised by warriors.',
		options: [
			'Blacksmithing',
			'Fletching',
			'Climb',
			'Endurance',
			'Ride',
			'Intimidate',
			'Alertness',
			'Track',
			'Monsters',
			'Strategy'
		]
	});

	static noble = FactoryLogic.feature.createSkillChoice({
		id: 'up-noble',
		name: 'Noble',
		description: 'Your hero grew up among leaders who rule over others and play the games of politics to maintain power.',
		listOptions: [
			SkillList.Interpersonal
		]
	});

	static getUpbringings = () => {
		return [
			this.academic,
			this.creative,
			this.lawless,
			this.labor,
			this.martial,
			this.noble
		];
	};
}

export class CultureData {
	static bespoke = FactoryLogic.createCulture('Bespoke Culture', 'Choose any Environment, Organization, and Upbringing.', CultureType.Bespoke);
}
