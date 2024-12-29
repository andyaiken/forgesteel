import { Button, Upload } from 'antd';
import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Hero } from '../../../../models/hero';
import { HeroPanel } from '../../../panels/elements/hero-panel/hero-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { useNavigation } from '../../../../hooks/use-navigation';
import { usePersistedHeroes } from '../../../../hooks/use-persisted-heroes';

import './hero-list-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	goHome: () => void;
	addHero: () => void;
}

export const HeroListPage = (props: Props) => {
	const { heroes, importHero } = usePersistedHeroes();
	const navigation = useNavigation();
	try {
		return (
			<div className='hero-list-page'>
				<AppHeader subtitle='Heroes' goHome={props.goHome}>
					<Button type='primary' icon={<PlusCircleOutlined />} onClick={props.addHero}>
						Create A New Hero
					</Button>
					<Upload
						style={{ width: '100%' }}
						accept='.drawsteel-hero'
						showUploadList={false}
						beforeUpload={file => {
							file
								.text()
								.then(async json => {
									const hero = (JSON.parse(json) as Hero);
									await importHero(hero);
									navigation.goToHeroView(hero.id);
								});
							return false;
						}}
					>
						<Button block={true} icon={<DownloadOutlined />}>Import a Hero</Button>
					</Upload>
				</AppHeader>
				<div className='hero-list-page-content'>
					{
						heroes.map(hero => (
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
