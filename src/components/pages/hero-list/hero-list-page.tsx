import { AppHeader } from '../../panels/app-header/app-header';
import { Button } from 'antd';
import { Hero } from '../../../models/hero';
import { HeroPanel } from '../../panels/hero-panel/hero-panel';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	goHome: () => void;
	showAbout: () => void;
	addHero: () => void;
	viewHero: (heroID: string) => void;
}

export const HeroListPage = (props: Props) => {
	return (
		<div className='hero-list-page'>
			<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
				<Button type='primary' onClick={props.addHero}>
					Create A New Hero
				</Button>
			</AppHeader>
			<div className='hero-list-page-content'>
				{
					props.heroes.map(hero => (
						<div key={hero.id}>
							<SelectablePanel onSelect={() => props.viewHero(hero.id)}>
								<HeroPanel hero={hero} />
							</SelectablePanel>
						</div>
					))
				}
			</div>
		</div>
	);
};
