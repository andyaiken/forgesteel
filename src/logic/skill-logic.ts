import { Collections } from '../utils/collections';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from './sourcebook-logic';

export class SkillLogic {
	static getSkill = (skillName: string, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};

	static getSkillsFromList = (list: SkillList, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
	};
}
