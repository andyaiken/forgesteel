import { Button, Divider, Space, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Hero } from '../../../models/hero';
import { Modal } from '../modal/modal';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookPanel } from '../../panels/elements/sourcebook-panel/sourcebook-panel';
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
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(JSON.parse(JSON.stringify(props.homebrewSourcebooks)) as Sourcebook[]);
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(JSON.parse(JSON.stringify(props.hiddenSourcebookIDs)) as string[]);

	try {
		const createSourcebook = () => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			const sourcebook = FactoryLogic.createSourcebook();
			copy.push(sourcebook);
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const changeSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			const index = copy.findIndex(s => s.id === sourcebook.id);
			if (index !== -1) {
				copy[index] = sourcebook;
				setHomebrewSourcebooks(copy);
				props.onHomebrewSourcebookChange(copy);
			}
		};

		const deleteSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks.filter(s => s.id !== sourcebook.id))) as Sourcebook[];
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const importSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			copy.push(sourcebook);
			setHomebrewSourcebooks(copy);
			props.onHomebrewSourcebookChange(copy);
		};

		const setVisibility = (sourcebook: Sourcebook, visible: boolean) => {
			if (visible) {
				const copy = JSON.parse(JSON.stringify(hiddenSourcebookIDs.filter(id => id !== sourcebook.id))) as string[];
				setHiddenSourcebookIDs(copy);
				props.onHiddenSourcebookIDsChange(copy);
			} else {
				const copy = JSON.parse(JSON.stringify(hiddenSourcebookIDs)) as string[];
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
