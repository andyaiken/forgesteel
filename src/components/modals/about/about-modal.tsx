import { Divider } from 'antd';
import { Field } from '../../controls/field/field';
import { Modal } from '../modal/modal';

import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='about-modal'>
						<p>
							<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
						</p>
						<p>
							<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
						</p>
						<Divider />
						<p>
							Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
						</p>
						<p>
							To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
						</p>
						<p>
							If you would like to contribute to this project, you can find the code <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
						</p>
						<Divider />
						<p>
							<b>FORGE STEEL</b> is free.
						</p>
						<p>
							If you really feel the need to show your appreciation, I'd be grateful if you would take whatever you feel the app is worth and donate it to a local mental health charity.
						</p>
						<Divider />
						<Field label='Version' value={pkg.version} />
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
