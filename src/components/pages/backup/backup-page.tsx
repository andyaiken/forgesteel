import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroOverviewPanel } from '@/components/panels/hero-overview/hero-overview-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { Utils } from '@/utils/utils';
import { useHeroes } from '@/contexts/data-context';

import './backup-page.scss';

interface Props {
	homebrewSourcebooks: Sourcebook[];
}

export const BackupPage = (props: Props) => {
	const heroes = useHeroes();
	return (
		<ErrorBoundary>
			<div className='backup-page'>
				<div className='backup-page-content'>
					{
						heroes.map(hero => (
							<SelectablePanel key={hero.id} onSelect={() => Utils.exportData(hero.name || 'Unnamed Hero', hero, 'hero')}>
								<HeroOverviewPanel hero={HeroLogic.createOverview(hero)} />
							</SelectablePanel>
						))
					}
					{
						props.homebrewSourcebooks.map(sb => (
							<SelectablePanel key={sb.id} onSelect={() => Utils.exportData(sb.name || 'Unnamed Sourcebook', sb, 'sourcebook')}>
								<SourcebookPanel sourcebook={sb} sourcebooks={[]} />
							</SelectablePanel>
						))
					}
					{
						heroes.length + props.homebrewSourcebooks.length === 0 ?
							<Empty text='Nothing to back up' />
							: null
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
