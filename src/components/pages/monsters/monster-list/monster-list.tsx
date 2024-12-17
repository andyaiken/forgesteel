import { Alert, Button, Input, Popover, Space, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupPanel } from '../../../panels/monster-group-panel/monster-group-panel';
import { Playbook } from '../../../../models/playbook';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-list.scss';

interface Props {
	playbook: Playbook;
	goHome: () => void;
	showAbout: () => void;
	viewMonsterGroup: (monsterGroup: MonsterGroup) => void;
	onCreateMonster: () => void;
	onImportMonster: (monsterGroup: MonsterGroup) => void;
}

export const MonsterListPage = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const createHomebrew = () => {
		props.onCreateMonster();
	};

	const getMonsterGroups = () => {
		return props.playbook.monsterGroups
			.filter(item => Utils.textMatches([
				item.name,
				...item.information.map(f => f.name),
				...item.monsters.map(m => m.name)
			], searchTerm));
	};

	const getMonsterGroupsSection = (list: MonsterGroup[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No monsters'
				/>
			);
		}

		return (
			<div className='monster-section-row'>
				{
					list.map(mg => (
						<SelectablePanel key={mg.id} onSelect={() => props.viewMonsterGroup(mg)}>
							<MonsterGroupPanel monsterGroup={mg} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {
		const monsterGroups = getMonsterGroups();

		return (
			<div className='monster-list-page'>
				<AppHeader subtitle='Monsters' goHome={props.goHome} showAbout={props.showAbout}>
					<Input
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<Space>
								<Button block={true} icon={<PlusCircleOutlined />} onClick={createHomebrew}>Create</Button>
								<div className='ds-text'>or</div>
								<Upload
									style={{ width: '100%' }}
									accept='.drawsteel-monster-group'
									showUploadList={false}
									beforeUpload={file => {
										file
											.text()
											.then(json => {
												const mg = (JSON.parse(json) as MonsterGroup);
												props.onImportMonster(mg);
											});
										return false;
									}}
								>
									<Button block={true} icon={<DownloadOutlined />}>Import</Button>
								</Upload>
							</Space>
						)}
					>
						<Button>
							Create
							<DownOutlined />
						</Button>
					</Popover>
				</AppHeader>
				<div className='monster-list-page-content'>
					{getMonsterGroupsSection(monsterGroups)}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
