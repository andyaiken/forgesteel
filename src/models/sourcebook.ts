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
