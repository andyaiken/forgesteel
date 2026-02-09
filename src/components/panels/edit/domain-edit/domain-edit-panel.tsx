import { Button, Space, Tabs } from 'antd';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PlusOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './domain-edit-panel.scss';

interface Props {
	domain: Domain;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (domain: Domain) => void;
}

export const DomainEditPanel = (props: Props) => {
	const [ domain, setDomain ] = useState<Domain>(props.domain);

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(domain);
			copy.name = name;
			copy.description = desc;
			setDomain(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={domain}
				onChange={onChange}
			/>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const onChange = (level: number, features: Feature[]) => {
			const copy = Utils.copy(domain);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => lvl.features = Utils.copy(features));
			setDomain(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					domain.featuresByLevel.map(lvl => (
						<FeatureListEditPanel
							key={lvl.level}
							title={`Level ${lvl.level}`}
							features={lvl.features}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={features => onChange(lvl.level, features)}
						/>
					))
				}
			</Space>
		);
	};

	const getResourceGainsEditSection = () => {
		const addResourceGain = () => {
			const copy = Utils.copy(domain);
			copy.resourceGains.push({
				resource: 'Piety',
				tag: '',
				trigger: '',
				value: '2'
			});
			setDomain(copy);
			props.onChange(copy);
		};

		const setResource = (index: number, value: string) => {
			const copy = Utils.copy(domain);
			copy.resourceGains[index].resource = value;
			setDomain(copy);
			props.onChange(copy);
		};

		const setTag = (index: number, value: string) => {
			const copy = Utils.copy(domain);
			copy.resourceGains[index].tag = value;
			setDomain(copy);
			props.onChange(copy);
		};

		const setTrigger = (index: number, value: string) => {
			const copy = Utils.copy(domain);
			copy.resourceGains[index].trigger = value;
			setDomain(copy);
			props.onChange(copy);
		};

		const setValue = (index: number, value: string) => {
			const copy = Utils.copy(domain);
			copy.resourceGains[index].value = value;
			setDomain(copy);
			props.onChange(copy);
		};

		const deleteResourceGain = (index: number) => {
			const copy = Utils.copy(domain);
			copy.resourceGains.splice(index, 1);
			setDomain(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={() => addResourceGain()} />
					}
				>
					Resource Gains
				</HeaderText>
				{
					domain.resourceGains.map((rg, n) => (
						<Expander
							key={n}
							title={rg.resource || 'Resource'}
							extra={[
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteResourceGain(n); }} />
							]}
						>
							<HeaderText>Name</HeaderText>
							<TextInput
								status={rg.resource === '' ? 'warning' : ''}
								placeholder='Resource'
								allowClear={true}
								value={rg.resource}
								onChange={value => setResource(n, value)}
							/>
							<HeaderText>Tag</HeaderText>
							<TextInput
								placeholder='Tag'
								allowClear={true}
								value={rg.tag}
								onChange={value => setTag(n, value)}
							/>
							<HeaderText>Trigger</HeaderText>
							<TextInput
								status={rg.trigger === '' ? 'warning' : ''}
								placeholder='Trigger'
								allowClear={true}
								value={rg.trigger}
								onChange={value => setTrigger(n, value)}
							/>
							<HeaderText>Value</HeaderText>
							<TextInput
								status={rg.value === '' ? 'warning' : ''}
								placeholder='Value'
								allowClear={true}
								value={rg.value}
								onChange={value => setValue(n, value)}
							/>
						</Expander>
					))
				}
				{
					domain.resourceGains.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getDefaultFeaturesEditSection = () => {
		const onChange = (features: Feature[]) => {
			const copy = Utils.copy(domain);
			copy.defaultFeatures = Utils.copy(features);
			setDomain(copy);
			props.onChange(copy);
		};

		return (
			<FeatureListEditPanel
				title='Features'
				features={domain.defaultFeatures}
				sourcebooks={props.sourcebooks}
				options={props.options}
				onChange={onChange}
			/>
		);
	};

	return (
		<ErrorBoundary>
			<div className='domain-edit-panel'>
				<div className='domain-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Domain',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Levels',
								children: getFeaturesByLevelEditSection()
							},
							{
								key: '3',
								label: 'Resource Gains',
								children: getResourceGainsEditSection()
							},
							{
								key: '4',
								label: 'Default Features',
								children: getDefaultFeaturesEditSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='domain-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<DomainPanel
													domain={domain}
													sourcebooks={props.sourcebooks}
													options={props.options}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									}
								]}
							/>
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
