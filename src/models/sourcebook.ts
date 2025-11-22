import { Adventure } from '@/models/adventure';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { Kit } from '@/models/kit';
import { Language } from '@/models/language';
import { MonsterGroup } from '@/models/monster-group';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Perk } from '@/models/perk';
import { Project } from '@/models/project';
import { Skill } from '@/models/skill';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';

export interface Sourcebook extends Element {
	type: SourcebookType;

	adventures: Adventure[];
	ancestries: Ancestry[];
	careers: Career[];
	classes: HeroClass[];
	complications: Complication[];
	cultures: Culture[];
	domains: Domain[];
	encounters: Encounter[];
	imbuements: Imbuement[];
	items: Item[];
	kits: Kit[];
	monsterGroups: MonsterGroup[];
	montages: Montage[];
	negotiations: Negotiation[];
	perks: Perk[];
	projects: Project[];
	subclasses: SubClass[];
	tacticalMaps: TacticalMap[];
	terrain: Terrain[];
	titles: Title[];

	skills: Skill[];
	languages: Language[];
}

export type SourcebookElementKind = 'adventure' | 'ancestry' | 'career' | 'class' | 'complication' | 'culture' | 'domain' | 'encounter' | 'imbuement' | 'item' | 'kit' | 'monster-group' | 'montage' | 'negotiation' | 'perk' | 'project' | 'subclass' | 'tactical-map' | 'terrain' | 'title';
