import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Modal } from '../../modal/modal';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Space } from 'antd';

import './feature-type-select-modal.scss';

interface Props {
	types: FeatureType[];
	onClose: () => void;
	onSelect: (type: FeatureType) => void;
}

export const FeatureTypeSelectModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='feature-type-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								props.types.map(ft => (
									<SelectablePanel
										key={ft}
										onSelect={() => props.onSelect(ft)}
									>
										<HeaderText>{ft}</HeaderText>
										<div className='ds-text'>{FeatureLogic.getFeatureTypeDescription(ft)}</div>
									</SelectablePanel>
								))
							}
						</Space>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
