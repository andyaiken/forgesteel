import { Button, Dropdown, MenuProps } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import i18next from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import '/node_modules/flag-icons/css/flag-icons.min.css';

import './language-selector.scss';

function getCountryCode(lang?: string): string {
	if (!lang) return 'gb';

	const parts = lang.split('-');

	// find the part that had length 2 (country code) or length 3 and is numeric (region code)
	const region = parts.find(
		part => part.length === 2 || (part.length === 3 && /^\d+$/.test(part))
	);

	if (region) {
		return region.toLowerCase();
	}

	const fallbackMap: Record<string, string> = {
		en: 'gb',
		it: 'it'
	};

	return fallbackMap[parts[0]] ?? 'gb';
}

export const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const handleMenuClick: MenuProps['onClick'] = e => {
		console.log('click', e);
		i18next.changeLanguage(e.key);
	};
	const items: MenuProps['items'] = [
		{
			label: 'English (GB)',
			key: 'en-GB',
			icon: <span className='fi fi-gb dropdown-icon' />
		},
		{
			label: 'English (US)',
			key: 'en-US',
			icon: <span className='fi fi-us dropdown-icon' />
		},
		{
			label: 'Italiano (IT)',
			key: 'it-IT',
			icon: <span className='fi fi-it dropdown-icon' />
		}
	];
	const menuProps = {
		items,
		onClick: handleMenuClick
	};
	const countryCode = useMemo(
		() => getCountryCode(i18n.resolvedLanguage),
		[ i18n.resolvedLanguage ]
	);

	return (
		<ErrorBoundary>
			<Dropdown menu={menuProps}>
				<Button shape='circle' className={`fi fi-${countryCode}`} />
			</Dropdown>
		</ErrorBoundary>
	);
};
