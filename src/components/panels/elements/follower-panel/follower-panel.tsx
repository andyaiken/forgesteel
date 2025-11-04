import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Follower } from '@/models/follower';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { PanelMode } from '@/enums/panel-mode';
import { StatsRow } from '@/components/panels/stats-row/stats-row';

import './follower-panel.scss';

interface Props {
	follower: Follower;
	mode?: PanelMode;
}

export const FollowerPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'follower-panel' : 'follower-panel compact'} id={props.mode === PanelMode.Full ? props.follower.id : undefined}>
				<HeaderText
					level={1}
					tags={[ props.follower.type ]}
				>
					{props.follower.name || 'Unnamed Follower'}
				</HeaderText>
				<Markdown text={props.follower.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<StatsRow>
								{props.follower.characteristics.map(ch => <Field key={ch.characteristic} orientation='vertical' label={ch.characteristic} value={ch.value} />)}
							</StatsRow>
							<Field label='Skills' value={props.follower.skills.sort().join(', ') || '(none)'} />
							<Field label='Languages' value={[ 'Caelian', ...props.follower.languages ].sort().join(', ') || '(none)'} />
						</>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
