import { AimOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { AppHeader } from '../../panels/app-header/app-header';
import { HeaderText } from '../../controls/header-text/header-text';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './welcome-page.scss';

interface Props {
	showHeroes: () => void;
	showLibrary: () => void;
	showEncounters: () => void;
}

export const WelcomePage = (props: Props) => {
	try {
		return (
			<div className='welcome-page'>
				<AppHeader />
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
									</div>
									<div className='ds-text'>
										If you're playing offline, you can export your heroes as PNG or PDF.
									</div>
									<div className='ds-text'>
										If your Director has homebrew content that you'd like to use for your heroes, you can add it to your library.
									</div>
									<HeaderText>For Directors</HeaderText>
									<div className='ds-text'>
										In the library, you can browse the collections of ancestries, classes, kits - all of the elements you need to build a hero - and monsters.
										You can use these as a base from which to design your own homebrew elements, or create them from whole cloth.
									</div>
									<div className='ds-text'>
										You can use the monsters to build encounters, ensuring that they're perfectly balanced.
									</div>
								</div>
								<div className='welcome-actions'>
									<Button type='primary' block={true} icon={<TeamOutlined />} onClick={props.showHeroes}>Heroes</Button>
									<Button block={true} icon={<BookOutlined />} onClick={props.showLibrary}>Library</Button>
									<Button block={true} icon={<AimOutlined />} onClick={props.showEncounters}>Encounters</Button>
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
