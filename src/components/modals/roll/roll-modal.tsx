import { Characteristic } from '../../../enums/characteristic';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Statistic } from 'antd';
import { useState } from 'react';

import './roll-modal.scss';

interface Props {
	characteristics?: Characteristic[];
	hero?: Hero;
	onClose: () => void;
}

export const RollModal = (props: Props) => {
	const [ modifier, setModifier ] = useState<number>(props.characteristics && props.hero ? Math.max(...props.characteristics.map(ch => HeroLogic.getCharacteristic(props.hero!, ch))) : 0);

	try {
		return (
			<Modal
				content={
					<div className='roll-modal'>
						{
							props.characteristics ?
								<Statistic title={props.characteristics.join(', ')} value={modifier} />
								:
								<NumberSpin label='Modifier' value={modifier} onChange={setModifier} />
						}
						<DieRollPanel modifier={modifier} />
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
