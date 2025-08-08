import { Button, Divider, Select, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { Sourcebook } from '../../../../../models/sourcebook';
import { SourcebookUpdateLogic } from '../../../../../logic/update/sourcebook-update-logic';
import { Utils } from '../../../../../utils/utils';

import './start-section.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setSettingIDs: (settingIDs: string[]) => void;
	importSourcebook: (sourcebook: Sourcebook) => void;
}

export const StartSection = (props: Props) => {
	try {
		return (
			<div className='hero-edit-content start-section'>
				<div className='hero-edit-content-column single-column choices'>
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
					{
						props.sourcebooks.some(sb => sb.isHomebrew) ?
							<>
								<HeaderText>Sourcebooks</HeaderText>
								<div className='ds-text'>
									Sourcebooks contain ancestries, classes, kits, and so on.
									If you have a homebrew sourcebook you'd like to use for this hero, you can include it here.
								</div>
								<Select
									style={{ width: '100%' }}
									placeholder='Select'
									mode='multiple'
									options={props.sourcebooks.map(cs => ({ value: cs.id, label: cs.name || 'Unnamed Sourcebook' }))}
									optionRender={option => <div className='ds-text'>{option.data.label}</div>}
									popupRender={menu => (
										<>
											{menu}
											<Divider style={{ margin: '8px 0' }} />
											<Upload
												style={{ width: '100%' }}
												accept='.drawsteel-sourcebook,.ds-sourcebook'
												showUploadList={false}
												beforeUpload={file => {
													file
														.text()
														.then(json => {
															const sourcebook = (JSON.parse(json) as Sourcebook);
															sourcebook.id = Utils.guid();
															SourcebookUpdateLogic.updateSourcebook(sourcebook);
															props.importSourcebook(sourcebook);
														});
													return false;
												}}
											>
												<Button block={true} icon={<DownloadOutlined />}>Import a sourcebook</Button>
											</Upload>
										</>
									)}
									showSearch={true}
									filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
									value={props.hero.settingIDs}
									onChange={props.setSettingIDs}
								/>
							</>
							: null
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
