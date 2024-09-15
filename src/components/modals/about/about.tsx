import { Divider } from 'antd';

import './about.scss';

export const AboutModal = () => {
	return (
		<div className='about-modal'>
			<div className='ds-text'>
				<b>FORGE STEEL</b> is a hero builder app for <b>DRAW STEEL</b>.
			</div>
			<Divider />
			<div>
				<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC
			</div>
			<div>
				<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC</a>
			</div>
			<Divider />
			<div className='warning-text'>
				This is still a work-in-progress.
			</div>
			<div className='ds-text'>
				Specifically, here are some pieces that haven't been added yet:
			</div>
			<ul>
				<li>Devil: Fiendish Features</li>
				<li>Dragon Knight: Knighthood</li>
				<li>Revenant: Former Life</li>
				<li>Conduit class</li>
				<li>Elementalist class</li>
				<li>Fury class</li>
				<li>Tactician class</li>
			</ul>
			<div className='ds-text'>
				You can help by submitting bug reports <a href='https://github.com/andyaiken/forgesteel/issues/' target='_blank'>here</a>.
			</div>
			<Divider />
			<div className='ds-text'>
				App design by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
			</div>
		</div>
	);
};
