import { ConfigProvider, theme as antdTheme } from 'antd';
import { ReactNode } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface Props {
	children: ReactNode;
}

/**
 * Puts Ant Design into its own dark theme rather than leaving it in light mode
 * and repainting it with CSS.
 *
 * Before this, every dark-mode surface Ant Design owns - drawers, dropdowns,
 * popovers, select menus, tabs - had to be overridden by hand in the app's
 * stylesheets, which is why those overrides were both sprawling and easy to
 * miss a component with. `darkAlgorithm` derives all of it instead.
 *
 * The palette is deliberately left at Ant Design's defaults so that light mode
 * is unchanged; the only token set is the dark base colour, which is pinned to
 * the app's existing dark canvas (rgb(55, 55, 55)) so that Ant Design's
 * surfaces land in the same tonal family as the pages behind them.
 */
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
