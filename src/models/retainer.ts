import { Feature } from '@/models/feature';

export interface RetainerInfo {
	level: number;
	level4?: Feature;
	level7?: Feature;
	level10?: Feature;
	featuresByLevel: {
		level: number,
		feature: Feature;
	}[];
}
