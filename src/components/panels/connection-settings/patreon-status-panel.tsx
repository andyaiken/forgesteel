import { Flex, Tag } from 'antd';
import { PatronStatus } from '@/models/patreon-connection';

interface Props {
	title: string;
	status: PatronStatus | null;
}

export const PatreonStatusPanel = (props: Props) => {
	const status = props.status;

	const renderPatronStatus = (status: PatronStatus) => {
		const subTier = status.tier_cents ? Math.round(status.tier_cents / 100) : 0;
		let subDate = '';
		if (status.start) {
			const date = new Date(status.start);
			const opts = { month: 'short', year: 'numeric' } as Intl.DateTimeFormatOptions;
			subDate = date.toLocaleDateString('en-US', opts);
		}
		return (
			<Flex gap='small'>
				<Tag
					color={status.patron ? 'green' : 'red'}
					variant='outlined'
				>
					{status.patron ? 'Member' : 'Not Member'}
				</Tag>
				{
					status.patron ?
						<Tag color='blue' variant='outlined'>
							${subTier} Tier
						</Tag>
						: null
				}
				{
					status.patron ?
						<Tag color='blue' variant='outlined'>
							Since {subDate}
						</Tag>
						: null
				}
			</Flex>
		);
	};

	return (
		<div className='patreon_status'>
			<h3>{props.title}</h3>
			{
				status ?
					renderPatronStatus(status)
					: null
			}
		</div>
	);
};
