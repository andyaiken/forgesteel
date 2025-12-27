import { Feature, FeatureMovementModeData } from '@/models/feature';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureMovementModeData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoMovementMode = (props: InfoProps) => {
	return (
		<div className='ds-text'>
			You gain the <b>{props.data.mode}</b> movement mode.
		</div>
	);
};

interface EditProps {
	data: FeatureMovementModeData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureMovementModeData) => void;
}

export const EditMovementMode = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureMovementModeData>(Utils.copy(props.data));

	const setMode = (value: string) => {
		const copy = Utils.copy(data);
		copy.mode = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Mode</HeaderText>
			<TextInput
				status={data.mode === '' ? 'warning' : ''}
				placeholder='Mode'
				allowClear={true}
				value={data.mode}
				onChange={setMode}
			/>
		</Space>
	);
};
