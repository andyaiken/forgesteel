import { SkillList } from '../enums/skill-list';
import { Culture } from './culture';

export interface CampaignSetting {
	id: string;
	name: string;
	description: string;

	languages: string[];
	defaultLanguages: string[];
	cultures: Culture[];
	skills: { list: SkillList, name: string, description: string }[];
}
