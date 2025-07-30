import { Complication } from '../../../../../models/complication';
import { ComplicationPanel } from '../../../../panels/elements/complication-panel/complication-panel';
import { Element } from '../../../../../models/element';
import { EmptyMessage } from '../empty-message/empty-message';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '../../../../../models/feature';
import { FeatureLogic } from '../../../../../logic/feature-logic';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { Options } from '../../../../../models/options';
import { PanelMode } from '../../../../../enums/panel-mode';
import { ReactNode } from 'react';
import { SelectablePanel } from '../../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../../logic/sourcebook-logic';
import { useMediaQuery } from '../../../../../hooks/use-media-query';

import './complication-section.scss';

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
	selectComplication: (complication: Complication) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const ComplicationSection = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	try {
		const complications = SourcebookLogic.getComplications(props.sourcebooks).filter(c => matchElement(c, props.searchTerm));
		const options = complications.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectComplication(c)}>
				<ComplicationPanel complication={c} options={props.options} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.complication) {
			choices = FeatureLogic.getFeaturesFromComplication(props.hero.complication, props.hero)
				.map(f => f.feature)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeatureConfigPanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
					</SelectablePanel>
				));
		}

		let columnClassName = 'hero-edit-content-column selected';
		if (choices.length === 0) {
			columnClassName += ' single-column';
		}

		return (
			<div className='hero-edit-content complication-section'>
				{
					props.hero.complication && (!isSmall || (choices.length === 0)) ?
						<div className={columnClassName} id='complication-selected'>
							<SelectablePanel showShadow={false}>
								<ComplicationPanel complication={props.hero.complication} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.complication && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='complication-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.complication && (options.length === 0) ?
						<div className='hero-edit-content-column' id='complication-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='complication-choices'>
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
