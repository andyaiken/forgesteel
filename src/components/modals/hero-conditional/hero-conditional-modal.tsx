import { Select, Space } from 'antd';
import { Empty } from '@/components/controls/empty/empty';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-conditional-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (hero: Hero) => void;
	onClose: () => void;
}

export const HeroConditionalModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const list = HeroLogic.getConditionalFeatures(hero);
	const kitDamageBonuses = HeroLogic.getKitDamageBonusOptions(hero);

	const setKitDamageBonus = (type: 'melee' | 'ranged', kitID: string) => {
		const copy = Utils.copy(hero);
		if (type === 'melee') {
			copy.selectedMeleeDamageBonus = kitID;
		} else {
			copy.selectedRangedDamageBonus = kitID;
		}
		setHero(copy);
		props.onChange(copy);
	};

	const setData = (featureID: string, data: FeatureData) => {
		const copy = Utils.copy(hero);
		const feature = HeroLogic.getFeatures(copy).find(f => f.feature.id === featureID);
		if (feature) {
			feature.feature.data = data;
		}
		setHero(copy);
		props.onChange(copy);
	};

	return (
		<Modal
			content={
				<div className='hero-conditional-modal'>
					<HeaderText>Conditional Features</HeaderText>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							([ 'melee', 'ranged' ] as const).map(type => {
								const bonuses = kitDamageBonuses.filter(bonus => bonus.type === type);
								if (bonuses.length < 2) {
									return null;
								}

								const selectedKitID = type === 'melee' ? hero.selectedMeleeDamageBonus : hero.selectedRangedDamageBonus;
								const selected = bonuses.find(bonus => bonus.kitIDs.includes(selectedKitID || '')) || bonuses[0];
								const format = (value: number) => value > 0 ? `+${value}` : `${value}`;
								return (
									<SelectablePanel key={`kit-damage-${type}`}>
										<HeaderText>{`${type} Damage Bonus`}</HeaderText>
										<Select
											style={{ minWidth: '180px' }}
											value={selected.kitIDs[0]}
											options={bonuses.map(bonus => ({
												value: bonus.kitIDs[0],
												label: `${format(bonus.tier1)} / ${format(bonus.tier2)} / ${format(bonus.tier3)}`
											}))}
											optionRender={option => <div className='ds-text'>{option.data.label}</div>}
											onChange={kitID => setKitDamageBonus(type, kitID)}
										/>
									</SelectablePanel>
								);
							})
						}
						{
							list.map(f => (
								<SelectablePanel key={f.feature.id}>
									<FeatureConfigPanel
										feature={f.feature}
										hero={hero}
										sourcebooks={props.sourcebooks}
										setData={setData}
									/>
								</SelectablePanel>
							))
						}
						{
							list.length === 0 && !HeroLogic.hasSelectableKitDamageBonuses(hero) ?
								<Empty text='You have no conditional features.' />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
