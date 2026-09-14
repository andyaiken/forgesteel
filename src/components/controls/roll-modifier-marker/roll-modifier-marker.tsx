import { DownCircleFilled, PlusCircleOutlined, UpCircleFilled } from '@ant-design/icons';
import { RollModifierType } from '@/enums/roll-modifier-type';

import './roll-modifier-marker.scss';

interface Props {
	modifier: RollModifierType;
	multiple?: boolean;
}

export const RollModifierMarker = (props: Props) => {
	let className = '';
	let content = null;
	switch (props.modifier) {
		case RollModifierType.Edge:
			className = 'edge';
			content = (
				<UpCircleFilled />
			);
			break;
		case RollModifierType.DoubleEdge:
			className = 'edge';
			content = (
				<>
					<UpCircleFilled />
					<UpCircleFilled />
				</>
			);
			break;
		case RollModifierType.Bane:
			className = 'bane';
			content = (
				<DownCircleFilled />
			);
			break;
		case RollModifierType.DoubleBane:
			className = 'bane';
			content = (
				<>
					<DownCircleFilled />
					<DownCircleFilled />
				</>
			);
			break;
	}

	return (
		<span className='roll-modifier-marker'>
			<span className={className} title={props.modifier}>
				{content}
				{props.multiple ? <PlusCircleOutlined /> : null}
			</span>
		</span>
	);
};
