import { Button, Popover } from 'antd';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Domain } from '../../../models/domain';
import { DomainPanel } from '../../panels/domain-panel/domain-panel';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { Sourcebook } from '../../../models/sourcebook';

import './domain-modal.scss';

interface Props {
	domain: Domain;
	homebrewSourcebooks: Sourcebook[];
	isHomebrew: boolean;
	createHomebrew: (sourcebook: Sourcebook | null) => void;
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const DomainModal = (props: Props) => {
	try {
		return (
			<Modal
				toolbar={
					<>
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
												props.homebrewSourcebooks.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
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
									<Button onClick={() => props.export('json')}>Export as Data</Button>
								</div>
							)}
						>
							<Button>
								Export
							</Button>
						</Popover>
						{props.isHomebrew ? <DangerButton onConfirm={props.delete} /> : null}
					</>
				}
				content={
					<div className='domain-modal'>
						<DomainPanel domain={props.domain} mode={PanelMode.Full} />
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
