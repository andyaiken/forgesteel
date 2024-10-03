import { AppHeader } from '../../../panels/app-header/app-header';
import { Button } from 'antd';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Hero } from '../../../../models/hero';
import { HeroPanel } from '../../../panels/hero-panel/hero-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	addHero: () => void;
	importHero: () => void;
	viewHero: (heroID: string) => void;
}

export const HeroListPage = (props: Props) => {
	try {
		return (
			<div className='hero-list-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
					<Button type='primary' onClick={props.addHero}>
						Create A New Hero
					</Button>
					<Button onClick={props.importHero}>
						Import
					</Button>
				</AppHeader>
				<div className='hero-list-page-content'>
					{
						props.heroes.map(hero => (
							<div key={hero.id}>
								<SelectablePanel onSelect={() => props.viewHero(hero.id)}>
									<HeroPanel hero={hero} campaignSettings={props.campaignSettings} />
								</SelectablePanel>
							</div>
						))
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
