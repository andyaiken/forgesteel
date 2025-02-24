import { Button, Popover, Space, Upload } from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Hero } from '../../../../models/hero';
import { HeroPanel } from '../../../panels/elements/hero-panel/hero-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { useNavigation } from '../../../../hooks/use-navigation';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	addHero: () => void;
	importHero: (hero: Hero) => void;
}

export const HeroListPage = (props: Props) => {
	const navigation = useNavigation();
	try {
		return (
			<div className='hero-list-page'>
				<AppHeader breadcrumbs={[ { label: 'Heroes' } ]} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Space>
									<Button block={true} icon={<PlusOutlined />} onClick={props.addHero}>Create</Button>
									<div className='ds-text'>or</div>
									<Upload
										style={{ width: '100%' }}
										accept='.drawsteel-hero'
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const hero = (JSON.parse(json) as Hero);
													props.importHero(hero);
												});
											return false;
										}}
									>
										<Button block={true} icon={<DownloadOutlined />}>Import</Button>
									</Upload>
								</Space>
							</div>
						)}
					>
						<Button icon={<PlusOutlined />}>
							Add
						</Button>
					</Popover>
				</AppHeader>
				<div className='hero-list-page-content'>
					{
						props.heroes.map(hero => (
							<SelectablePanel key={hero.id} onSelect={() => navigation.goToHeroView(hero.id)}>
								<HeroPanel hero={hero} sourcebooks={props.sourcebooks} />
							</SelectablePanel>
						))
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
