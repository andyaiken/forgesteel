import { useState } from 'react';
import { Hero } from '../../../models/hero';
import { Button, Divider, Flex, Segmented } from 'antd';
import { Utils } from '../../../utils/utils';

import './hero-edit-page.scss'
import { AncestryData } from '../../../data/ancestry-data';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';

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
					<div className='hero-edit-content'>
						<div className='hero-edit-content-column'>
							<div className='header-text'>Ancestries</div>
							{
								AncestryData.getAncestries().map(a => (
									<AncestryPanel key={a.id} ancestry={a} />
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
			case Page.Culture:
				return (
					<div>{page}</div>
				);
			case Page.Career:
				return (
					<div>{page}</div>
				);
			case Page.Class:
				return (
					<div>{page}</div>
				);
			case Page.Kit:
				return (
					<div>{page}</div>
				);
			case Page.Complication:
				return (
					<div>{page}</div>
				);
			case Page.Details:
				return (
					<div>{page}</div>
				);
		}
	};

	return (
		<div className='hero-edit-page'>
			<Flex gap="small">
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
}
