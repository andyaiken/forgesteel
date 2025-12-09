import { Flex, Tag } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { PatronStatus } from '@/models/patreon-connection';

import './patreon-status-panel.scss';

import patreon from '@/assets/icons/patreon.svg';

interface Props {
	title: string;
	status: PatronStatus | null;
}

export const PatreonStatusPanel = (props: Props) => {
	const getIsPatron = () => {
		return (
			<Tag
				color={props.status && props.status.patron ? 'blue' : 'red'}
				variant={props.status && props.status.patron ? 'solid' : 'outlined'}
			>
				{props.status && props.status.patron ? 'Patron' : 'Not A Patron'}
			</Tag>
		);
	};

	const getTier = () => {
		if (!props.status || !props.status.patron || !props.status.tier_cents) {
			return null;
		}

		const dollars = Math.round(props.status.tier_cents / 100);

		return (
			<Tag
				color='blue'
				variant='outlined'
			>
				${dollars} Tier
			</Tag>
		);
	};

	const getSubscribedDate = () => {
		if (!props.status || !props.status.patron || !props.status.start) {
			return null;
		}

		const date = new Date(props.status.start);
		const subDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

		return (
			<Tag
				color='blue'
				variant='outlined'
			>
				Since {subDate}
			</Tag>
		);
	};

	return (
		<div className='patreon-status-panel'>
			<HeaderText>
				<Flex align='center' gap={10}>
					<img className='patreon-logo' src={patreon} style={{ width: '16px', height: '16px' }} />
					{props.title}
				</Flex>
			</HeaderText>
			<Flex gap={5}>
				{getIsPatron()}
				{getTier()}
				{getSubscribedDate()}
			</Flex>
		</div>
	);
};
