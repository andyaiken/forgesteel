import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroOverview } from '@/models/hero';
import { HeroOverviewToken } from '@/components/panels/token/token';

import './hero-overview-panel.scss';

interface Props {
	hero: HeroOverview;
}

export const HeroOverviewPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='hero-overview-panel'>
				<HeaderText
					level={1}
					ribbon={props.hero.picture ? <HeroOverviewToken hero={props.hero} size={34} /> : null}
					tags={props.hero.folder ? [ props.hero.folder ] : []}
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
