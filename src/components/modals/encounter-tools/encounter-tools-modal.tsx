import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Alert } from 'antd';
import { Collections } from '../../../utils/collections';
import { Encounter } from '../../../models/encounter';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Modal } from '../modal/modal';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { Options } from '../../../models/options';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';

import './encounter-tools-modal.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
}

export const EncounterToolsModal = (props: Props) => {
	try {
		const monsters: { monster: Monster, count: number }[] = [];
		props.encounter.groups
			.flatMap(group => group.slots)
			.forEach(slot => {
				const existing = monsters.find(m => m.monster.id === slot.monsterID);
				if (existing) {
					existing.count += slot.count;
				} else {
					const monster = SourcebookLogic.getMonster(props.sourcebooks, slot.monsterID);
					if (monster) {
						monsters.push({
							monster: monster,
							count: slot.count * MonsterLogic.getRoleMultiplier(monster.role.organization, props.options)
						});
					}
				}
			});

		return (
			<Modal
				content={
					<div className='encounter-tools-modal'>
						<HeaderText level={1}>Mini Checklist</HeaderText>
						<Alert
							type='info'
							showIcon={true}
							message='This list provides a breakdown of the minis you will need to run this encounter.'
						/>
						{
							Collections.sort(monsters, data => data.monster.name).map(data => {
								return (
									<div key={data.monster.id}>
										<HeaderText tags={data.monster.keywords}>{data.monster.name}</HeaderText>
										{
											data.count > 1 ?
												<Field
													label='Count'
													value={data.count}
												/>
												: null
										}
										<Field
											label='Size'
											value={FormatLogic.getSize(data.monster.size)}
										/>
										<Field
											label='Weapons'
											value={
												data.monster.features
													.filter(f => f.type === FeatureType.Ability)
													.filter(f => f.data.ability.keywords.includes(AbilityKeyword.Weapon))
													.map(f => f.name)
													.sort()
													.join(', ')
											}
										/>
									</div>
								);
							})
						}
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
