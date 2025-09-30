import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Follower } from '@/models/follower';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { PanelMode } from '@/enums/panel-mode';

import './follower-panel.scss';

interface Props {
	follower: Follower;
	mode?: PanelMode;
}

export const FollowerPanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'follower-panel' : 'follower-panel compact'} id={props.mode === PanelMode.Full ? props.follower.id : undefined}>
					<HeaderText
						level={1}
						tags={[ props.follower.type ]}
					>
						{props.follower.name || `Unnamed ${props.follower.type}`}
					</HeaderText>
					<Markdown text={props.follower.description} />
					{
						props.mode === PanelMode.Full ?
							<>
								<div className='stats'>
									{props.follower.characteristics.map(ch => <Field key={ch.characteristic} orientation='vertical' label={ch.characteristic} value={ch.value} />)}
								</div>
								<Field label='Skills' value={props.follower.skills.sort().join(', ') || '(none)'} />
								<Field label='Languages' value={[ 'Caelian', ...props.follower.languages ].sort().join(', ') || '(none)'} />
							</>
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
