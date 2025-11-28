import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { Fixture } from '@/models/fixture';
import { FixtureLabel } from '@/components/panels/monster-label/monster-label';
import { FixtureLogic } from '@/logic/fixture-logic';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';

import './fixture-panel.scss';

interface Props {
	fixture: Fixture;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const FixturePanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'fixture-panel' : 'fixture-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('fixture', props.fixture.id) : undefined}>
				<HeaderText level={1}>{props.fixture.name || 'Unnamed Fixture'}</HeaderText>
				<FixtureLabel fixture={props.fixture} />
				<Field label='Stamina' value={FixtureLogic.getStamina(props.fixture)} />
				<Field label='Size' value={FormatLogic.getSize(props.fixture.size)} />
				<Markdown text={props.fixture.description} />
				{
					props.mode === PanelMode.Full ?
						props.fixture.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
							<Space key={lvl.level} orientation='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								{...lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)}
							</Space>
						))
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
