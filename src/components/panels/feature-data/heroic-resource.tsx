import { Button, Divider, Empty, Flex, Input, Segmented, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureHeroicResourceData } from '@/models/feature';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';
import { Pill } from '@/components/controls/pill/pill';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureHeroicResourceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoHeroicResource = (props: InfoProps) => {
	if (props.hero) {
		const resource = HeroLogic.getHeroicResources(props.hero).find(hr => hr.name === props.feature.name);
		if (resource) {
			return (
				<>
					<ul>
						{
							resource.gains.map((g, n) => (
								<li key={n}>
									<Flex align='center' justify='space-between' gap={10}>
										<div className='ds-text compact-text'>{g.trigger}</div>
										<Pill>+{g.value}</Pill>
									</Flex>
								</li>
							))
						}
					</ul>
					<Markdown text={resource.details} />
				</>
			);
		}
	}

	return null;
};

interface EditProps {
	data: FeatureHeroicResourceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureHeroicResourceData) => void;
}

export const EditHeroicResource = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureHeroicResourceData>(Utils.copy(props.data));

	const setResourceType = (value: 'heroic' | 'epic') => {
		const copy = Utils.copy(data) as FeatureHeroicResourceData;
		copy.type = value;
		setData(copy);
		props.setData(copy);
	};

	const addResourceGain = (data: FeatureHeroicResourceData) => {
		const copy = Utils.copy(data);
		copy.gains.push({
			tag: '',
			trigger: '',
			value: '1'
		});
		setData(copy);
		props.setData(copy);
	};

	const moveResourceGain = (data: FeatureHeroicResourceData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.gains = Collections.move(copy.gains, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteResourceGain = (data: FeatureHeroicResourceData, index: number) => {
		const copy = Utils.copy(data);
		copy.gains.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setResourceGainTag = (data: FeatureHeroicResourceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		copy.gains[index].tag = value;
		setData(copy);
		props.setData(copy);
	};

	const setResourceGainTrigger = (data: FeatureHeroicResourceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		copy.gains[index].trigger = value;
		setData(copy);
		props.setData(copy);
	};

	const setResourceGainValue = (data: FeatureHeroicResourceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		copy.gains[index].value = value;
		setData(copy);
		props.setData(copy);
	};

	const setCanBeNegative = (value: boolean) => {
		const copy = Utils.copy(data) as FeatureHeroicResourceData;
		copy.canBeNegative = value;
		setData(copy);
		props.setData(copy);
	};

	const setDetails = (value: string) => {
		const copy = Utils.copy(data) as FeatureHeroicResourceData;
		copy.details = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Type</HeaderText>
			<Segmented
				name='resourcetypes'
				block={true}
				options={[ 'heroic', 'epic' ].map(o => ({ value: o, label: Format.capitalize(o) }))}
				value={data.type}
				onChange={s => setResourceType(s as 'heroic' | 'epic')}
			/>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addResourceGain(data)} />
				}
			>
				Gaining The Resource
			</HeaderText>
			{
				data.gains.map((gain, n) => (
					<Expander
						key={n}
						title='Gain'
						extra={[
							<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveResourceGain(data, n, 'up'); }} />,
							<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveResourceGain(data, n, 'down'); }} />,
							<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteResourceGain(data, n); }} />
						]}
					>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<HeaderText>Tag</HeaderText>
							<Input
								placeholder='Tag'
								allowClear={true}
								value={gain.tag}
								onChange={e => setResourceGainTag(data, n, e.target.value)}
							/>
							<HeaderText>Trigger</HeaderText>
							<Input
								status={gain.value === '' ? 'warning' : ''}
								placeholder='Trigger'
								allowClear={true}
								value={gain.trigger}
								onChange={e => setResourceGainTrigger(data, n, e.target.value)}
							/>
							<HeaderText>Value</HeaderText>
							<Input
								status={gain.value === '' ? 'warning' : ''}
								placeholder='Value'
								allowClear={true}
								value={gain.value}
								onChange={e => setResourceGainValue(data, n, e.target.value)}
							/>
						</Space>
					</Expander>
				))
			}
			{
				data.gains.length === 0 ?
					<Empty />
					: null
			}
			<Divider />
			<Toggle label='Can be negative' value={data.canBeNegative} onChange={setCanBeNegative} />
			<HeaderText>Details</HeaderText>
			<MarkdownEditor value={data.details} onChange={setDetails} />
		</Space>
	);
};
