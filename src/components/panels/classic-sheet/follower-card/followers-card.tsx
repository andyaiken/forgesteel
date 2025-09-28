import { FollowerSheet } from '../../../../models/classic-sheets/hero-sheet';
import { Options } from '../../../../models/options';
import { SheetFormatter } from '../../../../logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';

import './follower-card.scss';

interface Props {
	followers: FollowerSheet[];
	options: Options;
}

export const FollowersCard = (props: Props) => {
	const followers = useMemo(() => props.followers, [ props.followers ]);

	const getFollowerBlock = (follower: FollowerSheet) => {
		return (
			<div className='follower' key={follower.id}>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{follower.name}</span>
						<span className='type'>{follower.type} {follower.classification}</span>
						<span className='keywords'>{follower.keywords}</span>
					</h2>
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
				<div className='stat skills'>
					<label>Skills:</label>
					<span>{follower.skills?.join(', ')}</span>
				</div>
				<div className='stat languages'>
					<label>Languages:</label>
					<span>{follower.languages?.join(', ')}</span>
				</div>
			</div>
		);
	};

	return (
		<div className='followers card'>
			<h2>Followers</h2>
			{followers.map(f => getFollowerBlock(f))}
		</div>
	);
};
