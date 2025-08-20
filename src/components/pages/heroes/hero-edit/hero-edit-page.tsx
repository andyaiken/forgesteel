import { Button, Input, Segmented, Select, Space } from 'antd';
import { CloseOutlined, SaveOutlined, SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { Feature, FeatureData } from '../../../../models/feature';
import { Hero, HeroEditTab } from '../../../../models/hero';
import { useMemo, useState } from 'react';
import { Ancestry } from '../../../../models/ancestry';
import { AncestrySection } from './ancestry-section/ancestry-section';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerSection } from './career-section/career-section';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassSection } from './class-section/class-section';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationSection } from './complication-section/complication-section';
import { Culture } from '../../../../models/culture';
import { CultureSection } from './culture-section/culture-section';
import { DetailsSection } from './details-section/details-section';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { Format } from '../../../../utils/format';
import { HeroClass } from '../../../../models/class';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroUpdateLogic } from '../../../../logic/update/hero-update-logic';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { StartSection } from './start-section/start-section';
import { SubClass } from '../../../../models/subclass';
import { Utils } from '../../../../utils/utils';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './hero-edit-page.scss';

enum PageState {
	Blank = '',
	Optional = 'Optional',
	NotStarted = 'Not Started',
	InProgress = 'In Progress',
	Completed = 'Completed'
}

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showSourcebooks: () => void;
	saveChanges: (hero: Hero) => void;
	importSourcebook: (sourcebook: Sourcebook) => void;
}

