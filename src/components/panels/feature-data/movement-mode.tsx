import { Feature, FeatureMovementModeData } from '@/models/feature';
import { Input, Space } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
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

	const setMovementMode = (value: string) => {
		const copy = Utils.copy(data);
		copy.mode = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Mode</HeaderText>
			<Input
				status={data.mode === '' ? 'warning' : ''}
				placeholder='Mode'
				allowClear={true}
				value={data.mode}
				onChange={e => setMovementMode(e.target.value)}
			/>
		</Space>
	);
};
