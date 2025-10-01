import { Button, Divider, Segmented, Space } from 'antd';
import { CopyOutlined, MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { useTheme } from '@/hooks/use-theme';

import pbds from '@/assets/powered-by-draw-steel.png';
import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	errors: Event[];
	clearErrors: () => void;
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	const { themeMode, setTheme } = useTheme();

	try {
		const clearErrors = () => {
			props.clearErrors();
			props.onClose();
		};

		const getError = (event: Event, index: number) => {
			let message = '';
			let output = '';
			const fields: { label: string, value: string }[] = [
				{ label: 'Type', value: `${event.type}` }
			];

			if (event.type === 'error') {
				const error = event as ErrorEvent;

				message = error.message;
				output = `title ${error.message}, file ${error.filename}, line ${error.lineno}, col ${error.colno}, data ${JSON.stringify(error.error)}`;

				fields.push({ label: 'Location', value: `${error.filename}, line ${error.lineno}, column ${error.colno}` });
				fields.push({ label: 'Data', value: JSON.stringify(error.error) });
			}

			if (event.type === 'unhandledrejection') {
				const error = event as PromiseRejectionEvent;

				message = JSON.stringify(error.reason);
				output = `reason ${JSON.stringify(error.reason)}`;
			}

			return (
				<SelectablePanel key={index}>
					<HeaderText
						extra={
							<Button
								type='text'
								icon={<CopyOutlined />}
								onClick={() => navigator.clipboard.writeText(output)}
							/>
						}
					>
						{message}
					</HeaderText>
					{fields.map((field, n) => <Field key={n} label={field.label} value={field.value} />)}
				</SelectablePanel>
			);
		};

		return (
			<Modal
				content={
					<div className='about-modal'>
						<div className='logo-container'>
							<LogoPanel />
						</div>
						<p>
							Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
						</p>
						<p>
							To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
						</p>
						<p>
							If you would like to contribute to this project, you can find the code <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
						</p>
						<Field label='Version' value={pkg.version} />
						<Divider />
						<p>
							<b>FORGE STEEL</b> is free.
						</p>
						<p>
							If you really feel the need to show your appreciation, I'd be grateful if you would take whatever you feel the app is worth and donate it to a local mental health charity.
						</p>
						<p>
							If after all that you <i>still</i> have too much spare cash, you can always <a href='https://coff.ee/andyaiken' target='_blank'>buy me a coffee</a>.
						</p>
						<Divider />
						<div className='logo-container'>
							<img src={pbds} />
						</div>
						<p>
							<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
						</p>
						<p>
							<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
						</p>
						<Divider />
						<Segmented
							block={true}
							value={themeMode}
							onChange={setTheme}
							options={[
								{ label: 'Light', value: 'light', icon: <SunOutlined /> },
								{ label: 'System', value: 'system', icon: <SettingOutlined /> },
								{ label: 'Dark', value: 'dark', icon: <MoonOutlined /> }
							]}
						/>
						{
							props.errors.length > 0 ?
								<Divider />
								: null
						}
						{
							props.errors.length > 0 ?
								<Expander
									title='Logs'
									extra={[
										<DangerButton key='clear' mode='clear' onConfirm={clearErrors} />
									]}
								>
									<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
										{props.errors.map(getError)}
									</Space>
								</Expander>
								: null
						}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
