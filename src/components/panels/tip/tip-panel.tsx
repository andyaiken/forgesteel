import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Tag } from 'antd';
import { Tip } from '@/models/tip';

import './tip-panel.scss';

interface Props {
	tip: Tip;
};

export const TipPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='tip-panel'>
				{
					props.tip.isNew ?
						<div style={{ textAlign: 'center' }}>
							<Tag color='red' variant='outlined'>NEW!</Tag>
						</div>
						: null
				}
				<div style={{ flex: '1 1 0' }}>
					<Markdown text={props.tip.content} useSpan={true} />
				</div>
				<img className='tip-panel-image' src={props.tip.image} />
			</div>
		</ErrorBoundary>
	);
};
