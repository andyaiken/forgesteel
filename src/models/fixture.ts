import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { Size } from '@/models/size';
import { TerrainRole } from '@/models/terrain';

export interface Fixture extends Element {
	role: TerrainRole;
	baseStamina: number;
	size: Size;
	featuresByLevel: { level: number, features: Feature[] }[]
}
