import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Tip } from '@/models/tip';

import './tip-panel.scss';

interface Props {
	tip: Tip;
};

export const TipPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='tip-panel'>
				{props.tip.image ? <img className='tip-panel-image' src={props.tip.image} /> : null}
				{props.tip.content ? <Markdown text={props.tip.content} useSpan={true} /> : null}
			</div>
		</ErrorBoundary>
	);
};
