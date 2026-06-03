import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { ButtonConfig, ButtonGroup, ControlConfig, DropdownConfig } from '@/components/controls/button-group/button-group';
import { CloseCircleFilled, CopyOutlined, WarningOutlined } from '@ant-design/icons';
import { Segmented, notification } from 'antd';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerScriptPanel } from '@/components/pages/clocktower/clocktower-script-panel/clocktower-script-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { useState } from 'react';

import './clocktower-page.scss';

interface Props {
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	const [ scriptName, setScriptName ] = useState<string>(ClocktowerData.standard.meta.name);
	const [ notify, notifyContext ] = notification.useNotification();

	const script = [
		ClocktowerData.standard,
		ClocktowerData.teensy
	].find(s => s.meta.name === scriptName);

	const copyToClipboard = () => {
		if (!script) {
			return;
		}

		const data = ClocktowerLogic.createExportScript(script);
		const json = JSON.stringify(data);
		window.navigator.clipboard.writeText(json);

		notify.info({
			title: 'Script Copied',
			description: 'This script has been copied into your clipboard. You can now import it into the BotC app.',
			placement: 'top'
		});
	};

	const buttons: (ButtonConfig | DropdownConfig | ControlConfig)[] = [];

	if (script) {
		const validation = ClocktowerLogic.validate(script);
		if ((validation.warnings.length + validation.errors.length) > 0) {
			buttons.push({
				type: 'dropdown',
				icon: validation.errors.length > 0 ? <CloseCircleFilled /> : <WarningOutlined />,
				popover: (
					<>
						{validation.errors.map((issue, n) => (<div key={`e${n}`} className='ds-text'>Error: {issue}</div>))}
						{validation.warnings.map((issue, n) => (<div key={`w${n}`} className='ds-text'>Warning: {issue}</div>))}
					</>
				)
			});
		}
	}
	buttons.push({ type: 'button', disabled: !script, label: 'Copy', icon: <CopyOutlined />, onClick: () => copyToClipboard() });
	buttons.push({
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
	});

	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader>
					<ButtonGroup buttons={buttons} />
				</AppHeader>
				<div className='clocktower-page-content'>
					{script ? <ClocktowerScriptPanel script={script} /> : null}
				</div>
				<AppFooter
					page='clocktower'
					params={props.params}
				/>
			</div>
			{notifyContext}
		</ErrorBoundary>
	);
};
