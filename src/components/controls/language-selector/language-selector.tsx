import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Button, Dropdown, MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import i18next from 'i18next';

import './language-selector.scss';

export const LanguageSelector = () => {
	const handleMenuClick: MenuProps['onClick'] = e => {
		console.log('click', e);
		i18next.changeLanguage(e.key);
	};
	const items: MenuProps['items'] = [
		{
			label: 'Us',
			key: 'en-US',
			icon: <GlobalOutlined />
		},
		{
			label: 'It',
			key: 'it-IT',
			icon: <GlobalOutlined />
		}
	];
	const menuProps = {
		items,
		onClick: handleMenuClick
	};
	return (
		<ErrorBoundary>
			<Dropdown menu={menuProps}>
				<Button icon={<GlobalOutlined />} />
			</Dropdown>
		</ErrorBoundary>
	);
};
