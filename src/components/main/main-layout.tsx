import { AimOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { Outlet } from 'react-router';
import { type ReactNode } from 'react';
import { useNavigation } from '../../hooks/use-navigation';

import pbds from '../../assets/powered-by-draw-steel.png';

interface Props {
	section: 'hero' | 'library' | 'encounter';
 	drawer: ReactNode;
 	setDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainLayout = (props: Props) => {
	const navigation = useNavigation();

	return (
		<div className='main'>
			<div className='main-content'>
			   <Outlet />
		   </div>
		   <div className='main-footer'>
			   <div className='main-footer-section legal'>
				   <img className='ds-logo' src={pbds} />
				   FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.
			   </div>
			   <div className='main-footer-section navigation-buttons'>
				   <Button type='text' title='Heroes' icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()} />
				   <Button type='text' title='Library' icon={<BookOutlined />} onClick={() => navigation.goToLibraryList()} />
					<Button type='text' title='Encounters' icon={<AimOutlined />} onClick={() => navigation.goToEncounterList()} />
				</div>
			</div>
			<Drawer open={props.drawer !== null} onClose={() => props.setDrawer(null)} closeIcon={null} width='500px'>
				{props.drawer}
			</Drawer>
		</div>
	);
};
