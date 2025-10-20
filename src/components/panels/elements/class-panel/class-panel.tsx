import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureFlags } from '@/utils/feature-flags';
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
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { useState } from 'react';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	onSelectSubclass?: (subclass: SubClass) => void;
}

export const ClassPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getTags = () => {
		if (props.heroClass.type === 'master') {
			return [ 'Master Class' ];
		}

		return [];
	};

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
		if (isInteractive) {
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
		}

		return props.heroClass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
			<div key={lvl.level}>
				<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
				<div className='class-features-grid'>
					{
						lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
					}
				</div>
			</div>
		));
	};

	const getAbilities = () => {
		if (isInteractive) {
			return (
				<div className='class-abilities-list'>
					{
						[ 'signature', 3, 5, 7, 9, 11 ]
							.map(cost => {
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
		}

		return (
			<div className='class-abilities-grid'>
				{
					props.heroClass.abilities.map(a =>
						<SelectablePanel key={a.id}>
							<AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} />
						</SelectablePanel>
					)
				}
				{
					props.heroClass.abilities.length === 0 ?
						<Empty />
						: null
				}
			</div>
		);
	};

	const getSubclasses = () => {
		const subclasses = props.heroClass.subclasses.filter(sc => (props.heroClass.subclasses.filter(x => x.selected).length === 0) || sc.selected);

		if (isInteractive) {
			return (
				<div className='class-subclasses-list'>
					{
						subclasses.map(sc => (
							<Expander key={sc.id} title={sc.name}>
								<SubclassPanel key={sc.id} subclass={sc} options={props.options} hero={props.hero} mode={PanelMode.Full} style={{ padding: '5px' }} />
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
		}

		return (
			<div className='class-subclasses-grid'>
				{
					subclasses.map(sc => <SubclassPanel key={sc.id} subclass={sc} options={props.options} hero={props.hero} mode={PanelMode.Full} />)
				}
				{
					props.heroClass.subclasses.length === 0 ?
						<Empty />
						: null
				}
			</div>
		);
	};

	const getContent = () => {
		if (isInteractive) {
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
		}

		return (
			<>
				<Markdown text={props.heroClass.description} />
				{
					props.heroClass.subclasses.length > 0 ?
						<Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} />
						: null
				}
				<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ') || props.heroClass.primaryCharacteristicsOptions.map(array => array.join(', ') || 'None').join(' or ') || 'None'} />
				{getFeatures()}
				<HeaderText level={1}>Abilities</HeaderText>
				{getAbilities()}
				<HeaderText level={1}>Subclasses</HeaderText>
				{getSubclasses()}
			</>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='class-panel compact'>
				<HeaderText level={1} tags={getTags()}>
					{props.heroClass.name || 'Unnamed Class'}
				</HeaderText>
				<Markdown text={props.heroClass.description} />
			</div>
		);
	}

	let className = 'class-panel';
	if (isInteractive) {
		className += ' interactive';
	}

	return (
		<ErrorBoundary>
			<div className={className} id={props.mode === PanelMode.Full ? props.heroClass.id : undefined}>
				<HeaderText level={1} tags={getTags()}>
					{props.heroClass.name || 'Unnamed Class'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
