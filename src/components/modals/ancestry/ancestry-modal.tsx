import { Button, Popover } from 'antd';
import { Ancestry } from '../../../models/ancestry';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { CampaignSetting } from '../../../models/campaign-setting';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-modal.scss';

interface Props {
	ancestry: Ancestry;
	homebrewSettings: CampaignSetting[];
	isHomebrew: boolean;
	createHomebrew: (setting: CampaignSetting | null) => void;
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const AncestryModal = (props: Props) => {
	try {
		return (
			<div className='ancestry-modal'>
				<div className='toolbar'>
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
											props.homebrewSettings.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
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
								<Button onClick={() => props.export('json')}>Export As Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					{props.isHomebrew ? <DangerButton onConfirm={props.delete} /> : null}
				</div>
				<AncestryPanel ancestry={props.ancestry} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
