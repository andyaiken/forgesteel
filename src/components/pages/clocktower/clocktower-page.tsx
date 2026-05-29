import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Tabs } from 'antd';

import './clocktower-page.scss';

import agentEvil from '@/assets/clocktower/clocktower-agent-evil.png';
import agentGood from '@/assets/clocktower/clocktower-agent-good.png';
import angulotlEvil from '@/assets/clocktower/clocktower-angulotl-evil.png';
import angulotlGood from '@/assets/clocktower/clocktower-angulotl-good.png';
import antiHeroEvil from '@/assets/clocktower/clocktower-antihero-evil.png';
import antiHeroGood from '@/assets/clocktower/clocktower-antihero-good.png';
import aristocratEvil from '@/assets/clocktower/clocktower-aristocrat-evil.png';
import aristocratGood from '@/assets/clocktower/clocktower-aristocrat-good.png';
import aristocratTraveller from '@/assets/clocktower/clocktower-aristocrat-traveller.png';
import aurumvasEvil from '@/assets/clocktower/clocktower-aurumvas-evil.png';
import aurumvasGood from '@/assets/clocktower/clocktower-aurumvas-good.png';
import beastHeartEvil from '@/assets/clocktower/clocktower-beastheart-evil.png';
import beastHeartGood from '@/assets/clocktower/clocktower-beastheart-good.png';
import blightPhageEvil from '@/assets/clocktower/clocktower-blightphage-evil.png';
import blightPhageGood from '@/assets/clocktower/clocktower-blightphage-good.png';
import censorEvil from '@/assets/clocktower/clocktower-censor-evil.png';
import censorGood from '@/assets/clocktower/clocktower-censor-good.png';
import conduitEvil from '@/assets/clocktower/clocktower-conduit-evil.png';
import conduitGood from '@/assets/clocktower/clocktower-conduit-good.png';
import cowardEvil from '@/assets/clocktower/clocktower-coward-evil.png';
import cowardGood from '@/assets/clocktower/clocktower-coward-good.png';
import criminalEvil from '@/assets/clocktower/clocktower-criminal-evil.png';
import criminalGood from '@/assets/clocktower/clocktower-criminal-good.png';
import criminalTraveller from '@/assets/clocktower/clocktower-criminal-traveller.png';
import devilEvil from '@/assets/clocktower/clocktower-devil-evil.png';
import devilGood from '@/assets/clocktower/clocktower-devil-good.png';
import directorEvil from '@/assets/clocktower/clocktower-director-evil.png';
import directorGood from '@/assets/clocktower/clocktower-director-good.png';
import discipleEvil from '@/assets/clocktower/clocktower-disciple-evil.png';
import discipleGood from '@/assets/clocktower/clocktower-disciple-good.png';
import discipleTraveller from '@/assets/clocktower/clocktower-disciple-traveller.png';
import disgracedEvil from '@/assets/clocktower/clocktower-disgraced-evil.png';
import disgracedGood from '@/assets/clocktower/clocktower-disgraced-good.png';
import disgracedTraveller from '@/assets/clocktower/clocktower-disgraced-traveller.png';
import duskElfEvil from '@/assets/clocktower/clocktower-duskelf-evil.png';
import duskElfGood from '@/assets/clocktower/clocktower-duskelf-good.png';
import elementalistEvil from '@/assets/clocktower/clocktower-elementalist-evil.png';
import elementalistGood from '@/assets/clocktower/clocktower-elementalist-good.png';
import furyEvil from '@/assets/clocktower/clocktower-fury-evil.png';
import furyGood from '@/assets/clocktower/clocktower-fury-good.png';
import hiveQueenEvil from '@/assets/clocktower/clocktower-hivequeen-evil.png';
import hiveQueenGood from '@/assets/clocktower/clocktower-hivequeen-good.png';
import lightbenderEvil from '@/assets/clocktower/clocktower-lightbender-evil.png';
import lightbenderGood from '@/assets/clocktower/clocktower-lightbender-good.png';
import memonekEvil from '@/assets/clocktower/clocktower-memonek-evil.png';
import memonekGood from '@/assets/clocktower/clocktower-memonek-good.png';
import nullEvil from '@/assets/clocktower/clocktower-null-evil.png';
import nullGood from '@/assets/clocktower/clocktower-null-good.png';
import polderEvil from '@/assets/clocktower/clocktower-polder-evil.png';
import polderGood from '@/assets/clocktower/clocktower-polder-good.png';
import polderTraveller from '@/assets/clocktower/clocktower-polder-traveller.png';
import revenantEvil from '@/assets/clocktower/clocktower-revenant-evil.png';
import revenantGood from '@/assets/clocktower/clocktower-revenant-good.png';
import rivalEvil from '@/assets/clocktower/clocktower-rival-evil.png';
import rivalGood from '@/assets/clocktower/clocktower-rival-good.png';
import shadowEvil from '@/assets/clocktower/clocktower-shadow-evil.png';
import shadowGood from '@/assets/clocktower/clocktower-shadow-good.png';
import tacticianEvil from '@/assets/clocktower/clocktower-tactician-evil.png';
import tacticianGood from '@/assets/clocktower/clocktower-tactician-good.png';
import talentEvil from '@/assets/clocktower/clocktower-talent-evil.png';
import talentGood from '@/assets/clocktower/clocktower-talent-good.png';
import torlasEvil from '@/assets/clocktower/clocktower-torlas-evil.png';
import torlasGood from '@/assets/clocktower/clocktower-torlas-good.png';
import troubadourEvil from '@/assets/clocktower/clocktower-troubadour-evil.png';
import troubadourGood from '@/assets/clocktower/clocktower-troubadour-good.png';
import voicelessTalkerEvil from '@/assets/clocktower/clocktower-voicelesstalker-evil.png';
import voicelessTalkerGood from '@/assets/clocktower/clocktower-voicelesstalker-good.png';
import voicelessTalkerTraveller from '@/assets/clocktower/clocktower-voicelesstalker-traveller.png';

