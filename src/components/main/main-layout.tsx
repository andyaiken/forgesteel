import { Drawer } from 'antd';
import { Outlet } from 'react-router';
import { type ReactNode } from 'react';
import pbds from '../../assets/powered-by-draw-steel.png';


interface Props {
	drawer: ReactNode;
	setDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainLayout = ({ drawer, setDrawer }: Props) => {
	return (
		<div className='main'>
			<div className='main-content'>
				<Outlet />
			</div>
			<div className='main-footer'>
				<div className='main-footer-section'>
					<img className='ds-logo' src={pbds} />
					FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
					DRAW STEEL © 2024 MCDM Productions, LLC.
				</div>
			</div>
			<Drawer open={drawer !== null} onClose={() => setDrawer(null)} closeIcon={null} width='500px'>
				{drawer}
			</Drawer>
		</div>
	);
};
