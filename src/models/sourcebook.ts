import { Ancestry } from './ancestry';
import { Career } from './career';
import { Complication } from './complication';
import { Culture } from './culture';
import { Domain } from './domain';
import { Element } from './element';
import { HeroClass } from './class';
import { Imbuement } from './imbuement';
import { Item } from './item';
import { Kit } from './kit';
import { Language } from './language';
import { MonsterGroup } from './monster-group';
import { Perk } from './perk';
import { Project } from './project';
import { Skill } from './skill';
import { SubClass } from './subclass';
import { Terrain } from './terrain';
import { Title } from './title';

export interface Sourcebook extends Element {
	isHomebrew: boolean;

	ancestries: Ancestry[];
	cultures: Culture[];
	careers: Career[];
	classes: HeroClass[];
	complications: Complication[];
	domains: Domain[];
	kits: Kit[];
	perks: Perk[];
	titles: Title[];
	items: Item[];
	imbuements: Imbuement[];
	monsterGroups: MonsterGroup[];
	subclasses: SubClass[];
	terrain: Terrain[];

	skills: Skill[];
	languages: Language[];
	projects: Project[];
}

export type SourcebookElementKind = 'ancestry' | 'culture' | 'career' | 'class' | 'subclass' | 'complication' | 'kit' | 'domain' | 'perk' | 'title' | 'item' | 'imbuement' | 'monster-group' | 'terrain';
