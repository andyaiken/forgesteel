import { Culture } from '@/models/culture';
import { Element } from '@/models/element';
import { Extensible } from '@/models/extension';
import { Feature } from '@/models/feature';

export interface Ancestry extends Element, Extensible {
	features: Feature[];
	ancestryPoints: number;
	culture?: Culture
}
