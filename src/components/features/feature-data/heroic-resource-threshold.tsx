import { Feature, FeatureHeroicResourceThresholdData } from '@/models/feature';
import { Flex, Space } from 'antd';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { InfoFeature } from '../feature';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { ResourcePill } from '@/components/controls/pill/pill';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

const getResource = (data: FeatureHeroicResourceThresholdData, hero: Hero) => {
	const resources = HeroLogic.getHeroicResources(hero);
	return data.resource ?
		resources.find(r => r.name === data.resource)
		: resources.find(r => r.type === 'heroic');
};

interface InfoProps {
	data: FeatureHeroicResourceThresholdData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoHeroicResourceThreshold = (props: InfoProps) => {
	const resource = props.hero ? getResource(props.data, props.hero) : undefined;
	const resourceName = props.data.resource || resource?.name || 'Resource';

	// Without a hero we have nothing to compare against, so don't show a locked / unlocked state
	const unlocked = props.hero ?
		(!!resource && (resource.value >= props.data.value) && ((props.hero.class?.level || 1) >= props.data.level))
		: undefined;

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<Flex align='center' justify='space-between' gap={10}>
				<div className='ds-text compact-text'>
					{resourceName} {props.data.value}+
					{props.data.level > 1 ? ` (level ${props.data.level}+)` : null}
				</div>
				{
					unlocked !== undefined ?
						<ResourcePill value={unlocked ? 'Unlocked' : 'Locked'} units='' satisfied={unlocked} />
						: null
				}
			</Flex>
			{props.data.feature.description ? <Markdown text={props.data.feature.description} /> : null}
			<InfoFeature feature={props.data.feature} hero={props.hero} sourcebooks={props.sourcebooks} />
		</Space>
	);
};

interface EditProps {
	data: FeatureHeroicResourceThresholdData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureHeroicResourceThresholdData) => void;
}

export const EditHeroicResourceThreshold = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureHeroicResourceThresholdData>(Utils.copy(props.data));

	const setResource = (value: string) => {
		const copy = Utils.copy(data);
		copy.resource = value;
		setData(copy);
		props.setData(copy);
	};

	const setValue = (value: number) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	const setLevel = (value: number) => {
		const copy = Utils.copy(data);
		copy.level = value;
		setData(copy);
		props.setData(copy);
	};

	const setFeature = (value: Feature) => {
		const copy = Utils.copy(data);
		copy.feature = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Resource</HeaderText>
			<TextInput
				placeholder='Leave blank for your heroic resource'
				allowClear={true}
				value={data.resource}
				onChange={setResource}
			/>
			<HeaderText>Minimum Resource Value</HeaderText>
			<NumberSpin min={1} value={data.value} onChange={setValue} />
			<HeaderText>Minimum Level</HeaderText>
			<NumberSpin min={1} max={10} value={data.level} onChange={setLevel} />
			<HeaderText>Feature</HeaderText>
			<FeatureEditPanel
				feature={data.feature}
				sourcebooks={props.sourcebooks}
				onChange={setFeature}
			/>
		</Space>
	);
};
