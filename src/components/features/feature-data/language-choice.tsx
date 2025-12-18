import { Button, Drawer, Flex, Select, Space } from 'antd';
import { Feature, FeatureLanguageChoiceData } from '@/models/feature';
import { CloseOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { LanguageSelectModal } from '@/components/modals/select/language-select/language-select-modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureLanguageChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoLanguageChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Field label='Language' value={props.data.selected.join(', ')} />
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'languages' : 'language'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureLanguageChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
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

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
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
				status={data.options.length === 0 ? 'warning' : ''}
				placeholder='Options'
				mode='multiple'
				allowClear={true}
				options={SourcebookLogic.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
				optionRender={option => <Field label={option.data.value} value={option.data.description} />}
				value={data.options}
				onChange={setLanguageOptions}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
			<HeaderText>Default Selection</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Selection'
				allowClear={true}
				mode='multiple'
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
	options: Options;
	setData: (data: FeatureLanguageChoiceData) => void;
}

export const ConfigLanguageChoice = (props: ConfigProps) => {
	const [ languageSelectorOpen, setLanguageSelectorOpen ] = useState<boolean>(false);

	const currentLanguages = HeroLogic.getLanguages(props.hero, props.sourcebooks).map(l => l.name);
	const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[])
		.filter(l => !currentLanguages.includes(l.name));
	const distinctLanguages = Collections.distinct(languages, l => l.name);
	const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

	const getAddButton = () => {
		// We can always add a custom language, so we always show the Add button
		return (
			<Button className='status-warning' block={true} onClick={() => setLanguageSelectorOpen(true)}>
				Choose a language
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map((language, n) => {
					const lang = SourcebookLogic.getLanguage(language, props.sourcebooks!);
					return (
						<Flex key={n} className='selection-box' align='center' gap={10}>
							{
								lang ?
									<Field label={lang.name} value={lang.description} style={{ flex: '1 1 0' }} />
									:
									<div className='ds-text' style={{ flex: '1 1 0' }}>{language}</div>
							}
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(props.data);
										dataCopy.selected = dataCopy.selected.filter(l => l !== language);
										props.setData(dataCopy);
									}}
								/>
							</Flex>
						</Flex>
					);
				})
			}
			{(props.data.selected.length < props.data.count) || (props.data.count === -1) ? getAddButton() : null}
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
