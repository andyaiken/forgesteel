import { Divider, Select, Space } from 'antd';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

interface Props {
	sourcebooks: Sourcebook[];
	sourcebookID: string;
	setSourcebookID: (value: string) => void;
}

export const DestinationSelector = (props: Props) => {
	const sourcebookOptions: { label: string, value: string }[] = props.sourcebooks
		.filter(cs => cs.type === SourcebookType.Homebrew)
		.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

	if (sourcebookOptions.length === 0) {
		return null;
	}

	sourcebookOptions.push({ label: 'In a new sourcebook', value: '' });

	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<div>Where do you want it to live?</div>
			<Select
				style={{ width: '100%' }}
				placeholder='Select'
				options={sourcebookOptions}
				optionRender={option => <div className='ds-text'>{option.data.label}</div>}
				value={props.sourcebookID}
				onChange={props.setSourcebookID}
			/>
			<Divider />
		</Space>
	);
};
