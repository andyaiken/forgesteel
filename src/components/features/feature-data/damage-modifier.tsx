import { Button, Space } from 'antd';
import { Feature, FeatureDamageModifierData } from '@/models/feature';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { ModifierEditor } from '@/components/panels/edit/modifier-edit/modifier-edit-panel';
import { Options } from '@/models/options';
import { PlusOutlined } from '@ant-design/icons';
import { RadioGroup } from '@/components/controls/radio-group/radio-group';
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
	return (
		<div className='ds-text'>
			{props.data.modifiers.map(FormatLogic.getDamageModifier).join(', ')}
		</div>
	);
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
		copy.modifiers.push(FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 1 }));
		setData(copy);
		props.setData(copy);
	};

	const deleteDamageModifier = (data: FeatureDamageModifierData, index: number) => {
		const copy = Utils.copy(data);
		copy.modifiers.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierDamageType = (data: FeatureDamageModifierData, index: number, value: DamageType | null) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].damageType = value || DamageType.Damage;
		setData(copy);
		props.setData(copy);
	};

	const setDamageModifierType = (data: FeatureDamageModifierData, index: number, value: DamageModifierType | null) => {
		const copy = Utils.copy(data);
		copy.modifiers[index].type = value || DamageModifierType.Immunity;
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
					<Expander key={n} title={FormatLogic.getDamageModifier(mod)}>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<HeaderText>{FormatLogic.getDamageModifier(mod)}</HeaderText>
							<RadioGroup
								label='Damage Type'
								options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ]}
								value={mod.damageType}
								onChange={value => setDamageModifierDamageType(data, n, value)}
							/>
							<RadioGroup
								label='Modifier Type'
								options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ]}
								value={mod.type}
								onChange={value => setDamageModifierType(data, n, value)}
							/>
							<ModifierEditor
								modifier={mod}
								setValue={value => setDamageModifierValue(data, n, value)}
								setValuePerLevel={value => setDamageModifierValuePerLevel(data, n, value)}
								setValuePerEchelon={value => setDamageModifierValuePerEchelon(data, n, value)}
								setValueCharacteristics={value => setDamageModifierValueCharacteristics(data, n, value)}
							/>
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
