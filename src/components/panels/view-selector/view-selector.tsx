import { Button, Flex, Popover, Segmented, Space } from 'antd';
import { DesktopOutlined, DownOutlined, FilePdfOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './view-selector.scss';

interface Props {
	value: string;
	showHeroOptions?: boolean;
	onChange: (value: string) => void;
}

export const ViewSelector = (props: Props) => {
	const createOption = (value: string, title: string, icon: ReactNode) => {
		return {
			value: value,
			label: (
				<Popover content={title}>
					{icon}
				</Popover>
			)
		};
	};

	return (
		<ErrorBoundary>
			<Flex gap={3} className='view-selector'>
				<Segmented
					options={[
						createOption('modern', 'Interactive View (for on screen use)', <DesktopOutlined />),
						createOption('classic', 'Classic View (for printing)', <FilePdfOutlined />)
					]}
					value={props.value}
					onChange={props.onChange}
				/>
				{
					props.showHeroOptions ?
						<Popover
							trigger='click'
							content={
								<Space direction='vertical'>
									<Button block={true} onClick={() => props.onChange('abilities')}>
										Standard Abilities
									</Button>
									<Button block={true} onClick={() => props.onChange('notes')}>
										Notes
									</Button>
								</Space>
							}
						>
							<Button icon={<DownOutlined />} />
						</Popover>
						: null
				}
			</Flex>
		</ErrorBoundary>
	);
};
