import { Button, Popover } from 'antd';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Modal } from '../modal/modal';
import { MonsterGroup } from '../../../models/monster';
import { MonsterGroupPanel } from '../../panels/elements/monster-group-panel/monster-group-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { PlaybookLogic } from '../../../logic/playbook-logic';
import { Sourcebook } from '../../../models/sourcebook';
import { usePersistedPlaybook } from '../../../hooks/use-persisted-playbook';

import './monster-group-modal.scss';

interface Props {
	monsterGroup: MonsterGroup;
	homebrewSourcebooks: Sourcebook[];
	isHomebrew: boolean;
	createHomebrew: (sourcebook: Sourcebook | null) => void;
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const MonsterGroupModal = (props: Props) => {
	const { playbook } = usePersistedPlaybook();
	try {
		return (
			<Modal
				toolbar={
					<>
						{
							props.isHomebrew ?
								<Button onClick={props.edit}>Edit</Button>
								:
								<Popover
									trigger='click'
									placement='bottom'
									content={(
										<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
											{
												props.homebrewSourcebooks.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
											}
											<Button onClick={() => props.createHomebrew(null)}>In a new collection</Button>
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
									<Button onClick={() => props.export('image')}>Export As Image</Button>
									<Button onClick={() => props.export('pdf')}>Export As PDF</Button>
									<Button onClick={() => props.export('json')}>Export as Data</Button>
								</div>
							)}
						>
							<Button>
								Export
							</Button>
						</Popover>
						<DangerButton
							disabled={props.monsterGroup.monsters.some(monster => PlaybookLogic.isUsed(playbook, monster.id))}
							onConfirm={props.delete}
						/>
					</>
				}
				content={
					<div className='monster-group-modal'>
						<MonsterGroupPanel monsterGroup={props.monsterGroup} mode={PanelMode.Full} />
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
