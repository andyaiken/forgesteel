import { Input, Space } from 'antd';
import { FeaturePackageContentData } from '@/models/feature';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface EditProps {
	data: FeaturePackageContentData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeaturePackageContentData) => void;
}

export const EditPackageContent = (props: EditProps) => {
	const [ data, setData ] = useState<FeaturePackageContentData>(Utils.copy(props.data));

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
