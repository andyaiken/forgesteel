import { Divider } from 'antd';
import { Field } from '../../controls/field/field';
import { Modal } from '../modal/modal';

import pkg from '../../../../package.json';

import './about-modal.scss';

export const AboutModal = () => {
	try {
		return (
			<Modal
				content={
					<div className='about-modal'>
						<div className='ds-text'>
							<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
						</div>
						<div className='ds-text'>
							<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
						</div>
						<Divider />
						<div className='ds-text'>
							Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
						</div>
						<div className='ds-text'>
							To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
						</div>
						<div className='ds-text'>
							If you would like to contribute to this project, you can find the repository <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
						</div>
						<Divider />
						<Field label='Version' value={pkg.version} />
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
