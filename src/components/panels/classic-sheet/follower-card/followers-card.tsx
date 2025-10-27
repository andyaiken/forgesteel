import { CharacteristicsComponent } from '@/components/panels/classic-sheet/components/characteristics-component';
import { FollowerSheet } from '@/models/classic-sheets/hero-sheet';
import { Options } from '@/models/options';
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
				<CharacteristicsComponent characteristics={follower.characteristics} />
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
