import { Ancestry } from '../../../../models/ancestry';
import { AncestryData } from '../../../../data/ancestry-data';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Career } from '../../../../models/career';
import { CareerData } from '../../../../data/career-data';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { ClassData } from '../../../../data/class-data';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationData } from '../../../../data/complication-data';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CultureData } from '../../../../data/culture-data';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Kit } from '../../../../models/kit';
import { KitData } from '../../../../data/kit-data';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';

import './sourcebook-list.scss';

interface Props {
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	viewAncestry: (ancestry: Ancestry) => void;
	viewCulture: (cultiure: Culture) => void;
	viewCareer: (career: Career) => void;
	viewClass: (heroClass: HeroClass) => void;
	viewKit: (kit: Kit) => void;
	viewComplication: (complication: Complication) => void;
}

export const SourcebookListPage = (props: Props) => {
	try {
		return (
			<div className='sourcebook-list-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout} />
				<div className='sourcebook-list-page-content'>
					<div>
						<HeaderText level={1}>Ancestries</HeaderText>
						{
							AncestryData.getAncestries(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										AncestryData.getAncestries(props.campaignSettings).map(a => (
											<div key={a.id}>
												<SelectablePanel onSelect={() => props.viewAncestry(a)}>
													<AncestryPanel key={a.id} ancestry={a} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					<div>
						<HeaderText level={1}>Cultures</HeaderText>
						{
							CultureData.getCultures(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										CultureData.getCultures(props.campaignSettings).map(c => (
											<div key={c.id}>
												<SelectablePanel onSelect={() => props.viewCulture(c)}>
													<CulturePanel key={c.id} culture={c} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					<div>
						<HeaderText level={1}>Careers</HeaderText>
						{
							CareerData.getCareers(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										CareerData.getCareers(props.campaignSettings).map(c => (
											<div key={c.id}>
												<SelectablePanel onSelect={() => props.viewCareer(c)}>
													<CareerPanel key={c.id} career={c} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					<div>
						<HeaderText level={1}>Classes</HeaderText>
						{
							ClassData.getClasses(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										ClassData.getClasses(props.campaignSettings).map(c => (
											<div key={c.id}>
												<SelectablePanel onSelect={() => props.viewClass(c)}>
													<ClassPanel key={c.id} heroClass={c} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					<div>
						<HeaderText level={1}>Kits</HeaderText>
						{
							KitData.getKits(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										KitData.getKits(props.campaignSettings).map(k => (
											<div key={k.id}>
												<SelectablePanel onSelect={() => props.viewKit(k)}>
													<KitPanel key={k.id} kit={k} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					<div>
						<HeaderText level={1}>Complications</HeaderText>
						{
							ComplicationData.getComplications(props.campaignSettings).length > 0 ?
								<div className='sourcebook-section-row'>
									{
										ComplicationData.getComplications(props.campaignSettings).map(c => (
											<div key={c.id}>
												<SelectablePanel onSelect={() => props.viewComplication(c)}>
													<ComplicationPanel key={c.id} complication={c} />
												</SelectablePanel>
											</div>
										))
									}
								</div>
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
