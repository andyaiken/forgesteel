import { CampaignSettingData } from '../data/campaign-setting-data';
import { SkillData } from '../data/skill-data';

export class SkillLogic {
	static getSkill = (skillName: string, settingID?: string) => {
		const setting = CampaignSettingData.getCampaignSettings().find(cs => cs.id === settingID);
		const skills = SkillData.getSkills(setting);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};
}
