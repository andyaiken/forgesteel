import { Button, Empty, Select, Space } from 'antd';
import { Feature, FeatureDamageModifierData } from '@/models/feature';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PlusOutlined } from '@ant-design/icons';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureDamageModifierData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoDamageModifier = (props: InfoProps) => {
	if (!props.feature.description) {
		return (
			<div className='ds-text'>
				{props.data.modifiers.map(FormatLogic.getDamageModifier).join(', ')}
			</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureDamageModifierData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureDamageModifierData) => void;
}

export const EditDamageModifier = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureDamageModifierData>(Utils.copy(props.data));

	const addDamageModifier = (data: FeatureDamageModifierData) => {
		const copy = Utils.copy(data);
		copy.modifiers.push(FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 0 }));
		setData(copy);
		props.setData(copy);
	};

	const deleteDamageModifier = (data: FeatureDamageModifierData, index: number) => {
		const copy = Utils.copy(data);
		copy.modifiers.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierDamageType = (data: FeatureDamageModifierData, index: number, value: DamageType) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].damageType = value;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierType = (data: FeatureDamageModifierData, index: number, value: DamageModifierType) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].type = value;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierValue = (data: FeatureDamageModifierData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].value = value;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierValueCharacteristics = (data: FeatureDamageModifierData, index: number, value: Characteristic[]) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].valueCharacteristics = value;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierValuePerLevel = (data: FeatureDamageModifierData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].valuePerLevel = value;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierValuePerEchelon = (data: FeatureDamageModifierData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].valuePerEchelon = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addDamageModifier(data)} />
				}
			>
				Modifiers
			</HeaderText>
			{
				data.modifiers.map((mod, n) => (
					<Expander key={n} title='Damage Modifier'>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<HeaderText>{FormatLogic.getDamageModifier(mod)}</HeaderText>
							<Select
								style={{ width: '100%' }}
								placeholder='Damage type'
								options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(option => ({ value: option }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								value={mod.damageType}
								onChange={value => setDamageModifierDamageType(data, n, value)}
							/>
							<Select
								style={{ width: '100%' }}
								placeholder='Modifier type'
								options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ value: o }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								value={mod.type}
								onChange={value => setDamageModifierType(data, n, value)}
							/>
							<NumberSpin label='Value' min={0} value={mod.value} onChange={value => setDamageModifierValue(data, n, value)} />
							<Select
								style={{ width: '100%' }}
								placeholder='Characteristics'
								mode='multiple'
								options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								value={mod.valueCharacteristics}
								onChange={value => setDamageModifierValueCharacteristics(data, n, value)}
							/>
							<NumberSpin label='Per Level After 1st' min={0} value={mod.valuePerLevel} onChange={value => setDamageModifierValuePerLevel(data, n, value)} />
							<NumberSpin label='Per Echelon' min={0} value={mod.valuePerEchelon} onChange={value => setDamageModifierValuePerEchelon(data, n, value)} />
							<DangerButton mode='block' onConfirm={() => deleteDamageModifier(data, n)} />
						</Space>
					</Expander>
				))
			}
			{
				data.modifiers.length === 0 ?
					<Empty />
					: null
			}
		</Space>
	);
};
