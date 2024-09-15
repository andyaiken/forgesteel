import { Button, Divider } from 'antd';
import { HeaderText } from '../../controls/header-text/header-text';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './welcome-page.scss';

interface Props {
	showHeroes: () => void;
	showAbout: () => void;
}

export const WelcomePage = (props: Props) => {
	return (
		<div className='welcome-page'>
			<SelectablePanel>
				<HeaderText>Welcome to FORGE STEEL</HeaderText>
				<div className='ds-text'>
					<b>FORGE STEEL</b> is a hero builder app for <b>DRAW STEEL</b>.
				</div>
				<div className='ds-text'>
					With this app you can create heroes using (almost!) all the content from the DRAW STEEL backet packet.
				</div>
				<Divider />
				<Button type='primary' block={true} onClick={props.showHeroes}>Click here to start building heroes</Button>
			</SelectablePanel>
			<div className='warning-text'>
				<Button type='text' onClick={props.showAbout}>This is a work-in-progress.</Button>
			</div>
		</div>
	);
};
