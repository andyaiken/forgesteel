import { Button, Divider, Flex } from 'antd';
import { Hero } from '../../../models/hero';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	addHero: () => void;
	viewHero: (heroID: string) => void;
}

export const HeroListPage = (props: Props) => {
	return (
		<div className='hero-list-page'>
			<Flex gap='small'>
				<Button type='primary' onClick={props.addHero}>Create A New Character</Button>
			</Flex>
			<Divider />
			{
				props.heroes.map(hero => (
					<Button key={hero.id} onClick={() => props.viewHero(hero.id)}>
						{hero.name || 'Unnamed Hero'}
					</Button>
				))
			}
		</div>
	);
};
