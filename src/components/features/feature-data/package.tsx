import { Feature, FeaturePackageData } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeaturePackageData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoPackage = (props: InfoProps) => {
	if (!props.hero) {
		return null;
	}

	return (
		<>
			{
				HeroLogic.getFeatures(props.hero)
					.map(f => f.feature)
					.filter(f => f.type === FeatureType.PackageContent)
					.filter(f => f.data.tag === props.data.tag)
					.map(f => (
						<Field key={f.id} label={f.name} value={<Markdown useSpan={true} text={f.description} />} />
					))
			}
		</>
	);
};

interface EditProps {
	data: FeaturePackageData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeaturePackageData) => void;
}

export const EditPackage = (props: EditProps) => {
	const [ data, setData ] = useState<FeaturePackageData>(Utils.copy(props.data));

	const setTag = (value: string) => {
		const copy = Utils.copy(data);
		copy.tag = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Tag</HeaderText>
			<TextInput
				status={data.tag === '' ? 'warning' : ''}
				placeholder='Tag'
				allowClear={true}
				value={data.tag}
				onChange={setTag}
			/>
		</Space>
	);
};
