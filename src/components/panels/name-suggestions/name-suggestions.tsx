import { Button, Divider, Flex, Popover } from 'antd';
import { SyncOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { NameGenerator } from '@/utils/name-generator';
import { useState } from 'react';

interface Props {
	onSelect: (value: string) => void;
}

export const NameSuggestions = (props: Props) => {
	const [ open, setOpen ] = useState<boolean>(false);
	const [ suggestions, setSuggestions ] = useState<string[]>([]);

	const onOpenChange = (value: boolean) => {
		if (value) {
			refreshSuggestions();
		}

		setOpen(value);
	};

	const refreshSuggestions = () => {
		const list = [];

		while (list.length < 5) {
			list.push(NameGenerator.generateName());
		}

		setSuggestions(Collections.sort(list, x => x));
	};

	const selectSuggestion = (value: string) => {
		setOpen(false);
		props.onSelect(value);
	};

	return (
		<ErrorBoundary>
			<Popover
				open={open}
				onOpenChange={onOpenChange}
				trigger='click'
				content={
					<Flex orientation='vertical' gap={5}>
						{
							suggestions.map((str, n) => (
								<Button key={n} block={true} type='text' onClick={() => selectSuggestion(str)}>
									{str}
								</Button>
							))
						}
						<Divider />
						<Button block={true} type='text' icon={<SyncOutlined />} onClick={refreshSuggestions} />
					</Flex>
				}
			>
				<Button icon={<ThunderboltOutlined />} />
			</Popover>
		</ErrorBoundary>
	);
};
