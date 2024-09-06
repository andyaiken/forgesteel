import { Button, Divider, Flex, Segmented } from 'antd';
import { Feature, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { Ancestry } from '../../../models/ancestry';
import { AncestryData } from '../../../data/ancestry-data';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Career } from '../../../models/career';
import { CareerData } from '../../../data/career-data';
import { CareerPanel } from '../../panels/career-panel/career-panel';
import { ClassData } from '../../../data/class-data';
import { ClassPanel } from '../../panels/class-panel/class-panel';
import { Complication } from '../../../models/complication';
import { ComplicationData } from '../../../data/complication-data';
import { ComplicationPanel } from '../../panels/complication-panel/complication-panel';
import { Culture } from '../../../models/culture';
import { CulturePanel } from '../../panels/culture-panel/culture-panel';
import { FeaturePanel } from '../../panels/feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroLogic } from '../../../logic/hero-logic';
import { Kit } from '../../../models/kit';
import { KitData } from '../../../data/kit-data';
import { KitPanel } from '../../panels/kit-panel/kit-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { useState } from 'react';

import './hero-edit-page.scss';

enum Page {
	Ancestry = 'Ancestry',
	Culture = 'Culture',
	Career = 'Career',
	Class = 'Class',
	Complication = 'Complication',
	Kit = 'Kit',
	Details = 'Details'
}

interface Props {
	hero: Hero;
	saveChanges: (hero: Hero) => void;
	cancelChanges: () => void;
}

export const HeroEditPage = (props: Props) => {
	const [ page, setPage ] = useState<Page>(Page.Ancestry);
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)) as Hero);

	const setAncestry = (ancestry: Ancestry | null) => {
		const ancestryCopy = JSON.parse(JSON.stringify(ancestry)) as Ancestry | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.ancestry = ancestryCopy;
		setHero(heroCopy);
	};

	const setCulture = (culture: Culture | null) => {
		const cultureCopy = JSON.parse(JSON.stringify(culture)) as Culture | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.culture = cultureCopy;
		setHero(heroCopy);
	};

	const setCareer = (career: Career | null) => {
		const careerCopy = JSON.parse(JSON.stringify(career)) as Career | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.career = careerCopy;
		setHero(heroCopy);
	};

	const setClass = (heroClass: HeroClass | null) => {
		const classCopy = JSON.parse(JSON.stringify(heroClass)) as HeroClass | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.class = classCopy;
		setHero(heroCopy);
	};

	const setComplication = (complication: Complication | null) => {
		const complicationCopy = JSON.parse(JSON.stringify(complication)) as Complication | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.complication = complicationCopy;
		setHero(heroCopy);
	};

	const addKit = (kit: Kit) => {
		const kitCopy = JSON.parse(JSON.stringify(kit)) as Kit;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.kits.push(kitCopy);
		setHero(heroCopy);
	};

	const removeKit = (kitID: string) => {
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.kits = heroCopy.kits.filter(k => k.id !== kitID);
		setHero(heroCopy);
	};

	const setFeatureData = (featureID: string, data: unknown) => {
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		const feature = HeroLogic.getFeatures(heroCopy).find(f => f.id === featureID);
		if (feature) {
			feature.data = data as FeatureSkillData | FeatureLanguageData;
		}
		setHero(heroCopy);
	};

	const saveChanges = () => {
		props.saveChanges(hero);
	};

	const cancelChanges = () => {
		props.cancelChanges();
	};

	const getContent = () => {
		switch (page) {
			case Page.Ancestry:
				return (
					<AncestrySection hero={hero} selectAncestry={setAncestry} setFeatureData={setFeatureData} />
				);
			case Page.Culture:
				return (
					<CultureSection hero={hero} selectCulture={setCulture} setFeatureData={setFeatureData} />
				);
			case Page.Career:
				return (
					<CareerSection hero={hero} selectCareer={setCareer} setFeatureData={setFeatureData} />
				);
			case Page.Class:
				return (
					<ClassSection hero={hero} selectClass={setClass} setFeatureData={setFeatureData} />
				);
			case Page.Complication:
				return (
					<ComplicationSection hero={hero} selectComplication={setComplication} setFeatureData={setFeatureData} />
				);
			case Page.Kit:
				return (
					<KitSection hero={hero} addKit={addKit} removeKit={removeKit} setFeatureData={setFeatureData} />
				);
			case Page.Details:
				return (
					<DetailsSection hero={hero} />
				);
		}
	};

	return (
		<div className='hero-edit-page'>
			<Flex gap='small'>
				<Button onClick={saveChanges}>Save Changes</Button>
				<Button onClick={cancelChanges}>Cancel</Button>
			</Flex>
			<Divider />
			<Segmented<Page>
				options={[
					Page.Ancestry,
					Page.Culture,
					Page.Career,
					Page.Class,
					Page.Kit,
					Page.Complication,
					Page.Details
				]}
				block={true}
				value={page}
				onChange={setPage}
			/>
			<Divider />
			{getContent()}
		</div>
	);
};

