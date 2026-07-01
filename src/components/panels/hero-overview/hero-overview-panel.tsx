import { Button, Flex } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroOverview } from '@/models/hero';
import { HeroOverviewToken } from '@/components/panels/token/token';
import { ReactNode } from 'react';

import './hero-overview-panel.scss';

interface Props {
	hero: HeroOverview;
	extra?: ReactNode;
	showFolderTag?: boolean;
	visibility?: {
		visible: boolean;
		onSetVisibility: (value: boolean) => void;
	};
}

export const HeroOverviewPanel = (props: Props) => {
	const className = props.hero.isDisabled ? 'hero-overview-panel disabled' : 'hero-overview-panel';

	const getButtons = () => {
		const buttons: ReactNode[] = [];

		if (props.visibility) {
			buttons.push(
				<Button
					key='show-hide'
					type='text'
					title='Show/Hide'
					icon={props.visibility.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
					onClick={e => {
						e.stopPropagation();
						props.visibility!.onSetVisibility(!props.visibility!.visible);
					}}
				/>
			);
		}

		if (props.extra) {
			buttons.push(props.extra);
		}

		return buttons.length > 0 ? <Flex>{buttons}</Flex> : null;
	};

	return (
		<ErrorBoundary>
			<div className={className}>
				<HeaderText
					level={1}
					ribbon={props.hero.picture ? <HeroOverviewToken hero={props.hero} size={34} /> : null}
					tags={props.showFolderTag && props.hero.folder ? [ props.hero.folder ] : []}
					extra={getButtons()}
				>
					{props.hero.name || 'Unnamed Hero'}
				</HeaderText>
				{props.hero.ancestry ? <Field compact={true} label='Ancestry' value={props.hero.ancestry} /> : null}
				{props.hero.background ? <Field compact={true} label='Background' value={props.hero.background} /> : null}
				{props.hero.class ? <Field compact={true} label='Class' value={props.hero.class} /> : null}
				{props.hero.complication ? <Field compact={true} label='Complication' value={props.hero.complication} /> : null}
			</div>
		</ErrorBoundary>
	);
};
