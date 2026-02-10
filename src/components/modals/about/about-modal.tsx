import { Space, Tag } from 'antd';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';

import pbds from '@/assets/powered-by-draw-steel.png';
import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	options: Options;
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	return (
		<Modal
			content={
				<div className='about-modal'>
					<SelectablePanel style={{ paddingTop: '20px' }}>
						<Space orientation='vertical'>
							<div className='logo-container'>
								<LogoPanel />
								<Tag variant='outlined'>{`Version ${pkg.version}`}</Tag>
							</div>
							<div>
								Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
							</div>
							<div>
								To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
							</div>
							<div>
								If you would like to contribute to this project, you can find the code <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
							</div>
						</Space>
					</SelectablePanel>
					<SelectablePanel style={{ paddingTop: '20px' }}>
						<Space orientation='vertical'>
							<div>
								<b>FORGE STEEL</b> is free.
							</div>
							<div>
								If you really feel the need to show your appreciation, I'd be grateful if you would take whatever you feel the app is worth and donate it to a local mental health charity.
							</div>
							<div>
								If after that you <i>still</i> have too much spare cash, and you <i>really</i> want to support future development, you can <a href='https://patreon.com/andyaiken' target='_blank'>join the Patreon</a> or <a href='https://coff.ee/andyaiken' target='_blank'>buy me a coffee</a>.
							</div>
						</Space>
					</SelectablePanel>
					<SelectablePanel style={{ paddingTop: '20px' }}>
						<Space orientation='vertical'>
							<div className='logo-container'>
								<img src={pbds} />
							</div>
							<div>
								<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
							</div>
							<div>
								<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
							</div>
							<div>
								<a href='https://mcdm.gg/DrawSteel/DrawSteelGlyphs.zip' target='_blank'>Draw Steel Glyphs Font</a> by <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions</a> is licensed under <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>CC BY-SA 4.0</a>.
							</div>
						</Space>
					</SelectablePanel>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
