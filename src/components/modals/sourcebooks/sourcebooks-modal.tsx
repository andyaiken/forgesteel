import { Button, Divider, Space, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Hero } from '../../../models/hero';
import { Modal } from '../modal/modal';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { SourcebookPanel } from '../../panels/elements/sourcebook-panel/sourcebook-panel';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './sourcebooks-modal.scss';

interface Props {
	officialSourcebooks: Sourcebook[];
	homebrewSourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	heroes: Hero[];
	onClose: () => void;
	onHomebrewSourcebookChange: (Sourcebooks: Sourcebook[]) => void;
	onHiddenSourcebookIDsChange: (ids: string[]) => void;
}

export const SourcebooksModal = (props: Props) => {
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(Utils.copy(props.homebrewSourcebooks));
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(Utils.copy(props.hiddenSourcebookIDs));

	try {
		const createSourcebook = () => {
			const copy = Utils.copy(homebrewSourcebooks);
			const sourcebook = FactoryLogic.createSourcebook();
			copy.push(sourcebook);
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const changeSourcebook = (sourcebook: Sourcebook) => {
			const copy = Utils.copy(homebrewSourcebooks);
			const index = copy.findIndex(s => s.id === sourcebook.id);
			if (index !== -1) {
				copy[index] = sourcebook;
				setHomebrewSourcebooks(copy);
				props.onHomebrewSourcebookChange(copy);
			}
		};

		const deleteSourcebook = (sourcebook: Sourcebook) => {
			const copy = Utils.copy(homebrewSourcebooks.filter(s => s.id !== sourcebook.id));
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const importSourcebook = (sourcebook: Sourcebook) => {
			const copy = Utils.copy(homebrewSourcebooks);
			copy.push(sourcebook);
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const setVisibility = (sourcebook: Sourcebook, visible: boolean) => {
			if (visible) {
				const copy = Utils.copy(hiddenSourcebookIDs.filter(id => id !== sourcebook.id));
				setHiddenSourcebookIDs(copy);
				props.onHiddenSourcebookIDsChange(copy);
			} else {
				const copy = Utils.copy(hiddenSourcebookIDs);
				copy.push(sourcebook.id);
				setHiddenSourcebookIDs(copy);
				props.onHiddenSourcebookIDsChange(copy);
			}
		};

		return (
			<Modal
				content={
					<div className='sourcebooks-modal'>
						{
							[ ...props.officialSourcebooks, ...homebrewSourcebooks ].map(s => (
								<SourcebookPanel
									key={s.id}
									sourcebook={s}
									visible={!hiddenSourcebookIDs.includes(s.id)}
									heroes={props.heroes}
									onSetVisible={setVisibility}
									onChange={changeSourcebook}
									onDelete={deleteSourcebook}
								/>
							))
						}
						<Divider />
						<Space direction='vertical' style={{ width: '100%' }}>
							<Button block={true} onClick={createSourcebook}>Create a new sourcebook</Button>
							<Upload
								style={{ width: '100%' }}
								accept='.drawsteel-sourcebook'
								showUploadList={false}
								beforeUpload={file => {
									file
										.text()
										.then(json => {
											const sourcebook = (JSON.parse(json) as Sourcebook);
											sourcebook.id = Utils.guid();
											SourcebookLogic.updateSourcebook(sourcebook);
											importSourcebook(sourcebook);
										});
									return false;
								}}
							>
								<Button block={true} icon={<DownloadOutlined />}>Import a sourcebook</Button>
							</Upload>
						</Space>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
