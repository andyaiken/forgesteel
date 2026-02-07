import { Button, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-list-edit-panel.scss';

interface Props {
	title: string;
	features: Feature[];
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (features: Feature[]) => void;
}

export const FeatureListEditPanel = (props: Props) => {
	const [ features, setFeatures ] = useState(Utils.copy(props.features));
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);

	const addFeature = (type: FeatureType) => {
		const f = {
			id: Utils.guid(),
			name: '',
			description: '',
			type: type,
			data: FeatureLogic.getFeatureData(type)
		} as Feature;

		const copy = Utils.copy(features);
		copy.push(f);
		setFeatures(copy);
		props.onChange(copy);
	};

	const changeFeature = (feature: Feature) => {
		const copy = Utils.copy(features);
		const index = copy.findIndex(f => f.id === feature.id);
		if (index !== -1) {
			copy[index] = feature;
		}
		setFeatures(copy);
		props.onChange(copy);
	};

	const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
		let copy = Utils.copy(features);
		const index = copy.findIndex(f => f.id === feature.id);
		copy = Collections.move(copy, index, direction);
		setFeatures(copy);
		props.onChange(copy);
	};

	const deleteFeature = (feature: Feature) => {
		let copy = Utils.copy(features);
		copy = copy.filter(f => f.id !== feature.id);
		setFeatures(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<div className='feature-list-edit-panel'>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={() => setTypeSelectorVisible(true)} />
					}
				>
					{props.title}
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						features.map(f => (
							<Expander
								key={f.id}
								title={f.name || 'Unnamed Feature'}
								tags={[ FeatureLogic.getFeatureTag(f) ]}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
								]}
							>
								<FeatureEditPanel
									feature={f}
									allowedTypes={props.allowedTypes}
									sourcebooks={props.sourcebooks}
									options={props.options}
									onChange={feature => changeFeature(feature)}
								/>
							</Expander>
						))
					}
					{
						features.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			</div>
			<Drawer open={typeSelectorVisible} onClose={() => setTypeSelectorVisible(false)} closeIcon={null} size={500}>
				<FeatureTypeSelectModal
					types={props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()}
					onSelect={type => { addFeature(type); setTypeSelectorVisible(false); }}
					onClose={() => setTypeSelectorVisible(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
