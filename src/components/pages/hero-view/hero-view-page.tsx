import { Button, Divider, Flex } from 'antd';
import { Hero } from '../../../models/hero';
import { HeroPanel } from '../../panels/hero-panel/hero-panel';

import './hero-view-page.scss';

interface Props {
	hero: Hero;
	closeHero: () => void;
	editHero: () => void;
	deleteHero: () => void;
}

export const HeroPage = (props: Props) => {
	return (
		<div className='hero-view-page'>
			<Flex gap='small'>
				<Button onClick={props.closeHero}>Close</Button>
				<Button onClick={props.editHero}>Edit</Button>
				<Button onClick={props.deleteHero}>Delete</Button>
			</Flex>
			<Divider />
			<HeroPanel hero={props.hero} />
		</div>
	);
};
