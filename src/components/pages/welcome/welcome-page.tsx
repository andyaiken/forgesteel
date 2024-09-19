import { Button, Divider } from 'antd';
import { AppHeader } from '../../controls/app-header/app-header';
import { HeaderText } from '../../controls/header-text/header-text';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './welcome-page.scss';

interface Props {
	showAbout: () => void;
	showHeroes: () => void;
	showInProgress: () => void;
}

export const WelcomePage = (props: Props) => {
	return (
		<div className='welcome-page'>
			<AppHeader showAbout={props.showAbout}/>
			<div className='welcome-page-content'>
				<SelectablePanel>
					<HeaderText>Welcome to FORGE STEEL</HeaderText>
					<div className='ds-text'>
						<b>FORGE STEEL</b> is a hero builder app for <b>DRAW STEEL</b>.
					</div>
					<div className='ds-text'>
						With this app you can create heroes using the DRAW STEEL backer packet.
					</div>
					<div className='ds-text'>
						You can export your heroes as PNG or PDF.
					</div>
					<Divider />
					<Button type='primary' block={true} onClick={props.showHeroes}>Click here to start building heroes</Button>
				</SelectablePanel>
				<div className='ds-text warning-text'>
					<Button type='text' onClick={props.showInProgress}>This is a work-in-progress.</Button>
				</div>
			</div>
		</div>
	);
};
