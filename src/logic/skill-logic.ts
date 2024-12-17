import { Collections } from '../utils/collections';
import { SkillData } from '../data/skill-data';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';

export class SkillLogic {
	static getSkill = (skillName: string, sourcebooks: Sourcebook[]) => {
		const skills = SkillData.getSkills(sourcebooks);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};

	static getSkillsFromList = (list: SkillList, sourcebooks: Sourcebook[]) => {
		const skills = SkillData.getSkills(sourcebooks).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
	};
}
