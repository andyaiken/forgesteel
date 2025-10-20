import { CSSProperties } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureFlags } from '@/utils/feature-flags';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { SubClass } from '@/models/subclass';

import './subclass-panel.scss';

interface Props {
	subclass: SubClass;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	style?: CSSProperties;
}

export const SubclassPanel = (props: Props) => {
	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getFeatures = () => {
		if (isInteractive) {
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
		}

		return props.subclass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
			<Space key={lvl.level} direction='vertical'>
				<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
				<div className='subclass-features-grid'>
					{lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)}
				</div>
			</Space>
		));
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='subclass-panel compact'>
				<HeaderText level={1}>
					{props.subclass.name || 'Unnamed Subclass'}
				</HeaderText>
				<Markdown text={props.subclass.description} />
			</div>
		);
	}

	let className = 'subclass-panel';
	if (isInteractive) {
		className += ' interactive';
	}

	return (
		<ErrorBoundary>
			<div className={className} id={props.subclass.id} style={props.style}>
				<HeaderText level={1}>
					{props.subclass.name || 'Unnamed Subclass'}
				</HeaderText>
				<Markdown text={props.subclass.description} />
				{getFeatures()}
			</div>
		</ErrorBoundary>
	);
};
