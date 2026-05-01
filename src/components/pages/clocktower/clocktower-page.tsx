import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Options } from '@/models/options';

import './clocktower-page.scss';

import shield_e from '@/assets/clocktower/clocktower-e.png';
import shield_g from '@/assets/clocktower/clocktower-g.png';
import shield_n from '@/assets/clocktower/clocktower-n.png';

interface Props {
	options: Options;
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader>
					<img className='image' src={shield_e} />
					<img className='image' src={shield_g} />
					<img className='image' src={shield_n} />
				</AppHeader>
				<div className='clocktower-page-content'>
					<ClocktowerScriptPanel
						script={ClocktowerData.script}
						detailsMap={ClocktowerData.detailsMap}
					/>
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
