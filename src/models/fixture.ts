import { Element } from './element';
import { Feature } from './feature';
import { Size } from './size';
import { TerrainRole } from './terrain';

export interface Fixture extends Element {
	role: TerrainRole;
	baseStamina: number;
	size: Size;
	featuresByLevel: { level: number, features: Feature[] }[]
}
