import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './clocktower-page.scss';

import shield1 from '@/assets/clocktower/clocktower-townsfolk.png';
import shield2 from '@/assets/clocktower/clocktower-outsider.png';
import shield3 from '@/assets/clocktower/clocktower-minion.png';
import shield4 from '@/assets/clocktower/clocktower-demon.png';
import shield5 from '@/assets/clocktower/clocktower-traveller.png';

interface Props {
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader>
					<img className='image' src={shield1} />
					<img className='image' src={shield2} />
					<img className='image' src={shield3} />
					<img className='image' src={shield4} />
					<img className='image' src={shield5} />
				</AppHeader>
				<div className='clocktower-page-content'>
					<ClocktowerScriptPanel script={ClocktowerData.standard} />
					<Divider />
					<ClocktowerScriptPanel script={ClocktowerData.teensy} />
				</div>
				<AppFooter
					page='welcome'
					params={props.params}
				/>
			</div>
		</ErrorBoundary>
	);
};
