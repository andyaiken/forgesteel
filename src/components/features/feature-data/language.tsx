import { Feature, FeatureLanguageData } from '@/models/feature';
import { Select, Space } from 'antd';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureLanguageData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoLanguage = (props: InfoProps) => {
	if (!props.feature.description) {
		return (
			<Field label='Language' value={props.data.language} />
		);
	}

	return null;
};

interface EditProps {
	data: FeatureLanguageData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureLanguageData) => void;
}

export const EditLanguage = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureLanguageData>(Utils.copy(props.data));

	const setLanguage = (value: string) => {
		const copy = Utils.copy(data);
		copy.language = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Language</HeaderText>
			<Select
				style={{ width: '100%' }}
				status={data.language === '' ? 'warning' : ''}
				placeholder='Language'
				allowClear={true}
				options={SourcebookLogic.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
				optionRender={option => <Field label={option.data.value} value={option.data.description} />}
				value={data.language || ''}
				onChange={setLanguage}
			/>
		</Space>
	);
};
