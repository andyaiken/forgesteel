import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { ReactNode } from 'react';
import { Tag } from 'antd';

interface BaseProps<T> {
	label?: string;
	options: T[];
}

interface SingleModeProps<T> extends BaseProps<T> {
	multiple?: false;
	value: T;
	onChange: (value: T | null) => void;
}

interface MultipleModeProps<T> extends BaseProps<T> {
	multiple: true;
	value: T[];
	onChange: (value: T[]) => void;
}

type Props<T> = SingleModeProps<T> | MultipleModeProps<T>;

export const RadioGroup = <T extends string>(props: Props<T>) => {
	let content: ReactNode;
	if (props.multiple) {
		content = (
			<Tag.CheckableTagGroup
				multiple={true}
				options={props.options}
				value={props.value}
				onChange={props.onChange}
			/>
		);
	} else {
		content = (
			<Tag.CheckableTagGroup
				multiple={false}
				options={props.options}
				value={props.value}
				onChange={props.onChange}
			/>
		);
	}

	if (props.label) {
		return (
			<ErrorBoundary>
				<LabelControl
					label={props.label}
					control={content}
				/>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			{content}
		</ErrorBoundary>
	);
};
