import { Button, Divider, Flex, Input, Segmented, Space } from 'antd';
import { CopyOutlined, FlagFilled, FlagOutlined, MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureFlags } from '@/utils/feature-flags';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { useState } from 'react';
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
	const [ page, setPage ] = useState<string>('About');
	const [ flag, setFlag ] = useState<string>('');

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

	const getAbout = () => {
		return (
			<div>
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
				<p>
					<a href='https://mcdm.gg/DrawSteel/DrawSteelGlyphs.zip' target='_blank'>Draw Steel Glyphs Font</a> by <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions</a> is licensed under <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>CC BY-SA 4.0</a>.
				</p>
			</div>
		);
	};

	const getAdmin = () => {
		return (
			<div>
				<Segmented
					block={true}
					value={themeMode}
					onChange={setTheme}
					options={[
						{ label: 'Light Mode', value: 'light', icon: <SunOutlined /> },
						{ label: 'System', value: 'system', icon: <SettingOutlined /> },
						{ label: 'Dark Mode', value: 'dark', icon: <MoonOutlined /> }
					]}
				/>
				<Divider />
				<Expander title='Feature Flags'>
					<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
						<Flex align='center' justify='space-between' gap={10}>
							<Input
								placeholder='Enter a feature flag code'
								allowClear={true}
								value={flag}
								onChange={e => setFlag(e.target.value)}
							/>
							{
								flag && FeatureFlags.flagExists(flag) && !FeatureFlags.hasFlag(flag) ?
									<Button
										icon={<FlagOutlined />}
										onClick={() => {
											FeatureFlags.add(flag);
											setFlag('');
										}}
									/>
									: null
							}
						</Flex>
						{
							FeatureFlags.active().map(flag => (
								<div key={flag.code} className='feature-flag'>
									<FlagFilled style={{ color: 'rgb(64, 150, 255)' }} />
									<div className='ds-text' style={{ flex: '1 1 0' }}>{flag.description}</div>
									<DangerButton
										mode='clear'
										message='Removing this flag will reload the app.'
										onConfirm={() => {
											FeatureFlags.remove(flag.code);
											window.location.reload();
										}}
									/>
								</div>
							))
						}
						{
							FeatureFlags.active().length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</Expander>
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
		);
	};

	const getContent = () => {
		switch (page) {
			case 'About':
				return getAbout();
			case 'Admin':
				return getAdmin();
		}

		return null;
	};

	return (
		<Modal
			toolbar={
				<Flex align='center' justify='center' style={{ width: '100%' }}>
					<Segmented
						name='tabs'
						options={[ 'About', 'Admin' ]}
						value={page}
						onChange={setPage}
					/>
				</Flex>
			}
			content={
				<div className='about-modal'>
					{getContent()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
