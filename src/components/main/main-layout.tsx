import { AimOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useCallback, useMemo } from 'react';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import type { Ancestry } from '../../models/ancestry';
import { AncestryModal } from '../modals/ancestry/ancestry-modal';
import type { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { EncounterModal } from '../modals/encounter/encounter-modal';
import type { Hero } from '../../models/hero';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import type { MonsterGroup } from '../../models/monster';
import { MonsterGroupModal } from '../modals/monster-group/monster-group-modal';
import { MonsterModal } from '../modals/monster/monster-modal';
import { RulesModal } from '../modals/rules/rules-modal';
import type { Sourcebook } from '../../models/sourcebook';
import { SourcebookLogic } from '../../logic/sourcebook-logic';
import { SourcebooksModal } from '../modals/sourcebooks/sourcebooks-modal';
import { Utils } from '../../utils/utils';
import pbds from '../../assets/powered-by-draw-steel.png';
import { useNavigation } from '../../hooks/use-navigation';
import { usePersistedHeroes } from '../../hooks/use-persisted-heroes';
import { usePersistedPlaybook } from '../../hooks/use-persisted-playbook';
import { usePersistedSourcebooks } from '../../hooks/use-persisted-sourcebooks';

interface Props {
	onAncestryCreate: (ancestry: Ancestry, sourcebook: Sourcebook | null) => void;
	onEncounterDelete: (encounterId: string) => Promise<void> | void;
	onHeroChange: (hero: Hero) => Promise<void> | void;
	onMonsterGroupCreate: (monsterGroup: MonsterGroup, sourcebook: Sourcebook | null) => void;
}
export const MainLayout = ({
	onAncestryCreate,
	onEncounterDelete,
	onHeroChange,
	onMonsterGroupCreate
}: Props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const navigation = useNavigation();

	const { heroes } = usePersistedHeroes();
	const { sourcebooks, deleteSourcebookElement } = usePersistedSourcebooks();
	const { playbook } = usePersistedPlaybook();

	const getAncestryModal = useCallback(
		(segments: string[]) => {
			const [ ancestryId ] = segments;
			const homebrewSourcebooks = sourcebooks.filter(s => s.isHomebrew);
			const ancestry = sourcebooks.flatMap(s => s.ancestries).find(a => a.id === ancestryId);
			if (!ancestry) {
				return null;
			}
			const sourcebook = SourcebookLogic.getAncestrySourcebook(sourcebooks, ancestry)!;
			return <AncestryModal
				ancestry={ancestry}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.ancestries).find(a => a.id === ancestry.id)}
				createHomebrew={sourcebook => onAncestryCreate(ancestry, sourcebook)}
				export={format => Utils.export([ ancestry.id ], ancestry.name || 'Ancestry', ancestry, 'ancestry', format)}
				edit={() => navigation.goToLibraryEdit(sourcebook.id, 'ancestry', ancestryId)}
				delete={() => { deleteSourcebookElement('ancestry', ancestry.id); navigate({ hash: '' }); }}
			/>;
		},
		[ sourcebooks, navigate, navigation, onAncestryCreate, deleteSourcebookElement ]
	);

	const getEncounterModal = useCallback(
		(segments: string[]) => {
			const [ encounterId ] = segments as [ string ];
			const encounter = playbook.encounters.find(e => e.id === encounterId)!;
			return <EncounterModal
				encounter={encounter}
				export={format => Utils.export([ encounter.id ], encounter.name || 'Encounter', encounter, 'encounter', format)}
				edit={() => navigation.goToEncounterEdit(encounterId)}
				delete={() => onEncounterDelete(encounterId)}
			/>;
		},
		[ playbook, navigation, onEncounterDelete ]
	);

	const getHeroModal = useCallback(
		(segments: string[]) => {
			const [ heroId, heroPage, ...remainingSegments ] = segments as [ string, 'ability' | 'characteristic'| 'hero' | 'stats' | 'conditions' | 'rules', ...string[] ];
			const hero = heroes.find(h => h.id === heroId)!;
			switch (heroPage) {
				case 'ability':
					return getHeroAbilityModal(hero, remainingSegments);
				case 'characteristic':
					return getHeroCharcteristicModal(hero, remainingSegments);
				case 'hero':
				case 'stats':
				case 'conditions':
					return <HeroStateModal
						hero={hero}
						startPage={heroPage}
						onChange={onHeroChange}
						onLevelUp={async () => {
							if (hero && hero.class) {
								hero.class.level += 1;
								await onHeroChange(hero);
								navigation.goToHeroEdit(hero.id, 'Class');
							}
						}}
					/>;
				case 'rules':
					return <RulesModal hero={hero} />;
			}
		},
		[ heroes, navigation, onHeroChange ]
	);

	const getMonsterModal = useCallback(
		(segments: string[]) => {
			const [ monsterId ] = segments;
			const monster = SourcebookLogic.getMonster(sourcebooks, monsterId)!;
			const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, monsterId)!;
			return <MonsterModal
				monster={monster}
				monsterGroup={monsterGroup}
				export={format => Utils.export([ monster.id ], monster.name || 'Monster', monster, 'monster', format)}
			/>;
		},
		[ sourcebooks ]
	);

	const getMonsterGroupModal = useCallback(
		(segments: string[]) => {
			const [ monsterGroupId ] = segments;
			const homebrewSourcebooks = sourcebooks.filter(s => s.isHomebrew);
			const sourcebook = sourcebooks
				.find(cs => cs.monsterGroups.some(mg => mg.id === monsterGroupId));
			if (!sourcebook) {
				return null;
			}
			const monsterGroup = sourcebook.monsterGroups.find(mg => mg.id === monsterGroupId)!;
			return <MonsterGroupModal
				monsterGroup={monsterGroup}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={sourcebook.isHomebrew}
				createHomebrew={sourcebook => onMonsterGroupCreate(monsterGroup, sourcebook)}
				export={format => Utils.export([ monsterGroup.id ], monsterGroup.name || 'Monster Group', monsterGroup, 'monster-group', format)}
				edit={() => navigation.goToLibraryEdit(sourcebook.id, 'monster-group', monsterGroup.id)}
				delete={() => { deleteSourcebookElement('monster-group', monsterGroup.id); navigate({ hash: '' }); }}
			/>;
		},
		[ sourcebooks, navigate, navigation, onMonsterGroupCreate, deleteSourcebookElement ]
	);

	function getHeroAbilityModal(hero: Hero, segments: string[]) {
		const [ abilityId ] = segments;
		const ability = HeroLogic.getAbilities(hero, true, true, true)
			.find(a => a.id === abilityId)!;
		return <AbilityModal ability={ability} hero={hero} />;
	}

	function getHeroCharcteristicModal(hero: Hero, segments: string[]) {
		const [ characteristic ] = segments as [ Characteristic ];
		return <CharacteristicModal characteristic={characteristic} hero={hero} />;
	}

	const drawer = useMemo(
		() => {
			// Drop leading # character
			const hash = location.hash.substring(1);
			const [ hashRoot, ...hashSegments ] = hash.split('/');
			switch (hashRoot) {
				case 'about':
					return <AboutModal />;
				case 'ancestries':
					return getAncestryModal(hashSegments);
				case 'encounter':
					return getEncounterModal(hashSegments);
				case 'hero':
					return getHeroModal(hashSegments);
				case 'monster':
					return getMonsterModal(hashSegments);
				case 'monster-group':
					return getMonsterGroupModal(hashSegments);
				case 'sourcebooks':
					return <SourcebooksModal />;
			}
		},
		[
			location,
			getAncestryModal,
			getEncounterModal,
			getHeroModal,
			getMonsterModal,
			getMonsterGroupModal
		]
	);

	return (
		<div className='main'>
			<div className='main-content'>
				<Outlet />
			</div>
			<div className='main-footer'>
				<div className='main-footer-section'>
					<img className='ds-logo' src={pbds} />
				</div>
				<div className='main-footer-section'>
					FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
					DRAW STEEL © 2024 MCDM Productions, LLC.
				</div>
				<div className='main-footer-section'>
					<Button type='text' title='Heroes' icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()} />
					<Button type='text' title='Library' icon={<BookOutlined />} onClick={() => navigation.goToLibraryList()} />
					<Button type='text' title='Encounters' icon={<AimOutlined />} onClick={() => navigation.goToEncounterList()} />
				</div>
			</div>
			<Drawer open={Boolean(drawer)} onClose={() => navigate({ hash: '' })} closeIcon={null} width='500px'>
				{drawer}
			</Drawer>
		</div>
	);
};
