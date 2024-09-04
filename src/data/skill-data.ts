import { SkillList } from '../enums/skill-list';
import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';

export class SkillData {
	static getSkills = (list: SkillList, campaignSetting: CampaignSetting) => {
		let skills: { name: string, description: string }[] = [];

		switch (list) {
			case SkillList.Crafting:
				skills = [
					{ name: 'Alchemy', description: 'Make bombs and potions' },
					{ name: 'Architecture', description: 'Create buildings and vehicles' },
					{ name: 'Blacksmithing', description: 'Forge metal armor and weapons' },
					{ name: 'Fletching', description: 'Make ranged weapons and ammunition' },
					{ name: 'Forgery', description: 'Create false badges, documents, and other items' },
					{ name: 'Jewelry', description: 'Create bracelets, crowns, rings, and other jewelry' },
					{ name: 'Mechanics', description: 'Build machines and clockwork items' },
					{ name: 'Tailoring', description: 'Craft cloth and leather clothing' }
				];
				break;
			case SkillList.Exploration:
				skills = [
					{ name: 'Climb', description: 'Move up vertical surfaces' },
					{ name: 'Drive', description: 'Control vehicles' },
					{ name: 'Endurance', description: 'Remain engaged in strenuous activity over a long period of time' },
					{ name: 'Gymnastics', description: 'Move across unsteady or narrow surfaces, and tumble' },
					{ name: 'Heal', description: 'Use mundane first aid' },
					{ name: 'Jump', description: 'Leap vertical and horizontal distances' },
					{ name: 'Lift', description: 'Pick up, carry, and throw heavy objects' },
					{ name: 'Navigate', description: 'Read a map and travel without becoming lost' },
					{ name: 'Ride', description: 'Ride and control a mount who isn’t sapient, such as a horse' },
					{ name: 'Swim', description: 'Move through deep liquid' }
				];
				break;
			case SkillList.Interpersonal:
				skills = [
					{ name: 'Brag', description: 'Impress others with stories of your deeds' },
					{ name: 'Empathize', description: 'Relate to someone on a personal level' },
					{ name: 'Flirt', description: 'Attract romantic attention from someone' },
					{ name: 'Gamble', description: 'Make bets with others' },
					{ name: 'Handle Animals', description: 'Interact with animal wildlife that isn’t sapient' },
					{ name: 'Interrogate', description: 'Obtain information from a creature withholding it' },
					{ name: 'Intimidate', description: 'Awe or scare a creature' },
					{ name: 'Lead', description: 'Inspire people to action' },
					{ name: 'Lie', description: 'Convince someone that a falsehood is true' },
					{ name: 'Music', description: 'Perform music vocally or with an instrument' },
					{ name: 'Perform', description: 'Engage in dance, oratory, acting, or some other physical performance' },
					{ name: 'Persuade', description: 'Convince someone to agree with you through use of your charms and grace' },
					{ name: 'Read Person', description: 'Read the emotions and body language of other creatures' }
				];
				break;
			case SkillList.Intrigue:
				skills = [
					{ name: 'Alertness', description: 'Intuitively sense the details of your surroundings' },
					{ name: 'Conceal Object', description: 'Hide an object on your person or in your environment' },
					{ name: 'Disguise', description: 'Change your appearance to look like a different person' },
					{ name: 'Eavesdrop', description: 'Actively listen to something that is hard to hear, such as a whispered conversation through a door' },
					{ name: 'Escape Artist', description: 'Escape from bonds such as rope or manacles' },
					{ name: 'Hide', description: 'Conceal yourself from others’ observation' },
					{ name: 'Pick Lock', description: 'Open a lock without using the key' },
					{ name: 'Pick Pocket', description: 'Steal an item that another person wears or carries without them noticing' },
					{ name: 'Sabotage', description: 'Disable a mechanical device such as a trap' },
					{ name: 'Search', description: 'Actively search an environment for important details and items' },
					{ name: 'Sneak', description: 'Move silently' },
					{ name: 'Track', description: 'Follow a trail that another creature has left behind' }
				];
				break;
			case SkillList.Lore:
				skills = [
					{ name: 'Culture', description: 'Knowing about a culture’s customs, folktales, and taboos' },
					{ name: 'Criminal Underworld', description: 'Knowing about criminal organizations, their crimes, their relationships, and their leaders' },
					{ name: 'History', description: 'Knowing about significant past events' },
					{ name: 'Magic', description: 'Knowing about magical places, spells, rituals, items, and phenomena' },
					{ name: 'Monsters', description: 'Knowing monster ecology, strengths, and weaknesses' },
					{ name: 'Nature', description: 'Knowing about natural flora, fauna, and weather' },
					{ name: 'Psionics', description: 'Knowing about psionic places, spells, rituals, items, and phenomena' },
					{ name: 'Religion', description: 'Knowing about religious mythology, practices, and rituals' },
					{ name: 'Rumors', description: 'Knowing gossip, legends, and uncertain truths' },
					{ name: 'Society', description: 'Knowing noble etiquette and the leadership and power dynamics of noble families' }
				];
				break;
		}

		// Add skills from campaign setting
		campaignSetting.skills
			.filter(skill => skill.list === list)
			.forEach(skill => {
				skills.push({ name: skill.name, description: skill.description });
			});

		return Collections.sort(skills, skill => skill.name);
	}
}