import { Button, Drawer, Flex, Radio, Select, Space } from 'antd';
import { CheckCircleFilled, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Characteristic } from '@/enums/characteristic';
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
	const [ array, setArray ] = useState<number[] | null>(() => {
		let currentArray = null;

		if (props.hero.class && (props.hero.class.primaryCharacteristics.length > 0)) {
			const cls = props.hero.class;
			const str = props.hero.class.characteristics
				.filter(ch => !cls.primaryCharacteristics.includes(ch.characteristic))
				.map(ch => ch.value)
				.join(', ');
			currentArray = HeroLogic.getCharacteristicArrays(cls.primaryCharacteristics.length)
				.find(arr => Collections.getPermutations(arr).map(a => a.join(', ')).includes(str)) || null;
		}

		return currentArray;
	});
	const [ selectedSubClass, setSelectedSubClass ] = useState<SubClass | null>(null);
	const [ subclassSelectorOpen, setSubclassSelectorOpen ] = useState<boolean>(false);

	const getClassOptions = (heroClass: HeroClass) => {
		const options = {
			level: 0,
			choices: [] as ReactNode[],
			completed: !HeroLogic.canLevelUp(props.hero)
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
					HeroLogic.canLevelUp(props.hero) ?
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

		if (heroClass.primaryCharacteristicsOptions.length > 1) {
			options.choices.push(
				<SelectablePanel key='primary-characteristics'>
					<HeaderText>Primary Characteristics</HeaderText>
					<Select
						style={{ width: '100%' }}
						status={array === null ? 'warning' : ''}
						placeholder='Select your primary characteristics'
						options={heroClass.primaryCharacteristicsOptions.map(a => ({ value: a.join(', '), array: a }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={heroClass.primaryCharacteristics && (heroClass.primaryCharacteristics.length > 0) ? heroClass.primaryCharacteristics.join(', ') : null}
						onChange={(_text, option) => {
							const data = option as { value: string, array: Characteristic[] };
							props.selectPrimaryCharacteristics(data.array);
						}}
					/>
				</SelectablePanel>
			);
		}

		if (heroClass.primaryCharacteristics.length > 0) {
			const arrays = HeroLogic.getCharacteristicArrays(heroClass.primaryCharacteristics.length);
			options.choices.push(
				<SelectablePanel key='characteristics'>
					<HeaderText>Characteristics</HeaderText>
					<div className='ds-text'>
						You start with a 2 in <b>{heroClass.primaryCharacteristics.join(' and ')}</b>. Choose the values you'd like for your other characteristics.
					</div>
					<Select
						style={{ width: '100%' }}
						status={array === null ? 'warning' : ''}
						placeholder='Select characteristic array'
						options={arrays.map(a => ({ value: a.join(', '), array: a }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={array ? array.join(', ') : null}
						onChange={(_text, option) => {
							const data = option as { value: string, array: number[] };
							setArray(data.array);
							props.selectPrimaryCharacteristics(heroClass.primaryCharacteristics);
						}}
					/>
					{
						array ?
							<div>
								<div className='characteristic-row' style={{ margin: '5px 15px', fontWeight: 600 }}>
									<div className='characteristic-item characteristic-heading'>M</div>
									<div className='characteristic-item characteristic-heading'>A</div>
									<div className='characteristic-item characteristic-heading'>R</div>
									<div className='characteristic-item characteristic-heading'>I</div>
									<div className='characteristic-item characteristic-heading'>P</div>
								</div>
								<Radio.Group
									style={{ width: '100%' }}
									value={JSON.stringify(heroClass.characteristics)}
									onChange={e => {
										const array = JSON.parse(e.target.value) as { characteristic: Characteristic, value: number }[];
										props.selectCharacteristics(array);
									}}
								>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											HeroLogic.calculateCharacteristicArrays(array, heroClass.primaryCharacteristics).map((array, n1) => (
												<Radio.Button key={n1} value={JSON.stringify(array)} style={{ width: '100%' }}>
													<div className='characteristic-row'>
														{array.map((ch, n2) => <div key={n2} className='characteristic-item'>{ch.value}</div>)}
													</div>
												</Radio.Button>
											))
										}
									</Space>
								</Radio.Group>
							</div>
							: null
					}
				</SelectablePanel>
			);
		}

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
					<Drawer open={subclassSelectorOpen} onClose={() => setSubclassSelectorOpen(false)} closeIcon={null} width='500px'>
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

	try {
		const classes = SourcebookLogic.getClasses(props.sourcebooks).map(Utils.copy).filter(c => matchElement(c, props.searchTerm));
		const options = classes.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
				<ClassPanel heroClass={c} options={props.options} />
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
							<SelectablePanel showShadow={false}>
								<ClassPanel heroClass={props.hero.class} hero={props.hero} options={props.options} mode={PanelMode.Full} />
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
												<CheckCircleFilled key='completed' title='Completed' style={{ color: 'rgb(0, 120, 0)' }} />
												: null
										]}
									>
										<Space direction='vertical' size={20} style={{ width: '100%', paddingTop: '15px' }}>
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
				<Drawer open={!!selectedSubClass} onClose={() => setSelectedSubClass(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedSubClass ? <SubclassPanel subclass={selectedSubClass} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedSubClass(null)}
					/>
				</Drawer>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
