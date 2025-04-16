import { Input, Segmented } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { Characteristic } from '../../../enums/characteristic';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Expander } from '../../controls/expander/expander';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './ability-modal.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	monster?: Monster;
	onClose: () => void;
	updateHero?: (hero: Hero) => void;
}

export const AbilityModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero | undefined>(props.hero ? Utils.copy(props.hero) : undefined);
	const [ page, setPage ] = useState<string>('Ability Card');

	const customization = hero ? hero.abilityCustomizations.find(ac => ac.abilityID === props.ability.id) : undefined;

	const getCharacteristic = (ch: Characteristic) => {
		if (hero) {
			return HeroLogic.getCharacteristic(hero, ch);
		}

		if (props.monster) {
			return MonsterLogic.getCharacteristic(props.monster, ch);
		}

		return 0;
	};

	const setName = (value: string) => {
		const copy = Utils.copy(hero) as Hero;

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
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(hero) as Hero;

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
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setNotes = (value: string) => {
		const copy = Utils.copy(hero) as Hero;

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
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const getContent = () => {
		switch (page) {
			case 'Ability Card':
				return (
					<div className='ability-section'>
						<SelectablePanel>
							<AbilityPanel ability={props.ability} hero={hero} mode={PanelMode.Full} />
						</SelectablePanel>
						{
							props.ability.powerRoll ?
								<DieRollPanel
									type='Power Roll'
									modifiers={[
										(props.ability.powerRoll.characteristic.length > 0) ?
											Math.max(...props.ability.powerRoll.characteristic.map(getCharacteristic))
											: props.ability.powerRoll.bonus
									]}
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
								placeholder={props.ability.name}
								allowClear={true}
								value={customization?.name || ''}
								onChange={e => setName(e.target.value)}
							/>
							<HeaderText>Description</HeaderText>
							<MultiLine label={props.ability.description} value={customization?.description || ''} onChange={setDescription} />
						</Expander>
						<Expander title='Notes'>
							<HeaderText>Notes</HeaderText>
							<MultiLine label='Notes' value={customization?.notes || ''} onChange={setNotes} />
						</Expander>
					</div>
				);
		}
	};

	try {
		return (
			<Modal
				toolbar={
					props.updateHero ?
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Segmented
								name='tabs'
								options={[ 'Ability Card', 'Customize' ]}
								value={page}
								onChange={setPage}
							/>
						</div>
						: null
				}
				content={
					<div className='ability-modal'>
						{getContent()}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
