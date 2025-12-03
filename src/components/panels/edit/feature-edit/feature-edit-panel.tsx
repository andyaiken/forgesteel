import { Button, Drawer, Flex, Input, Select, Tabs } from 'antd';
import { Feature, FeatureData } from '@/models/feature';
import { EditFeature } from '@/components/features/feature';
import { EditOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-edit-panel.scss';

interface Props {
	feature: Feature | Perk;
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (feature: Feature) => void;
}

export const FeatureEditPanel = (props: Props) => {
	const [ feature, setFeature ] = useState<Feature | Perk>(props.feature);
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);

	const setName = (value: string) => {
		const copy = Utils.copy(feature);
		copy.name = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(feature);
		copy.description = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setType = (value: FeatureType) => {
		const copy = Utils.copy(feature);
		copy.type = value;
		copy.data = FeatureLogic.getFeatureData(value);
		setFeature(copy);
		props.onChange(copy);
	};

	const setData = (value: FeatureData) => {
		const copy = Utils.copy(feature);
		copy.data = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setList = (value: PerkList) => {
		const copy = Utils.copy(feature) as Perk;
		copy.list = value;
		setFeature(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<div className='feature-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Feature',
							children: (
								<div>
									<HeaderText>Name</HeaderText>
									<Input
										status={feature.name === '' ? 'warning' : ''}
										placeholder='Name'
										allowClear={true}
										value={feature.name}
										onChange={e => setName(e.target.value)}
									/>
									<HeaderText>Description</HeaderText>
									<MarkdownEditor value={feature.description} onChange={setDescription} />
								</div>
							)
						},
						{
							key: '2',
							label: 'Details',
							children: (
								<div>
									{
										(props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()).length !== 1 ?
											<>
												<HeaderText>Feature Type</HeaderText>
												<Flex align='center' justify='space-between'>
													<Field label={feature.type} value={FeatureLogic.getFeatureTypeDescription(feature.type)} />
													<Button onClick={() => setTypeSelectorVisible(true)}>
														<EditOutlined />
														Change
													</Button>
												</Flex>
											</>
											: null
									}
									{
										(feature as Perk).list !== undefined ?
											<div>
												<HeaderText>Perk List</HeaderText>
												<Select
													style={{ width: '100%' }}
													placeholder='Select list'
													options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(o => ({ value: o }))}
													optionRender={option => <div className='ds-text'>{option.data.value}</div>}
													value={(feature as Perk).list}
													onChange={setList}
												/>
											</div>
											: null
									}
									<EditFeature
										feature={feature}
										sourcebooks={props.sourcebooks}
										options={props.options}
										setData={setData}
									/>
								</div>
							)
						}
					]}
				/>
			</div>
			<Drawer open={typeSelectorVisible} onClose={() => setTypeSelectorVisible(false)} closeIcon={null} size={500}>
				<FeatureTypeSelectModal
					types={props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()}
					onSelect={type => { setType(type); setTypeSelectorVisible(false); }}
					onClose={() => setTypeSelectorVisible(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
