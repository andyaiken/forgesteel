import { Drawer } from 'antd';
import { ErrorBoundary } from '../controls/error-boundary/error-boundary';
import { Outlet } from 'react-router';
import { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks/use-media-query';

import pbds from '../../assets/powered-by-draw-steel.png';

interface Props {
	section: 'hero' | 'library' | 'encounter';
	directory: ReactNode;
	drawer: ReactNode;
	setDirectory: React.Dispatch<React.SetStateAction<ReactNode>>;
	setDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainLayout = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	try {
		return (
			<ErrorBoundary>
				<div className='main'>
					<div className='main-content'>
						<Outlet />
					</div>
					{
						!isSmall ?
							<div className='main-footer'>
								<div className='main-footer-section legal'>
									<img className='ds-logo' src={pbds} />
									FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.
								</div>
							</div>
							: null
					}
					<Drawer placement='left' open={props.directory !== null} onClose={() => props.setDirectory(null)} closeIcon={null} width='250px'>
						{props.directory}
					</Drawer>
					<Drawer open={props.drawer !== null} onClose={() => props.setDrawer(null)} closeIcon={null} width='500px'>
						{props.drawer}
					</Drawer>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
