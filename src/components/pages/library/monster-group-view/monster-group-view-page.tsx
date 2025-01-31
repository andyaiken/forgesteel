import { Button, Popover } from 'antd';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './monster-group-view-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	showAbout: () => void;
	createHomebrew: (monsterGroup: MonsterGroup, sourcebook: Sourcebook | null) => void;
	export: (monsterGroup: MonsterGroup, format: 'image' | 'pdf' | 'json') => void;
	delete: (monsterGroup: MonsterGroup) => void;
}

export const MonsterGroupViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { elementID } = useParams<{ elementID: string }>();
	const monsterGroup = props.sourcebooks.flatMap(sb => sb.monsterGroups).find(g => g.id === elementID) as MonsterGroup;
	const sourcebook = SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, monsterGroup) as Sourcebook;

	try {
		return (
			<div className='monster-group-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Monster Group' } ]} showAbout={props.showAbout}>
					<Button onClick={() => navigation.goToLibraryList('monster-group')}>
						Close
					</Button>
					{
						sourcebook.isHomebrew ?
							<Button onClick={() => navigation.goToLibraryEdit('monster-group', sourcebook.id, monsterGroup.id)}>
								Edit
							</Button>
							:
							<Popover
								trigger='click'
								placement='bottom'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										{
											props.sourcebooks
												.filter(sb => sb.isHomebrew)
												.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(monsterGroup, cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
										}
										<Button onClick={() => props.createHomebrew(monsterGroup, null)}>In a new collection</Button>
									</div>
								)}
							>
								<Button>
									Create Homebrew Version
								</Button>
							</Popover>
					}
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(monsterGroup, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(monsterGroup, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(monsterGroup, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					{sourcebook.isHomebrew ? <DangerButton disabled={monsterGroup.monsters.some(monster => PlaybookLogic.isUsed(props.playbook, monster.id))} onConfirm={() => props.delete(monsterGroup)} /> : null}
				</AppHeader>
				<div className='monster-group-view-page-content'>
					<MonsterGroupPanel
						monsterGroup={monsterGroup}
						mode={PanelMode.Full}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
