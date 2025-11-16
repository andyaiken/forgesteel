import { Button, Flex, Tag } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Tip } from '@/models/tip';

import './tip-panel.scss';

interface Props {
	tip: Tip;
	onPrevious?: () => void;
	onNext?: () => void;
};

export const TipPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='tip-panel'>
				{
					props.tip.isNew ?
						<div style={{ textAlign: 'center' }}>
							<Tag color='red'>NEW!</Tag>
						</div>
						: null
				}
				<Flex justify='space-between' gap={10}>
					<Button disabled={!props.onPrevious} style={{ marginTop: '12px' }} type='text' icon={<DoubleLeftOutlined />} onClick={props.onPrevious} />
					<div style={{ flex: '1 1 0' }}>
						<Markdown text={props.tip.content} useSpan={true} />
					</div>
					<Button disabled={!props.onNext} style={{ marginTop: '12px' }} type='text' icon={<DoubleRightOutlined />} onClick={props.onNext} />
				</Flex>
				<img className='tip-panel-image' src={props.tip.image} />
			</div>
		</ErrorBoundary>
	);
};
