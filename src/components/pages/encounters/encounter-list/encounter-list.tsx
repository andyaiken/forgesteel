import { Alert, Button, Input, Popover, Space, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useModals } from '../../../../hooks/use-modals';
import { usePersistedPlaybook } from '../../../../hooks/use-persisted-playbook';
import { useState } from 'react';

import './encounter-list.scss';

interface Props {
	goHome: () => void;
	onCreateEncounter: () => void;
	onImportEncounter: (encounter: Encounter) => void;
}

export const EncounterListPage = (props: Props) => {
	const modals = useModals();
	const { playbook } = usePersistedPlaybook();
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const getEncounters = () => {
		return playbook.encounters
			.filter(item => Utils.textMatches([
				item.name
			], searchTerm));
	};

	const getEncountersSection = (list: Encounter[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No encounters'
				/>
			);
		}

		return (
			<div className='encounter-section-row'>
				{
					list.map(enc => (
						<SelectablePanel key={enc.id} onSelect={() => modals.showEncounter(enc.id)}>
							<EncounterPanel encounter={enc} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {
		const encounters = getEncounters();

		return (
			<div className='encounter-list-page'>
				<AppHeader subtitle='Encounters' goHome={props.goHome}>
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
								<Button block={true} icon={<PlusCircleOutlined />} onClick={props.onCreateEncounter}>Create</Button>
								<div className='ds-text'>or</div>
								<Upload
									style={{ width: '100%' }}
									accept='.drawsteel-encounter'
									showUploadList={false}
									beforeUpload={file => {
										file
											.text()
											.then(json => {
												const enc = (JSON.parse(json) as Encounter);
												props.onImportEncounter(enc);
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
				<div className='encounter-list-page-content'>
					{getEncountersSection(encounters)}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
