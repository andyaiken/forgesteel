import { CharacteristicsSheet } from '@/models/classic-sheets/classic-sheets';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';

import './characteristics-component.scss';

interface Props {
	characteristics: CharacteristicsSheet;
};

export const CharacteristicsComponent = (props: Props) => {
	const sheet = props.characteristics;
	return (
		<div className='characteristics'>
			<div className='characteristic'>
				<label><span className='symbol'>M</span>ight</label>
				<div className='value'><span>{SheetFormatter.addSign(sheet.might)}</span></div>
			</div>
			<div className='characteristic'>
				<label><span className='symbol'>A</span>gility</label>
				<div className='value'><span>{SheetFormatter.addSign(sheet.agility)}</span></div>
			</div>
			<div className='characteristic'>
				<label><span className='symbol'>R</span>eason</label>
				<div className='value'><span>{SheetFormatter.addSign(sheet.reason)}</span></div>
			</div>
			<div className='characteristic'>
				<label><span className='symbol'>I</span>ntuition</label>
				<div className='value'><span>{SheetFormatter.addSign(sheet.intuition)}</span></div>
			</div>
			<div className='characteristic'>
				<label><span className='symbol'>P</span>resence</label>
				<div className='value'><span>{SheetFormatter.addSign(sheet.presence)}</span></div>
			</div>
		</div>
	);
};
