import { ConfigProvider, theme as antdTheme } from 'antd';
import { ReactNode } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface Props {
	children: ReactNode;
}

export const AppTheme = (props: Props) => {
	const { theme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<ConfigProvider
			theme={{
				algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
				token: isDark ? { colorBgBase: '#373737' } : {}
			}}
		>
			{props.children}
		</ConfigProvider>
	);
};
