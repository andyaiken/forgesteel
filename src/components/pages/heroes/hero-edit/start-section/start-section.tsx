import { Button, Divider, Flex, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

import './start-section.scss';

interface Props {
	settingIDs: string[];
	sourcebooks: Sourcebook[];
	setSettingIDs: (settingIDs: string[]) => void;
	onImportSourcebook: (sourcebook: Sourcebook) => void;
}

export const StartSection = (props: Props) => {
	const toggleSourcebook = (include: boolean, id: string) => {
		if (include) {
			const copy = Utils.copy(props.settingIDs);
			copy.push(id);
			props.setSettingIDs(copy);
		} else {
			const copy = props.settingIDs.filter(x => x !== id);
			props.setSettingIDs(copy);
		}
	};

	return (
		<div className='hero-edit-content start-section'>
			<div className='hero-edit-content-column selected'>
				<SelectablePanel>
					<HeaderText>Creating a Hero</HeaderText>
					<div className='ds-text'>
						Creating a hero in <b>FORGE STEEL</b> is simple.
					</div>
					<ul>
						<li>
							Use the tabs above to select your hero's <code>Ancestry</code>, <code>Culture</code>, <code>Career</code>, and <code>Class</code>.
							If there are any choices to be made, you'll be prompted to make your selections.
						</li>
						<li>
							Optionally, you can choose a <code>Complication</code> - but you can skip this if you'd prefer.
						</li>
						<li>
							Finally, go to the <code>Details</code> tab and give your hero a name.
						</li>
					</ul>
					<div className='ds-text'>
						When you're done, click <code>Save Changes</code> in the toolbar at the top, and you'll see your hero sheet.
					</div>
				</SelectablePanel>
			</div>
			<div className='hero-edit-content-column choices'>
				<HeaderText>Sourcebooks</HeaderText>
				<div className='ds-text'>
					This hero can use content from the following sourcebooks:
				</div>
				{
					[ SourcebookType.Official, SourcebookType.ThirdParty, SourcebookType.Community, SourcebookType.Homebrew ].map(type => (
						<div key={type} className='sourcebook-type-section'>
							<HeaderText level={3}>{type} Sourcebooks</HeaderText>
							{
								props.sourcebooks
									.filter(sb => sb.type === type)
									.map(sb => (
										<Toggle
											key={sb.id}
											label={<Field label={sb.name || 'Unnamed Sourcebook'} value={<Markdown text={sb.description} useSpan={true} />} />}
											value={props.settingIDs.includes(sb.id)}
											onChange={value => toggleSourcebook(value, sb.id)}
										/>
									))
							}
						</div>
					))
				}
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
		</div>
	);
};
