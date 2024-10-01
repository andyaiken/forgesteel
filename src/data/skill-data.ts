import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { Skill } from '../models/skill';
import { SkillList } from '../enums/skill-list';

export class SkillData {
	static getSkills = (setting?: CampaignSetting) => {
		const list: Skill[] = [
			{ name: 'Alchemy', description: 'Make bombs and potions.', list: SkillList.Crafting },
			{ name: 'Architecture', description: 'Create buildings and vehicles.', list: SkillList.Crafting },
			{ name: 'Blacksmithing', description: 'Forge metal armor and weapons.', list: SkillList.Crafting },
			{ name: 'Fletching', description: 'Make ranged weapons and ammunition.', list: SkillList.Crafting },
			{ name: 'Forgery', description: 'Create false badges, documents, and other items.', list: SkillList.Crafting },
			{ name: 'Jewelry', description: 'Create bracelets, crowns, rings, and other jewelry.', list: SkillList.Crafting },
			{ name: 'Mechanics', description: 'Build machines and clockwork items.', list: SkillList.Crafting },
			{ name: 'Tailoring', description: 'Craft cloth and leather clothing.', list: SkillList.Crafting },
			{ name: 'Climb', description: 'Move up vertical surfaces.', list: SkillList.Exploration },
			{ name: 'Drive', description: 'Control vehicles.', list: SkillList.Exploration },
			{ name: 'Endurance', description: 'Remain engaged in strenuous activity over a long period of time.', list: SkillList.Exploration },
			{ name: 'Gymnastics', description: 'Move across unsteady or narrow surfaces, and tumble.', list: SkillList.Exploration },
			{ name: 'Heal', description: 'Use mundane first aid.', list: SkillList.Exploration },
			{ name: 'Jump', description: 'Leap vertical and horizontal distances.', list: SkillList.Exploration },
			{ name: 'Lift', description: 'Pick up, carry, and throw heavy objects.', list: SkillList.Exploration },
			{ name: 'Navigate', description: 'Read a map and travel without becoming lost.', list: SkillList.Exploration },
			{ name: 'Ride', description: 'Ride and control a mount who isn’t sapient, such as a horse.', list: SkillList.Exploration },
			{ name: 'Swim', description: 'Move through deep liquid.', list: SkillList.Exploration },
			{ name: 'Brag', description: 'Impress others with stories of your deeds.', list: SkillList.Interpersonal },
			{ name: 'Empathize', description: 'Relate to someone on a personal level.', list: SkillList.Interpersonal },
			{ name: 'Flirt', description: 'Attract romantic attention from someone.', list: SkillList.Interpersonal },
			{ name: 'Gamble', description: 'Make bets with others.', list: SkillList.Interpersonal },
			{ name: 'Handle Animals', description: 'Interact with animal wildlife that isn’t sapient.', list: SkillList.Interpersonal },
			{ name: 'Interrogate', description: 'Obtain information from a creature withholding it.', list: SkillList.Interpersonal },
			{ name: 'Intimidate', description: 'Awe or scare a creature.', list: SkillList.Interpersonal },
			{ name: 'Lead', description: 'Inspire people to action.', list: SkillList.Interpersonal },
			{ name: 'Lie', description: 'Convince someone that a falsehood is true.', list: SkillList.Interpersonal },
			{ name: 'Music', description: 'Perform music vocally or with an instrument.', list: SkillList.Interpersonal },
			{ name: 'Perform', description: 'Engage in dance, oratory, acting, or some other physical performance.', list: SkillList.Interpersonal },
			{ name: 'Persuade', description: 'Convince someone to agree with you through use of your charms and grace.', list: SkillList.Interpersonal },
			{ name: 'Read Person', description: 'Read the emotions and body language of other creatures.', list: SkillList.Interpersonal },
			{ name: 'Alertness', description: 'Intuitively sense the details of your surroundings.', list: SkillList.Intrigue },
			{ name: 'Conceal Object', description: 'Hide an object on your person or in your environment.', list: SkillList.Intrigue },
			{ name: 'Disguise', description: 'Change your appearance to look like a different person.', list: SkillList.Intrigue },
			{ name: 'Eavesdrop', description: 'Actively listen to something that is hard to hear, such as a whispered conversation through a door.', list: SkillList.Intrigue },
			{ name: 'Escape Artist', description: 'Escape from bonds such as rope or manacles.', list: SkillList.Intrigue },
			{ name: 'Hide', description: 'Conceal yourself from others’ observation.', list: SkillList.Intrigue },
			{ name: 'Pick Lock', description: 'Open a lock without using the key.', list: SkillList.Intrigue },
			{ name: 'Pick Pocket', description: 'Steal an item that another person wears or carries without them noticing.', list: SkillList.Intrigue },
			{ name: 'Sabotage', description: 'Disable a mechanical device such as a trap.', list: SkillList.Intrigue },
			{ name: 'Search', description: 'Actively search an environment for important details and items.', list: SkillList.Intrigue },
			{ name: 'Sneak', description: 'Move silently.', list: SkillList.Intrigue },
			{ name: 'Track', description: 'Follow a trail that another creature has left behind.', list: SkillList.Intrigue },
			{ name: 'Culture', description: 'Knowing about a culture’s customs, folktales, and taboos.', list: SkillList.Lore },
			{ name: 'Criminal Underworld', description: 'Knowing about criminal organizations, their crimes, their relationships, and their leaders.', list: SkillList.Lore },
			{ name: 'History', description: 'Knowing about significant past events.', list: SkillList.Lore },
			{ name: 'Magic', description: 'Knowing about magical places, spells, rituals, items, and phenomena.', list: SkillList.Lore },
			{ name: 'Monsters', description: 'Knowing monster ecology, strengths, and weaknesses.', list: SkillList.Lore },
			{ name: 'Nature', description: 'Knowing about natural flora, fauna, and weather.', list: SkillList.Lore },
			{ name: 'Psionics', description: 'Knowing about psionic places, spells, rituals, items, and phenomena.', list: SkillList.Lore },
			{ name: 'Religion', description: 'Knowing about religious mythology, practices, and rituals.', list: SkillList.Lore },
			{ name: 'Rumors', description: 'Knowing gossip, legends, and uncertain truths.', list: SkillList.Lore },
			{ name: 'Society', description: 'Knowing noble etiquette and the leadership and power dynamics of noble families.', list: SkillList.Lore }
		];

		if (setting) {
			list.push(...setting.skills);
		}

		return Collections.sort(list, item => item.name);
	};

	static getSkillsFromList = (list: SkillList, setting?: CampaignSetting) => {
		const skills = this.getSkills(setting).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
	};
}