interface AncestrySectionProps {
	hero: Hero;
	selectAncestry: (ancestry: Ancestry | null) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const AncestrySection = (props: AncestrySectionProps) => {
	const options = AncestryData.getAncestries().map(a => (
		<SelectableCard key={a.id} onSelect={() => props.selectAncestry(a)}>
			<AncestryPanel ancestry={a} />
		</SelectableCard>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.ancestry) {
		choices = props.hero.ancestry.features
			.filter(f => f.choice)
			.map(f => (
				<SelectableCard key={f.id}>
					<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
				</SelectableCard>
			));
	}

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Ancestries</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.ancestry ?
						<SelectableCard onUnselect={() => props.selectAncestry(null)}>
							<AncestryPanel ancestry={props.hero.ancestry} mode={PanelMode.Full} />
						</SelectableCard>
						:
						<div className='dimmed-text centered-text'>Not selected</div>
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface CultureSectionProps {
	hero: Hero;
	selectCulture: (culture: Culture | null) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const CultureSection = (props: CultureSectionProps) => {
	const options = CampaignSettingData.orden.cultures.map(c => (
		<SelectableCard key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} />
		</SelectableCard>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.culture) {
		choices = [ props.hero.culture.environment, props.hero.culture.organization, props.hero.culture.upbringing ]
			.filter(f => f.choice)
			.map(f => (
				<SelectableCard key={f.id}>
					<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
				</SelectableCard>
			));
	}

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Cultures</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.culture ?
						<SelectableCard onUnselect={() => props.selectCulture(null)}>
							<CulturePanel culture={props.hero.culture} mode={PanelMode.Full} />
						</SelectableCard>
						:
						<div className='dimmed-text centered-text'>Not selected</div>
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface CareerSectionProps {
	hero: Hero;
	selectCareer: (career: Career | null) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const CareerSection = (props: CareerSectionProps) => {
	const options = CareerData.getCareers().map(c => (
		<SelectableCard key={c.id} onSelect={() => props.selectCareer(c)}>
			<CareerPanel career={c} />
		</SelectableCard>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.career) {
		choices = props.hero.career.features
			.filter(f => f.choice)
			.map(f => (
				<SelectableCard key={f.id}>
					<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
				</SelectableCard>
			));
	}

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Careers</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.career ?
						<SelectableCard onUnselect={() => props.selectCareer(null)}>
							<CareerPanel career={props.hero.career} mode={PanelMode.Full} />
						</SelectableCard>
						:
						<div className='dimmed-text centered-text'>Not selected</div>
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface ClassSectionProps {
	hero: Hero;
	selectClass: (heroClass: HeroClass | null) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const ClassSection = (props: ClassSectionProps) => {
	const options = ClassData.getClasses().map(c => (
		<SelectableCard key={c.id} onSelect={() => props.selectClass(c)}>
			<ClassPanel heroClass={c} />
		</SelectableCard>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.class) {
		choices = props.hero.class.featuresByLevel
			.filter(lvl => lvl.level <= (props.hero.class?.level || 1))
			.flatMap(lvl => lvl.features)
			.filter(f => f.choice)
			.map(f => (
				<SelectableCard key={f.id}>
					<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
				</SelectableCard>
			));
	}

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Classes</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.class ?
						<SelectableCard onUnselect={() => props.selectClass(null)}>
							<ClassPanel heroClass={props.hero.class} mode={PanelMode.Full} />
						</SelectableCard>
						:
						<div className='dimmed-text centered-text'>Not selected</div>
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface ComplicationSectionProps {
	hero: Hero;
	selectComplication: (complication: Complication | null) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const ComplicationSection = (props: ComplicationSectionProps) => {
	const options = ComplicationData.getComplications().map(c => (
		<SelectableCard key={c.id} onSelect={() => props.selectComplication(c)}>
			<ComplicationPanel complication={c} />
		</SelectableCard>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.complication) {
		choices = [ props.hero.complication.benefit, props.hero.complication.drawback ]
			.filter(f => f.choice)
			.map(f => (
				<SelectableCard key={f.id}>
					<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
				</SelectableCard>
			));
	}

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Complications</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.complication ?
						<SelectableCard onUnselect={() => props.selectComplication(null)}>
							<ComplicationPanel complication={props.hero.complication} mode={PanelMode.Full} />
						</SelectableCard>
						:
						<div className='dimmed-text centered-text'>Not selected</div>
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface KitSectionProps {
	hero: Hero;
	addKit: (kit: Kit) => void;
	removeKit: (kitID: string) => void;
	setFeatureData: (featureID: string, data: unknown) => void;
}

const KitSection = (props: KitSectionProps) => {
	const options = KitData.getKits().map(k => (
		<SelectableCard key={k.id} onSelect={() => props.addKit(k)}>
			<KitPanel kit={k} />
		</SelectableCard>
	));

	const choices = props.hero.kits
		.filter(k => k.ward !== null)
		.map(k => k.ward as Feature)
		.filter(f => f.choice)
		.map(f => (
			<SelectableCard key={f.id}>
				<FeaturePanel feature={f} settingID={props.hero.settingID} setData={props.setFeatureData} />
			</SelectableCard>
		));

	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Kits</div>
				{options}
				{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				{
					props.hero.kits.map(kit => (
						<SelectableCard key={kit.id} onUnselect={() => props.removeKit(kit.id)}>
							<KitPanel kit={kit} mode={PanelMode.Full} />
						</SelectableCard>
					))
				}
				{props.hero.kits.length === 0 ? <div className='dimmed-text centered-text'>Not selected</div> : null}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				{choices}
				{choices.length === 0 ? <div className='dimmed-text centered-text'>No choices to be made</div> : null}
			</div>
		</div>
	);
};

interface DetailsSectionProps {
	hero: Hero;
}

const DetailsSection = (props: DetailsSectionProps) => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Details</div>
				<div>NAME: {props.hero.name}</div>
			</div>
		</div>
	);
};

interface SelectableCardProps {
	children: JSX.Element;
	onSelect?: () => void;
	onUnselect?: () => void;
};

const SelectableCard = (props: SelectableCardProps) => {
	return (
		<div className='selectable'>
			{props.children}
			{props.onSelect ? <Button block={true} onClick={props.onSelect}>Select</Button> : null}
			{props.onUnselect ? <Button block={true} onClick={props.onUnselect}>Unselect</Button> : null}
		</div>
	);
};
