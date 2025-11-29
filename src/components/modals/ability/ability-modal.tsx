import { AbilityCustomization, Hero } from '@/models/hero';
import { Input, Segmented, Select, Space } from 'antd';
import { Ability } from '@/models/ability';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DieRollPanel } from '@/components/panels/die-roll/die-roll-panel';
import { Expander } from '@/components/controls/expander/expander';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroLogic } from '@/logic/hero-logic';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { RollLogic } from '@/logic/roll-logic';
import { RollState } from '@/enums/roll-state';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
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
	const [ rollState, setRollState ] = useState<RollState>(RollState.Standard);
	const [ tier, setTier ] = useState<number | null>(null);

	const customization = hero ? hero.abilityCustomizations.find(ac => ac.abilityID === props.ability.id) : undefined;

	const hasRange = props.ability.distance.some(d => ![ AbilityDistanceType.Self, AbilityDistanceType.Special ].includes(d.type));
	const hasDamage = AbilityLogic.usesDamage(props.ability);

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
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.name = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(hero) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.description = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setNotes = (value: string) => {
		const copy = Utils.copy(hero) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.notes = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setDistance = (value: number) => {
		const copy = Utils.copy(hero) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.distanceBonus = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setDamage = (value: number) => {
		const copy = Utils.copy(hero) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.damageBonus = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setCharacteristic = (value: Characteristic | null) => {
		const copy = Utils.copy(hero) as Hero;

		let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.ability.id);
		if (!ac) {
			ac = createCustomization();
			copy.abilityCustomizations.push(ac);
		}
		ac.characteristic = value;

		setHero(copy);
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const createCustomization = (): AbilityCustomization => {
		return {
			abilityID: props.ability.id,
			name: '',
			description: '',
			notes: '',
			distanceBonus: 0,
			damageBonus: 0,
			characteristic: null
		};
	};

	const getContent = () => {
		switch (page) {
			case 'Ability Card': {
				const rollSection = props.ability.sections.find(s => s.type === 'roll');

				let odds: number[] | undefined = undefined;
				if (hero && rollSection) {
					const values = rollSection.roll.characteristic.map(ch => HeroLogic.getCharacteristic(hero!, ch));
					const bonus = Collections.max(values, v => v) || 0;
					odds = RollLogic.getOdds([ bonus ], rollState);
				}

				return (
					<div className='ability-section'>
						<SelectablePanel>
							<AbilityPanel
								ability={props.ability}
								hero={hero}
								monster={props.monster}
								highlightTier={tier || undefined}
								odds={odds}
								mode={PanelMode.Full}
							/>
						</SelectablePanel>
						{
							rollSection ?
								<DieRollPanel
									type='Power Roll'
									modifiers={[
										(rollSection.roll.characteristic.length > 0) ?
											Math.max(...rollSection.roll.characteristic.map(getCharacteristic))
											: rollSection.roll.bonus
									]}
									rollState={rollState}
									onRollStateChange={setRollState}
									onRoll={setTier}
								/>
								: null
						}
					</div>
				);
			}
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
							<MarkdownEditor value={customization?.description || ''} onChange={setDescription} />
						</Expander>
						<Expander title='Notes'>
							<HeaderText>Notes</HeaderText>
							<MarkdownEditor value={customization?.notes || ''} onChange={setNotes} />
						</Expander>
						<Expander title='Modifiers'>
							<Space orientation='vertical' style={{ width: '100%' }}>
								<NumberSpin
									disabled={!hasRange}
									label='Distance'
									min={0}
									value={customization?.distanceBonus || 0}
									onChange={setDistance}
								/>
								<NumberSpin
									disabled={!hasDamage}
									label='Damage'
									min={0}
									value={customization?.damageBonus || 0}
									onChange={setDamage}
								/>
							</Space>
						</Expander>
						{
							props.ability.sections.some(s => (s.type === 'roll')) ?
								<Expander title='Power Roll'>
									<Space orientation='vertical' style={{ width: '100%' }}>
										<Select
											style={{ width: '100%' }}
											allowClear={true}
											placeholder='Select a characteristic'
											options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch, label: <div className='ds-text'>{ch}</div> }))}
											value={customization?.characteristic}
											onChange={setCharacteristic}
										/>
									</Space>
								</Expander>
								: null
						}
					</div>
				);
		}
	};

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
};