export const HeroEditPage = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();
	const { heroID, page } = useParams<{ heroID: string; page: HeroEditTab }>();
	const originalHero = useMemo(() => props.heroes.find(h => h.id === heroID)!, [ heroID, props.heroes ]);
	const [ hero, setHero ] = useState<Hero>(Utils.copy(originalHero));
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const isChosen = (feature: Feature) => {
			return FeatureLogic.isChosen(feature, HeroLogic.getFormerAncestries(hero));
		};

		const getPageState = (page: HeroEditTab) => {
			switch (page) {
				case 'start':
					return PageState.Blank;
				case 'ancestry':
					if (hero.ancestry) {
						return (hero.ancestry.features.filter(f => FeatureLogic.isChoice(f)).filter(f => !isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'culture':
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
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'career':
					if (hero.career) {
						return (hero.career.features.filter(f => FeatureLogic.isChoice(f)).filter(f => !isChosen(f)).length > 0) || !hero.career.incitingIncidents.selectedID ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'class':
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
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'complication':
					if (hero.complication) {
						return (hero.complication.features.filter(f => FeatureLogic.isChoice(f)).filter(f => !isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.Optional;
					}
				case 'details':
					if (hero.name) {
						return PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
			}
		};

		const clearRedundantSelections = (hero: Hero, features: Feature[]) => {
			const sourcebooks = props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id));
			const knownLanguages = HeroLogic.getLanguages(hero, sourcebooks).map(language => language.name);
			const knownSkills = HeroLogic.getSkills(hero, sourcebooks).map(skill => skill.name);
			features.forEach(feature => {
				switch (feature.type) {
					case FeatureType.LanguageChoice:
						feature.data.selected = feature.data.selected.filter(language => !knownLanguages.includes(language));
						break;
					case FeatureType.SkillChoice:
						feature.data.selected = feature.data.selected.filter(skill => !knownSkills.includes(skill));
						break;
				};
			});
		};

		const setAncestry = (ancestry: Ancestry | null) => {
			const ancestryCopy = Utils.copy(ancestry) as Ancestry | null;
			if (ancestryCopy) {
				clearRedundantSelections(hero, ancestryCopy.features);
			}
			const heroCopy = Utils.copy(hero);
			heroCopy.ancestry = ancestryCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setCulture = (culture: Culture | null) => {
			const cultureCopy = Utils.copy(culture) as Culture | null;
			if (cultureCopy) {
				const sourcebooks = props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id));
				const knownLanguages = HeroLogic.getLanguages(hero, sourcebooks).map(language => language.name);
				cultureCopy.languages = cultureCopy.languages.filter(language => !knownLanguages.includes(language));
			}
			const heroCopy = Utils.copy(hero);
			heroCopy.culture = cultureCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setLanguages = (languages: string[]) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.culture) {
				heroCopy.culture.languages = languages;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setEnvironment = (id: string | null) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.culture) {
				const env = EnvironmentData.getEnvironments().find(e => e.id === id);
				if (env) {
					const envCopy = Utils.copy(env) as Feature;
					heroCopy.culture.environment = envCopy;
				} else {
					heroCopy.culture.environment = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setOrganization = (id: string | null) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.culture) {
				const org = OrganizationData.getOrganizations().find(o => o.id === id);
				if (org) {
					const orgCopy = Utils.copy(org) as Feature;
					heroCopy.culture.organization = orgCopy;
				} else {
					heroCopy.culture.organization = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setUpbringing = (id: string | null) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.culture) {
				const ub = UpbringingData.getUpbringings().find(u => u.id === id);
				if (ub) {
					const ubCopy = Utils.copy(ub) as Feature;
					heroCopy.culture.upbringing = ubCopy;
				} else {
					heroCopy.culture.upbringing = null;
				}
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setCareer = (career: Career | null) => {
			const careerCopy = Utils.copy(career) as Career | null;
			if (careerCopy) {
				clearRedundantSelections(hero, careerCopy.features);
			}
			const heroCopy = Utils.copy(hero);
			heroCopy.career = careerCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setIncitingIncident = (id: string | null) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.career) {
				heroCopy.career.incitingIncidents.selectedID = id;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setClass = (heroClass: HeroClass | null) => {
			const classCopy = Utils.copy(heroClass) as HeroClass | null;
			if (classCopy) {
				if (classCopy.primaryCharacteristicsOptions.length === 1) {
					classCopy.primaryCharacteristics = classCopy.primaryCharacteristicsOptions[0];
				}
				classCopy.characteristics.forEach(ch => ch.value = 0);
				clearRedundantSelections(hero, classCopy.featuresByLevel.flatMap(byLevel => byLevel.features));
			}
			const heroCopy = Utils.copy(hero);
			heroCopy.class = classCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setLevel = (level: number) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.level = level;
				heroCopy.state.xp = HeroLogic.getMinXP(level);
			}
			HeroLogic
				.getCompanions(heroCopy)
				.forEach(m => {
					if (m.retainer) {
						m.retainer.level = Math.max(m.level, level);
					}
				});
			setHero(heroCopy);
			setDirty(true);
		};

		const setPrimaryCharacteristics = (characteristics: Characteristic[]) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.primaryCharacteristics = characteristics;
				heroCopy.class.characteristics.forEach(ch => ch.value = 0);
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setCharacteristics = (array: { characteristic: Characteristic, value: number }[]) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.characteristics = array;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const addSubclass = (subclass: SubClass) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				let selected = heroCopy.class.subclasses.find(sc => sc.id === subclass.id);
				if (!selected) {
					// This is a subclass from somewhere else
					selected = Utils.copy(subclass);
					heroCopy.class.subclasses.push(selected);
				}
				selected.selected = true;
				clearRedundantSelections(hero, selected.featuresByLevel.flatMap(byLevel => byLevel.features));
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const removeSubclass = (subclassID: string) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.subclasses.filter(sc => sc.id === subclassID).forEach(sc => sc.selected = false);
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setComplication = (complication: Complication | null) => {
			const complicationCopy = Utils.copy(complication) as Complication | null;
			if (complicationCopy) {
				clearRedundantSelections(hero, complicationCopy.features);
			}
			const heroCopy = Utils.copy(hero);
			heroCopy.complication = complicationCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const heroCopy = Utils.copy(hero);
			const feature = HeroLogic.getFeatures(heroCopy)
				.map(f => f.feature)
				.find(f => f.id === featureID);
			if (feature) {
				feature.data = data;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setName = (value: string) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.name = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setPicture = (value: string | null) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.picture = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setFolder = (value: string) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.folder = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setSettingIDs = (settingIDs: string[]) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.settingIDs = settingIDs;
			setHero(heroCopy);
			setDirty(true);
		};

		const updateHeroData = () => {
			const heroCopy = Utils.copy(hero);
			HeroUpdateLogic.updateHeroData(heroCopy, props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id)));
			setHero(heroCopy);
			setDirty(true);
		};

		const saveChanges = () => {
			props.saveChanges(hero);
			setDirty(false);
		};

		const selectRandom = () => {
			switch (page) {
				case 'ancestry':
					setAncestry(Collections.draw(SourcebookLogic.getAncestries(props.sourcebooks)));
					break;
				case 'culture':
					setCulture(Collections.draw([ CultureData.bespoke, ...SourcebookLogic.getCultures(props.sourcebooks) ]));
					break;
				case 'career':
					setCareer(Collections.draw(SourcebookLogic.getCareers(props.sourcebooks)));
					break;
				case 'class':
					setClass(Collections.draw(SourcebookLogic.getClasses(props.sourcebooks)));
					break;
				case 'complication':
					setComplication(Collections.draw(SourcebookLogic.getComplications(props.sourcebooks)));
					break;
			}
		};

		const getControls = () => {
			let allowRandom = false;
			let unselect = undefined;
			switch (page) {
				case 'ancestry':
					allowRandom = !hero.ancestry;
					unselect = hero.ancestry ? () => setAncestry(null) : undefined;
					break;
				case 'culture':
					allowRandom = !hero.culture;
					unselect = hero.culture ? () => setCulture(null) : undefined;
					break;
				case 'career':
					allowRandom = !hero.career;
					unselect = hero.career ? () => setCareer(null) : undefined;
					break;
				case 'class':
					allowRandom = !hero.class;
					unselect = hero.class ? () => setClass(null) : undefined;
					break;
				case 'complication':
					allowRandom = !hero.complication;
					unselect = hero.complication ? () => setComplication(null) : undefined;
					break;
			}

			return (
				<div className='page-controls'>
					{
						isSmall ?
							<Select
								style={{ width: '100%' }}
								options={([
									'start',
									'ancestry',
									'culture',
									'career',
									'class',
									'complication',
									'details'
								] as const).map(tab => ({
									value: tab,
									label: <div className='ds-text'>{Format.capitalize(tab, '-')}</div>
								}))}
								value={page}
								onChange={value => navigation.goToHeroEdit(heroID!, value)}
							/>
							:
							<Segmented
								name='sections'
								style={{ flex: '1 1 0' }}
								options={([
									'start',
									'ancestry',
									'culture',
									'career',
									'class',
									'complication',
									'details'
								] as const).map(tab => ({
									value: tab,
									label: (
										<div className={`page-button ${getPageState(tab).toLowerCase().replace(' ', '-')}`}>
											<div className='page-button-title'>{Format.capitalize(tab, '-')}</div>
											<div className='page-button-subtitle'>{getPageState(tab)}</div>
										</div>
									)
								}))}
								block={true}
								value={page}
								onChange={value => navigation.goToHeroEdit(heroID!, value)}
							/>
					}
					<Space direction='vertical' size={4}>
						{!isSmall ? <Button disabled={!allowRandom || !!searchTerm} icon={<ThunderboltOutlined />} onClick={selectRandom}>Random</Button> : null}
						<Button disabled={!unselect} icon={<CloseOutlined />} onClick={unselect}>Unselect</Button>
					</Space>
				</div>
			);
		};

		const allowSearch = () => {
			switch (page) {
				case 'ancestry':
					return !hero.ancestry;
				case 'culture':
					return !hero.culture;
				case 'career':
					return !hero.career;
				case 'class':
					return !hero.class;
				case 'complication':
					return !hero.complication;
			}

			return false;
		};

		const getContent = () => {
			switch (page) {
				case 'start':
					return (
						<StartSection
							hero={hero}
							sourcebooks={props.sourcebooks}
							setSettingIDs={setSettingIDs}
							importSourcebook={props.importSourcebook}
						/>
					);
				case 'ancestry':
					return (
						<AncestrySection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							searchTerm={searchTerm}
							selectAncestry={setAncestry}
							setFeatureData={setFeatureData}
						/>
					);
				case 'culture':
					return (
						<CultureSection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							searchTerm={searchTerm}
							selectCulture={setCulture}
							selectLanguages={setLanguages}
							selectEnvironment={setEnvironment}
							selectOrganization={setOrganization}
							selectUpbringing={setUpbringing}
							setFeatureData={setFeatureData}
						/>
					);
				case 'career':
					return (
						<CareerSection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							searchTerm={searchTerm}
							selectCareer={setCareer}
							selectIncitingIncident={setIncitingIncident}
							setFeatureData={setFeatureData}
						/>
					);
				case 'class':
					return (
						<ClassSection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							searchTerm={searchTerm}
							selectClass={setClass}
							setLevel={setLevel}
							selectPrimaryCharacteristics={setPrimaryCharacteristics}
							selectCharacteristics={setCharacteristics}
							addSubclass={addSubclass}
							removeSubclass={removeSubclass}
							setFeatureData={setFeatureData}
						/>
					);
				case 'complication':
					return (
						<ComplicationSection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							searchTerm={searchTerm}
							selectComplication={setComplication}
							setFeatureData={setFeatureData}
						/>
					);
				case 'details':
					return (
						<DetailsSection
							hero={hero}
							allHeroes={props.heroes}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							options={props.options}
							setName={setName}
							setPicture={setPicture}
							setFolder={setFolder}
							setFeatureData={setFeatureData}
							updateHeroData={updateHeroData}
						/>
					);
			}
		};

		return (
			<ErrorBoundary>
				<div className='hero-edit-page'>
					<AppHeader subheader='Hero Builder' showDirectory={props.showDirectory}>
						<Input
							name='search'
							placeholder='Search'
							disabled={!allowSearch()}
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
						<Button icon={<SaveOutlined />} type='primary' disabled={!dirty} onClick={saveChanges}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToHeroView(heroID!)}>
							Cancel
						</Button>
					</AppHeader>
					<div className={isSmall ? 'hero-edit-page-content small' : 'hero-edit-page-content'}>
						{getControls()}
						{getContent()}
					</div>
					<AppFooter page='heroes' heroes={props.heroes} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} showSourcebooks={props.showSourcebooks} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
