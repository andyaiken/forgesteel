import { Feature, FeatureProficiencyData } from '@/models/feature';
import { Select, Space } from 'antd';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureProficiencyData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoProficiency = (props: InfoProps) => {
	return (
		<>
			{props.data.weapons.length > 0 ? <Field label='Weapons' value={props.data.weapons.join(', ')} /> : null}
			{props.data.armor.length > 0 ? <Field label='Armor' value={props.data.armor.join(', ')} /> : null}
		</>
	);
};

interface EditProps {
	data: FeatureProficiencyData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureProficiencyData) => void;
}

export const EditProficiency = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureProficiencyData>(Utils.copy(props.data));

	const setProficiencyWeapons = (value: KitWeapon[]) => {
		const copy = Utils.copy(data);
		copy.weapons = value;
		setData(copy);
		props.setData(copy);
	};

	const setProficiencyArmor = (value: KitArmor[]) => {
		const copy = Utils.copy(data);
		copy.armor = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Weapons</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Weapons'
				mode='multiple'
				allowClear={true}
				options={[ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(option => ({ value: option }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.weapons}
				onChange={setProficiencyWeapons}
			/>
			<HeaderText>Armor</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Armor'
				mode='multiple'
				allowClear={true}
				options={[ KitArmor.Heavy, KitArmor.Light, KitArmor.Medium, KitArmor.Shield ].map(option => ({ value: option }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				showSearch={true}
				value={data.armor}
				onChange={setProficiencyArmor}
			/>
		</Space>
	);
};
