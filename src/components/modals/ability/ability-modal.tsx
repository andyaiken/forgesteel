import { Input, Tabs } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Expander } from '../../controls/expander/expander';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
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

	const customization = hero.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);

	try {
		return (
			<Modal
				content={
					<div className='ability-modal'>
						<Tabs
							items={[
								{
									key: 'ability',
									label: 'Ability',
									children: (
										<div className='ability-section'>
											<SelectablePanel>
												<AbilityPanel ability={props.ability} hero={hero} mode={PanelMode.Full} />
											</SelectablePanel>
											{
												props.ability.powerRoll ?
													<DieRollPanel hero={props.hero} characteristics={props.ability.powerRoll.characteristic} />
													: null
											}
										</div>
									)
								},
								{
									key: 'customize',
									label: 'Customize',
									children: (
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
									)
								}
							]}
						/>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
