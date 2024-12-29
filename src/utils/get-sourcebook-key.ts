import type { Element } from '../models/element';
import type { Sourcebook } from '../models/sourcebook';
import type { SourcebookElementKind } from '../models/sourcebook-element-kind';

export function getSourcebookKey(kind: SourcebookElementKind): keyof Omit<Sourcebook, keyof Element | 'isHomebrew' | 'skills' | 'languages'> {
	switch (kind) {
		case 'Ancestry': return 'ancestries';
		case 'Career': return 'careers';
		case 'Complication': return 'complications';
		case 'Culture': return 'cultures';
		case 'Domain': return 'domains';
		case 'HeroClass': return 'classes';
		case 'Item': return 'items';
		case 'Kit': return 'kits';
		case 'MonsterGroup': return 'monsterGroups';
		case 'Perk': return 'perks';
		case 'Title': return 'titles';
	}
}
