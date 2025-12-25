import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Button, Dropdown, MenuProps } from 'antd';
import i18next from 'i18next';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import './language-selector.scss';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const handleMenuClick: MenuProps['onClick'] = e => {
		console.log('click', e);
		i18next.changeLanguage(e.key);
	};
	const items: MenuProps['items'] = [
		{
			label: 'Us',
			key: 'en-US',
			icon: <span className='fi fi-us' />
		},
		{
			label: 'It',
			key: 'it-IT',
			icon: <span className='fi fi-it' />
		}
	];
	const menuProps = {
		items,
		onClick: handleMenuClick
	};
	return (
		<ErrorBoundary>
			<Dropdown menu={menuProps}>
				<Button icon={<span className={`fi fi-${i18n.language.split('-')[1]?.toLowerCase() ?? 'us'}`} />} />
			</Dropdown>
		</ErrorBoundary>
	);
};
