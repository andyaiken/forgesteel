import { Button, Card, Divider, Flex, Segmented } from 'antd';
import { AncestryData } from '../../../data/ancestry-data';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { CareerData } from '../../../data/career-data';
import { CareerPanel } from '../../panels/career-panel/career-panel';
import { ClassData } from '../../../data/class-data';
import { ClassPanel } from '../../panels/class-panel/class-panel';
import { ComplicationData } from '../../../data/complication-data';
import { ComplicationPanel } from '../../panels/complication-panel/complication-panel';
import { CulturePanel } from '../../panels/culture-panel/culture-panel';
import { Hero } from '../../../models/hero';
import { KitData } from '../../../data/kit-data';
import { KitPanel } from '../../panels/kit-panel/kit-panel';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './hero-edit-page.scss';

enum Page {
	Ancestry = 'Ancestry',
	Culture = 'Culture',
	Career = 'Career',
	Class = 'Class',
	Kit = 'Kit',
	Complication = 'Complication',
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

	const changeName = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.name = Utils.guid();
		setHero(copy);
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
					<AncestrySection />
				);
			case Page.Culture:
				return (
					<CultureSection />
				);
			case Page.Career:
				return (
					<CareerSection />
				);
			case Page.Class:
				return (
					<ClassSection />
				);
			case Page.Kit:
				return (
					<KitSection />
				);
			case Page.Complication:
				return (
					<ComplicationSection />
				);
			case Page.Details:
				return (
					<DetailsSection />
				);
		}
	};

	return (
		<div className='hero-edit-page'>
			<Flex gap='small'>
				<Button onClick={changeName}>Change</Button>
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

const AncestrySection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Ancestries</div>
				{
					AncestryData.getAncestries().map(a => (
						<Card key={a.id}>
							<AncestryPanel ancestry={a} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const CultureSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Cultures</div>
				{
					CampaignSettingData.orden.cultures.map(c => (
						<Card key={c.id}>
							<CulturePanel culture={c} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const CareerSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Careers</div>
				{
					CareerData.getCareers().map(c => (
						<Card key={c.id}>
							<CareerPanel career={c} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const ClassSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Classes</div>
				{
					ClassData.getClasses().map(c => (
						<Card key={c.id}>
							<ClassPanel heroClass={c} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const KitSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Kits</div>
				{
					KitData.getKits().map(k => (
						<Card key={k.id}>
							<KitPanel kit={k} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const ComplicationSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Complications</div>
				{
					ComplicationData.getComplications().map(c => (
						<Card key={c.id}>
							<ComplicationPanel complication={c} />
						</Card>
					))
				}
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Selected</div>
				<div>XXX</div>
			</div>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Choices</div>
				<div>XXX</div>
			</div>
		</div>
	);
};

const DetailsSection = () => {
	return (
		<div className='hero-edit-content'>
			<div className='hero-edit-content-column'>
				<div className='header-text'>Details</div>
				<div>NAME</div>
			</div>
		</div>
	);
};