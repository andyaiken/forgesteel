import { Button, Drawer, Flex, Radio, Select, Space } from 'antd';
import { CheckCircleFilled, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Characteristic } from '../../../../../enums/characteristic';
import { ClassPanel } from '../../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../../utils/collections';
import { Element } from '../../../../../models/element';
import { Empty } from '../../../../controls/empty/empty';
import { EmptyMessage } from '../empty-message/empty-message';
import { Expander } from '../../../../controls/expander/expander';
import { FeatureConfigPanel } from '../../../../panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '../../../../../models/feature';
import { FeatureLogic } from '../../../../../logic/feature-logic';
import { Field } from '../../../../controls/field/field';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { HeroClass } from '../../../../../models/class';
import { HeroLogic } from '../../../../../logic/hero-logic';
import { Modal } from '../../../../modals/modal/modal';
import { NumberSpin } from '../../../../controls/number-spin/number-spin';
import { Options } from '../../../../../models/options';
import { PanelMode } from '../../../../../enums/panel-mode';
import { SelectablePanel } from '../../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../../models/subclass';
import { SubClassSelectModal } from '../../../../modals/select/subclass-select/subclass-select-modal';
import { SubclassPanel } from '../../../../panels/elements/subclass-panel/subclass-panel';
import { useMediaQuery } from '../../../../../hooks/use-media-query';

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
	addSubclass: (subclassID: string) => void;
	removeSubclass: (subclassID: string) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const ClassSection = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
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

	try {
		const classes = SourcebookLogic.getClasses(props.sourcebooks).filter(c => matchElement(c, props.searchTerm));
		const options = classes.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
				<ClassPanel heroClass={c} options={props.options} />
			</SelectablePanel>
		));

		const choicesByLevel: { level: number, choices: ReactNode[], completed: boolean }[] = [];

		if (props.hero.class) {
			//#region Level 0 (level, characteristics, subclass)

			const level0 = {
				level: 0,
				choices: [] as ReactNode[],
				completed: !HeroLogic.canLevelUp(props.hero)
					&& (props.hero.class.primaryCharacteristics.length > 0)
					&& props.hero.class.characteristics.some(ch => ch.value !== 0)
					&& (props.hero.class.subclasses.filter(sc => sc.selected).length >= props.hero.class.subclassCount)
			};

			level0.choices.push(
				<SelectablePanel key='class-level'>
					<HeaderText>Level</HeaderText>
					<NumberSpin
						value={props.hero.class.level}
						min={1}
						max={props.hero.class.featuresByLevel.length}
						onChange={value => props.setLevel(value)}
					/>
					<Field label='XP' value={props.hero.state.xp} />
					{
						HeroLogic.canLevelUp(props.hero) ?
							<Button
								className='status-warning'
								onClick={() => props.setLevel(props.hero.class!.level + 1)}
							>
								Advance to level {props.hero.class.level + 1}
							</Button>
							: null
					}
				</SelectablePanel>
			);

			if (props.hero.class.primaryCharacteristicsOptions.length > 1) {
				level0.choices.push(
					<SelectablePanel key='primary-characteristics'>
						<HeaderText>Primary Characteristics</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={array === null ? 'warning' : ''}
							placeholder='Select your primary characteristics'
							options={props.hero.class.primaryCharacteristicsOptions.map(a => ({ value: a.join(', '), array: a }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={props.hero.class.primaryCharacteristics && (props.hero.class.primaryCharacteristics.length > 0) ? props.hero.class.primaryCharacteristics.join(', ') : null}
							onChange={(_text, option) => {
								const data = option as { value: string, array: Characteristic[] };
								props.selectPrimaryCharacteristics(data.array);
							}}
						/>
					</SelectablePanel>
				);
			}

			if (props.hero.class.primaryCharacteristics.length > 0) {
				const arrays = HeroLogic.getCharacteristicArrays(props.hero.class.primaryCharacteristics.length);
				level0.choices.push(
					<SelectablePanel key='characteristics'>
						<HeaderText>Characteristics</HeaderText>
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
								props.selectPrimaryCharacteristics(props.hero.class!.primaryCharacteristics);
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
										value={JSON.stringify(props.hero.class.characteristics)}
										onChange={e => {
											const array = JSON.parse(e.target.value) as { characteristic: Characteristic, value: number }[];
											props.selectCharacteristics(array);
										}}
									>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												HeroLogic.calculateCharacteristicArrays(array, props.hero.class.primaryCharacteristics).map((array, n1) => (
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

			if ((props.hero.class.subclassCount > 0) && (props.hero.class.subclasses.length > 0)) {
				const getAddButton = () => {
					if (props.hero.class!.subclasses.filter(sc => !sc.selected).length === 0) {
						return (
							<Empty text='There are no options to choose for this feature.' />
						);
					}

					return (
						<Button className='status-warning' block={true} onClick={() => setSubclassSelectorOpen(true)}>
							Choose a {props.hero.class!.subclassName || 'subclass'}
						</Button>
					);
				};

				level0.choices.push(
					<SelectablePanel key='subclass'>
						<HeaderText>{props.hero.class.subclassName}</HeaderText>
						<div className='ds-text'>Choose {props.hero.class.subclassCount === 1 ? `a ${props.hero.class.subclassName || 'subclass'}` : `${props.hero.class.subclassCount} ${props.hero.class.subclassName || 'subclasse'}s`}.</div>
						{
							props.hero.class.subclasses
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
						{props.hero.class.subclasses.filter(sc => sc.selected).length < props.hero.class.subclassCount ? getAddButton() : null}
						<Drawer open={subclassSelectorOpen} onClose={() => setSubclassSelectorOpen(false)} closeIcon={null} width='500px'>
							<SubClassSelectModal
								subClasses={props.hero.class.subclasses.filter(sc => !sc.selected)}
								options={props.options}
								onSelect={sc => {
									setSubclassSelectorOpen(false);
									props.addSubclass(sc.id);
								}}
								onClose={() => setSubclassSelectorOpen(false)}
							/>
						</Drawer>
					</SelectablePanel>
				);
			}

			choicesByLevel.push(level0);

			//#endregion

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
						completed: featuresForLevel.every(f => FeatureLogic.isChosen(f, HeroLogic.getFormerAncestries(props.hero)))
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
