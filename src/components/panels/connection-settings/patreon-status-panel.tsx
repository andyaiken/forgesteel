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
		let patron = false;
		let label = 'Not A Patron';
		if (props.status && props.status.patron) {
			patron = true;
			const date = new Date(props.status.start);
			const subDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
			label = `Patron since ${subDate}`;
		}

		return (
			<Tag
				color={patron ? 'blue' : 'red'}
				variant={patron ? 'solid' : 'outlined'}
			>
				{label}
			</Tag>
		);
	};

	const getTiers = () => {
		if (!props.status || !props.status.patron || !props.status.tiers) {
			return null;
		}

		return (
			<>
				{
					props.status.tiers.map(tier => {
						return (
							<Tag
								key={tier.id}
								color='blue'
								variant='outlined'
							>
								{tier.title}
							</Tag>
						);
					})
				}
			</>
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
				{getTiers()}
			</Flex>
		</div>
	);
};
