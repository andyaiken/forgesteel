import { Divider } from 'antd';
import { Field } from '../../controls/field/field';

import pkg from '../../../../package.json';

import './about-modal.scss';

export const AboutModal = () => {
	try {
		return (
			<div className='about-modal'>
				<div className='ds-text'>
					<b>FORGE STEEL</b> is a hero builder app for <b>DRAW STEEL</b>.
				</div>
				<Divider />
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
				<Field label='Version' value={pkg.version} />
			</div>
		);
	} catch {
		return null;
	}
};
