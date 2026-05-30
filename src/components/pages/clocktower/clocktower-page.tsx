import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Segmented } from 'antd';
import { useState } from 'react';

import './clocktower-page.scss';

interface Props {
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	const [ scriptName, setScriptName ] = useState<string>(ClocktowerData.standard.meta.name);

	const script = [
		ClocktowerData.standard,
		ClocktowerData.teensy
	].find(s => s.meta.name === scriptName);

	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader>
					<ButtonGroup
						buttons={[
							{
								type: 'control',
								control: (
									<Segmented
										options={[
											{ label: 'Standard', value: ClocktowerData.standard.meta.name },
											{ label: 'Teensy', value: ClocktowerData.teensy.meta.name }
										]}
										value={scriptName}
										onChange={setScriptName}
									/>
								)
							}
						]}
					/>
				</AppHeader>
				<div className='clocktower-page-content'>
					{script ? <ClocktowerScriptPanel script={script} /> : null}
				</div>
				<AppFooter
					page='clocktower'
					params={props.params}
				/>
			</div>
		</ErrorBoundary>
	);
};
