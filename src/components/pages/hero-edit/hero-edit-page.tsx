import { Button, Divider, Flex, Input, Radio, Segmented, Select, Space } from 'antd';
import { FeatureData, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { Ancestry } from '../../../models/ancestry';
import { AncestryData } from '../../../data/ancestry-data';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Career } from '../../../models/career';
import { CareerData } from '../../../data/career-data';
import { CareerPanel } from '../../panels/career-panel/career-panel';
import { Characteristic } from '../../../enums/characteristic';
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
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
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
	const [ dirty, setDirty ] = useState<boolean>(false);

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

	const setCareer = (career: Career | null) => {
		const careerCopy = JSON.parse(JSON.stringify(career)) as Career | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.career = careerCopy;
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

	const setKit = (kit: Kit | null) => {
		const kitCopy = JSON.parse(JSON.stringify(kit)) as Kit | null;
		const heroCopy = JSON.parse(JSON.stringify(hero)) as Hero;
		heroCopy.kit = kitCopy;
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
					<ClassSection hero={hero} selectClass={setClass} selectCharacteristics={setCharacteristics} selectSubclasses={setSubclasses} setFeatureData={setFeatureData} />
				);
			case Page.Complication:
				return (
					<ComplicationSection hero={hero} selectComplication={setComplication} setFeatureData={setFeatureData} />
				);
			case Page.Kit:
				return (
					<KitSection hero={hero} selectKit={setKit} setFeatureData={setFeatureData} />
				);
			case Page.Details:
				return (
					<DetailsSection hero={hero} setName={setName} />
				);
		}
	};

	return (
		<div className='hero-edit-page'>
			<Flex gap='small'>
				<Button type='primary' disabled={!dirty} onClick={saveChanges}>Save Changes</Button>
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
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const AncestrySection = (props: AncestrySectionProps) => {
	const options = AncestryData.getAncestries().map(a => (
		<SelectablePanel key={a.id} onSelect={() => props.selectAncestry(a)}>
			<AncestryPanel ancestry={a} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.ancestry) {
		choices = props.hero.ancestry.features
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.ancestry ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel onUnselect={() => props.selectAncestry(null)}>
							<AncestryPanel ancestry={props.hero.ancestry} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Ancestries</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				choices.length > 0 ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface CultureSectionProps {
	hero: Hero;
	selectCulture: (culture: Culture | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const CultureSection = (props: CultureSectionProps) => {
	const options = CampaignSettingData.orden.cultures.map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCulture(c)}>
			<CulturePanel culture={c} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.culture) {
		choices = [ props.hero.culture.environment, props.hero.culture.organization, props.hero.culture.upbringing ]
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.culture ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel onUnselect={() => props.selectCulture(null)}>
							<CulturePanel culture={props.hero.culture} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Cultures</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				choices.length > 0 ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface CareerSectionProps {
	hero: Hero;
	selectCareer: (career: Career | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const CareerSection = (props: CareerSectionProps) => {
	const options = CareerData.getCareers().map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectCareer(c)}>
			<CareerPanel career={c} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.career) {
		choices = props.hero.career.features
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.career ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel onUnselect={() => props.selectCareer(null)}>
							<CareerPanel career={props.hero.career} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Careers</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				choices.length > 0 ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface ClassSectionProps {
	hero: Hero;
	selectClass: (heroClass: HeroClass | null) => void;
	selectCharacteristics: (array: { characteristic: Characteristic, value: number }[]) => void;
	selectSubclasses: (subclassIDs: string[]) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const ClassSection = (props: ClassSectionProps) => {
	const options = ClassData.getClasses().map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
			<ClassPanel heroClass={c} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.class) {
		choices = props.hero.class.featuresByLevel
			.filter(lvl => lvl.level <= (props.hero.class?.level || 1))
			.flatMap(lvl => lvl.features)
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));

		// Choose subclass(es)
		if (props.hero.class.subclasses.length > 0) {
			choices.unshift(
				<SelectablePanel key='subclass'>
					<div className='header-text'>{props.hero.class.subclassName}</div>
					<div className='ds-text'>Choose {props.hero.class.subclassCount === 1 ? `a ${props.hero.class.subclassName}` : `${props.hero.class.subclassCount} ${props.hero.class.subclassName}s`}.</div>
					<Select
						style={{ width: '100%' }}
						mode={props.hero.class.subclassCount === 1 ? undefined : 'multiple'}
						maxCount={props.hero.class.subclassCount === 1 ? undefined : props.hero.class.subclassCount}
						allowClear={true}
						placeholder='Select'
						options={props.hero.class.subclasses.map(s => ({ value: s.id, label: s.name }))}
						value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.id)}
						onChange={props.selectSubclasses}
					/>
				</SelectablePanel>
			);
		}

		const arrays = HeroLogic.calculateCharacteristicArrays(props.hero.class.primaryCharacteristics);
		choices.unshift(
			<SelectablePanel key='characteristics'>
				<div className='header-text'>Characteristics</div>
				<div className='characteristic-row' style={{ margin: '5px 15px', fontWeight: 600 }}>
					<div className='characteristic-item'>MGT</div>
					<div className='characteristic-item'>AGI</div>
					<div className='characteristic-item'>RSN</div>
					<div className='characteristic-item'>INT</div>
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
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.class ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel onUnselect={() => props.selectClass(null)}>
							<ClassPanel heroClass={props.hero.class} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Classes</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				props.hero.class ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface ComplicationSectionProps {
	hero: Hero;
	selectComplication: (complication: Complication | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const ComplicationSection = (props: ComplicationSectionProps) => {
	const options = ComplicationData.getComplications().map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectComplication(c)}>
			<ComplicationPanel complication={c} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.complication) {
		choices = [ props.hero.complication.benefit, props.hero.complication.drawback ]
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.complication ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel onUnselect={() => props.selectComplication(null)}>
							<ComplicationPanel complication={props.hero.complication} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Complications</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				choices.length > 0 ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface KitSectionProps {
	hero: Hero;
	selectKit: (kit: Kit | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const KitSection = (props: KitSectionProps) => {
	const options = KitData.getKits().map(k => (
		<SelectablePanel key={k.id} onSelect={() => props.selectKit(k)}>
			<KitPanel kit={k} />
		</SelectablePanel>
	));

	let choices: JSX.Element[] = [];
	if (props.hero.kit && props.hero.kit.ward) {
		choices = [ props.hero.kit.ward ]
			.filter(f => f.choice)
			.map(f => (
				<SelectablePanel key={f.id}>
					<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} setData={props.setFeatureData} />
				</SelectablePanel>
			));
	}

	return (
		<div className='hero-edit-content'>
			{
				props.hero.kit ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Selected</div>
						<SelectablePanel key={props.hero.kit.id} onUnselect={() => props.selectKit(null)}>
							<KitPanel kit={props.hero.kit} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					:
					<div className='hero-edit-content-column'>
						<div className='header-text'>Kits</div>
						{options}
						{options.length === 0 ? <div className='dimmed-text centered-text'>None available</div> : null}
					</div>
			}
			{
				choices.length > 0 ?
					<div className='hero-edit-content-column'>
						<div className='header-text'>Choices</div>
						{choices}
					</div>
					: null
			}
		</div>
	);
};

interface DetailsSectionProps {
	hero: Hero;
	setName: (value: string) => void;
}

const DetailsSection = (props: DetailsSectionProps) => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Details</div>
				<div>Name:</div>
				<Input placeholder='Name' allowClear={true} value={props.hero.name} onChange={e => props.setName(e.target.value)} />
			</div>
		</div>
	);
};
