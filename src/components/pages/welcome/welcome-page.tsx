import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { AppHeader } from '../../panels/app-header/app-header';
import { Button } from 'antd';
import { HeaderText } from '../../controls/header-text/header-text';
import { useNavigation } from '../../../hooks/use-navigation';

import './welcome-page.scss';

interface Props {
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
}

export const WelcomePage = (props: Props) => {
	const navigation = useNavigation();

	try {
		return (
			<div className='welcome-page'>
				<AppHeader showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} />
				<div className='welcome-page-content'>
					<div className='welcome-column'>
						<HeaderText level={1}>Welcome to FORGE STEEL</HeaderText>
						<div className='ds-text'>
							<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players and directors.
						</div>
						<HeaderText>For Players</HeaderText>
						<div className='welcome-row'>
							<div>
								In the <b>HEROES</b> section you can create characters for <b>DRAW STEEL</b>.
								<ul>
									<li>
										All the official content is included (for levels 1 to 3), and you can also use any homebrew your director has created.
									</li>
									<li>
										You can use the app to track your hero's stamina, conditions, surges, etc.
									</li>
									<li>
										If you're playing offline, you can export your heroes in PNG or PDF formats.
									</li>
								</ul>
							</div>
							<Button type='primary' block={true} icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>Heroes</Button>
						</div>
						<HeaderText>For Directors</HeaderText>
						<div className='welcome-row'>
							<div>
								In the <b>LIBRARY</b>, you can browse the collections of ancestries, classes, kits - all of the elements you need to build a hero - and other useful elements like monsters and terrain objects.
								You can use these as a base from which to design your own homebrew elements, or create them from whole cloth.
							</div>
							<Button block={true} icon={<BookOutlined />} onClick={() => navigation.goToLibraryList('ancestry')}>Library</Button>
						</div>
						<div className='welcome-row'>
							<div>
								In your <b>PLAYBOOK</b>, you can build encounters, ensuring that they're perfectly balanced for your heroes, and craft negotiations and montage tests.
								You can then combine all these into an adventure.
							</div>
							<Button block={true} icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('adventure')}>Playbook</Button>
						</div>
						<div className='welcome-row'>
							<div>
								In the <b>SESSION</b> screen, you can run your encounters, montages, and negotiations.
							</div>
							<Button block={true} icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>Session</Button>
						</div>
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
