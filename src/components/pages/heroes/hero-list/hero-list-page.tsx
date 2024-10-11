import { Button, Upload } from 'antd';
import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
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
	importHero: (hero: Hero) => void;
	viewHero: (heroID: string) => void;
}

export const HeroListPage = (props: Props) => {
	try {
		return (
			<div className='hero-list-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
					<Button type='primary' icon={<PlusCircleOutlined />} onClick={props.addHero}>
						Create A New Hero
					</Button>
					<Upload
						style={{ width: '100%' }}
						accept='.drawsteel-hero'
						showUploadList={false}
						beforeUpload={file => {
							file
								.text()
								.then(json => {
									const hero = (JSON.parse(json) as Hero);
									props.importHero(hero);
								});
							return false;
						}}
					>
						<Button block={true} icon={<DownloadOutlined />}>Import a Hero</Button>
					</Upload>
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