interface Props {
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader>
					<img className='image' src={agentGood} />
					<img className='image' src={agentEvil} />
					<img className='image' src={beastHeartGood} />
					<img className='image' src={beastHeartEvil} />
					<img className='image' src={censorGood} />
					<img className='image' src={censorEvil} />
					<img className='image' src={conduitGood} />
					<img className='image' src={conduitEvil} />
					<img className='image' src={directorGood} />
					<img className='image' src={directorEvil} />
					<img className='image' src={elementalistGood} />
					<img className='image' src={elementalistEvil} />
					<img className='image' src={furyGood} />
					<img className='image' src={furyEvil} />
					<img className='image' src={nullGood} />
					<img className='image' src={nullEvil} />
					<img className='image' src={revenantGood} />
					<img className='image' src={revenantEvil} />
					<img className='image' src={shadowGood} />
					<img className='image' src={shadowEvil} />
					<img className='image' src={tacticianGood} />
					<img className='image' src={tacticianEvil} />
					<img className='image' src={talentGood} />
					<img className='image' src={talentEvil} />
					<img className='image' src={troubadourGood} />
					<img className='image' src={troubadourEvil} />
					<img className='image' src={antiHeroGood} />
					<img className='image' src={antiHeroEvil} />
					<img className='image' src={cowardGood} />
					<img className='image' src={cowardEvil} />
					<img className='image' src={devilGood} />
					<img className='image' src={devilEvil} />
					<img className='image' src={memonekGood} />
					<img className='image' src={memonekEvil} />
					<img className='image' src={angulotlEvil} />
					<img className='image' src={angulotlGood} />
					<img className='image' src={duskElfEvil} />
					<img className='image' src={duskElfGood} />
					<img className='image' src={lightbenderEvil} />
					<img className='image' src={lightbenderGood} />
					<img className='image' src={rivalEvil} />
					<img className='image' src={rivalGood} />
					<img className='image' src={aurumvasEvil} />
					<img className='image' src={aurumvasGood} />
					<img className='image' src={blightPhageEvil} />
					<img className='image' src={blightPhageGood} />
					<img className='image' src={hiveQueenEvil} />
					<img className='image' src={hiveQueenGood} />
					<img className='image' src={torlasEvil} />
					<img className='image' src={torlasGood} />
					<img className='image' src={aristocratTraveller} />
					<img className='image' src={aristocratGood} />
					<img className='image' src={aristocratEvil} />
					<img className='image' src={criminalTraveller} />
					<img className='image' src={criminalGood} />
					<img className='image' src={criminalEvil} />
					<img className='image' src={discipleTraveller} />
					<img className='image' src={discipleGood} />
					<img className='image' src={discipleEvil} />
					<img className='image' src={disgracedTraveller} />
					<img className='image' src={disgracedGood} />
					<img className='image' src={disgracedEvil} />
					<img className='image' src={polderTraveller} />
					<img className='image' src={polderGood} />
					<img className='image' src={polderEvil} />
					<img className='image' src={voicelessTalkerTraveller} />
					<img className='image' src={voicelessTalkerGood} />
					<img className='image' src={voicelessTalkerEvil} />
				</AppHeader>
				<div className='clocktower-page-content'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Full Script',
								children: (
									<ClocktowerScriptPanel script={ClocktowerData.standard} />
								)
							},
							{
								key: '2',
								label: 'Teensyville',
								children: (
									<ClocktowerScriptPanel script={ClocktowerData.teensy} />
								)
							}
						]}
					/>
				</div>
				<AppFooter
					page='welcome'
					params={props.params}
				/>
			</div>
		</ErrorBoundary>
	);
};
