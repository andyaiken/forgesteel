import { Button, Flex, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AbilityData } from '@/data/ability-data';
import { Collections } from '@/utils/collections';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './standard-ability-select-modal.scss';

interface Props {
	abilityIDs: string[];
	onClose: () => void;
	onSelect: (abilityIDs: string[]) => void;
}

export const StandardAbilitySelectModal = (props: Props) => {
	const [ abilityIDs, setAbilityIDs ] = useState<string[]>(Utils.copy(props.abilityIDs));

	const addAbilityIDs = (ids: string[]) => {
		const copy = Utils.copy(abilityIDs);
		copy.push(...ids.filter(id => !copy.includes(id)));

		setAbilityIDs(copy);
		props.onSelect(copy);
	};

	const removeAbilityIDs = (ids: string[]) => {
		const copy = Utils.copy(abilityIDs).filter(id => !ids.includes(id));

		setAbilityIDs(copy);
		props.onSelect(copy);
	};

	return (
		<Modal
			content={
				<div className='standard-ability-select-modal'>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							Collections
								.distinct(AbilityData.standardAbilities.map(a => a.type.usage), usage => usage)
								.map(usage => (
									<div key={usage}>
										<HeaderText
											extra={
												<Flex>
													<Button
														type='text'
														icon={<MinusCircleOutlined />}
														onClick={() => {
															const abilityIDs = AbilityData.standardAbilities.filter(a => a.type.usage === usage).map(a => a.id);
															removeAbilityIDs(abilityIDs);
														}}
													/>
													<Button
														type='text'
														icon={<PlusCircleOutlined />}
														onClick={() => {
															const abilityIDs = AbilityData.standardAbilities.filter(a => a.type.usage === usage).map(a => a.id);
															addAbilityIDs(abilityIDs);
														}}
													/>
												</Flex>
											}
										>
											{usage}
										</HeaderText>
										{
											AbilityData.standardAbilities
												.filter(a => a.type.usage === usage)
												.map(a => (
													<Toggle
														key={a.id}
														label={a.name}
														value={abilityIDs.includes(a.id)}
														onChange={value => {
															if (value) {
																addAbilityIDs([ a.id ]);
															} else {
																removeAbilityIDs([ a.id ]);
															}
														}}
													/>
												))
										}
									</div>
								))
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
