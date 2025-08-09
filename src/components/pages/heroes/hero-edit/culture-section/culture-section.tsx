import { Button, Drawer, Flex, Space } from 'antd';
import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '../../../../../data/culture-data';
import { FeatureData, FeatureLanguageChoiceData } from '../../../../../models/feature';
import { ReactNode, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Collections } from '../../../../../utils/collections';
import { Culture } from '../../../../../models/culture';
import { CulturePanel } from '../../../../panels/elements/culture-panel/culture-panel';
import { Element } from '../../../../../models/element';
import { EmptyMessage } from '../empty-message/empty-message';
import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../../logic/factory-logic';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureLogic } from '../../../../../logic/feature-logic';
import { FeatureSelectModal } from '../../../../modals/select/feature-select/feature-select-modal';
import { Field } from '../../../../controls/field/field';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Options } from '../../../../../models/options';
import { PanelMode } from '../../../../../enums/panel-mode';
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
	const [ showEnvironment, setShowEnvironment ] = useState<boolean>(false);
	const [ showOrganization, setShowOrganization ] = useState<boolean>(false);
	const [ showUpbringing, setShowUpbringing ] = useState<boolean>(false);

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
							{
								props.hero.culture.environment ?
									<Flex className='selection-box' align='center' gap={10}>
										<Field
											style={{ flex: '1 1 0' }}
											label={props.hero.culture.environment.name}
											value={<Markdown text={props.hero.culture.environment.description} useSpan={true} />}
										/>
										<Flex vertical={true}>
											<Button
												style={{ flex: '0 0 auto' }}
												type='text'
												title='Remove'
												icon={<CloseOutlined />}
												onClick={() => props.selectEnvironment(null)}
											/>
										</Flex>
									</Flex>
									:
									<Button block={true} className='status-warning' onClick={() => setShowEnvironment(true)}>
										Choose environment
									</Button>
							}
							{
								props.hero.culture.organization ?
									<Flex className='selection-box' align='center' gap={10}>
										<Field
											style={{ flex: '1 1 0' }}
											label={props.hero.culture.organization.name}
											value={<Markdown text={props.hero.culture.organization.description} useSpan={true} />}
										/>
										<Flex vertical={true}>
											<Button
												style={{ flex: '0 0 auto' }}
												type='text'
												title='Remove'
												icon={<CloseOutlined />}
												onClick={() => props.selectOrganization(null)}
											/>
										</Flex>
									</Flex>
									:
									<Button block={true} className='status-warning' onClick={() => setShowOrganization(true)}>
										Choose organization
									</Button>
							}
							{
								props.hero.culture.upbringing ?
									<Flex className='selection-box' align='center' gap={10}>
										<Field
											style={{ flex: '1 1 0' }}
											label={props.hero.culture.upbringing.name}
											value={<Markdown text={props.hero.culture.upbringing.description} useSpan={true} />}
										/>
										<Flex vertical={true}>
											<Button
												style={{ flex: '0 0 auto' }}
												type='text'
												title='Remove'
												icon={<CloseOutlined />}
												onClick={() => props.selectUpbringing(null)}
											/>
										</Flex>
									</Flex>
									:
									<Button block={true} className='status-warning' onClick={() => setShowUpbringing(true)}>
										Choose upbringing
									</Button>
							}
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
			<ErrorBoundary>
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
				<Drawer open={showEnvironment} onClose={() => setShowEnvironment(false)} closeIcon={null} width='500px'>
					<FeatureSelectModal
						features={EnvironmentData.getEnvironments().map(f => ({ feature: f, value: 1 }))}
						options={props.options}
						onSelect={f => {
							setShowEnvironment(false);
							props.selectEnvironment(f.id);
						}}
						onClose={() => setShowEnvironment(false)}
					/>
				</Drawer>
				<Drawer open={showOrganization} onClose={() => setShowOrganization(false)} closeIcon={null} width='500px'>
					<FeatureSelectModal
						features={OrganizationData.getOrganizations().map(f => ({ feature: f, value: 1 }))}
						options={props.options}
						onSelect={f => {
							setShowOrganization(false);
							props.selectOrganization(f.id);
						}}
						onClose={() => setShowOrganization(false)}
					/>
				</Drawer>
				<Drawer open={showUpbringing} onClose={() => setShowUpbringing(false)} closeIcon={null} width='500px'>
					<FeatureSelectModal
						features={UpbringingData.getUpbringings().map(f => ({ feature: f, value: 1 }))}
						options={props.options}
						onSelect={f => {
							setShowUpbringing(false);
							props.selectUpbringing(f.id);
						}}
						onClose={() => setShowUpbringing(false)}
					/>
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
