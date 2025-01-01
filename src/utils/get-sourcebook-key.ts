import type { SourcebookElementKind } from '../models/sourcebook-element-kind';
import type { SourcebookElementsKey } from '../models/sourcebook-elements-key';

export function getSourcebookKey(kind: SourcebookElementKind): SourcebookElementsKey {
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
