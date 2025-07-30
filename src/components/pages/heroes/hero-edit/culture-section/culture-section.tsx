import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '../../../../../data/culture-data';
import { FeatureData, FeatureLanguageChoiceData } from '../../../../../models/feature';
import { Select, Space } from 'antd';
import { Collections } from '../../../../../utils/collections';
import { Culture } from '../../../../../models/culture';
import { CulturePanel } from '../../../../panels/elements/culture-panel/culture-panel';
import { Element } from '../../../../../models/element';
import { EmptyMessage } from '../empty-message/empty-message';
import { FactoryLogic } from '../../../../../logic/factory-logic';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureLogic } from '../../../../../logic/feature-logic';
import { Field } from '../../../../controls/field/field';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { Options } from '../../../../../models/options';
import { PanelMode } from '../../../../../enums/panel-mode';
import { ReactNode } from 'react';
import { SelectablePanel } from '../../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../../logic/sourcebook-logic';
import { useMediaQuery } from '../../../../../hooks/use-media-query';

import './culture-section.scss';

const matchElement = (element: Element, searchTerm: string) => {
	const name = element.name.toLowerCase();
	const desc = element.description.toLowerCase();
	return searchTerm
		.toLowerCase()
		.split(' ')
		.some(token => name.includes(token) || desc.includes(token));
};

interface CultureSectionProps {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	searchTerm: string;
	selectCulture: (culture: Culture) => void;
	selectLanguages: (languages: string[]) => void;
	selectEnvironment: (id: string | null) => void;
	selectOrganization: (id: string | null) => void;
	selectUpbringing: (id: string | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const CultureSection = (props: CultureSectionProps) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	try {
		const cultures = [ CultureData.bespoke, ...SourcebookLogic.getCultures(props.sourcebooks) ].filter(c => matchElement(c, props.searchTerm));
		const options = cultures.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
				<CulturePanel culture={c} options={props.options} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.culture) {
			choices = FeatureLogic.getFeaturesFromCulture(props.hero.culture, props.hero)
				.map(f => f.feature)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeatureConfigPanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			if (props.hero.culture.id === CultureData.bespoke.id) {
				choices.unshift(
					<SelectablePanel key='bespoke'>
						<HeaderText>Bespoke Culture</HeaderText>
						<div className='ds-text'>Choose your Environment, Organization, and Upbringing.</div>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Select
								style={{ width: '100%' }}
								status={props.hero.culture.environment === null ? 'warning' : ''}
								allowClear={true}
								placeholder='Environment'
								options={EnvironmentData.getEnvironments().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
								value={props.hero.culture.environment ? props.hero.culture.environment.id : null}
								onChange={props.selectEnvironment}
							/>
							<Select
								style={{ width: '100%' }}
								status={props.hero.culture.organization === null ? 'warning' : ''}
								allowClear={true}
								placeholder='Organization'
								options={OrganizationData.getOrganizations().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
								value={props.hero.culture.organization ? props.hero.culture.organization.id : null}
								onChange={props.selectOrganization}
							/>
							<Select
								style={{ width: '100%' }}
								status={props.hero.culture.upbringing === null ? 'warning' : ''}
								allowClear={true}
								placeholder='Upbringing'
								options={UpbringingData.getUpbringings().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
								value={props.hero.culture.upbringing ? props.hero.culture.upbringing.id : null}
								onChange={props.selectUpbringing}
							/>
						</Space>
					</SelectablePanel>
				);
			}

			const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
			const distinctLanguages = Collections.distinct(languages, l => l.name);
			const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

			choices.unshift(
				<SelectablePanel key='language'>
					<FeatureConfigPanel
						feature={FactoryLogic.feature.createLanguageChoice({
							id: 'culture-language',
							name: 'Language',
							description: 'Choose your language.',
							options: sortedLanguages.map(l => l.name),
							selected: props.hero.culture.languages
						})}
						options={props.options}
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						setData={(_id, data) => {
							const d = data as FeatureLanguageChoiceData;
							props.selectLanguages(d.selected);
						}}
					/>
				</SelectablePanel>
			);
		}

		let columnClassName = 'hero-edit-content-column selected';
		if (choices.length === 0) {
			columnClassName += ' single-column';
		}

		return (
			<div className='hero-edit-content culture-section'>
				{
					props.hero.culture && (!isSmall || (choices.length === 0)) ?
						<div className={columnClassName} id='culture-selected'>
							<SelectablePanel showShadow={false}>
								<CulturePanel culture={props.hero.culture} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.culture && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='culture-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.culture && (options.length === 0) ?
						<div className='hero-edit-content-column' id='culture-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='culture-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
