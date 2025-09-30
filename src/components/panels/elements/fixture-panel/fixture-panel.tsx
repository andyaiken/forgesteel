import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Fixture } from '@/models/fixture';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
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
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'fixture-panel' : 'fixture-panel compact'} id={props.mode === PanelMode.Full ? props.fixture.id : undefined}>
					<HeaderText level={1}>{props.fixture.name || 'Unnamed Fixture'}</HeaderText>
					<Markdown text={props.fixture.description} />
					// Stamina, size, role
					{
						props.mode === PanelMode.Full ?
							props.fixture.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
								<Space key={lvl.level} direction='vertical'>
									<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
									{...lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)}
								</Space>
							))
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
