import { Button, Divider, Input, Radio, Segmented, Select, Space } from 'antd';
import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { Feature, FeatureBonusData, FeatureData, FeatureLanguageData, FeatureSkillData } from '../../../../models/feature';
import { ReactNode, useState } from 'react';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryData } from '../../../../data/ancestry-data';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Career } from '../../../../models/career';
import { CareerData } from '../../../../data/career-data';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassData } from '../../../../data/class-data';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationData } from '../../../../data/complication-data';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { FeatureField } from '../../../../enums/feature-field';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeaturePanel } from '../../../panels/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { HeroLogic } from '../../../../logic/hero-logic';
import { LanguageData } from '../../../../data/language-data';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { ThunderboltOutlined } from '@ant-design/icons';

import './hero-edit-page.scss';

enum Page {
	Ancestry = 'Ancestry',
	Culture = 'Culture',
	Career = 'Career',
	Class = 'Class',
	Complication = 'Complication',
	Details = 'Details'
}

enum PageState {
	Optional = 'Optional',
	NotStarted = 'Not Started',
	InProgress = 'In Progress',
	Completed = 'Completed'
}

interface Props {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	saveChanges: (hero: Hero) => void;
	cancelChanges: () => void;
}

export const HeroEditPage = (props: Props) => {
	const [ page, setPage ] = useState<Page>(Page.Ancestry);
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)) as Hero);
	const [ dirty, setDirty ] = useState<boolean>(false);

	try {
		const getPageState = (page: Page) => {
			switch (page) {
				case Page.Ancestry:
					if (hero.ancestry) {
						const features = hero.ancestry.features;
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case Page.Culture:
					if (hero.culture) {
						if (hero.culture.languages.length === 0) {
							return PageState.InProgress;
						}
						if (!hero.culture.environment || !hero.culture.organization || !hero.culture.upbringing) {
							return PageState.InProgress;
						}
						const features: Feature[] = [];
						if (hero.culture.environment) {
							features.push(hero.culture.environment);
						}
						if (hero.culture.organization) {
							features.push(hero.culture.organization);
						}
						if (hero.culture.upbringing) {
							features.push(hero.culture.upbringing);
						}
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case Page.Career:
					if (hero.career) {
						const features = hero.career.features;
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case Page.Class:
					if (hero.class) {
						if (hero.class.characteristics.every(ch => ch.value === 0)) {
							return PageState.InProgress;
						}
						if (hero.class.subclasses.filter(sc => sc.selected).length < hero.class.subclassCount) {
							return PageState.InProgress;
						}
						const level = hero.class.level;
						const features: Feature[] = [];
						hero.class.featuresByLevel
							.filter(lvl => lvl.level <= level)
							.forEach(lvl => features.push(...lvl.features));
						hero.class.subclasses
							.filter(sc => sc.selected)
							.forEach(sc => {
								sc.featuresByLevel
									.filter(lvl => lvl.level <= level)
									.forEach(lvl => features.push(...lvl.features));
							});
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case Page.Complication:
					if (hero.complication) {
						const features = hero.complication.features;
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.Optional;
					}
				case Page.Details:
					if (hero.name) {
						return PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
			}
		};

		const setAncestry = (ancestry: Ancestry | null) => {
			const ancestryCopy = JSON.parse(JSON.stringify(ancestry)) as Ancestry | null;
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.ancestry = ancestryCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setCulture = (culture: Culture | null) => {
			const cultureCopy = JSON.parse(JSON.stringify(culture)) as Culture | null;
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.culture = cultureCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setLanguages = (languages: string[]) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.culture) {
				heroCopy.culture.languages = languages;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setEnvironment = (id: string | null) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.culture) {
				const env = EnvironmentData.getEnvironments().find(e => e.id === id);
				if (env) {
					const envCopy = JSON.parse(JSON.stringify(env)) as Feature;
					heroCopy.culture.environment = envCopy;
				} else {
					heroCopy.culture.environment = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setOrganization = (id: string | null) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.culture) {
				const org = OrganizationData.getOrganizations().find(o => o.id === id);
				if (org) {
					const orgCopy = JSON.parse(JSON.stringify(org)) as Feature;
					heroCopy.culture.organization = orgCopy;
				} else {
					heroCopy.culture.organization = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setUpbringing = (id: string | null) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.culture) {
				const ub = UpbringingData.getUpbringings().find(u => u.id === id);
				if (ub) {
					const ubCopy = JSON.parse(JSON.stringify(ub)) as Feature;
					heroCopy.culture.upbringing = ubCopy;
				} else {
					heroCopy.culture.upbringing = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setCareer = (career: Career | null) => {
			const careerCopy = JSON.parse(JSON.stringify(career)) as Career | null;
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.career = careerCopy;
			if (careerCopy) {
				heroCopy.state.projectPoints = 0;
				heroCopy.state.renown = 0;
				careerCopy.features.filter(f => f.type === FeatureType.Bonus).map(f => {
					const data = f.data as FeatureBonusData;
					switch (data.field) {
						case FeatureField.ProjectPoints:
							heroCopy.state.projectPoints += data.value;
							break;
						case FeatureField.Renown:
							heroCopy.state.renown += data.value;
							break;
					}
				});
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setIncitingIncident = (id: string | null) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.career) {
				heroCopy.career.incitingIncidents.selectedID = id;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setClass = (heroClass: HeroClass | null) => {
			const classCopy = JSON.parse(JSON.stringify(heroClass)) as HeroClass | null;
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.class = classCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setLevel = (level: number) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.class) {
				heroCopy.class.level = level;
				heroCopy.state.xp = HeroLogic.getMinXP(level);
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setCharacteristics = (array: { characteristic: Characteristic, value: number }[]) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.class) {
				heroCopy.class.characteristics = array;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setSubclasses = (subclassIDs: string[]) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			if (heroCopy.class) {
				heroCopy.class.subclasses.forEach(sc => sc.selected = subclassIDs.includes(sc.id));
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setComplication = (complication: Complication | null) => {
			const complicationCopy = JSON.parse(JSON.stringify(complication)) as Complication | null;
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.complication = complicationCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			const feature = HeroLogic.getFeatures(heroCopy).find(f => f.id === featureID);
			if (feature) {
				feature.data = data as FeatureSkillData | FeatureLanguageData;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setName = (value: string) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.name = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setSettingIDs = (settingIDs: string[]) => {
			const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
			heroCopy.settingIDs = settingIDs;
			setHero(heroCopy);
			setDirty(true);
		};

		const saveChanges = () => {
			props.saveChanges(hero);
			setDirty(false);
		};

		const cancelChanges = () => {
			props.cancelChanges();
		};

		const getContent = () => {
			switch (page) {
				case Page.Ancestry:
					return (
						<AncestrySection
							hero={hero}
							campaignSettings={props.campaignSettings.filter(cs => hero.settingIDs.includes(cs.id))}
							selectAncestry={setAncestry}
							setFeatureData={setFeatureData}
						/>
					);
				case Page.Culture:
					return (
						<CultureSection
							hero={hero}
							campaignSettings={props.campaignSettings.filter(cs => hero.settingIDs.includes(cs.id))}
							selectCulture={setCulture}
							selectLanguages={setLanguages}
							selectEnvironment={setEnvironment}
							selectOrganization={setOrganization}
							selectUpbringing={setUpbringing}
							setFeatureData={setFeatureData}
						/>
					);
				case Page.Career:
					return (
						<CareerSection
							hero={hero}
							campaignSettings={props.campaignSettings.filter(cs => hero.settingIDs.includes(cs.id))}
							selectCareer={setCareer}
							selectIncitingIncident={setIncitingIncident}
							setFeatureData={setFeatureData}
						/>
					);
				case Page.Class:
					return (
						<ClassSection
							hero={hero}
							campaignSettings={props.campaignSettings.filter(cs => hero.settingIDs.includes(cs.id))}
							selectClass={setClass}
							setLevel={setLevel}
							selectCharacteristics={setCharacteristics}
							selectSubclasses={setSubclasses}
							setFeatureData={setFeatureData}
						/>
					);
				case Page.Complication:
					return (
						<ComplicationSection
							hero={hero}
							campaignSettings={props.campaignSettings.filter(cs => hero.settingIDs.includes(cs.id))}
							selectComplication={setComplication}
							setFeatureData={setFeatureData}
						/>
					);
				case Page.Details:
					return (
						<DetailsSection
							hero={hero}
							campaignSettings={props.campaignSettings}
							setName={setName}
							setSettingIDs={setSettingIDs}
						/>
					);
			}
		};

		return (
			<div className='hero-edit-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
					<Button type='primary' disabled={!dirty} onClick={saveChanges}>
						Save Changes
					</Button>
					<Button onClick={cancelChanges}>
						Cancel
					</Button>
				</AppHeader>
				<div className='hero-edit-page-content'>
					<div className='page-selector'>
						<Segmented<Page>
							options={[
								Page.Ancestry,
								Page.Culture,
								Page.Career,
								Page.Class,
								Page.Complication,
								Page.Details
							].map(page => ({
								value: page,
								label: (
									<div className={`page-button ${getPageState(page).toLowerCase().replace(' ', '-')}`}>
										<div className='page-button-title'>{page}</div>
										<div className='page-button-subtitle'>{getPageState(page)}</div>
									</div>
								),
								title: page
							}))}
							block={true}
							value={page}
							onChange={setPage}
						/>
					</div>
					{getContent()}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface AncestrySectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	selectAncestry: (ancestry: Ancestry | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const AncestrySection = (props: AncestrySectionProps) => {
	try {
		const ancestries = AncestryData.getAncestries(props.campaignSettings);
		const options = ancestries.map(a => (
			<SelectablePanel key={a.id} onSelect={() => props.selectAncestry(a)}>
				<AncestryPanel ancestry={a} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.ancestry) {
			choices = FeatureLogic.getFeaturesFromAncestry(props.hero.ancestry)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} campaignSettings={props.campaignSettings} setData={props.setFeatureData} />
					</SelectablePanel>
				));
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.ancestry ?
						<div className='hero-edit-content-column' id='ancestry-selected'>
							<HeaderText>Selected</HeaderText>
							<SelectablePanel onUnselect={() => props.selectAncestry(null)}>
								<AncestryPanel ancestry={props.hero.ancestry} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						:
						<div className='hero-edit-content-column' id='ancestry-list'>
							<HeaderText>Ancestries</HeaderText>
							{options}
							{options.length === 0 ? <div className='ds-text dimmed-text centered-text'>None available</div> : null}
						</div>
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column' id='ancestry-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface CultureSectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	selectCulture: (culture: Culture | null) => void;
	selectLanguages: (languages: string[]) => void;
	selectEnvironment: (id: string | null) => void;
	selectOrganization: (id: string | null) => void;
	selectUpbringing: (id: string | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const CultureSection = (props: CultureSectionProps) => {
	try {
		const cultures = CultureData.getCultures(props.campaignSettings);
		cultures.unshift(CultureData.bespoke);
		const options = cultures.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
				<CulturePanel culture={c} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.culture) {
			choices = FeatureLogic.getFeaturesFromCulture(props.hero.culture)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} campaignSettings={props.campaignSettings} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			if (props.hero.culture.id === CultureData.bespoke.id) {
				const languages = LanguageData.getLanguages(props.campaignSettings);

				choices.unshift(
					<SelectablePanel key='bespoke'>
						<HeaderText>Bespoke Culture</HeaderText>
						<div className='ds-text'>Choose your language.</div>
						<Select
							style={{ width: '100%' }}
							className={props.hero.culture.languages.length === 0 ? 'selection-empty' : ''}
							allowClear={true}
							placeholder='Select'
							options={languages.map(l => ({ label: l.name, value: l.name, desc: l.description }))}
							optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
							value={props.hero.culture.languages.length > 0 ? props.hero.culture.languages[0] : null}
							onChange={value => props.selectLanguages(value ? [ value ] : [])}
						/>
						<div className='ds-text'>Choose your Environment, Organization, and Upbringing.</div>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Select
								style={{ width: '100%' }}
								className={props.hero.culture.environment === null ? 'selection-empty' : ''}
								allowClear={true}
								placeholder='Select'
								options={EnvironmentData.getEnvironments().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								value={props.hero.culture.environment ? props.hero.culture.environment.id : null}
								onChange={props.selectEnvironment}
							/>
							<Select
								style={{ width: '100%' }}
								className={props.hero.culture.organization === null ? 'selection-empty' : ''}
								allowClear={true}
								placeholder='Select'
								options={OrganizationData.getOrganizations().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								value={props.hero.culture.organization ? props.hero.culture.organization.id : null}
								onChange={props.selectOrganization}
							/>
							<Select
								style={{ width: '100%' }}
								className={props.hero.culture.upbringing === null ? 'selection-empty' : ''}
								allowClear={true}
								placeholder='Select'
								options={UpbringingData.getUpbringings().map(s => ({ value: s.id, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								value={props.hero.culture.upbringing ? props.hero.culture.upbringing.id : null}
								onChange={props.selectUpbringing}
							/>
						</Space>
					</SelectablePanel>
				);

			}
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.culture ?
						<div className='hero-edit-content-column' id='culture-selected'>
							<HeaderText>Selected</HeaderText>
							<SelectablePanel onUnselect={() => props.selectCulture(null)}>
								<CulturePanel culture={props.hero.culture} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						:
						<div className='hero-edit-content-column' id='culture-list'>
							<HeaderText>Cultures</HeaderText>
							{options}
							{options.length === 0 ? <div className='ds-text dimmed-text centered-text'>None available</div> : null}
						</div>
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column' id='culture-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface CareerSectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	selectCareer: (career: Career | null) => void;
	selectIncitingIncident: (id: string | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const CareerSection = (props: CareerSectionProps) => {
	try {
		const careers = CareerData.getCareers(props.campaignSettings);
		const options = careers.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectCareer(c)}>
				<CareerPanel career={c} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.career) {
			choices = FeatureLogic.getFeaturesFromCareer(props.hero.career)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} campaignSettings={props.campaignSettings} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			choices.push(
				<SelectablePanel key='inciting-incident'>
					<HeaderText>Inciting Incident</HeaderText>
					<div className='ds-text'>Choose an inciting incident.</div>
					<Select
						style={{ width: '100%' }}
						className={props.hero.career.incitingIncidents.selectedID === null ? 'selection-empty' : ''}
						allowClear={true}
						placeholder='Select'
						options={props.hero.career.incitingIncidents.options.map(s => ({ value: s.id, label: s.name, desc: s.description }))}
						optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
						value={props.hero.career.incitingIncidents.selectedID}
						onChange={props.selectIncitingIncident}
					/>
				</SelectablePanel>
			);
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.career ?
						<div className='hero-edit-content-column' id='career-selected'>
							<HeaderText>Selected</HeaderText>
							<SelectablePanel onUnselect={() => props.selectCareer(null)}>
								<CareerPanel career={props.hero.career} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						:
						<div className='hero-edit-content-column' id='career-list'>
							<HeaderText>Careers</HeaderText>
							{options}
							{options.length === 0 ? <div className='ds-text dimmed-text centered-text'>None available</div> : null}
						</div>
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column' id='career-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface ClassSectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	selectClass: (heroClass: HeroClass | null) => void;
	setLevel: (level: number) => void;
	selectCharacteristics: (array: { characteristic: Characteristic, value: number }[]) => void;
	selectSubclasses: (subclassIDs: string[]) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const ClassSection = (props: ClassSectionProps) => {
	try {
		const classes = ClassData.getClasses(props.campaignSettings);
		const options = classes.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
				<ClassPanel heroClass={c} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.class) {
			choices = FeatureLogic.getFeaturesFromClass(props.hero.class)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} campaignSettings={props.campaignSettings} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			// Choose subclass(es)
			if (props.hero.class.subclasses.length > 0) {
				choices.unshift(
					<SelectablePanel key='subclass'>
						<HeaderText>{props.hero.class.subclassName}</HeaderText>
						<div className='ds-text'>Choose {props.hero.class.subclassCount === 1 ? `a ${props.hero.class.subclassName}` : `${props.hero.class.subclassCount} ${props.hero.class.subclassName}s`}.</div>
						<Select
							style={{ width: '100%' }}
							className={props.hero.class.subclasses.filter(sc => sc.selected).length === 0 ? 'selection-empty' : ''}
							mode={props.hero.class.subclassCount === 1 ? undefined : 'multiple'}
							maxCount={props.hero.class.subclassCount === 1 ? undefined : props.hero.class.subclassCount}
							allowClear={true}
							placeholder='Select'
							options={props.hero.class.subclasses.map(s => ({ value: s.id, label: s.name, desc: s.description }))}
							optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
							value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.id)}
							onChange={props.selectSubclasses}
						/>
					</SelectablePanel>
				);
			}

			const arrays = HeroLogic.calculateCharacteristicArrays(props.hero.class.primaryCharacteristics);
			choices.unshift(
				<SelectablePanel key='characteristics'>
					<HeaderText>Characteristics</HeaderText>
					<div className='characteristic-row' style={{ margin: '5px 15px', fontWeight: 600 }}>
						<div className='characteristic-item'>MGT</div>
						<div className='characteristic-item'>AGI</div>
						<div className='characteristic-item'>RSN</div>
						<div className='characteristic-item'>INU</div>
						<div className='characteristic-item'>PRE</div>
					</div>
					<Radio.Group
						style={{ width: '100%' }}
						value={JSON.stringify(props.hero.class.characteristics)}
						onChange={e => {
							const array = JSON.parse(e.target.value) as { characteristic: Characteristic, value: number }[];
							props.selectCharacteristics(array);
						}}
					>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								arrays.map((array, n1) => (
									<Radio.Button key={n1} value={JSON.stringify(array)} style={{ width: '100%' }}>
										<div className='characteristic-row'>
											{array.map((ch, n2) => <div key={n2} className='characteristic-item'>{ch.value}</div>)}
										</div>
									</Radio.Button>
								))
							}
						</Space>
					</Radio.Group>
				</SelectablePanel>
			);

			choices.unshift(
				<SelectablePanel key='class-level'>
					<HeaderText>Level</HeaderText>
					<NumberSpin
						value={props.hero.class.level}
						min={1}
						max={10}
						onChange={value => props.setLevel(value)}
					/>
					<Field label='XP' value={props.hero.state.xp} />
				</SelectablePanel>
			);
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.class ?
						<div className='hero-edit-content-column' id='class-selected'>
							<HeaderText>Selected</HeaderText>
							<SelectablePanel onUnselect={() => props.selectClass(null)}>
								<ClassPanel heroClass={props.hero.class} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						:
						<div className='hero-edit-content-column' id='class-list'>
							<HeaderText>Classes</HeaderText>
							{options}
							{options.length === 0 ? <div className='ds-text dimmed-text centered-text'>None available</div> : null}
						</div>
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column' id='class-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface ComplicationSectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	selectComplication: (complication: Complication | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const ComplicationSection = (props: ComplicationSectionProps) => {
	try {
		const complications = ComplicationData.getComplications(props.campaignSettings);
		const options = complications.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectComplication(c)}>
				<ComplicationPanel complication={c} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.complication) {
			choices = FeatureLogic.getFeaturesFromComplication(props.hero.complication)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} campaignSettings={props.campaignSettings} setData={props.setFeatureData} />
					</SelectablePanel>
				));
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.complication ?
						<div className='hero-edit-content-column' id='complication-selected'>
							<HeaderText>Selected</HeaderText>
							<SelectablePanel onUnselect={() => props.selectComplication(null)}>
								<ComplicationPanel complication={props.hero.complication} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						:
						<div className='hero-edit-content-column' id='complication-list'>
							<HeaderText>Complications</HeaderText>
							{options}
							{options.length === 0 ? <div className='ds-text dimmed-text centered-text'>None available</div> : null}
						</div>
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column' id='complication-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface DetailsSectionProps {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	setName: (value: string) => void;
	setSettingIDs: (settingIDs: string[]) => void;
}

const DetailsSection = (props: DetailsSectionProps) => {
	try {
		const getSetting = (settingID: string) => {
			const setting = props.campaignSettings.find(cs => cs.id === settingID);
			if (setting) {
				return (
					<Field key={setting.id} label={setting.name || 'Unnamed Collection'} value={setting.defaultLanguages.join(', ') || 'None'} />
				);
			}

			return null;
		};

		return (
			<div className='hero-edit-content'>
				<div className='hero-edit-content-column' id='details-main'>
					<HeaderText>Details</HeaderText>
					<div>Name:</div>
					<Input
						className={props.hero.name === '' ? 'input-empty' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => props.setName(NameGenerator.generateName())} />}
						value={props.hero.name}
						onChange={e => props.setName(e.target.value)}
					/>
					<Divider />
					<HeaderText>Collections</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Select'
						mode='multiple'
						options={props.campaignSettings.map(cs => ({ value: cs.id, label: cs.name }))}
						optionRender={option => <div className='ds-text'>{option.data.label || 'Unnamed Collection'}</div>}
						value={props.hero.settingIDs}
						onChange={props.setSettingIDs}
					/>
					<Divider />
					<HeaderText>Default Languages</HeaderText>
					{props.hero.settingIDs.map(getSetting)}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
