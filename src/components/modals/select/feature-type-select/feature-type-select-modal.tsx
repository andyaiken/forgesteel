import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Space } from 'antd';

import './feature-type-select-modal.scss';

interface Props {
	types: FeatureType[];
	onClose: () => void;
	onSelect: (type: FeatureType) => void;
}

export const FeatureTypeSelectModal = (props: Props) => {
	return (
		<Modal
			content={
				<div className='feature-type-select-modal'>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							props.types.map(ft => (
								<SelectablePanel
									key={ft}
									style={{ padding: '5px 15px' }}
									onSelect={() => props.onSelect(ft)}
								>
									<Field label={ft} value={FeatureLogic.getFeatureTypeDescription(ft)} />
								</SelectablePanel>
							))
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
