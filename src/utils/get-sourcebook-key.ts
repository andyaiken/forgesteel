import { SourcebookElementKind, SourcebookElementsKey } from '../models/sourcebook';

export function getSourcebookKey(kind: SourcebookElementKind): SourcebookElementsKey {
	switch (kind) {
		case 'ancestry': return 'ancestries';
		case 'career': return 'careers';
		case 'complication': return 'complications';
		case 'culture': return 'cultures';
		case 'domain': return 'domains';
		case 'class': return 'classes';
		case 'item': return 'items';
		case 'kit': return 'kits';
		case 'monster-group': return 'monsterGroups';
		case 'perk': return 'perks';
		case 'title': return 'titles';
	}
}
