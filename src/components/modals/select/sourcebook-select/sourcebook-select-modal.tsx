import { Button, Space, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Empty } from '@/components/controls/empty/empty';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import { Utils } from '@/utils/utils';

import './sourcebook-select-modal.scss';

interface Props {
	selectedIDs: string[];
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onImport: (sourcebook: Sourcebook) => void;
	onSelect: (sourcebookIDs: string[]) => void;
}

export const SourcebookSelectModal = (props: Props) => {
	const getContent = (type: SourcebookType) => {
		const sourcebooks = props.sourcebooks.filter(sb => sb.type === type);
		if ((type !== SourcebookType.Homebrew) && (sourcebooks.length === 0)) {
			return null;
		}

		return (
			<>
				<HeaderText
					level={1}
					extra={
						type === SourcebookType.Homebrew ?
							<Upload
								style={{ width: '100%' }}
								accept='.drawsteel-sourcebook,.ds-sourcebook'
								showUploadList={false}
								beforeUpload={file => {
									file
										.text()
										.then(json => {
											const sourcebook = JSON.parse(json) as Sourcebook;
											sourcebook.id = Utils.guid();
											SourcebookUpdateLogic.updateSourcebook(sourcebook);
											props.onImport(sourcebook);
										});
									return false;
								}}
							>
								<Button type='text' title='Import a sourcebook' icon={<DownloadOutlined />} />
							</Upload>
							: null
					}
				>
					{type} Sourcebooks
				</HeaderText>
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						sourcebooks.map(sb => (
							<SelectablePanel
								key={sb.id}
								selected={props.selectedIDs.includes(sb.id)}
								onSelect={() => {
									if (props.selectedIDs.includes(sb.id)) {
										props.onSelect(props.selectedIDs.filter(id => id !== sb.id));
									} else {
										props.onSelect([ ...props.selectedIDs, sb.id ]);
									}
								}}
							>
								<SourcebookPanel sourcebook={sb} />
							</SelectablePanel>
						))
					}
				</Space>
			</>
		);
	};

	return (
		<Modal
			content={
				<div className='sourcebook-select-modal'>
					{getContent(SourcebookType.Official)}
					{getContent(SourcebookType.ThirdParty)}
					{getContent(SourcebookType.Homebrew)}
					{props.sourcebooks.length === 0 ? <Empty /> : null}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
