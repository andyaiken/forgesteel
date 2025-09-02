import { Alert, AutoComplete, Button, Divider, Flex, Input, Tag, Upload } from 'antd';
import { DownloadOutlined, SyncOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '../../../../../utils/collections';
import { DangerButton } from '../../../../controls/danger-button/danger-button';
import { Expander } from '../../../../controls/expander/expander';
import { FactoryLogic } from '../../../../../logic/factory-logic';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '../../../../../models/feature';
import { FeatureType } from '../../../../../enums/feature-type';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { HeroLogic } from '../../../../../logic/hero-logic';
import { Markdown } from '../../../../controls/markdown/markdown';
import { NameGenerator } from '../../../../../utils/name-generator';
import { Options } from '../../../../../models/options';
import { Sourcebook } from '../../../../../models/sourcebook';

import './details-section.scss';

interface DetailsSectionProps {
	hero: Hero;
	allHeroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	setName: (value: string) => void;
	setPicture: (value: string | null) => void;
	setFolder: (value: string) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
	updateHeroData: () => void;
}

export const DetailsSection = (props: DetailsSectionProps) => {
	const folders = props.allHeroes
		.map(h => h.folder)
		.filter(f => !!f)
		.sort();

	try {
		return (
			<div className='hero-edit-content details-section'>
				<div className='hero-edit-content-column single-column choices' id='details-main'>
					<HeaderText>Name</HeaderText>
					<Input
						status={props.hero.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => props.setName(NameGenerator.generateName())} />}
						value={props.hero.name}
						onChange={e => props.setName(e.target.value)}
					/>
					<HeaderText>Portrait</HeaderText>
					{
						props.hero.picture ?
							<Flex align='center' justify='center' gap={10}>
								<img className='portrait-edit' src={props.hero.picture} title='Portrait' />
								<DangerButton mode='clear' onConfirm={() => props.setPicture(null)} />
							</Flex>
							:
							<Upload
								style={{ width: '100%' }}
								accept='.png,.webp,.gif,.jpg,.jpeg,.svg'
								showUploadList={false}
								beforeUpload={file => {
									const reader = new FileReader();
									reader.onload = progress => {
										if (progress.target) {
											const content = progress.target.result as string;
											props.setPicture(content);
										}
									};
									reader.readAsDataURL(file);
									return false;
								}}
							>
								<Button>
									<DownloadOutlined />
									Choose a picture
								</Button>
							</Upload>
					}
					<HeaderText>Folder</HeaderText>
					<AutoComplete
						value={props.hero.folder}
						options={Collections.distinct(folders, f => f).map(option => ({ value: option, label: <div className='ds-text'>{option}</div> }))}
						placeholder='Folder'
						onSelect={value => props.setFolder(value)}
						onChange={value => props.setFolder(value)}
						showSearch={true}
						filterOption={(value, option) => value.toLowerCase().split(' ').every(token => option!.value.toLowerCase().indexOf(token.toLowerCase()) !== -1)}
					/>
					<Alert
						type='info'
						showIcon={true}
						message='You can add your hero to a folder to group it with other heroes.'
					/>
					<Divider />
					<Expander title='Language Choices'>
						{
							HeroLogic.getFeatures(props.hero)
								.map(f => f.feature)
								.filter(f => f.type === FeatureType.LanguageChoice)
								.map(f => {
									return FactoryLogic.feature.createLanguageChoice({
										id: f.id,
										name: f.name || 'Language',
										description: `${f.data.options.length > 0 ? `**Skills**: ${f.data.options.join(', ')}` : ''}`,
										options: [ ...f.data.options ],
										count: f.data.count,
										selected: [ ...f.data.selected ]
									});
								})
								.map(f => (
									<FeatureConfigPanel
										key={f.id}
										feature={f}
										options={props.options}
										hero={props.hero}
										sourcebooks={props.sourcebooks}
										setData={props.setFeatureData}
									/>
								))
						}
					</Expander>
					<Expander title='Skill Choices'>
						{
							HeroLogic.getFeatures(props.hero)
								.map(f => f.feature)
								.filter(f => f.type === FeatureType.SkillChoice)
								.map(f => {
									return FactoryLogic.feature.createSkillChoice({
										id: f.id,
										name: 'Skill',
										description: `
${f.data.options.length > 0 ? `**Skills**: ${f.data.options.join(', ')}` : ''}
${f.data.listOptions.length > 0 ? `**Lists**: ${f.data.listOptions.map(s => `${s} Skills`).join(', ')}` : ''}`,
										options: [ ...f.data.options ],
										listOptions: [ ...f.data.listOptions ],
										count: f.data.count,
										selected: [ ...f.data.selected ]
									});
								})
								.map(f => (
									<FeatureConfigPanel
										key={f.id}
										feature={f}
										options={props.options}
										hero={props.hero}
										sourcebooks={props.sourcebooks}
										setData={props.setFeatureData}
									/>
								))
						}
					</Expander>
					<Expander
						title={
							<>
								<Tag color='red'>BETA</Tag>
								Update
							</>
						}
					>
						<HeaderText>Update</HeaderText>
						<div className='ds-text'>
							To ensure that your hero is using the most up-to-date version of the Draw Steel rules, press the button below.
						</div>
						<DangerButton
							mode='block'
							label='Update Hero Data'
							icon={<SyncOutlined />}
							message={
								<Markdown
									text={`
This feature **has not been fully tested** and **could cause data loss**.

Please create a data backup of your hero before proceeding.

If you discover any problems, please raise an issue in GitHub or on Discord.`}
								/>
							}
							onConfirm={props.updateHeroData}
						/>
					</Expander>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
