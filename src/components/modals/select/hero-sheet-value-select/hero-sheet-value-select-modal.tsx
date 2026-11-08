import { Button, Flex, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroSheetValue } from '@/enums/hero-sheet-value';
import { HeroSheetValueData } from '@/data/hero-sheet-value-data';
import { Modal } from '@/components/modals/modal/modal';
import { Toggle } from '@/components/controls/toggle/toggle';

import './hero-sheet-value-select-modal.scss';

interface Props {
	hiddenValues: HeroSheetValue[];
	onSelect: (values: HeroSheetValue[]) => void;
	onClose: () => void;
}

export const HeroSheetValueSelectModal = (props: Props) => {
	const addValues = (values: HeroSheetValue[]) => {
		props.onSelect([ ...props.hiddenValues, ...values.filter(value => !props.hiddenValues.includes(value)) ]);
	};

	const removeValues = (values: HeroSheetValue[]) => {
		props.onSelect(props.hiddenValues.filter(value => !values.includes(value)));
	};

	return (
		<Modal
			content={
				<div className='hero-sheet-value-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						<Button block={true} onClick={() => props.onSelect([ ...HeroSheetValueData.recommended ])}>Recommended (for printing)</Button>
						{HeroSheetValueData.sections.map(section => (
							<div key={section.name}>
								<HeaderText
									extra={
										<Flex>
											<Button
												type='text'
												icon={<MinusCircleOutlined />}
												aria-label={`Show all ${section.name} values`}
												onClick={() => removeValues(section.values.map(option => option.value))}
											/>
											<Button
												type='text'
												icon={<PlusCircleOutlined />}
												aria-label={`Hide all ${section.name} values`}
												onClick={() => addValues(section.values.map(option => option.value))}
											/>
										</Flex>
									}
								>
									{section.name}
								</HeaderText>
								{section.values.map(option => (
									<Toggle
										key={option.value}
										label={option.label}
										value={props.hiddenValues.includes(option.value)}
										onChange={value => value ? addValues([ option.value ]) : removeValues([ option.value ])}
									/>
								))}
							</div>
						))}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
