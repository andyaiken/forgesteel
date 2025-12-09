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
	const getStatus = () => {
		if (!props.status) {
			return null;
		}

		let subDate = '';
		if (props.status.start) {
			const date = new Date(props.status.start);
			const opts = { month: 'short', year: 'numeric' } as Intl.DateTimeFormatOptions;
			subDate = date.toLocaleDateString('en-US', opts);
		}

		const subTier = props.status.tier_cents ? Math.round(props.status.tier_cents / 100) : 0;

		return (
			<Flex gap='small'>
				<Tag
					color={props.status.patron ? 'green' : 'red'}
					variant='outlined'
				>
					{props.status.patron ? 'Member' : 'Not Member'}
				</Tag>
				{
					props.status.patron ?
						<Tag color='blue' variant='outlined'>
							${subTier} Tier
						</Tag>
						: null
				}
				{
					props.status.patron ?
						<Tag color='blue' variant='outlined'>
							Since {subDate}
						</Tag>
						: null
				}
			</Flex>
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
			{getStatus()}
		</div>
	);
};
