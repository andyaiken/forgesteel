import { CSSProperties, useState } from 'react';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Segmented } from 'antd';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';

import './subclass-panel.scss';

interface Props {
	subclass: SubClass;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
	style?: CSSProperties;
}

export const SubclassPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const getOverview = () => {
		return (
			<Markdown text={props.subclass.description} />
		);
	};

	const getFeatures = () => {
		return (
			<div className='subclass-features-list'>
				{
					props.subclass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => {
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

	const getAbilities = () => {
		const costs = Collections.distinct(
			props.subclass.abilities
				.map(a => a.cost)
				.filter(c => c !== 'signature')
				.sort((a, b) => a - b),
			x => x
		);

		return (
			<div className='subclass-abilities-list'>
				{
					[ 'signature', ...costs ].map(cost => {
						const abilities = props.subclass.abilities.filter(a => a.cost === cost);
						if (abilities.length === 0) {
							return null;
						}
						return (
							<Expander key={cost} title={cost === 'signature' ? 'Signature Abilities' : `${cost}pt Abilities`}>
								<div className='subclass-abilities-grid'>
									{
										abilities.map(a => (
											<SelectablePanel key={a.id}>
												<AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} />
											</SelectablePanel>
										))
									}
								</div>
							</Expander>
						);
					})
				}
			</div>
		);
	};

	const getContent = () => {
		let content = null;
		switch (page) {
			case 'overview':
				content = getOverview();
				break;
			case 'features':
				content = getFeatures();
				break;
			case 'abilities':
				content = getAbilities();
				break;
		}

		return (
			<>
				<Segmented
					style={{ marginBottom: '20px' }}
					block={true}
					options={[
						{ value: 'overview', label: 'Overview' },
						{ value: 'features', label: 'Features' },
						{ value: 'abilities', label: 'Abilities' }
					]}
					value={page}
					onChange={setPage}
					onClick={e => e.stopPropagation()}
				/>
				{content}
			</>
		);
	};

	const tags = [];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getSubclassSourcebook(props.sourcebooks, props.subclass)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='subclass-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.subclass.name || 'Unnamed Subclass'}
				</HeaderText>
				<Markdown text={props.subclass.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='subclass-panel' id={SheetFormatter.getPageId('subclass', props.subclass.id)} style={props.style}>
				<HeaderText level={1} tags={tags}>
					{props.subclass.name || 'Unnamed Subclass'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
