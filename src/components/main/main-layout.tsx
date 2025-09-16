import { Drawer } from 'antd';
import { ErrorBoundary } from '../controls/error-boundary/error-boundary';
import { Outlet } from 'react-router';
import { ReactNode } from 'react';

interface Props {
	drawer: ReactNode;
	setDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainLayout = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className='main'>
					<Outlet />
				</div>
				<Drawer open={props.drawer !== null} onClose={() => props.setDrawer(null)} closeIcon={null} width='500px'>
					{props.drawer}
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
