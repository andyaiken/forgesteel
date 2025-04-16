import { Button, Popover } from 'antd';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CounterRunPanel } from '../../../panels/run/counter-run/counter-run-panel';
import { Empty } from '../../../controls/empty/empty';
import { EncounterRunPanel } from '../../../panels/run/encounter-run/encounter-run-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../models/hero';
import { MontageRunPanel } from '../../../panels/run/montage-run/montage-run-panel';
import { NegotiationRunPanel } from '../../../panels/run/negotiation-run/negotiation-run-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Playbook } from '../../../../models/playbook';
import { SettingOutlined } from '@ant-design/icons';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';

import './session-player-page.scss';

interface Props {
	session: Playbook;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
	setOptions: (options: Options) => void;
}

export const SessionPlayerPage = (props: Props) => {
	try {
		const getContent = () => {
			const encounter = props.session.encounters.find(e => e.id === props.session.playerViewID);
			if (encounter) {
				return (
					<EncounterRunPanel
						encounter={encounter}
						sourcebooks={props.sourcebooks}
						heroes={props.heroes}
						options={props.options}
						onChange={() => null}
					/>
				);
			}

			const montage = props.session.montages.find(m => m.id === props.session.playerViewID);
			if (montage) {
				return (
					<MontageRunPanel
						montage={montage}
						onChange={() => null}
					/>
				);
			}

			const negotiation = props.session.negotiations.find(n => n.id === props.session.playerViewID);
			if (negotiation) {
				return (
					<NegotiationRunPanel
						negotiation={negotiation}
						onChange={() => null}
					/>
				);
			}

			const map = props.session.tacticalMaps.find(tm => tm.id === props.session.playerViewID);
			if (map) {
				return (
					<TacticalMapPanel
						key={JSON.stringify(map)}
						map={map}
						display={TacticalMapDisplayType.Player}
						options={props.options}
						heroes={props.heroes}
						encounters={props.session.encounters}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
					/>
				);
			}

			const counter = props.session.counters.find(c => c.id === props.session.playerViewID);
			if (counter) {
				return (
					<CounterRunPanel
						counter={counter}
						onChange={() => null}
					/>
				);
			}

			return <Empty text='Your director is not currently sharing anything with you.' />;
		};

		return (
			<ErrorBoundary>
				<div className='session-player-page'>
					<AppHeader subheader='Forge Steel' showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules}>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='player' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
							</Button>
						</Popover>
					</AppHeader>
					<div className='session-page-content'>
						{getContent()}
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
