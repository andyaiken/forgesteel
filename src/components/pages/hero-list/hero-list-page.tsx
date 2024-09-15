import { Button, Space } from 'antd';
import { Hero } from '../../../models/hero';
import { HeroPanel } from '../../panels/hero-panel/hero-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	addHero: () => void;
	viewHero: (heroID: string) => void;
}

export const HeroListPage = (props: Props) => {
	return (
		<div className='hero-list-page'>
			<div className='action-row'>
				<Button type='primary' onClick={props.addHero}>Create A New Hero</Button>
			</div>
			<Space direction='vertical'>
				{
					props.heroes.map(hero => (
						<SelectablePanel key={hero.id} onSelect={() => props.viewHero(hero.id)}>
							<HeroPanel hero={hero} mode={PanelMode.Short} />
						</SelectablePanel>
					))
				}
			</Space>
		</div>
	);
};
