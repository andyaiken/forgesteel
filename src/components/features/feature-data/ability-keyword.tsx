import { Feature, FeatureAbilityKeywordData } from '@/models/feature';
import { Select, Space } from 'antd';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureAbilityKeywordData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoAbilityKeyword = (props: InfoProps) => {
	return (
		<>
			<Field label='Keywords' value={props.data.keywords.join(', ')} />
			<Field label='To Add' value={props.data.keywords.join(', ')} />
		</>
	);
};

interface EditProps {
	data: FeatureAbilityKeywordData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureAbilityKeywordData) => void;
}

export const EditAbilityKeyword = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureAbilityKeywordData>(Utils.copy(props.data));

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(data);
		copy.keywords = value;
		setData(copy);
		props.setData(copy);
	};

	const setToAdd = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(data);
		copy.toAdd = value;
		setData(copy);
		props.setData(copy);
	};

	const setToRemove = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(data);
		copy.toRemove = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Keywords</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select keywords'
				mode='tags'
				allowClear={true}
				options={AbilityLogic.getAllKeywords().map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.keywords}
				onChange={setKeywords}
			/>
			<HeaderText>To Add</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select keywords to add'
				mode='tags'
				allowClear={true}
				options={AbilityLogic.getAllKeywords().map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.toAdd}
				onChange={setToAdd}
			/>
			<HeaderText>To Remove</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select keywords to remove'
				mode='tags'
				allowClear={true}
				options={AbilityLogic.getAllKeywords().map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.toRemove}
				onChange={setToRemove}
			/>
		</Space>
	);
};
