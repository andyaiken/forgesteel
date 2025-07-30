import { Ancestry } from '../../../../../models/ancestry';
import { AncestryPanel } from '../../../../panels/elements/ancestry-panel/ancestry-panel';
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

import './ancestry-section.scss';

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
	selectAncestry: (ancestry: Ancestry) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const AncestrySection = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	try {
		const ancestries = SourcebookLogic.getAncestries(props.sourcebooks).filter(a => matchElement(a, props.searchTerm));
		const options = ancestries.map(a => (
			<SelectablePanel key={a.id} onSelect={() => props.selectAncestry(a)}>
				<AncestryPanel ancestry={a} options={props.options} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.ancestry) {
			choices = FeatureLogic.getFeaturesFromAncestry(props.hero.ancestry, props.hero)
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
			<div className='hero-edit-content ancestry-section'>
				{
					props.hero.ancestry && (!isSmall || (choices.length === 0)) ?
						<div className={columnClassName} id='ancestry-selected'>
							<SelectablePanel showShadow={false}>
								<AncestryPanel ancestry={props.hero.ancestry} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.ancestry && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='ancestry-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.ancestry && (options.length === 0) ?
						<div className='hero-edit-content-column' id='ancestry-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='ancestry-choices'>
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
