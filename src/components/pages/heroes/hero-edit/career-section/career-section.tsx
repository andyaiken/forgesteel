import { Button, Drawer, Flex } from 'antd';
import { ReactNode, useState } from 'react';
import { Career } from '@/models/career';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { CloseOutlined } from '@ant-design/icons';
import { Element } from '@/models/element';
import { ElementSelectModal } from '@/components/modals/select/element-select/element-select-modal';
import { EmptyMessage } from '@/components/pages/heroes/hero-edit/empty-message/empty-message';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useIsSmall } from '@/hooks/use-is-small';

import './career-section.scss';

const matchElement = (element: Element, searchTerm: string) => {
	const name = element.name.toLowerCase();
	const desc = element.description.toLowerCase();
	return searchTerm
		.toLowerCase()
		.split(' ')
		.some(token => name.includes(token) || desc.includes(token));
};

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	searchTerm: string;
	selectCareer: (career: Career) => void;
	selectIncitingIncident: (value: Element | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const CareerSection = (props: Props) => {
	const isSmall = useIsSmall();
	const [ showIncitingIncidents, setShowIncitingIncidents ] = useState<boolean>(false);

	const careers = SourcebookLogic.getCareers(props.sourcebooks).map(Utils.copy).filter(c => matchElement(c, props.searchTerm));
	const options = careers.map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCareer(c)}>
			<CareerPanel career={c} options={props.options} />
		</SelectablePanel>
	));

	let choices: ReactNode[] = [];
	if (props.hero.career) {
		choices = FeatureLogic.getFeaturesFromCareer(props.hero.career, props.hero)
			.map(f => f.feature)
			.filter(f => FeatureLogic.isChoice(f))
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeatureConfigPanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
				</SelectablePanel>
			));

		choices.push(
			<SelectablePanel key='inciting-incident'>
				<HeaderText>Inciting Incident</HeaderText>
				{
					props.hero.career.incitingIncidents.selected ?
						<Flex className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={props.hero.career.incitingIncidents.selected.name}
								value={<Markdown text={props.hero.career.incitingIncidents.selected.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => props.selectIncitingIncident(null)}
								/>
							</Flex>
						</Flex>
						:
						<Button block={true} className='status-warning' onClick={() => setShowIncitingIncidents(true)}>
							Choose an inciting incident
						</Button>
				}
			</SelectablePanel>
		);
	}

	let columnClassName = 'hero-edit-content-column selected';
	if (choices.length === 0) {
		columnClassName += ' single-column';
	}

	return (
		<ErrorBoundary>
			<div className='hero-edit-content career-section'>
				{
					props.hero.career && (!isSmall || (choices.length === 0)) ?
						<div className={columnClassName} id='career-selected'>
							<SelectablePanel>
								<CareerPanel career={props.hero.career} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.career && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='career-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.career && (options.length === 0) ?
						<div className='hero-edit-content-column' id='career-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='career-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
			<Drawer open={showIncitingIncidents} onClose={() => setShowIncitingIncidents(false)} closeIcon={null} width='500px'>
				<ElementSelectModal
					elements={props.hero.career ? props.hero.career.incitingIncidents.options : []}
					onSelect={e => {
						setShowIncitingIncidents(false);
						props.selectIncitingIncident(Utils.copy(e));
					}}
					onClose={() => setShowIncitingIncidents(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
