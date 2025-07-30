import { Alert, AutoComplete, Button, Flex, Input, Upload } from 'antd';
import { DownloadOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '../../../../../utils/collections';
import { DangerButton } from '../../../../controls/danger-button/danger-button';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '../../../../../models/feature';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
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
					{
						props.hero.features.filter(f => f.id === 'default-language').map(f => (
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
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
