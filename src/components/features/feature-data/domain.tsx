import { Button, Drawer, Flex, Select, Space } from 'antd';
import { Feature, FeatureDomainData } from '@/models/feature';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Empty } from '@/components/controls/empty/empty';
import { FeatureLogic } from '@/logic/feature-logic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureDomainData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoDomain = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(d => <DomainPanel key={d.id} domain={d} sourcebooks={props.sourcebooks || []} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'domains' : 'domain'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureDomainData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureDomainData) => void;
}

export const EditDomain = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureDomainData>(Utils.copy(props.data));

	const setCharacteristic = (value: Characteristic) => {
		const copy = Utils.copy(data);
		copy.characteristic = value;
		setData(copy);
		props.setData(copy);
	};

	const setLevels = (value: number[]) => {
		const copy = Utils.copy(data);
		copy.levels = value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Characteristic</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select field'
				options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(o => ({ value: o, label: <div className='ds-text'>{o}</div> }))}
				value={data.characteristic}
				onChange={setCharacteristic}
			/>
			<HeaderText>Levels</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select field'
				mode='multiple'
				options={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(o => ({ value: o, label: <div className='ds-text'>Level {o}</div> }))}
				value={data.levels}
				onChange={setLevels}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureDomainData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureDomainData) => void;
}

export const ConfigDomain = (props: ConfigProps) => {
	const [ selectedDomain, setSelectedDomain ] = useState<Domain | null>(null);

	const domains = SourcebookLogic.getDomains(props.sourcebooks);
	const sortedDomains = Collections.sort(domains, d => d.name);

	if (sortedDomains.length === 0) {
		return (
			<Empty text='There are no options to choose for this feature.' />
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			<Select
				style={{ width: '100%' }}
				status={props.data.selected.length < props.data.count ? 'warning' : ''}
				mode={props.data.count === 1 ? undefined : 'multiple'}
				maxCount={props.data.count === 1 ? undefined : props.data.count}
				allowClear={true}
				placeholder={props.data.count === 1 ? 'Select a domain' : 'Select domains'}
				options={sortedDomains.map(a => ({ value: a.id, label: a.name, desc: a.description }))}
				optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
				value={props.data.count === 1 ? (props.data.selected.length > 0 ? props.data.selected[0].id : null) : props.data.selected.map(k => k.id)}
				onChange={value => {
					let ids: string[] = [];
					if (props.data.count === 1) {
						ids = value !== undefined ? [ value as string ] : [];
					} else {
						ids = value as string[];
					}
					const dataCopy = Utils.copy(props.data);
					dataCopy.selected = [];
					ids.forEach(id => {
						const domain = domains.find(k => k.id === id);
						if (domain) {
							const domainCopy = Utils.copy(domain);
							domainCopy.featuresByLevel = domainCopy.featuresByLevel.filter(lvl => dataCopy.levels.includes(lvl.level));
							[ ...domainCopy.defaultFeatures, ...domainCopy.featuresByLevel.flatMap(lvl => lvl.features) ].forEach(f => FeatureLogic.switchFeatureCharacteristic(f, Characteristic.Intuition, dataCopy.characteristic));
							dataCopy.selected.push(domainCopy);
						}
					});
					props.setData(dataCopy);
				}}
			/>
			{
				props.data.selected.map(domain => (
					<Flex key={domain.id} className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={domain.name}
							value={<Markdown text={domain.description} useSpan={true} />}
						/>
						<Button
							style={{ flex: '0 0 auto' }}
							type='text'
							title='Show details'
							icon={<InfoCircleOutlined />}
							onClick={() => setSelectedDomain(domain)}
						/>
					</Flex>
				))
			}
			<Drawer open={!!selectedDomain} onClose={() => setSelectedDomain(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedDomain ? <DomainPanel domain={selectedDomain} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedDomain(null)}
				/>
			</Drawer>
		</Space>
	);
};
