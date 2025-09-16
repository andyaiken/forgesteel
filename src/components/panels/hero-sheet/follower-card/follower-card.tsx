import { FollowerSheet } from '../../../../models/character-sheet';
import { SheetFormatter } from '../../../../utils/sheet-formatter';
import './follower-card.scss';

interface Props {
	follower: FollowerSheet;
}

export const FollowerCard = (props: Props) => {
	const follower = props.follower;

	return (
		<div className='follower card'>
			<section className='bordered'>
				<h3>Follower</h3>
				<h2>
					<span className='name'>{follower.name}</span>
					<span className='type'>{follower.type}</span>
				</h2>
				<div className='details'>
					<div className='keywords'></div>
				</div>
				<div className='characteristics'>
					<div className='characteristic'>
						<label><span className='symbol'>M</span>ight</label>
						<div className='value'><span>{SheetFormatter.addSign(follower.might)}</span></div>
					</div>
					<div className='characteristic'>
						<label><span className='symbol'>A</span>gility</label>
						<div className='value'><span>{SheetFormatter.addSign(follower.agility)}</span></div>
					</div>
					<div className='characteristic'>
						<label><span className='symbol'>R</span>eason</label>
						<div className='value'><span>{SheetFormatter.addSign(follower.reason)}</span></div>
					</div>
					<div className='characteristic'>
						<label><span className='symbol'>I</span>ntuition</label>
						<div className='value'><span>{SheetFormatter.addSign(follower.intuition)}</span></div>
					</div>
					<div className='characteristic'>
						<label><span className='symbol'>P</span>resence</label>
						<div className='value'><span>{SheetFormatter.addSign(follower.presence)}</span></div>
					</div>
				</div>

			</section>
		</div>
	);
};
