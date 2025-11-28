import { Button, Divider, Drawer, Flex, Input, Space } from 'antd';
import { CloseOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { ReactNode, useState } from 'react';
import { Culture } from '@/models/culture';
import { CulturePanel } from '@/components/panels/elements/culture-panel/culture-panel';
import { CultureType } from '@/enums/culture-type';
import { Element } from '@/models/element';
import { EmptyMessage } from '@/components/pages/heroes/hero-edit/empty-message/empty-message';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureSelectModal } from '@/components/modals/select/feature-select/feature-select-modal';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useIsSmall } from '@/hooks/use-is-small';

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
	selectEnvironment: (id: string | null) => void;
	selectOrganization: (id: string | null) => void;
	selectUpbringing: (id: string | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const CultureSection = (props: CultureSectionProps) => {
	const isSmall = useIsSmall();
	const [ showEnvironment, setShowEnvironment ] = useState<boolean>(false);
	const [ showOrganization, setShowOrganization ] = useState<boolean>(false);
	const [ showUpbringing, setShowUpbringing ] = useState<boolean>(false);

	const setName = (value: string) => {
		const copy = Utils.copy(props.hero.culture)!;
		copy.name = value;
		props.selectCulture(copy);
	};

	const cultures = [ CultureData.bespoke, ...SourcebookLogic.getCultures(props.sourcebooks, true) ]
		.map(Utils.copy)
		.filter(c => matchElement(c, props.searchTerm));
	const optionsYourAncestry = cultures.filter(c => c.id === (props.hero.ancestry?.culture?.id || '')).map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} sourcebooks={props.sourcebooks} options={props.options} />
		</SelectablePanel>
	));
	const optionsAncestral = cultures.filter(c => c.type === CultureType.Ancestral).map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} sourcebooks={props.sourcebooks} options={props.options} />
		</SelectablePanel>
	));
	const optionsProfessional = cultures.filter(c => c.type === CultureType.Professional).map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} sourcebooks={props.sourcebooks} options={props.options} />
		</SelectablePanel>
	));
	const optionsBespoke = cultures.filter(c => c.type === CultureType.Bespoke).map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} sourcebooks={props.sourcebooks} options={props.options} />
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
					<div className='ds-text'>Choose a name for your culture.</div>
					<Space.Compact style={{ width: '100%' }}>
						<Input
							status={props.hero.culture.name === '' ? 'warning' : ''}
							placeholder='Name'
							allowClear={true}
							value={props.hero.culture.name}
							onChange={e => setName(e.target.value)}
						/>
						<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
					</Space.Compact>
					<Divider />
					<div className='ds-text'>Choose your Environment, Organization, and Upbringing.</div>
					<Space orientation='vertical' style={{ width: '100%' }}>
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
							<SelectablePanel>
								<CulturePanel culture={props.hero.culture} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.culture && ([ ...optionsAncestral, ...optionsProfessional, ...optionsBespoke ].length > 0) ?
						<div className='hero-edit-content-column list' id='culture-list'>
							{
								optionsYourAncestry.length > 0 ?
									<>
										<HeaderText level={1}>Your Ancestry</HeaderText>
										<div className='grid'>
											{optionsYourAncestry}
										</div>
									</>
									: null
							}
							{
								optionsAncestral.length > 0 ?
									<>
										<HeaderText level={1}>Ancestral Cultures</HeaderText>
										<div className='grid'>
											{optionsAncestral}
										</div>
									</>
									: null
							}
							{
								optionsProfessional.length > 0 ?
									<>
										<HeaderText level={1}>Professional Cultures</HeaderText>
										<div className='grid'>
											{optionsProfessional}
										</div>
									</>
									: null
							}
							<HeaderText level={1}>Bespoke Cultures</HeaderText>
							<div className='grid'>
								{optionsBespoke}
							</div>
						</div>
						: null
				}
				{
					!props.hero.culture && ([ ...optionsAncestral, ...optionsProfessional, ...optionsBespoke ].length === 0) ?
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
			<Drawer open={showEnvironment} onClose={() => setShowEnvironment(false)} closeIcon={null} size={500}>
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
			<Drawer open={showOrganization} onClose={() => setShowOrganization(false)} closeIcon={null} size={500}>
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
			<Drawer open={showUpbringing} onClose={() => setShowUpbringing(false)} closeIcon={null} size={500}>
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
};
