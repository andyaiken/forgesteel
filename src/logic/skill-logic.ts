import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { SkillData } from '../data/skill-data';
import { SkillList } from '../enums/skill-list';

export class SkillLogic {
	static getSkill = (skillName: string, settings: CampaignSetting[]) => {
		const skills = SkillData.getSkills(settings);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};

	static getSkillsFromList = (list: SkillList, settings: CampaignSetting[]) => {
		const skills = SkillData.getSkills(settings).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
	};
}
