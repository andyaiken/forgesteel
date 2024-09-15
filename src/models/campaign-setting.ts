import { Culture } from './culture';
import { Skill } from './skill';

export interface CampaignSetting {
	id: string;
	name: string;
	description: string;

	languages: string[];
	defaultLanguages: string[];
	cultures: Culture[];
	skills: Skill[];
}
