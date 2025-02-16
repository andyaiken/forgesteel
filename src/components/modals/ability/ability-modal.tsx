import { Input, Segmented } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Expander } from '../../controls/expander/expander';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { useState } from 'react';

import './ability-modal.scss';

interface Props {
	hero: Hero;
	ability: Ability;
	updateHero: (hero: Hero) => void;
}

export const AbilityModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)) as Hero);
	const [ page, setPage ] = useState<string>('Ability');

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = {
				abilityID: props.ability.id,
				name: value,
				description: '',
				notes: ''
			};
			copy.abilityCustomizations.push(ac);
		} else {
			ac.name = value;
		}

		setHero(copy);
		props.updateHero(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = {
				abilityID: props.ability.id,
				name: '',
				description: value,
				notes: ''
			};
			copy.abilityCustomizations.push(ac);
		} else {
			ac.description = value;
		}

		setHero(copy);
		props.updateHero(copy);
	};

	const setNotes = (value: string) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = {
				abilityID: props.ability.id,
				name: '',
				description: '',
				notes: value
			};
			copy.abilityCustomizations.push(ac);
		} else {
			ac.notes = value;
		}

		setHero(copy);
		props.updateHero(copy);
	};

	const getContent = () => {
		switch (page) {
			case 'Ability':
				return (
					<div className='ability-section'>
						<SelectablePanel>
							<AbilityPanel ability={props.ability} hero={hero} mode={PanelMode.Full} />
						</SelectablePanel>
						{
							props.ability.powerRoll ?
								<DieRollPanel
									modifier={Math.max(...props.ability.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero, ch)))}
								/>
								: null
						}
					</div>
				);
			case 'Customize':
				return (
					<div className='customize-section'>
						<Expander title='Name and Description'>
							<HeaderText>Name</HeaderText>
							<Input
								placeholder='Name'
								allowClear={true}
								value={customization?.name || ''}
								onChange={e => setName(e.target.value)}
							/>
							<HeaderText>Description</HeaderText>
							<MultiLine label='Description' value={customization?.description || ''} onChange={setDescription} />
						</Expander>
						<Expander title='Notes'>
							<HeaderText>Notes</HeaderText>
							<MultiLine label='Description' value={customization?.notes || ''} onChange={setNotes} />
						</Expander>
					</div>
				);
		}
	};

	const customization = hero.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							options={[ 'Ability', 'Customize' ]}
							value={page}
							onChange={setPage}
						/>
					</div>
				}
				content={
					<div className='ability-modal'>
						{getContent()}
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
