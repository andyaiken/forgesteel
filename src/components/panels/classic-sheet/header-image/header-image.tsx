import pbds from '@/assets/powered-by-draw-steel.png';

import './header-image.scss';

export const HeaderImage = () => {
	return (
		<div className='header-image'>
			<img src={pbds} />
			<h1>Made with Forge Steel</h1>
		</div>
	);
};
