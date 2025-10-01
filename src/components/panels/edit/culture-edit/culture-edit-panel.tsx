import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { Input, Segmented, Select, Space, Tabs } from 'antd';
import { Culture } from '@/models/culture';
import { CultureType } from '@/enums/culture-type';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './culture-edit-panel.scss';

interface Props {
	culture: Culture;
	sourcebooks: Sourcebook[];
	onChange: (culture: Culture) => void;
}

export const CultureEditPanel = (props: Props) => {
	const [ culture, setCulture ] = useState<Culture>(props.culture);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(culture);
				copy.name = value;
				setCulture(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(culture);
				copy.description = value;
				setCulture(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={culture.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={culture.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={culture.description} onChange={setDescription} />
				</Space>
			);
		};

		const getDetailsEditSection = () => {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Segmented
						block={true}
						options={[ CultureType.Ancestral, CultureType.Professional ]}
						value={culture.type}
						onChange={value => {
							const copy = Utils.copy(culture);
							copy.type = value;
							setCulture(copy);
							props.onChange(copy);
						}}
					/>
					<Select
						style={{ width: '100%' }}
						allowClear={true}
						placeholder='Select language'
						options={SourcebookLogic.getLanguages(props.sourcebooks).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
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
						value={culture.language.data.selected.length > 0 ? culture.language.data.selected[0] : null}
						onChange={value => {
							const copy = Utils.copy(culture);
							copy.language.data.selected = value ? [ value ] : [];
							setCulture(copy);
							props.onChange(copy);
						}}
					/>
					<Select
						style={{ width: '100%' }}
						status={culture.environment === null ? 'warning' : ''}
						allowClear={true}
						placeholder='Select environment'
						options={EnvironmentData.getEnvironments().map(s => ({ value: s.id, label: s.name }))}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={culture.environment ? culture.environment.id : null}
						onChange={value => {
							const copy = Utils.copy(culture);
							const env = EnvironmentData.getEnvironments().find(e => e.id === value);
							if (env) {
								const envCopy = Utils.copy(env) as Feature;
								copy.environment = envCopy;
							}
							setCulture(copy);
							props.onChange(copy);
						}}
					/>
					<Select
						style={{ width: '100%' }}
						status={culture.organization === null ? 'warning' : ''}
						allowClear={true}
						placeholder='Select organization'
						options={OrganizationData.getOrganizations().map(s => ({ value: s.id, label: s.name }))}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={culture.organization ? culture.organization.id : null}
						onChange={value => {
							const copy = Utils.copy(culture);
							const org = OrganizationData.getOrganizations().find(o => o.id === value);
							if (org) {
								const orgCopy = Utils.copy(org) as Feature;
								copy.organization = orgCopy;
							}
							setCulture(copy);
							props.onChange(copy);
						}}
					/>
					<Select
						style={{ width: '100%' }}
						status={culture.upbringing === null ? 'warning' : ''}
						allowClear={true}
						placeholder='Select upbringing'
						options={UpbringingData.getUpbringings().map(s => ({ value: s.id, label: s.name }))}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={culture.upbringing ? culture.upbringing.id : null}
						onChange={value => {
							const copy = Utils.copy(culture);
							const ub = UpbringingData.getUpbringings().find(u => u.id === value);
							if (ub) {
								const ubCopy = Utils.copy(ub) as Feature;
								copy.upbringing = ubCopy;
							}
							setCulture(copy);
							props.onChange(copy);
						}}
					/>
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='culture-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Culture',
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
