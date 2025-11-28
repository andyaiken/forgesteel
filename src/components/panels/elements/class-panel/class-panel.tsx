import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Segmented } from 'antd';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { useState } from 'react';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const getOverview = () => {
		return (
			<>
				<Markdown text={props.heroClass.description} />
				{
					props.heroClass.subclasses.length > 0 ?
						<Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} />
						: null
				}
				<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ') || props.heroClass.primaryCharacteristicsOptions.map(array => array.join(', ') || 'None').join(' or ') || 'None'} />
			</>
		);
	};

	const getFeatures = () => {
		return (
			<div className='class-features-list'>
				{
					props.heroClass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => {
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
									lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
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
			props.heroClass.abilities
				.map(a => a.cost)
				.filter(c => c !== 'signature')
				.sort((a, b) => a - b),
			x => x
		);

		return (
			<div className='class-abilities-list'>
				{
					[ 'signature', ...costs ].map(cost => {
						const abilities = props.heroClass.abilities.filter(a => a.cost === cost);
						if (abilities.length === 0) {
							return null;
						}
						return (
							<Expander key={cost} title={cost === 'signature' ? 'Signature Abilities' : `${cost}pt Abilities`}>
								<div className='class-abilities-grid'>
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

	const getSubclasses = () => {
		const subclasses = props.heroClass.subclasses.filter(sc => (props.heroClass.subclasses.filter(x => x.selected).length === 0) || sc.selected);

		return (
			<div className='class-subclasses-list'>
				{
					subclasses.map(sc => (
						<Expander key={sc.id} title={sc.name}>
							<SubclassPanel key={sc.id} subclass={sc} sourcebooks={props.sourcebooks} options={props.options} hero={props.hero} mode={PanelMode.Full} style={{ padding: '5px' }} />
						</Expander>
					))
				}
				{
					subclasses.length === 0 ?
						<Empty />
						: null
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
			case 'subclasses':
				content = getSubclasses();
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
						{ value: 'abilities', label: 'Abilities' },
						{ value: 'subclasses', label: 'Subclasses' }
					]}
					value={page}
					onChange={setPage}
				/>
				{content}
			</>
		);
	};

	const tags = [];
	if (props.heroClass.type === 'master') {
		tags.push('Master Class');
	}
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getClassSourcebook(props.sourcebooks, props.heroClass)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='class-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.heroClass.name || 'Unnamed Class'}
				</HeaderText>
				<Markdown text={props.heroClass.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='class-panel' id={SheetFormatter.getPageId('class', props.heroClass.id)}>
				<HeaderText level={1} tags={tags}>
					{props.heroClass.name || 'Unnamed Class'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
