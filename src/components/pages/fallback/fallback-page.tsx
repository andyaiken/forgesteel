import shield from '@/assets/shield.png';

import './fallback-page.scss';

export const FallbackPage = () => {
	return (
		<div className='fallback-page'>
			<img className='shield-image' src={shield} />
		</div>
	);
};
