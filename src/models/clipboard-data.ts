import { Ability } from '@/models/ability';
import { Feature } from '@/models/feature';

export interface ClipboardData {
	feature: Feature | null;
	ability: Ability | null;
};
