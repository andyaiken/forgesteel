import { Feature, FeaturePackageData } from '@/models/feature';
import { Input, Space } from 'antd';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
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
						<div key={f.id}>
							<div className='ds-text bold-text'>{f.name}</div>
							<Markdown text={f.description} />
						</div>
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
			<Input
				status={data.tag === '' ? 'warning' : ''}
				placeholder='Tag'
				allowClear={true}
				value={data.tag}
				onChange={e => setTag(e.target.value)}
			/>
		</Space>
	);
};
