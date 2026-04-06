import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Fixture } from '@/models/fixture';
import { FixturePanel } from '@/components/panels/elements/fixture-panel/fixture-panel';
import { Follower } from '@/models/follower';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SummoningInfo } from '@/models/summon';

import './retinue-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onSelectMonster: (hero: Hero, monster: Monster, summon?: SummoningInfo) => void;
	onSelectFollower: (hero: Hero, follower: Follower) => void;
	onSelectFixture: (fixture: Fixture) => void;
}

export const RetinuePanel = (props: Props) => {
	const useRows = props.options.compactView;

	const monsters: { monster: Monster, summon?: SummoningInfo }[] = [
		...HeroLogic.getCompanions(props.hero).map(m => ({ monster: m, summon: undefined })),
		...HeroLogic.getRetainers(props.hero).map(m => ({ monster: m, summon: undefined })),
		...HeroLogic.getSummons(props.hero).map(m => ({ monster: m.monster, summon: m.info }))
	];

	const followers = HeroLogic.getFollowers(props.hero);
	const fixtures = HeroLogic.getFixtures(props.hero);

	return (
		<ErrorBoundary>
			<div className='retinue-section'>
				{
					monsters.length > 0 ?
						<>
							<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
								{
									Collections.sort(monsters, m => m.monster.name).map(m =>
										useRows ?
											<div key={m.monster.id} className='selectable-row clickable' onClick={() => props.onSelectMonster(props.hero, m.monster, m.summon)}>
												<div>Companion: <b>{m.monster.name}</b></div>
											</div>
											:
											<SelectablePanel key={m.monster.id} onSelect={() => props.onSelectMonster(props.hero, m.monster, m.summon)}>
												<MonsterPanel monster={m.monster} summon={m.summon} sourcebooks={props.sourcebooks} options={props.options} />
											</SelectablePanel>
									)
								}
							</div>
						</>
						: null
				}
				{
					followers.length > 0 ?
						<>
							<HeaderText level={props.options.compactView ? 3 : 1}>Followers</HeaderText>
							<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
								{
									followers.map(follower =>
										useRows ?
											<div key={follower.id} className='selectable-row clickable' onClick={() => props.onSelectFollower(props.hero, follower)}>
												<div>Follower: <b>{follower.name}</b></div>
											</div>
											:
											<SelectablePanel key={follower.id} onSelect={() => props.onSelectFollower(props.hero, follower)}>
												<FollowerPanel follower={follower} />
											</SelectablePanel>
									)
								}
							</div>
						</>
						: null
				}
				{
					fixtures.length > 0 ?
						<>
							<HeaderText level={props.options.compactView ? 3 : 1}>Fixtures</HeaderText>
							<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
								{
									fixtures.map(fixture =>
										useRows ?
											<div key={fixture.id} className='selectable-row clickable' onClick={() => props.onSelectFixture(fixture)}>
												<div>Fixture: <b>{fixture.name}</b></div>
											</div>
											:
											<SelectablePanel key={fixture.id} onSelect={() => props.onSelectFixture(fixture)}>
												<FixturePanel fixture={fixture} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
											</SelectablePanel>
									)
								}
							</div>
						</>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
