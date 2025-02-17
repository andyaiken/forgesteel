import { Segmented, Statistic } from 'antd';
import { Characteristic } from '../../../enums/characteristic';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { useState } from 'react';

import './roll-modal.scss';

interface Props {
	characteristics?: Characteristic[];
	hero?: Hero;
	onClose: () => void;
}

export const RollModal = (props: Props) => {
	const [ modifier, setModifier ] = useState<number>(props.characteristics && props.hero ? Math.max(...props.characteristics.map(ch => HeroLogic.getCharacteristic(props.hero!, ch))) : 0);
	const [ type, setType ] = useState<'Power Roll' | 'Saving Throw'>('Power Roll');

	try {
		const getContent = () => {
			switch (type) {
				case 'Power Roll':
					return (
						<>
							{
								props.characteristics && props.hero ?
									<Statistic title={props.characteristics.join(', ')} value={modifier} />
									:
									<NumberSpin label='Modifier' value={modifier} onChange={setModifier} />
							}
							<DieRollPanel type='Power Roll' modifier={modifier} />
						</>
					);
				case 'Saving Throw':
					return (
						<>
							<DieRollPanel type='Saving Throw' modifier={0} />
						</>
					);
			}
		};

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							options={[ 'Power Roll', 'Saving Throw' ]}
							value={type}
							onChange={setType}
						/>
					</div>
				}
				content={
					<div className='roll-modal'>
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
