import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';

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
	const getTags = () => {
		if (props.heroClass.type === 'master') {
			return [ 'Master Class' ];
		}

		return [];
	};

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'class-panel' : 'class-panel compact'} id={props.mode === PanelMode.Full ? props.heroClass.id : undefined}>
				<HeaderText level={1} tags={getTags()}>
					{props.heroClass.name || 'Unnamed Class'}
				</HeaderText>
				<Markdown text={props.heroClass.description} />
				{
					(props.mode === PanelMode.Full) && (props.heroClass.subclasses.length > 0) ?
						<Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} />
						: null
				}
				{
					props.mode === PanelMode.Full ?
						<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ') || props.heroClass.primaryCharacteristicsOptions.map(array => array.join(', ') || 'None').join(' or ') || 'None'} />
						: null
				}
				{
					props.mode === PanelMode.Full ?
						props.heroClass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
							<Space key={lvl.level} direction='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								<div className='features'>
									{
										...lvl.features.map(f =>
											<FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
										)
									}
								</div>
							</Space>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.heroClass.abilities.length > 0) ?
						<Space direction='vertical'>
							<HeaderText level={1}>Abilities</HeaderText>
							<div className='abilities'>
								{
									...props.heroClass.abilities.map(a =>
										<SelectablePanel key={a.id}>
											<AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} />
										</SelectablePanel>
									)
								}
							</div>
						</Space>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.heroClass.subclasses.length > 0) ?
						<Space direction='vertical'>
							<HeaderText level={1}>Subclasses</HeaderText>
							<div className='subclasses'>
								{
									...props.heroClass.subclasses
										.filter(sc => (props.heroClass.subclasses.filter(x => x.selected).length === 0) || sc.selected)
										.map(sc => <SubclassPanel key={sc.id} subclass={sc} options={props.options} hero={props.hero} mode={PanelMode.Full} />)
								}
							</div>
						</Space>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
