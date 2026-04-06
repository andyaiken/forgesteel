import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { Kit } from '@/models/kit';
import { Options } from '@/models/options';
import { ProjectLogic } from '@/logic/project-logic';
import { Sourcebook } from '@/models/sourcebook';
import { Title } from '@/models/title';

import './choices-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onSelectAncestry: (ancestry: Ancestry) => void;
	onSelectCulture: (culture: Culture) => void;
	onSelectCareer: (career: Career) => void;
	onSelectClass: (heroClass: HeroClass) => void;
	onSelectComplication: (complication: Complication) => void;
	onSelectDomain: (domain: Domain) => void;
	onSelectKit: (kit: Kit) => void;
	onSelectTitle: (title: Title) => void;
	onShowState: (state: HeroModalType) => void;
}

export const ChoicesPanel = (props: Props) => {
	let incitingIncident: Element | null = null;
	if (props.hero.career) {
		incitingIncident = props.hero.career.incitingIncidents.selected;
	}

	const useRows = props.options.compactView;

	return (
		<ErrorBoundary>
			<div className={`choices-section ${useRows ? 'compact' : ''}`}>
				{
					props.hero.ancestry ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.onSelectAncestry(props.hero.ancestry!)}>
								<div>Ancestry: <b>{props.hero.ancestry.name}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.onSelectAncestry(props.hero.ancestry!)}>
								<HeaderText>Ancestry</HeaderText>
								<Field label='Ancestry' value={props.hero.ancestry.name} />
								{HeroLogic.getFormerAncestries(props.hero).map(a => <Field key={a.id} label='Former Life' value={a.name} />)}
							</div>
						:
						<div className='overview-tile'>
							<HeaderText>Ancestry</HeaderText>
							<div className='ds-text dimmed-text'>No ancestry chosen</div>
						</div>
				}
				{
					props.hero.culture ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.onSelectCulture(props.hero.culture!)}>
								<div>Culture: <b>{props.hero.culture.name}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.onSelectCulture(props.hero.culture!)}>
								<HeaderText>Culture</HeaderText>
								{props.hero.culture ? <Field label='Culture' value={props.hero.culture.name} /> : null}
								{props.hero.culture.environment ? <Field label='Environment' value={props.hero.culture.environment.name} /> : null}
								{props.hero.culture.organization ? <Field label='Organization' value={props.hero.culture.organization.name} /> : null}
								{props.hero.culture.upbringing ? <Field label='Upbringing' value={props.hero.culture.upbringing.name} /> : null}
							</div>
						:
						<div className='overview-tile'>
							<HeaderText>Culture</HeaderText>
							<div className='ds-text dimmed-text'>No culture chosen</div>
						</div>
				}
				{
					props.hero.career ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.onSelectCareer(props.hero.career!)}>
								<div>Career: <b>{props.hero.career.name}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.onSelectCareer(props.hero.career!)}>
								<HeaderText>Career</HeaderText>
								<Field label='Career' value={props.hero.career.name} />
								{incitingIncident ? <Field label='Inciting Incident' value={incitingIncident.name} /> : null}
							</div>
						:
						<div className='overview-tile'>
							<HeaderText>Career</HeaderText>
							<div className='ds-text dimmed-text'>No career chosen</div>
						</div>
				}
				{
					props.hero.class ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.onSelectClass(props.hero.class!)}>
								<div>Class: <b>{props.hero.class.name} ({[ `level ${props.hero.class.level}`, ...HeroLogic.getClassSpecialization(props.hero) ].join(' ')})</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.onSelectClass(props.hero.class!)}>
								<HeaderText>Class</HeaderText>
								<Field label='Class' value={props.hero.class.name} />
								<Field label='Level' value={props.hero.class.level} />
								{
									HeroLogic.getClassSpecialization(props.hero).length > 0 ?
										<Field label={props.hero.class.subclassName || 'Domains'} value={HeroLogic.getClassSpecialization(props.hero).join(', ')} />
										: null
								}
							</div>
						:
						<div className='overview-tile'>
							<HeaderText>Class</HeaderText>
							<div className='ds-text dimmed-text'>No class chosen</div>
						</div>
				}
				{
					HeroLogic.getDomains(props.hero).length > 0 ?
						HeroLogic.getDomains(props.hero).map(domain =>
							useRows ?
								<div key={domain.id} className='selectable-row clickable' onClick={() => props.onSelectDomain(domain)}>
									<div>Domain: <b>{domain.name}</b></div>
								</div>
								:
								<div key={domain.id} className='overview-tile clickable' onClick={() => props.onSelectDomain(domain)}>
									<HeaderText>Domain</HeaderText>
									<Field label='Domain' value={domain.name} />
								</div>
						)
						:
						null
				}
				{
					HeroLogic.getKits(props.hero).length > 0 ?
						HeroLogic.getKits(props.hero).map(kit =>
							useRows ?
								<div key={kit.id} className='selectable-row clickable' onClick={() => props.onSelectKit(kit)}>
									<div>Kit: <b>{kit.name}</b></div>
								</div>
								:
								<div key={kit.id} className='overview-tile clickable' onClick={() => props.onSelectKit(kit)}>
									<HeaderText>Kit</HeaderText>
									<Field label='Kit' value={kit.name} />
									{kit.armor.length > 0 ? <Field label='Armor' value={kit.armor.join(', ')} /> : null}
									{kit.weapon.length > 0 ? <Field label='Weapons' value={kit.weapon.join(', ')} /> : null}
								</div>
						)
						:
						null
				}
				{
					HeroLogic.getTitles(props.hero).length > 0 ?
						HeroLogic.getTitles(props.hero).map(title =>
							useRows ?
								<div key={title.id} className='selectable-row clickable' onClick={() => props.onSelectTitle(title)}>
									<div>Title: <b>{title.name}</b></div>
								</div>
								:
								<div key={title.id} className='overview-tile clickable' onClick={() => props.onSelectTitle(title)}>
									<HeaderText>Title</HeaderText>
									<Field label='Title' value={title.name} />
								</div>
						)
						:
						null
				}
				{
					props.hero.complication ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.onSelectComplication(props.hero.complication!)}>
								<div>Complication: <b>{props.hero.complication.name}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.onSelectComplication(props.hero.complication!)}>
								<HeaderText>Complication</HeaderText>
								<Field label='Complication' value={props.hero.complication.name} />
							</div>
						:
						null
				}
				{
					props.hero.state.projects.length > 0 ?
						props.hero.state.projects.map(project =>
							useRows ?
								<div key={project.id} className='selectable-row clickable' onClick={() => props.onShowState(HeroModalType.Projects)}>
									<div>Project: <b>{project.name}</b></div>
								</div>
								:
								<div key={project.id} className='overview-tile clickable' onClick={() => props.onShowState(HeroModalType.Projects)}>
									<HeaderText>Project</HeaderText>
									<Field label='Project' value={project.name} />
									{project.progress ? <Field label='State' value={ProjectLogic.getStatus(project)} /> : null}
								</div>
						)
						:
						null
				}
			</div>
		</ErrorBoundary>
	);
};
