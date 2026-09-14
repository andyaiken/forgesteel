import { Button, Drawer, Segmented, Select, Space } from 'antd';
import { Feature, FeatureLanguageChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { LanguageSelectModal } from '@/components/modals/select/language-select/language-select-modal';
import { LanguageType } from '@/enums/language-type';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureLanguageChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoLanguageChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Field label='Language' value={props.data.selected.join(', ')} />
		);
	}

	return null;
};

interface EditProps {
	data: FeatureLanguageChoiceData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureLanguageChoiceData) => void;
}

export const EditLanguageChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureLanguageChoiceData>(Utils.copy(props.data));

	const setLanguageOptions = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.options = value;
		setData(copy);
		props.setData(copy);
	};

	const toggleAllowedType = (value: LanguageType, add: boolean) => {
		const copy = Utils.copy(data);
		copy.allowedTypes = copy.allowedTypes.filter(t => t !== value);
		if (add) {
			copy.allowedTypes.push(value);
		}
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	const setSelectAt = (value: 'build' | 'respite' | 'play') => {
		const copy = Utils.copy(data);
		copy.selectAt = value;
		setData(copy);
		props.setData(copy);
	};

	const setLanguageSelected = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.selected = value;
		setData(copy);
		props.setData(copy);
	};

	const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
	const distinctLanguages = Collections.distinct(languages, l => l.name);
	const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Options</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Options'
				mode='tags'
				allowClear={true}
				options={SourcebookLogic.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
				optionRender={option => <Field label={option.data.value} value={option.data.description} />}
				value={data.options}
				onChange={setLanguageOptions}
			/>
			<HeaderText>Allowed Types</HeaderText>
			{
				[ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead ].map((t, n) => (
					<Toggle key={n} label={t} value={data.allowedTypes.includes(t)} onChange={value => toggleAllowedType(t, value)} />
				))
			}
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
			<HeaderText>Select</HeaderText>
			<Segmented
				block={true}
				options={[
					{ value: 'build', label: 'At build time' },
					{ value: 'respite', label: 'During a respite' },
					{ value: 'play', label: 'In play' }
				]}
				value={data.selectAt}
				onChange={setSelectAt}
			/>
			<HeaderText>Default Selection</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Selection'
				allowClear={true}
				mode='tags'
				options={sortedLanguages.map(option => ({ value: option.name }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.selected}
				onChange={setLanguageSelected}
			/>
		</Space>
	);
};

interface ConfigProps {
	data: FeatureLanguageChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureLanguageChoiceData) => void;
}

export const ConfigLanguageChoice = (props: ConfigProps) => {
	const [ languageSelectorOpen, setLanguageSelectorOpen ] = useState<boolean>(false);

	const currentLanguages = HeroLogic.getLanguages(props.hero, props.sourcebooks).map(l => l.name);
	const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[])
		.filter(l => !currentLanguages.includes(l.name))
		.filter(l => props.data.allowedTypes.includes(l.type));
	const distinctLanguages = Collections.distinct(languages, l => l.name);
	const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.data.selected.map((language, n) => {
					const lang = SourcebookLogic.getLanguage(language, props.sourcebooks!);
					return (
						<SelectionBox
							key={n}
							content={
								lang ?
									<Field label={lang.name} value={lang.description} style={{ flex: '1 1 0' }} />
									:
									<div className='ds-text' style={{ flex: '1 1 0' }}>{language}</div>
							}
							onRemove={() => {
								const dataCopy = Utils.copy(props.data);
								dataCopy.selected = dataCopy.selected.filter(l => l !== language);
								props.setData(dataCopy);
							}}
						/>
					);
				})
			}
			{
				(props.data.selected.length < props.data.count) || (props.data.count === -1) ?
					<Button className='status-warning' block={true} onClick={() => setLanguageSelectorOpen(true)}>
						Choose a language
					</Button>
					: null
			}
			<Drawer open={languageSelectorOpen} onClose={() => setLanguageSelectorOpen(false)} closeIcon={null} size={500}>
				<LanguageSelectModal
					languages={sortedLanguages}
					onSelect={l => {
						setLanguageSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(l.name);
						props.setData(dataCopy);
					}}
					onClose={() => setLanguageSelectorOpen(false)}
				/>
			</Drawer>
		</Space>
	);
};
