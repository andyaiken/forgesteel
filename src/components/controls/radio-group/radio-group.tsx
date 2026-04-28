import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { Tag } from 'antd';

interface BaseProps<T> {
	label: string;
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
	if (props.multiple) {
		return (
			<ErrorBoundary>
				<LabelControl
					label={props.label}
					control={
						<Tag.CheckableTagGroup
							multiple={true}
							options={props.options}
							value={props.value}
							onChange={props.onChange}
						/>
					}
				/>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<LabelControl
				label={props.label}
				control={
					<Tag.CheckableTagGroup
						options={props.options}
						value={props.value}
						onChange={props.onChange}
					/>
				}
			/>
		</ErrorBoundary>
	);
};
