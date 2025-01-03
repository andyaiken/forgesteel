import { Button, Divider, Space, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Modal } from '../modal/modal';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookPanel } from '../../panels/elements/sourcebook-panel/sourcebook-panel';
import { useMemo } from 'react';
import { usePersistedSourcebooks } from '../../../hooks/use-persisted-sourcebooks';

import './sourcebooks-modal.scss';

export const SourcebooksModal = () => {
	const { sourcebooks, hiddenSourcebookIds, persistHomebrewSourcebooks, persistHiddenSourcebookIds } = usePersistedSourcebooks();
	const officialSourcebooks = useMemo(() => sourcebooks.filter(s => !s.isHomebrew), [ sourcebooks ]);
	const homebrewSourcebooks = useMemo(() => sourcebooks.filter(s => s.isHomebrew), [ sourcebooks ]);

	try {
		const createSourcebook = () => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			const sourcebook = FactoryLogic.createSourcebook();
			copy.push(sourcebook);
			persistHomebrewSourcebooks(copy);
		};

		const changeSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			const index = copy.findIndex(s => s.id === sourcebook.id);
			if (index !== -1) {
				copy[index] = sourcebook;
				persistHomebrewSourcebooks(copy);
			}
		};

		const deleteSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks.filter(s => s.id !== sourcebook.id))) as Sourcebook[];
			persistHomebrewSourcebooks(copy);
		};

		const importSourcebook = (sourcebook: Sourcebook) => {
			const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			copy.push(sourcebook);
			persistHomebrewSourcebooks(copy);
		};

		const setVisibility = (sourcebook: Sourcebook, visible: boolean) => {
			if (visible) {
				const copy = JSON.parse(JSON.stringify(hiddenSourcebookIds.filter(id => id !== sourcebook.id))) as string[];
				persistHiddenSourcebookIds(copy);
			} else {
				const copy = JSON.parse(JSON.stringify(hiddenSourcebookIds)) as string[];
				copy.push(sourcebook.id);
				persistHiddenSourcebookIds(copy);
			}
		};

		return (
			<Modal
				content={
					<div className='sourcebooks-modal'>
						{
							[ ...officialSourcebooks, ...homebrewSourcebooks ].map(s => (
								<SourcebookPanel
									key={s.id}
									sourcebook={s}
									visible={!hiddenSourcebookIds.includes(s.id)}
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
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
