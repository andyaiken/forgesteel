import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../feature-edit/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './domain-edit-panel.scss';

interface Props {
	domain: Domain;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (domain: Domain) => void;
}

export const DomainEditPanel = (props: Props) => {
	const [ domain, setDomain ] = useState<Domain>(props.domain);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(domain);
				copy.name = value;
				setDomain(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(domain);
				copy.description = value;
				setDomain(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={domain.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={domain.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={domain.description} onChange={setDescription} />
				</Space>
			);
		};

		const getFeaturesByLevelEditSection = () => {
			const addFeature = (level: number) => {
				const copy = Utils.copy(domain);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features.push(FactoryLogic.feature.create({
							id: Utils.guid(),
							name: '',
							description: ''
						}));
					});
				setDomain(copy);
				props.onChange(copy);
			};

			const changeFeature = (level: number, feature: Feature) => {
				const copy = Utils.copy(domain);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						if (index !== -1) {
							lvl.features[index] = feature;
						}
					});
				setDomain(copy);
				props.onChange(copy);
			};

			const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
				const copy = Utils.copy(domain);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						lvl.features = Collections.move(lvl.features, index, direction);
					});
				setDomain(copy);
				props.onChange(copy);
			};

			const deleteFeature = (level: number, feature: Feature) => {
				const copy = Utils.copy(domain);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features = lvl.features.filter(f => f.id !== feature.id);
					});
				setDomain(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						domain.featuresByLevel.map(lvl => (
							<div key={lvl.level}>
								<HeaderText
									extra={
										<Button type='text' icon={<PlusOutlined />} onClick={() => addFeature(lvl.level)} />
									}
								>
									Level {lvl.level.toString()}
								</HeaderText>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										lvl.features.map(f => (
											<Expander
												key={f.id}
												title={f.name || 'Unnamed Feature'}
												tags={[ FeatureLogic.getFeatureTag(f) ]}
												extra={[
													<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
													<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
													<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
												]}
											>
												<FeatureEditPanel
													feature={f}
													sourcebooks={props.sourcebooks}
													options={props.options}
													onChange={feature => changeFeature(lvl.level, feature)}
												/>
											</Expander>
										))
									}
									{
										lvl.features.length === 0 ?
											<Empty />
											: null
									}
								</Space>
							</div>
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
				<Space direction='vertical' style={{ width: '100%' }}>
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
								<Input
									status={rg.resource === '' ? 'warning' : ''}
									placeholder='Resource'
									allowClear={true}
									value={rg.resource}
									onChange={e => setResource(n, e.target.value)}
								/>
								<HeaderText>Tag</HeaderText>
								<Input
									placeholder='Tag'
									allowClear={true}
									value={rg.tag}
									onChange={e => setTag(n, e.target.value)}
								/>
								<HeaderText>Trigger</HeaderText>
								<Input
									status={rg.trigger === '' ? 'warning' : ''}
									placeholder='Trigger'
									allowClear={true}
									value={rg.trigger}
									onChange={e => setTrigger(n, e.target.value)}
								/>
								<HeaderText>Value</HeaderText>
								<Input
									status={rg.value === '' ? 'warning' : ''}
									placeholder='Value'
									allowClear={true}
									value={rg.value}
									onChange={e => setValue(n, e.target.value)}
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
			const addFeature = () => {
				const copy = Utils.copy(domain);
				copy.defaultFeatures.push(FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				}));
				setDomain(copy);
				props.onChange(copy);
			};

			const changeFeature = (feature: Feature) => {
				const copy = Utils.copy(domain);
				const index = copy.defaultFeatures.findIndex(f => f.id === feature.id);
				if (index !== -1) {
					copy.defaultFeatures[index] = feature;
				}
				setDomain(copy);
				props.onChange(copy);
			};

			const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
				const copy = Utils.copy(domain);
				const index = copy.defaultFeatures.findIndex(f => f.id === feature.id);
				copy.defaultFeatures = Collections.move(copy.defaultFeatures, index, direction);
				setDomain(copy);
				props.onChange(copy);
			};

			const deleteFeature = (feature: Feature) => {
				const copy = Utils.copy(domain);
				copy.defaultFeatures = copy.defaultFeatures.filter(f => f.id !== feature.id);
				setDomain(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={() => addFeature()} />
						}
					>
						Default Features
					</HeaderText>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							domain.defaultFeatures.map(f => (
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
										sourcebooks={props.sourcebooks}
										options={props.options}
										onChange={feature => changeFeature(feature)}
									/>
								</Expander>
							))
						}
						{
							domain.defaultFeatures.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='domain-edit-panel'>
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
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
