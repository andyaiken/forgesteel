import { LanguageType } from '@/enums/language-type';

export interface Language {
	name: string;
	description: string;
	type: LanguageType;
	related: string[];
}
