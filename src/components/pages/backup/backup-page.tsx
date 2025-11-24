import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Hero } from '@/models/hero';
import { HeroPanel } from '@/components/panels/hero/hero-panel';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { Utils } from '@/utils/utils';

import './backup-page.scss';

interface Props {
	heroes: Hero[];
	homebrewSourcebooks: Sourcebook[];
	options: Options;
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
}

export const BackupPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='backup-page'>
				<div className='backup-page-content'>
					{
						props.heroes.map(hero => (
							<SelectablePanel key={hero.id} onSelect={() => Utils.exportData(hero.name || 'Unnamed Hero', hero, 'hero')}>
								<HeroPanel hero={hero} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
							</SelectablePanel>
						))
					}
					{
						props.homebrewSourcebooks.map(sb => (
							<SelectablePanel key={sb.id} onSelect={() => Utils.exportData(sb.name || 'Unnamed Sourcebook', sb, 'sourcebook')}>
								<SourcebookPanel sourcebook={sb} />
							</SelectablePanel>
						))
					}
					{
						props.heroes.length + props.homebrewSourcebooks.length === 0 ?
							<Empty text='Nothing to back up' />
							: null
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
