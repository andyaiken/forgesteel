import { Button, Drawer, Flex, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Feature, FeatureClassAbilityData } from '@/models/feature';
import { Ability } from '@/models/ability';
import { AbilityModal } from '@/components/modals/ability/ability-modal';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AbilitySelectModal } from '@/components/modals/select/ability-select/ability-select-modal';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureClassAbilityData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoClassAbility = (props: InfoProps) => {
	if ((props.data.selectedIDs.length > 0) && props.hero && props.hero.class) {
		const abilities = props.hero.class.abilities.filter(a => a.cost === props.data.cost) || [];
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selectedIDs.map(id => {
						const ability = abilities.find(a => a.id === id) as Ability;
						return (
							<AbilityPanel key={ability.id} ability={ability} mode={PanelMode.Full} />
						);
					})
				}
			</Space>
		);
	}

	let className = '';
	if (props.data.classID && props.sourcebooks) {
		const heroClass = SourcebookLogic.getClasses(props.sourcebooks).find(c => c.id === props.data.classID);
		if (heroClass && heroClass.name) {
			className = heroClass.name;
		}
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>
				Choose {props.data.count > 1 ? props.data.count : 'a'} {(props.data.cost === 'signature') || (props.data.cost === 0) ? 'signature' : `${props.data.cost}pt`} {props.data.count > 1 ? 'abilities' : 'ability'}{className ? ` from the ${className}` : ''}.
			</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureClassAbilityData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureClassAbilityData) => void;
}

export const EditClassAbility = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureClassAbilityData>(Utils.copy(props.data));

	const setAbilityCost = (value: number | 'signature') => {
		const copy = Utils.copy(data);
		copy.cost = value;
		copy.allowAnySource = value === 0;
		setData(copy);
		props.setData(copy);
	};

	const setAbilityClassID = (value: string) => {
		const copy = Utils.copy(data);
		copy.classID = value === '' ? undefined : value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	const setMinLevel = (value: number) => {
		const copy = Utils.copy(data);
		copy.minLevel = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Ability Options</HeaderText>
			<Select
				style={{ width: '100%' }}
				options={[
					{ value: 'signature', label: 'Choose a signature ability' },
					{ value: 3, label: 'Choose a 3pt ability' },
					{ value: 5, label: 'Choose a 5pt ability' },
					{ value: 7, label: 'Choose a 7pt ability' },
					{ value: 9, label: 'Choose a 9pt ability' },
					{ value: 11, label: 'Choose a 11pt ability' },
					{ value: 1, label: 'Choose a 1pt ability' },
					{ value: 2, label: 'Choose a 2pt ability' },
					{ value: 4, label: 'Choose a 4pt ability' },
					{ value: 6, label: 'Choose a 6pt ability' },
					{ value: 8, label: 'Choose a 8pt ability' },
					{ value: 10, label: 'Choose a 10pt ability' },
					{ value: 12, label: 'Choose a 12pt ability' },
					{ value: 0, label: 'Choose any ability defined in the class' }
				]}
				optionRender={option => <div className='ds-text'>{option.data.label}</div>}
				value={data.cost}
				onChange={setAbilityCost}
			/>
			<Select
				style={{ width: '100%' }}
				allowClear={!!data.classID}
				placeholder='Select class'
				options={[
					{ value: '', label: 'From your class' },
					...SourcebookLogic.getClasses(props.sourcebooks).map(o => ({ value: o.id, label: `From the ${o.name}` }))
				]}
				optionRender={option => <div className='ds-text'>{option.data.label}</div>}
				value={data.classID || ''}
				onChange={setAbilityClassID}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
			<HeaderText>Minimum Level</HeaderText>
			<NumberSpin min={1} value={data.minLevel} onChange={setMinLevel} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureClassAbilityData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureClassAbilityData) => void;
}

export const ConfigClassAbility = (props: ConfigProps) => {
	const [ abilitySelectorOpen, setAbilitySelectorOpen ] = useState<boolean>(false);
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);

	let heroClass: HeroClass | null = props.hero.class;
	if (props.data.classID) {
		// You get an ability from a different class
		heroClass = SourcebookLogic.getClasses(props.sourcebooks).find(c => c.id === props.data.classID) || null;
	}
	if (!heroClass) {
		return null;
	}

	const currentAbilityIDs = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.id !== props.feature.id)
		.filter(f => f.type === FeatureType.ClassAbility)
		.flatMap(f => f.data.selectedIDs);
	const abilities = (props.data.allowAnySource ? SourcebookLogic.getAllClassAbilities(heroClass) : heroClass.abilities)
		.filter(a => a.cost === props.data.cost)
		.filter(a => a.minLevel <= props.data.minLevel)
		.filter(a => !currentAbilityIDs.includes(a.id));
	const distinctAbilities = Collections.distinct(abilities, a => a.name);
	const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

	const getAddButton = () => {
		if (sortedAbilities.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Button className='status-warning' block={true} onClick={() => setAbilitySelectorOpen(true)}>
				Choose an ability
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<div className='ds-text'>
				Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.cost === 'signature' ? 'signature' : `${props.data.cost}pt`} {props.data.count > 1 ? 'abilities' : 'ability'}.
			</div>
			{
				props.data.selectedIDs.map(id => {
					const ability = abilities.find(a => a.id === id) as Ability;
					return (
						<Flex key={ability.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={ability.name}
								value={<Markdown text={ability.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedAbility(ability)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(props.data);
										dataCopy.selectedIDs = dataCopy.selectedIDs.filter(id => id !== ability.id);
										props.setData(dataCopy);
									}}
								/>
							</Flex>
						</Flex>
					);
				})
			}
			{props.data.selectedIDs.length < props.data.count ? getAddButton() : null}
			<Drawer open={abilitySelectorOpen} onClose={() => setAbilitySelectorOpen(false)} closeIcon={null} size={500}>
				<AbilitySelectModal
					abilities={sortedAbilities}
					hero={props.hero}
					onSelect={ability => {
						setAbilitySelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selectedIDs.push(ability.id);
						props.setData(dataCopy);
					}}
					onClose={() => setAbilitySelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedAbility} onClose={() => setSelectedAbility(null)} closeIcon={null} size={500}>
				{selectedAbility ? <AbilityModal ability={selectedAbility} hero={props.hero} onClose={() => setSelectedAbility(null)} /> : null}
			</Drawer>
		</Space>
	);
};
