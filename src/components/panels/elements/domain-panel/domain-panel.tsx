import { Domain } from '../../../../models/domain';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Space } from 'antd';

import './domain-panel.scss';

interface Props {
	domain: Domain;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const DomainPanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'domain-panel' : 'domain-panel compact'} id={props.mode === PanelMode.Full ? props.domain.id : undefined}>
					<HeaderText level={1}>{props.domain.name || 'Unnamed Domain'}</HeaderText>
					<Markdown text={props.domain.description} />
					{
						props.mode === PanelMode.Full ?
							props.domain.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
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
