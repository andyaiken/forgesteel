import { Culture } from './culture';
import { SkillList } from '../enums/skill-list';

export interface CampaignSetting {
	id: string;
	name: string;
	description: string;

	languages: string[];
	defaultLanguages: string[];
	cultures: Culture[];
	skills: { list: SkillList, name: string, description: string }[];
}
