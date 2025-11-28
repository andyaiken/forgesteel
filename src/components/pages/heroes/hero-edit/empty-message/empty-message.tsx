import { Alert, Button, Divider } from 'antd';
import { Hero } from '@/models/hero';
import { useNavigation } from '@/hooks/use-navigation';

import './empty-message.scss';

interface Props {
	hero: Hero;
}

export const EmptyMessage = (props: Props) => {
	const navigation = useNavigation();

	return (
		<Alert
			type='info'
			showIcon={true}
			title={
				<div className='empty-message'>
					Looking for something specific? If it's third-party or homebrew, make sure you've included the sourcebook it's in.
					<Divider orientation='vertical' />
					<Button type='primary' onClick={() => navigation.goToHeroEdit(props.hero.id, 'start')}>
						Click Here
					</Button>
				</div>
			}
		/>
	);
};
