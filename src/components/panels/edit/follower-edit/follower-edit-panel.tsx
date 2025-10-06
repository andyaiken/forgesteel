import { Input, Segmented, Select, Space, Tabs } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Follower } from '@/models/follower';
import { FollowerLogic } from '@/logic/follower-logic';
import { FollowerType } from '@/enums/follower-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './follower-edit-panel.scss';

interface Props {
	follower: Follower;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (follower: Follower) => void;
}

export const FollowerEditPanel = (props: Props) => {
	const [ follower, setFollower ] = useState<Follower>(props.follower);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(follower);
				copy.name = value;
				setFollower(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(follower);
				copy.description = value;
				setFollower(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={follower.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={follower.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={follower.description} onChange={setDescription} />
				</Space>
			);
		};

		const getDetailsEditSection = () => {
			const setFollowerType = (value: FollowerType) => {
				const copy = Utils.copy(follower) as Follower;
				copy.type = value;
				copy.characteristics.forEach(ch => {
					switch (ch.characteristic) {
						case Characteristic.Might:
							ch.value = value === FollowerType.Artisan ? 1 : 0;
							break;
						case Characteristic.Reason:
							ch.value = 1;
							break;
						case Characteristic.Intuition:
							ch.value = value === FollowerType.Sage ? 1 : 0;
							break;
						default:
							ch.value = 0;
							break;
					}
				});
				copy.skills = [];
				setFollower(copy);
				props.onChange(copy);
			};

			const setFollowerCharacteristics = (value: { characteristic: Characteristic, value: number }[]) => {
				const copy = Utils.copy(follower) as Follower;
				copy.characteristics = value;
				setFollower(copy);
				props.onChange(copy);
			};

			const setFollowerSkills = (value: string[]) => {
				const copy = Utils.copy(follower) as Follower;
				copy.skills = value;
				setFollower(copy);
				props.onChange(copy);
			};

			const setFollowerLanguages = (value: string[]) => {
				const copy = Utils.copy(follower) as Follower;
				copy.languages = value;
				setFollower(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Type</HeaderText>
					<Segmented
						block={true}
						options={[ FollowerType.Artisan, FollowerType.Sage ].map(o => ({ value: o, label: o }))}
						value={follower.type}
						onChange={setFollowerType}
					/>
					<HeaderText>Characteristics</HeaderText>
					<Select
						style={{ width: '100%' }}
						allowClear={true}
						placeholder='Characteristics'
						options={FollowerLogic.getCharacteristicArrays(follower.type).map(o => ({ value: o.filter(ch => ch.value !== 0).map(ch => `${ch.characteristic} ${ch.value}`).join(', '), array: o }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={follower.characteristics.filter(ch => ch.value !== 0).map(ch => `${ch.characteristic} ${ch.value}`).join(', ')}
						onChange={(_text, option) => {
							const data = option as unknown as { value: string, array: { characteristic: Characteristic, value: number }[] };
							setFollowerCharacteristics(data.array);
						}}
					/>
					<HeaderText>Skills</HeaderText>
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						maxCount={4}
						allowClear={true}
						placeholder='Skills'
						options={FollowerLogic.getSkillOptions(follower.type, props.sourcebooks).map(s => ({ value: s.name, label: s.name, desc: s.description }))}
						optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label,
									option.desc
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={follower.skills}
						onChange={setFollowerSkills}
					/>
					<HeaderText>Languages</HeaderText>
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						maxCount={2}
						allowClear={true}
						placeholder='Languages'
						options={FollowerLogic.getLanguageOptions(props.sourcebooks).map(s => ({ value: s.name, label: s.name, desc: s.description }))}
						optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label,
									option.desc
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={follower.languages}
						onChange={setFollowerLanguages}
					/>
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='follower-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Follower',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getDetailsEditSection()
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
