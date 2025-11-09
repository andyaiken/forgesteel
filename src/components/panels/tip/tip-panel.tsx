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
					props.tip.image ?
						<img className='tip-panel-image' src={props.tip.image} />
						: null
				}
				{
					props.tip.content ?
						<div>
							{props.tip.isNew ? <Tag color='red'>NEW</Tag> : null}
							<Markdown text={props.tip.content} useSpan={true} />
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
