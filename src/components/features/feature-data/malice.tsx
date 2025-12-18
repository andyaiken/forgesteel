import { Button, Empty, Flex, Input, Select, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Feature, FeatureMaliceData } from '@/models/feature';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PowerRoll } from '@/models/power-roll';
import { PowerRollPanel } from '@/components/panels/power-roll/power-roll-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureMaliceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoMalice = (props: InfoProps) => {
	const sections = (props.data.sections ?? []).map((section, n) => (typeof section === 'string') ?
		<Markdown key={n} text={section} />
		:
		<PowerRollPanel key={n} powerRoll={section} test={true} />
	);

	return (
		<div>
			{sections}
		</div>
	);
};

interface EditProps {
	data: FeatureMaliceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureMaliceData) => void;
}

export const EditMalice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureMaliceData>(Utils.copy(props.data));

	const setEchelon = (value: number) => {
		const copy = Utils.copy(data);
		copy.echelon = value;
		setData(copy);
		props.setData(copy);
	};

	const setCost = (value: number) => {
		const copy = Utils.copy(data);
		copy.cost = value;
		setData(copy);
		props.setData(copy);
	};

	const setRepeatable = (value: boolean) => {
		const copy = Utils.copy(data);
		copy.repeatable = value;
		setData(copy);
		props.setData(copy);
	};

	const addMaliceSectionText = (data: FeatureMaliceData) => {
		const copy = Utils.copy(data);
		copy.sections.push('');
		setData(copy);
		props.setData(copy);
	};

	const addMaliceSectionPowerRoll = (data: FeatureMaliceData) => {
		const copy = Utils.copy(data);
		copy.sections.push(FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might ],
			tier1: '',
			tier2: '',
			tier3: ''
		}));
		setData(copy);
		props.setData(copy);
	};

	const moveMaliceSection = (data: FeatureMaliceData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.sections = Collections.move(copy.sections, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteMaliceSection = (data: FeatureMaliceData, index: number) => {
		const copy = Utils.copy(data);
		copy.sections.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setMaliceSectionText = (data: FeatureMaliceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		copy.sections[index] = value;
		setData(copy);
		props.setData(copy);
	};

	const setMaliceSectionPowerRollCharacteristics = (data: FeatureMaliceData, index: number, value: Characteristic[]) => {
		const copy = Utils.copy(data);
		const pr = copy.sections[index] as PowerRoll;
		pr.characteristic = value;
		setData(copy);
		props.setData(copy);
	};

	const setMaliceSectionPowerRoll1 = (data: FeatureMaliceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		const pr = copy.sections[index] as PowerRoll;
		pr.tier1 = value;
		setData(copy);
		props.setData(copy);
	};

	const setMaliceSectionPowerRoll2 = (data: FeatureMaliceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		const pr = copy.sections[index] as PowerRoll;
		pr.tier2 = value;
		setData(copy);
		props.setData(copy);
	};

	const setMaliceSectionPowerRoll3 = (data: FeatureMaliceData, index: number, value: string) => {
		const copy = Utils.copy(data);
		const pr = copy.sections[index] as PowerRoll;
		pr.tier3 = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Echelon</HeaderText>
			<NumberSpin min={1} max={4} value={data.echelon} onChange={setEchelon} />
			<HeaderText>Cost</HeaderText>
			<NumberSpin min={1} value={data.cost} onChange={setCost} />
			<Toggle label='Allow extra' value={data.repeatable === true} onChange={setRepeatable} />
			<HeaderText>Sections</HeaderText>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					data.sections.map((section, n) => (
						<Expander
							key={n}
							title='Malice Section'
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMaliceSection(data, n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMaliceSection(data, n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMaliceSection(data, n); }} />
							]}
						>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									(typeof section === 'string') ?
										<div>
											<HeaderText>Text</HeaderText>
											<MarkdownEditor value={section} onChange={value => setMaliceSectionText(data, n, value)} />
										</div>
										:
										<Space orientation='vertical' style={{ width: '100%' }}>
											<HeaderText>Power Roll</HeaderText>
											<Select
												style={{ width: '100%' }}
												status={section.characteristic.length === 0 ? 'warning' : ''}
												placeholder='Characteristics'
												mode='multiple'
												options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
												optionRender={option => <div className='ds-text'>{option.data.value}</div>}
												value={section.characteristic}
												onChange={value => setMaliceSectionPowerRollCharacteristics(data, n, value)}
											/>
											<Input
												status={section.tier1 === '' ? 'warning' : ''}
												placeholder='Tier 1'
												allowClear={true}
												value={section.tier1}
												onChange={e => setMaliceSectionPowerRoll1(data, n, e.target.value)}
											/>
											<Input
												status={section.tier1 === '' ? 'warning' : ''}
												placeholder='Tier 2'
												allowClear={true}
												value={section.tier2}
												onChange={e => setMaliceSectionPowerRoll2(data, n, e.target.value)}
											/>
											<Input
												status={section.tier1 === '' ? 'warning' : ''}
												placeholder='Tier 3'
												allowClear={true}
												value={section.tier3}
												onChange={e => setMaliceSectionPowerRoll3(data, n, e.target.value)}
											/>
										</Space>
								}
							</Space>
						</Expander>
					))
				}
				{
					data.sections.length === 0 ?
						<Empty />
						: null
				}
				<Flex gap='8px'>
					<Button block={true} onClick={() => addMaliceSectionText(data)}>Add Text</Button>
					<Button block={true} onClick={() => addMaliceSectionPowerRoll(data)}>Add a Power Roll</Button>
				</Flex>
			</Space>
		</Space>
	);
};
