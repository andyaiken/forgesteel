import { AutoComplete, Button, Flex, Space, Upload } from 'antd';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DownloadOutlined } from '@ant-design/icons';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroTutorialPanel } from '@/components/panels/hero-tutorial/hero-tutorial-panel';
import { Info } from '@/components/controls/info/info';
import { NameSuggestions } from '@/components/panels/name-suggestions/name-suggestions';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { TutorialMode } from '@/enums/tutorial-mode';
import { Utils } from '@/utils/utils';
import { useHeroes } from '@/contexts/data-context';

import './details-section.scss';

interface DetailsSectionProps {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setName: (value: string) => void;
	setPicture: (value: string | null) => void;
	setFolder: (value: string) => void;
	setTutorialMode: (value: TutorialMode) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const DetailsSection = (props: DetailsSectionProps) => {
	const allHeroes = useHeroes();
	const folders = allHeroes
		.map(h => h.folder)
		.filter(f => !!f)
		.sort();

	const languageFeatures = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.type === FeatureType.LanguageChoice)
		.map(f => {
			return FactoryLogic.feature.createLanguageChoice({
				id: f.id,
				name: f.name || 'Language',
				options: [ ...f.data.options ],
				allowedTypes: [ ...f.data.allowedTypes ],
				count: f.data.count,
				selected: [ ...f.data.selected ]
			});
		});

	const skillFeatures = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.type === FeatureType.SkillChoice)
		.map(f => {
			return FactoryLogic.feature.createSkillChoice({
				id: f.id,
				name: 'Skill',
				options: [ ...f.data.options ],
				listOptions: [ ...f.data.listOptions ],
				count: f.data.count,
				selected: [ ...f.data.selected ]
			});
		});

	const languagesDone = languageFeatures.every(f => FeatureLogic.isChosen(f, props.hero, props.sourcebooks));
	const skillsDone = skillFeatures.every(f => FeatureLogic.isChosen(f, props.hero, props.sourcebooks));

	return (
		<div className='hero-edit-content details-section'>
			<div className='hero-edit-content-column selected' id='details-main'>
				<SelectablePanel>
					<HeaderText>Name</HeaderText>
					<Space.Compact style={{ width: '100%' }}>
						<TextInput
							status={props.hero.name === '' ? 'warning' : ''}
							placeholder='Name'
							allowClear={true}
							value={props.hero.name}
							onChange={props.setName}
						/>
						<NameSuggestions onSelect={props.setName} />
					</Space.Compact>
				</SelectablePanel>
				<SelectablePanel>
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
								beforeUpload={async file => {
									const reader = new FileReader();
									reader.onload = async progress => {
										if (progress.target) {
											const content = progress.target.result as string;
											const resized = await Utils.getResizedImage(content);
											props.setPicture(resized);
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
				</SelectablePanel>
				<SelectablePanel>
					<HeaderText
						extra={<Info>You can add your hero to a folder to group it with other heroes.</Info>}
					>
						Folder
					</HeaderText>
					<AutoComplete
						options={Collections.distinct(folders, f => f).map(option => ({ value: option, label: option }))}
						optionRender={o => <div className='ds-text'>{o.data.label}</div>}
						placeholder='Folder'
						allowClear={true}
						showSearch={{ filterOption: true }}
						value={props.hero.folder}
						onSelect={props.setFolder}
						onChange={props.setFolder}
					/>
				</SelectablePanel>
				<SelectablePanel>
					<HeroTutorialPanel value={props.hero.state.tutorialMode} onChange={props.setTutorialMode} />
				</SelectablePanel>
			</div>
			<div className='hero-edit-content-column selected'>
				<Expander
					title='Language Choices'
					expandedByDefault={!languagesDone}
					extra={[
						languagesDone ?
							<CheckIcon key='completed' state='success' />
							: null
					]}
				>
					{
						languageFeatures.map(f => (
							<FeatureConfigPanel
								key={f.id}
								feature={f}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setData={props.setFeatureData}
							/>
						))
					}
					{
						languageFeatures.length === 0 ?
							<Empty />
							: null
					}
				</Expander>
				<Expander
					title='Skill Choices'
					expandedByDefault={!skillsDone}
					extra={[
						skillsDone ?
							<CheckIcon key='completed' state='success' />
							: null
					]}
				>
					{
						skillFeatures.map(f => (
							<FeatureConfigPanel
								key={f.id}
								feature={f}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setData={props.setFeatureData}
							/>
						))
					}
					{
						skillFeatures.length === 0 ?
							<Empty />
							: null
					}
				</Expander>
			</div>
		</div>
	);
};
