import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';

import './sourcebook-list.scss';

interface Props {
	sourcebook: Sourcebook;
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
							props.sourcebook.ancestries.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.ancestries.map(a => (
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
							props.sourcebook.cultures.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.cultures.map(c => (
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
							props.sourcebook.careers.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.careers.map(c => (
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
							props.sourcebook.classes.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.classes.map(c => (
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
							props.sourcebook.kits.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.kits.map(k => (
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
							props.sourcebook.complications.length > 0 ?
								<div className='sourcebook-section-row'>
									{
										props.sourcebook.complications.map(c => (
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
