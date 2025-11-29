import { Button, Drawer, Flex, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Characteristic } from '@/enums/characteristic';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Collections } from '@/utils/collections';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { EmptyMessage } from '@/components/pages/heroes/hero-edit/empty-message/empty-message';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { SubClass } from '@/models/subclass';
import { SubClassSelectModal } from '@/components/modals/select/subclass-select/subclass-select-modal';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Utils } from '@/utils/utils';
import { useIsSmall } from '@/hooks/use-is-small';

import './class-section.scss';

const matchElement = (element: Element, searchTerm: string) => {
	const name = element.name.toLowerCase();
	const desc = element.description.toLowerCase();
	return searchTerm
		.toLowerCase()
		.split(' ')
		.some(token => name.includes(token) || desc.includes(token));
};

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	searchTerm: string;
	selectClass: (heroClass: HeroClass) => void;
	setLevel: (level: number) => void;
	selectPrimaryCharacteristics: (characteristics: Characteristic[]) => void;
	selectCharacteristics: (array: { characteristic: Characteristic, value: number }[]) => void;
	addSubclass: (subclass: SubClass) => void;
	removeSubclass: (subclassID: string) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const ClassSection = (props: Props) => {
	const isSmall = useIsSmall();
	const [ selectedSubClass, setSelectedSubClass ] = useState<SubClass | null>(null);
	const [ subclassSelectorOpen, setSubclassSelectorOpen ] = useState<boolean>(false);

	const getClassOptions = (heroClass: HeroClass) => {
		const options = {
			level: 0,
			choices: [] as ReactNode[],
			completed: !HeroLogic.canLevelUp(props.hero, props.options)
				&& (heroClass.primaryCharacteristics.length > 0)
				&& heroClass.characteristics.some(ch => ch.value !== 0)
				&& (heroClass.subclasses.filter(sc => sc.selected).length >= heroClass.subclassCount)
		};

		options.choices.push(
			<SelectablePanel key='class-level'>
				<HeaderText>Level</HeaderText>
				<NumberSpin
					value={heroClass.level}
					min={1}
					max={heroClass.featuresByLevel.length}
					onChange={value => props.setLevel(value)}
				/>
				<Field label='XP' value={props.hero.state.xp} />
				{
					HeroLogic.canLevelUp(props.hero, props.options) ?
						<Button
							className='status-warning'
							onClick={() => props.setLevel(heroClass.level + 1)}
						>
							Advance to level {heroClass.level + 1}
						</Button>
						: null
				}
			</SelectablePanel>
		);

		options.choices.push(
			<SelectablePanel key='characteristics'>
				<HeaderText>Characteristics</HeaderText>
				<Characteristics
					heroClass={heroClass}
					selectPrimaryCharacteristics={props.selectPrimaryCharacteristics}
					selectCharacteristics={props.selectCharacteristics}
				/>
			</SelectablePanel>
		);

		if (heroClass.subclassCount > 0) {
			options.choices.push(
				<SelectablePanel key='subclass'>
					<HeaderText>{heroClass.subclassName}</HeaderText>
					<div className='ds-text'>Choose {heroClass.subclassCount === 1 ? `${Format.startsWithVowel(heroClass.subclassName || 'subclass') ? 'an' : 'a'} ${heroClass.subclassName || 'subclass'}` : `${heroClass.subclassCount} ${heroClass.subclassName || 'subclasse'}s`}.</div>
					{
						heroClass.subclasses
							.filter(sc => sc.selected)
							.map(sc => (
								<Flex key={sc.id} align='center'>
									<Field
										style={{ flex: '1 1 0' }}
										label={sc.name}
										value={sc.description}
									/>
									<Flex vertical={true}>
										<Button
											style={{ flex: '0 0 auto' }}
											type='text'
											title='Select'
											icon={<InfoCircleOutlined />}
											onClick={() => setSelectedSubClass(sc)}
										/>
										<Button
											style={{ flex: '0 0 auto' }}
											type='text'
											title='Remove'
											icon={<CloseOutlined />}
											onClick={() => props.removeSubclass(sc.id)}
										/>
									</Flex>
								</Flex>
							))
					}
					{
						heroClass.subclasses.filter(sc => sc.selected).length < heroClass.subclassCount ?
							<Button className='status-warning' block={true} onClick={() => setSubclassSelectorOpen(true)}>
								Choose {Format.startsWithVowel(heroClass.subclassName || 'subclass') ? 'an' : 'a'} {heroClass.subclassName || 'subclass'}
							</Button>
							: null
					}
					<Drawer open={subclassSelectorOpen} onClose={() => setSubclassSelectorOpen(false)} closeIcon={null} size={500}>
						<SubClassSelectModal
							subClasses={heroClass.subclasses.filter(sc => !sc.selected)}
							classID={heroClass.id}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onSelect={sc => {
								setSubclassSelectorOpen(false);
								props.addSubclass(sc);
							}}
							onClose={() => setSubclassSelectorOpen(false)}
						/>
					</Drawer>
				</SelectablePanel>
			);
		}

		return options;
	};

	const classes = SourcebookLogic.getClasses(props.sourcebooks).map(Utils.copy).filter(c => matchElement(c, props.searchTerm));
	const options = classes.map(c => (
		<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
			<ClassPanel heroClass={c} sourcebooks={props.sourcebooks} options={props.options} />
		</SelectablePanel>
	));

	const choicesByLevel: { level: number, choices: ReactNode[], completed: boolean }[] = [];

	if (props.hero.class) {
		choicesByLevel.push(getClassOptions(props.hero.class));

		const features = FeatureLogic.getFeaturesFromClass(props.hero.class, props.hero);

		for (let level = 1; level <= 10; ++level) {
			const featuresForLevel = features.filter(f => f.level === level).map(f => f.feature);
			if (featuresForLevel.length > 0) {
				choicesByLevel.push({
					level: level,
					choices: featuresForLevel
						.filter(f => FeatureLogic.isChoice(f))
						.map(f => (
							<SelectablePanel key={f.id}>
								<FeatureConfigPanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
							</SelectablePanel>
						)),
					completed: featuresForLevel.every(f => FeatureLogic.isChosen(f, props.hero))
				});
			}
		}
	}

	let columnClassName = 'hero-edit-content-column selected';
	if (choicesByLevel.length === 0) {
		columnClassName += ' single-column';
	}

	return (
		<div className='hero-edit-content class-section'>
			{
				props.hero.class && (!isSmall || (choicesByLevel.length === 0)) ?
					<div className={columnClassName} id='class-selected'>
						<SelectablePanel>
							<ClassPanel heroClass={props.hero.class} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					</div>
					: null
			}
			{
				!props.hero.class && (options.length > 0) ?
					<div className='hero-edit-content-column grid' id='class-list'>
						{options}
					</div>
					: null
			}
			{
				!props.hero.class && (options.length === 0) ?
					<div className='hero-edit-content-column' id='class-list'>
						<EmptyMessage hero={props.hero} />
					</div>
					: null
			}
			{
				choicesByLevel.length > 0 ?
					<div className='hero-edit-content-column choices' id='class-choices'>
						<HeaderText>Choices</HeaderText>
						{
							choicesByLevel.map(lvl => (
								<Expander
									key={lvl.level}
									title={lvl.level === 0 ? 'Class Choices' : `Level ${lvl.level} Choices`}
									expandedByDefault={!lvl.completed}
									extra={[
										lvl.completed ?
											<CheckIcon key='completed' state='success' />
											: null
									]}
								>
									<Space orientation='vertical' size={20} style={{ width: '100%' }}>
										{lvl.choices}
										{
											lvl.choices.length === 0 ?
												<Empty text='Nothing to choose for this level' />
												: null
										}
									</Space>
								</Expander>
							))
						}
					</div>
					: null
			}
			<Drawer open={!!selectedSubClass} onClose={() => setSelectedSubClass(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedSubClass ? <SubclassPanel subclass={selectedSubClass} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedSubClass(null)}
				/>
			</Drawer>
		</div>
	);
};

interface CharacteristicsProps {
	heroClass: HeroClass;
	selectPrimaryCharacteristics: (characteristics: Characteristic[]) => void;
	selectCharacteristics: (array: { characteristic: Characteristic, value: number }[]) => void;
}

const Characteristics = (props: CharacteristicsProps) => {
	const getArray = () => {
		let currentArray = null;

		if (props.heroClass.primaryCharacteristics.length > 0) {
			const str = props.heroClass.characteristics
				.filter(ch => !props.heroClass.primaryCharacteristics.includes(ch.characteristic))
				.map(ch => ch.value)
				.join(', ');
			currentArray = HeroLogic.getCharacteristicArrays(props.heroClass.primaryCharacteristics.length)
				.find(arr => Collections.getPermutations(arr).map(a => a.join(', ')).includes(str)) || null;
		}

		return currentArray;
	};

	const [ array, setArray ] = useState<number[] | null>(getArray);
	const [ values, setValues ] = useState<{ characteristic: Characteristic, value: number }[] | null>(null);

	if ((props.heroClass.primaryCharacteristicsOptions.length > 0) && (props.heroClass.primaryCharacteristics.length === 0)) {
		return (
			<div>
				<div className='ds-text'>
					Your class allows you to choose your primary characteristics.
				</div>
				<Select
					style={{ width: '100%' }}
					status='warning'
					placeholder='Select your primary characteristics'
					options={props.heroClass.primaryCharacteristicsOptions.map(a => ({ value: a.join(', '), array: a }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={props.heroClass.primaryCharacteristics && (props.heroClass.primaryCharacteristics.length > 0) ? props.heroClass.primaryCharacteristics.join(', ') : null}
					onChange={(_text, option) => {
						const data = option as { value: string, array: Characteristic[] };
						props.selectPrimaryCharacteristics(data.array);
					}}
				/>
			</div>
		);
	}

	if (!array) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<div className='ds-text'>
					You start with a 2 in <b>{props.heroClass.primaryCharacteristics.join(' and ')}</b>. Choose the set of values you'd like for your other characteristics.
				</div>
				{
					HeroLogic.getCharacteristicArrays(props.heroClass.primaryCharacteristics.length)
						.map((a, n) => (
							<Button key={n} block={true} onClick={() => setArray(a)}>
								{a.join(', ')}
							</Button>
						))
				}
				{
					(props.heroClass.primaryCharacteristicsOptions.length > 1) ?
						<Button block={true} onClick={() => props.selectPrimaryCharacteristics([])}>
							Choose different primary characteristics
						</Button>
						: null
				}
			</Space>
		);
	}

	if (!values) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<div className='ds-text'>
					Choose your characteristics.
				</div>
				{
					HeroLogic.calculateCharacteristicArrays(array, props.heroClass.primaryCharacteristics)
						.map((a, n1) => (
							<StatsRow
								key={n1}
								onClick={() => {
									setValues(a);
									props.selectCharacteristics(a);
								}}
							>
								{
									a.map(ch => (
										<Field
											key={ch.characteristic}
											orientation='vertical'
											label={ch.characteristic}
											value={ch.value}
										/>
									))
								}
							</StatsRow>
						))
				}
				<Button block={true} onClick={() => setArray(null)}>
					Choose a different array of values
				</Button>
			</Space>
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<StatsRow>
				{
					props.heroClass.characteristics.map(ch => (
						<Field
							key={ch.characteristic}
							orientation='vertical'
							label={ch.characteristic}
							value={ch.value}
						/>
					))
				}
			</StatsRow>
			<Button block={true} onClick={() => setValues(null)}>
				Choose different characteristics
			</Button>
		</Space>
	);
};
