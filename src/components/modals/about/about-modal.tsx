import { Divider } from 'antd';
import { Field } from '@/components/controls/field/field';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { Modal } from '@/components/modals/modal/modal';

import pbds from '@/assets/powered-by-draw-steel.png';
import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	return (
		<Modal
			content={
				<div className='about-modal'>
					<div className='logo-container'>
						<LogoPanel />
					</div>
					<p>
						Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
					</p>
					<p>
						To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
					</p>
					<p>
						If you would like to contribute to this project, you can find the code <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
					</p>
					<Field label='Version' value={pkg.version} />
					<Divider />
					<p>
						<b>FORGE STEEL</b> is free.
					</p>
					<p>
						If you really feel the need to show your appreciation, I'd be grateful if you would take whatever you feel the app is worth and donate it to a local mental health charity.
					</p>
					<p>
						If after all that you <i>still</i> have too much spare cash, you can always <a href='https://coff.ee/andyaiken' target='_blank'>buy me a coffee</a>.
					</p>
					<Divider />
					<div className='logo-container'>
						<img src={pbds} />
					</div>
					<p>
						<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
					</p>
					<p>
						<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
					</p>
					<p>
						<a href='https://mcdm.gg/DrawSteel/DrawSteelGlyphs.zip' target='_blank'>Draw Steel Glyphs Font</a> by <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions</a> is licensed under <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>CC BY-SA 4.0</a>.
					</p>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
