import shield from './../../../assets/shield.png';

import './logo-panel.scss';

interface Props {
	onClick: () => void;
}

export const LogoPanel = (props: Props) => {
	return (
		<div className='logo-panel' onClick={props.onClick}>
			<img className='logo-panel-image' src={shield} />
			<div className='logo-panel-text'>Forge Steel</div>
		</div>
	);
};
