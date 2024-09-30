import { Culture } from './culture';
import { Language } from './language';
import { Skill } from './skill';

export interface CampaignSetting {
	id: string;
	name: string;
	description: string;

	languages: Language[];
	defaultLanguages: string[];
	cultures: Culture[];
	skills: Skill[];
}
