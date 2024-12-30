import type { Characteristic } from '../enums/characteristic';
import { useNavigate } from 'react-router';

export const useModals = () => {
	const navigate = useNavigate();
	return {
		showAbout() {
			return navigate({ hash: 'about' });
		},
		showAncestry(ancestryId: string) {
			return navigate({ hash: `ancestries/${ancestryId}` });
		},
		showEncounter(encounterId: string) {
			return navigate({ hash: `encounter/${encounterId}` });
		},
		showHeroAbility(heroId: string, abilityId: string) {
			return navigate({ hash: `hero/${heroId}/ability/${abilityId}` });
		},
		showHeroCharacteristic(heroId: string, characteristic: Characteristic) {
			return navigate({ hash: `hero/${heroId}/characteristic/${characteristic}` });
		},
		showHeroRules(heroId: string) {
			return navigate({ hash: `hero/${heroId}/rules` });
		},
		showHeroState(heroId: string, page: 'hero' | 'stats' | 'conditions') {
			return navigate({ hash: `hero/${heroId}/${page}` });
		},
		showMonster(monsterId: string) {
			return navigate({ hash: `monster/${monsterId}` });
		},
		showMonsterGroup(monsterGroupId: string) {
			return navigate({ hash: `monster-group/${monsterGroupId}` });
		},
		showSourcebooks() {
			return navigate({ hash: 'sourcebooks' });
		}
	};
};
