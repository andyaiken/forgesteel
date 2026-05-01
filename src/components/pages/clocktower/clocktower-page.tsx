import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';

import './clocktower-page.scss';

interface Props {
	options: Options;
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader />
				<div className='clocktower-page-content'>
					<SelectablePanel>
						<ClocktowerScriptPanel
							script={ClocktowerData.script}
							detailsMap={ClocktowerData.detailsMap}
						/>
					</SelectablePanel>
				</div>
				<AppFooter
					page='welcome'
					params={props.params}
					options={props.options}
				/>
			</div>
		</ErrorBoundary>
	);
};
