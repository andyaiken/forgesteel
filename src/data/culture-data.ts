import { FactoryLogic } from '../logic/factory-logic';
import { SkillList } from '../enums/skill-list';

export class EnvironmentData {
	static nomadic = FactoryLogic.feature.createSkillChoice({
		id: 'env-nomadic',
		name: 'Nomadic',
		description: 'A nomadic culture travels from place to place to survive. Members of a nomadic culture might follow animal migrations or the weather, travel to sell their wares or services, or simply enjoy a restless lifestyle full of new experiences and peoples. Those who grow up in nomadic cultures learn to navigate the wilderness and work closely with others to survive.',
		listOptions: [
			SkillList.Exploration,
			SkillList.Interpersonal
		]
	});

	static rural = FactoryLogic.feature.createSkillChoice({
		id: 'env-rural',
		name: 'Rural',
		description: 'A rural culture is one located in a town, village, or smaller settled enclave. People dwelling in such places often cultivate the land, trade goods or services with travelers passing through, harvest fish from the sea, or mine metals and gems from the earth. Living among a small population, most folks in a rural community learn a trade and are handed down bits of essential knowledge to help their community survive. For example, when a rural culture has only one blacksmith, it’s important to have an apprentice already learning at the anvil well before that smith starts to get old. If the only priest in town gets the sniffles, folks want an acolyte ready to wear the fancy robes should the worst occur.',
		listOptions: [
			SkillList.Crafting,
			SkillList.Lore
		]
	});

	static secluded = FactoryLogic.feature.createSkillChoice({
		id: 'env-secluded',
		name: 'Secluded',
		description: 'A secluded culture is based in one relatively close-quarters structure—a building, a cavern, and so forth—and interacts with other cultures only rarely. Such places are often buildings or complexes such as monasteries, castles, or prisons. Folk in a secluded culture have little or no reason to leave their home or interact with other cultures on the outside, but might have an awareness of those cultures and of events happening beyond their enclave. When people live together in close quarters, they typically learn to get along. They often spend much time in study or introspection, as there is not much else to do in seclusion.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Lore
		]
	});

	static urban = FactoryLogic.feature.createSkillChoice({
		id: 'env-urban',
		name: 'Urban',
		description: 'An urban culture is always centered in a city. Such a culture might arise within the walls of Capital, a massive metropolis with a cosmopolitan population; within a network of caverns that hold an underground city; or in any other place where a large population lives relatively close together. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowds and the political machinations that can come with city life.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Intrigue
		]
	});

	static wilderness = FactoryLogic.feature.createSkillChoice({
		id: 'env-wilderness',
		name: 'Wilderness',
		description: 'A wilderness culture doesn’t try to tame the terrain in which its people live, whether desert, forest, swamp, tundra, ocean, or more exotic climes. Instead, the folk of such a culture thrive amid nature, taking their sustenance and shelter from the land. A wilderness culture might be a circle of druids protecting a remote wode, a band of brigands hiding out in desert caves, or a camp of orc mercenaries who call the trackless mountains home. People in a wilderness culture learn how to use the land for all they need to live, typically crafting their own tools, clothing, and more.',
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
		description: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws. Members of such a culture are often ranked in power according to those laws, with a small group of people holding the power to rule according to birthright, popular vote, or some other official and measurable standard. Many bureaucratic communities have one person at the top, though others might be ruled by a council. A trade guild with a guildmaster, treasurer, secretary, and a charter of rules and regulations for membership; a feudal lord who rules over a group of knights who in turn rule over peasants working the land; and a militaristic society with ranks and rules that its people must abide are all examples of bureaucratic cultures. Those who thrive in bureaucratic cultures don’t simply follow the rules. They know how to use those rules to their advantage, either bending, changing, or reinterpreting policy to advance their own interests. Schmoozing with those who make the laws is often key to this approach. Others in a bureaucratic culture might specialize in operating outside the strict regulations that govern the culture without getting caught.',
		listOptions: [
			SkillList.Interpersonal,
			SkillList.Intrigue
		]
	});

	static communal = FactoryLogic.feature.createSkillChoice({
		id: 'org-communal',
		name: 'Communal',
		description: 'A communal culture is a place where all members of the culture are considered equal. The community works together to make important decisions that affect the majority of the culture. While they elect leaders to carry out these decisions and organize their efforts, each person has a relatively equal say in how the culture operates, and everyone contributes to help their people survive and thrive. Individuals often share the burdens of governing, physical labor, childcare, and other duties. A collective of farmers who work together to cultivate and protect their land without a noble, a city of pirates where each person can do as they wish, and a traveling theatrical troupe whose members vote on every artistic and administrative decision are all communal cultures. Many communal cultures operate outside settled lands, sticking to the wilds, a specific district in a larger settlement, city sewers, forgotten ruins, or other isolated places. For even when such cultures are harmless, their members know that outsiders might try to impose rules upon them if they live in the same place. As such, many folks in communal cultures focus on fending for themselves while avoiding the danger that other groups can represent.',
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
		description: 'Your hero was raised by people who collect, study, and share books and other records. Some academics focus on one area of study, such as a college for wizards dedicated to the study of magic, or a church that teaches the word of one deity. People in an academic culture learn how to wield the power that is knowledge.',
		listOptions: [
			SkillList.Lore
		]
	});

	static creative = FactoryLogic.feature.createSkillChoice({
		id: 'up-creative',
		name: 'Creative',
		description: 'A hero with a creative upbringing was raised among folk who create art or other works valuable enough to trade. A creative culture might produce fine art such as dance, music, or sculpture, or more practical wares such as wagons, weapons, tools, or buildings. People in such cultures learn the value of quality crafting and attention to detail.',
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
		description: 'Your hero grew up among folk who performed activities that other people—whether within or outside their culture—considered unlawful. A band of pirates, a guild of assassins, or an organization of spies all commit unlawful acts for money. And under tyranny, people engaged in rebellion are often considered lawless in their actions and activities. People brought up in a lawless culture typically don’t mind breaking the rules when it suits them—and are good at making sure no one finds out they did.',
		listOptions: [
			SkillList.Intrigue
		]
	});

	static labor = FactoryLogic.feature.createSkillChoice({
		id: 'up-labor',
		name: 'Labor',
		description: 'Your hero came of age in a culture where people labored for a living. They might have been cultivators, typically raising crops or livestock on a farm. They might have harvested natural resources, whether by hunting, trapping, logging, or mining. Or they might have excelled at manual labor tied to settlement and trade, such as construction, carting, loading cargo, and so forth. People with a labor upbringing know the value of hard work.',
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
		description: 'A hero with a martial upbringing was raised by warriors. These might have been the soldiers of an established army, a band of mercenaries, a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat. Heroes with a martial upbringing are always ready for a fight—and they know how to finish that fight.Draw Steel 56',
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
		description: 'Your hero grew up among leaders who rule over others and play the games of politics to maintain power. Many families are nobles by birthright, but some cultures have noble titles earned through deeds or popularity. Whatever the case, heroes with this background understand why the whispered words in the right ear can sometimes be more powerful than any army.',
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
	static bespoke = FactoryLogic.createCulture('Bespoke Culture', 'Choose any Environment, Organization, and Upbringing.');
}
