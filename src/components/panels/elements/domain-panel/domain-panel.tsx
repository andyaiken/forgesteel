import { Domain } from '@/models/domain';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';

import './domain-panel.scss';

interface Props {
	domain: Domain;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const DomainPanel = (props: Props) => {
	const getFeatures = () => {
		return (
			<div className='domain-features-list'>
				{
					props.domain.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => {
						return (
							<Expander
								key={lvl.level}
								title={
									<Field
										label={`Level ${lvl.level.toString()}`}
										value={lvl.features.map(f => f.name).join(', ')}
									/>
								}
							>
								{
									...lvl.features.map(f =>
										<FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
									)
								}
							</Expander>
						);
					})
				}
			</div>
		);
	};

	const tags = [];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getDomainSourcebook(props.sourcebooks, props.domain)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='domain-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.domain.name || 'Unnamed Domain'}
				</HeaderText>
				<Markdown text={props.domain.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='domain-panel' id={SheetFormatter.getPageId('domain', props.domain.id)}>
				<HeaderText level={1} tags={tags}>
					{props.domain.name || 'Unnamed Domain'}
				</HeaderText>
				<Markdown text={props.domain.description} />
				{getFeatures()}
			</div>
		</ErrorBoundary>
	);
};
