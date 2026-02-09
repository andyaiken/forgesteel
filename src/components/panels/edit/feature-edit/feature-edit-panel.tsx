import { Button, Drawer, Flex, Select, Tabs } from 'antd';
import { Feature, FeatureData } from '@/models/feature';
import { EditFeature } from '@/components/features/feature';
import { EditOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-edit-panel.scss';

interface Props {
	feature: Feature | Perk;
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (feature: Feature) => void;
}

export const FeatureEditPanel = (props: Props) => {
	const [ feature, setFeature ] = useState<Feature | Perk>(props.feature);
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);

	const isPerk = (feature as Perk).list !== undefined;

	const setNameDesc = (name: string, desc: string) => {
		const copy = Utils.copy(feature);
		copy.name = name;
		copy.description = desc;
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
				<div className='feature-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: isPerk ? 'Perk' : 'Feature',
								children: (
									<NameDescEditPanel
										element={feature}
										onChange={setNameDesc}
									/>
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
													<Flex align='center' justify='space-between' gap={5}>
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
											isPerk ?
												<div>
													<HeaderText>Perk List</HeaderText>
													<Select
														style={{ width: '100%' }}
														placeholder='Select list'
														options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural, PerkList.Special ].map(o => ({ value: o }))}
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
				{
					props.mode === PanelMode.Full ?
						<div className='feature-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												{
													!isPerk ?
														<FeaturePanel
															feature={feature}
															sourcebooks={props.sourcebooks}
															options={props.options}
															mode={PanelMode.Full}
														/>
														:
														<PerkPanel
															perk={feature as Perk}
															sourcebooks={props.sourcebooks}
															options={props.options}
															mode={PanelMode.Full}
														/>
												}
											</SelectablePanel>
										)
									}
								]}
							/>
						</div>
						: null
				}
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
