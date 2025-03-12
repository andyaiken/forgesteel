import { BookOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { AppHeader } from '../../panels/app-header/app-header';
import { HeaderText } from '../../controls/header-text/header-text';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './welcome-page.scss';

interface Props {
	showHeroes: () => void;
	showLibrary: () => void;
	showPlaybook: () => void;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
}

export const WelcomePage = (props: Props) => {
	try {
		return (
			<div className='welcome-page'>
				<AppHeader showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} />
				<div className='welcome-page-content'>
					<div className='welcome-column'>
						<SelectablePanel>
							<HeaderText level={1}>Welcome to FORGE STEEL</HeaderText>
							<Space direction='vertical'>
								<div className='ds-text'>
									<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players and directors.
								</div>
								<div>
									<HeaderText>For Players</HeaderText>
									<div className='ds-text'>
										With this app you can create heroes for <b>DRAW STEEL</b>.
										If you're playing offline, you can export your heroes in PNG or PDF formats.
									</div>
								</div>
								<div>
									<HeaderText>For Directors</HeaderText>
									<div className='ds-text'>
										In the <b>LIBRARY</b>, you can browse the collections of ancestries, classes, kits - all of the elements you need to build a hero - and other useful elements like monsters and terrain objects.
										You can use these as a base from which to design your own homebrew elements, or create them from whole cloth.
									</div>
									<div className='ds-text'>
										In your <b>PLAYBOOK</b>, you can build encounters, ensuring that they're perfectly balanced for your heroes, and craft negotiations and montage tests.
										You can then combine all these into an adventure.
									</div>
								</div>
								<div className='welcome-actions'>
									<Button type='primary' block={true} icon={<TeamOutlined />} onClick={props.showHeroes}>Heroes</Button>
									<Button block={true} icon={<BookOutlined />} onClick={props.showLibrary}>Library</Button>
									<Button block={true} icon={<ReadOutlined />} onClick={props.showPlaybook}>Playbook</Button>
								</div>
							</Space>
						</SelectablePanel>
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
