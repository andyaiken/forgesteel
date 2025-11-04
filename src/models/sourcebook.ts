import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { Kit } from '@/models/kit';
import { Language } from '@/models/language';
import { MonsterGroup } from '@/models/monster-group';
import { Perk } from '@/models/perk';
import { Project } from '@/models/project';
import { Skill } from '@/models/skill';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';

export interface Sourcebook extends Element {
	type: SourcebookType;

	ancestries: Ancestry[];
	careers: Career[];
	classes: HeroClass[];
	complications: Complication[];
	cultures: Culture[];
	domains: Domain[];
	imbuements: Imbuement[];
	items: Item[];
	kits: Kit[];
	monsterGroups: MonsterGroup[];
	perks: Perk[];
	projects: Project[];
	subclasses: SubClass[];
	terrain: Terrain[];
	titles: Title[];

	skills: Skill[];
	languages: Language[];
}

export type SourcebookElementKind = 'ancestry' | 'career' | 'class' | 'complication' | 'culture' | 'domain' | 'imbuement' | 'item' | 'kit' | 'monster-group' | 'perk' | 'project' | 'subclass' | 'terrain' | 'title';
