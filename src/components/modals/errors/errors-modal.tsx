import { Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';

import './errors-modal.scss';

interface Props {
	errors: Event[];
	clearErrors: () => void;
	onClose: () => void;
}

export const ErrorsModal = (props: Props) => {
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
				<div className='errors-modal'>
					<HeaderText
						extra={<DangerButton key='clear' mode='clear' onConfirm={clearErrors} />}
					>
						Errors
					</HeaderText>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{props.errors.map(getError)}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
