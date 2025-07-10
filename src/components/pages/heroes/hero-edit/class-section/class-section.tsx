import { Button, Drawer, Flex, Radio, Select, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { Characteristic } from '../../../../../enums/characteristic';
import { ClassPanel } from '../../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../../utils/collections';
import { Element } from '../../../../../models/element';
import { EmptyMessage } from '../empty-message/empty-message';
import { FeatureData } from '../../../../../models/feature';
import { FeatureLogic } from '../../../../../logic/feature-logic';
import { FeaturePanel } from '../../../../panels/elements/feature-panel/feature-panel';
import { Field } from '../../../../controls/field/field';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { HeroClass } from '../../../../../models/class';
import { HeroLogic } from '../../../../../logic/hero-logic';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from '../../../../modals/modal/modal';
import { NumberSpin } from '../../../../controls/number-spin/number-spin';
import { Options } from '../../../../../models/options';
import { PanelMode } from '../../../../../enums/panel-mode';
import { SelectablePanel } from '../../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../../models/subclass';
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
	selectSubclasses: (subclassIDs: string[]) => void;
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

	try {
		const classes = SourcebookLogic.getClasses(props.sourcebooks).filter(c => matchElement(c, props.searchTerm));
		const options = classes.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
				<ClassPanel heroClass={c} options={props.options} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.class) {
			choices = FeatureLogic.getFeaturesFromClass(props.hero.class, props.hero)
				.map(f => f.feature)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} options={props.options} mode={PanelMode.Full} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			//#region Choose subclass

			if (props.hero.class.subclasses.length > 0) {
				choices.unshift(
					<SelectablePanel key='subclass'>
						<HeaderText>{props.hero.class.subclassName}</HeaderText>
						<div className='ds-text'>Choose {props.hero.class.subclassCount === 1 ? `a ${props.hero.class.subclassName || 'subclass'}` : `${props.hero.class.subclassCount} ${props.hero.class.subclassName || 'subclasse'}s`}.</div>
						<Select
							style={{ width: '100%' }}
							status={props.hero.class.subclasses.filter(sc => sc.selected).length === 0 ? 'warning' : ''}
							mode={props.hero.class.subclassCount === 1 ? undefined : 'multiple'}
							maxCount={props.hero.class.subclassCount === 1 ? undefined : props.hero.class.subclassCount}
							allowClear={true}
							placeholder='Select'
							options={props.hero.class.subclasses.map(s => ({ value: s.id, label: s.name, desc: s.description }))}
							optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
							showSearch={true}
							filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
							value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.id)}
							onChange={props.selectSubclasses}
						/>
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
										<Button
											style={{ flex: '0 0 auto' }}
											type='text'
											title='Select'
											icon={<InfoCircleOutlined />}
											onClick={() => setSelectedSubClass(sc)}
										/>
									</Flex>
								))
						}
					</SelectablePanel>
				);
			}

			//#endregion

			//#region Choose characteristics

			if (props.hero.class.primaryCharacteristics.length > 0) {
				const arrays = HeroLogic.getCharacteristicArrays(props.hero.class.primaryCharacteristics.length);
				choices.unshift(
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
								const data = option as unknown as { value: string, array: number[] };
								setArray(data.array);
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

			//#endregion

			//#region Choose primary characteristics

			if (props.hero.class.primaryCharacteristicsOptions.length > 1) {
				choices.unshift(
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
								const data = option as unknown as { value: string, array: Characteristic[] };
								props.selectPrimaryCharacteristics(data.array);
							}}
						/>
					</SelectablePanel>
				);
			}

			//#endregion

			//#region Set level

			choices.unshift(
				<SelectablePanel key='class-level'>
					<HeaderText>Level</HeaderText>
					<NumberSpin
						value={props.hero.class.level}
						min={1}
						max={props.hero.class.featuresByLevel.length}
						onChange={value => props.setLevel(value)}
					/>
					<Field label='XP' value={props.hero.state.xp} />
				</SelectablePanel>
			);

			//#endregion
		}

		let columnClassName = 'hero-edit-content-column selected';
		if (choices.length === 0) {
			columnClassName += ' single-column';
		}

		return (
			<div className='hero-edit-content class-section'>
				{
					props.hero.class && (!isSmall || (choices.length === 0)) ?
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
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='class-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
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
