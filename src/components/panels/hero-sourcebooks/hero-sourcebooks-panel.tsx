import { Button, Divider, Flex, Space, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-sourcebooks-panel.scss';

interface Props {
	sourcebooks: Sourcebook[];
	sourcebookIDs: string[];
	onImportSourcebook: (sourcebook: Sourcebook) => void;
	onChange: (sourcebookIDs: string[]) => void;
}

export const HeroSourcebooksPanel = (props: Props) => {
	const [ ids, setIDs ] = useState<string[]>(Utils.copy(props.sourcebookIDs));

	const toggleSourcebook = (include: boolean, id: string) => {
		const newIDs = include ? [ ...ids, id ] : ids.filter(i => i !== id);
		setIDs(newIDs);
		props.onChange(newIDs);
	};

	return (
		<div className='hero-sourcebooks-panel'>
			<HeaderText>Sourcebooks</HeaderText>
			<div className='ds-text'>
				This hero can use content from the following sourcebooks:
			</div>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					[ SourcebookType.Official, SourcebookType.Homebrew, SourcebookType.ThirdParty, SourcebookType.Community ]
						.map(type => ({ type: type, sourcebooks: props.sourcebooks.filter(sb => sb.type === type).filter(sb => SourcebookLogic.getElements(sb).length > 0) }))
						.filter(item => item.sourcebooks.length > 0)
						.map(item => (
							<div key={item.type} className='sourcebook-type-section'>
								<HeaderText level={3}>{item.type} Sourcebooks</HeaderText>
								{
									item.sourcebooks.map(sb => (
										<Toggle
											key={sb.id}
											label={<Field label={sb.name || 'Unnamed Sourcebook'} value={<Markdown text={sb.description} useSpan={true} />} />}
											value={ids.includes(sb.id)}
											onChange={value => toggleSourcebook(value, sb.id)}
										/>
									))
								}
							</div>
						))
				}
			</Space>
			<Divider />
			<Flex align='center' gap={10}>
				<div className='ds-text'>
					If you have a homebrew sourcebook you want to use, and it isn't listed here, you can import it now.
				</div>
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
								props.onImportSourcebook(sourcebook);
							});
						return false;
					}}
				>
					<Button title='Import a sourcebook' icon={<DownloadOutlined />} />
				</Upload>
			</Flex>
		</div>
	);
};
