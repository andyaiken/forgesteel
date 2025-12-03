import { Divider, Flex, Space, Tag } from 'antd';
import { MonsterLabel, TerrainLabel } from '@/components/panels/monster-label/monster-label';
import { Terrain, TerrainSection } from '@/models/terrain';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '@/enums/ability-usage';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { EncounterSheetPage } from '@/components/panels/classic-sheet/encounter-sheet/encounter-sheet-page';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { Kit } from '@/models/kit';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Montage } from '@/models/montage';
import { MontageSheetPage } from '@/components/panels/classic-sheet/montage-sheet/montage-sheet-page';
import { Negotiation } from '@/models/negotiation';
import { NegotiationSheetPage } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-sheet-page';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { Pill } from '@/components/controls/pill/pill';
import { Project } from '@/models/project';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { SubClass } from '@/models/subclass';
import { TerrainLogic } from '@/logic/terrain-logic';
import { Title } from '@/models/title';

import './element-sheet.scss';

interface Props {
	type: string;
	element: Element;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
}

export const ElementSheet = (props: Props) => {
	switch (props.type) {
		case 'encounter':
			return (
				<EncounterSheetPage
					encounter={props.element as Encounter}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
				/>
			);
		case 'montage':
			return (
				<MontageSheetPage
					montage={props.element as Montage}
					heroes={props.heroes}
					options={props.options}
				/>
			);
		case 'negotiation':
			return (
				<NegotiationSheetPage
					negotiation={props.element as Negotiation}
					options={props.options}
				/>
			);
	}

	let content = null;
	switch (props.type) {
		case 'ancestry':
			content = (
				<AncestrySheet
					ancestry={props.element as Ancestry}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'career':
			content = (
				<CareerSheet
					career={props.element as Career}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'class':
			content = (
				<ClassSheet
					heroClass={props.element as HeroClass}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'complication':
			content = (
				<ComplicationSheet
					complication={props.element as Complication}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'culture':
			content = (
				<CultureSheet
					culture={props.element as Culture}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'domain':
			content = (
				<DomainSheet
					domain={props.element as Domain}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'imbuement':
			content = (
				<ImbuementSheet
					imbuement={props.element as Imbuement}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'item':
			content = (
				<ItemSheet
					item={props.element as Item}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'kit':
			content = (
				<KitSheet
					kit={props.element as Kit}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'monster-group':
			content = (
				<MonsterGroupSheet
					monsterGroup={props.element as MonsterGroup}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'monster':
			content = (
				<MonsterSheet
					monster={props.element as Monster}
					monsterGroup={SourcebookLogic.getMonsterGroup(props.sourcebooks, props.element.id) as MonsterGroup}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'perk':
			content = (
				<PerkSheet
					perk={props.element as Perk}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'project':
			content = (
				<ProjectSheet
					project={props.element as Project}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'subclass':
			content = (
				<SubclassSheet
					subclass={props.element as SubClass}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'terrain':
			content = (
				<TerrainSheet
					terrain={props.element as Terrain}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
		case 'title':
			content = (
				<TitleSheet
					title={props.element as Title}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
			break;
	}

	if (!content) {
		return null;
	}

	return (
		<ErrorBoundary>
			<div className={`element-sheet ${props.options.classicSheetPageSize.toLowerCase()} ${props.options.pageOrientation}`} id={SheetFormatter.getPageId(props.type, props.element.id)}>
				{content}
			</div>
		</ErrorBoundary>
	);
};

interface AncestryProps {
	ancestry: Ancestry;
	sourcebooks: Sourcebook[];
	options: Options;
};

const AncestrySheet = (props: AncestryProps) => {
	const isSignatureFeature = (feature: Feature) => {
		return !isPurchasedFeature(feature);
	};

	const isPurchasedFeature = (feature: Feature) => {
		return (feature.type === FeatureType.Choice) && (feature.data.count === 'ancestry');
	};

	return (
		<>
			<HeaderText level={1}>
				{props.ancestry.name || 'Unnamed Ancestry'}
			</HeaderText>
			<Markdown text={props.ancestry.description} />
			{
				props.ancestry.features.filter(isSignatureFeature).map(f => (
					<FeaturePanel key={f.id} feature={f} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				))
			}
			<Field label='Ancestry Points' value={props.ancestry.ancestryPoints} />
			{
				props.ancestry.features.filter(isPurchasedFeature).map(f => (
					<FeaturePanel key={f.id} feature={f} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				))
			}
			{
				props.ancestry.culture ?
					<CultureSheet culture={props.ancestry.culture} sourcebooks={props.sourcebooks} options={props.options} />
					: null
			}
		</>
	);
};

interface CareerProps {
	career: Career;
	sourcebooks: Sourcebook[];
	options: Options;
};

const CareerSheet = (props: CareerProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.career.name || 'Unnamed Career'}
			</HeaderText>
			<Markdown text={props.career.description} />
			{
				props.career.features.map(f => (
					<FeaturePanel key={f.id} feature={f} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				))
			}
			<HeaderText>Inciting Incidents</HeaderText>
			{
				props.career.incitingIncidents.options.map(option => (
					<Field key={option.id} label={option.name} value={option.description} />
				))
			}
		</>
	);
};

interface ClassProps {
	heroClass: HeroClass;
	sourcebooks: Sourcebook[];
	options: Options;
};

const ClassSheet = (props: ClassProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.heroClass.name || 'Unnamed Class'}
			</HeaderText>
			<Markdown text={props.heroClass.description} />
			<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ') || props.heroClass.primaryCharacteristicsOptions.map(array => array.join(', ') || 'None').join(' or ') || 'None'} />
			{
				props.heroClass.featuresByLevel
					.filter(lvl => lvl.features.length > 0)
					.map(lvl => (
						<div key={lvl.level}>
							<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
							{
								lvl.features.map(f => (
									<FeaturePanel key={f.id} feature={f} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
								))
							}
						</div>
					))
			}
			<HeaderText level={1}>Abilities</HeaderText>
			{
				props.heroClass.abilities.map(a =>
					<AbilityPanel key={a.id} ability={a} mode={PanelMode.Full} />
				)
			}
			<HeaderText level={1}>Subclasses</HeaderText>
			{
				props.heroClass.subclasses.map(sc => (
					<SubclassSheet key={sc.id} subclass={sc} sourcebooks={props.sourcebooks} options={props.options} />
				))
			}
		</>
	);
};

interface ComplicationProps {
	complication: Complication;
	sourcebooks: Sourcebook[];
	options: Options;
};

const ComplicationSheet = (props: ComplicationProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.complication.name || 'Unnamed Complication'}
			</HeaderText>
			<Markdown text={props.complication.description} />
			{
				props.complication.features.map(f => (
					<FeaturePanel key={f.id} feature={f} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				))
			}
		</>
	);
};

interface CultureProps {
	culture: Culture;
	sourcebooks: Sourcebook[];
	options: Options;
};

const CultureSheet = (props: CultureProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.culture.name || 'Unnamed Culture'}
			</HeaderText>
			<Markdown text={props.culture.description} />
			<FeaturePanel feature={props.culture.language} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
			{props.culture.environment ? <FeaturePanel feature={props.culture.environment} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
			{props.culture.organization ? <FeaturePanel feature={props.culture.organization} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
			{props.culture.upbringing ? <FeaturePanel feature={props.culture.upbringing} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
		</>
	);
};

interface DomainProps {
	domain: Domain;
	sourcebooks: Sourcebook[];
	options: Options;
};

const DomainSheet = (props: DomainProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.domain.name || 'Unnamed Domain'}
			</HeaderText>
			<Markdown text={props.domain.description} />
			{
				props.domain.featuresByLevel
					.filter(lvl => lvl.features.length > 0)
					.map(lvl => (
						<Space key={lvl.level} orientation='vertical'>
							<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
							{
								lvl.features.map(f => (
									<FeaturePanel key={f.id} feature={f} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
								))
							}
						</Space>
					))
			}
		</>
	);
};

interface ImbuementProps {
	imbuement: Imbuement;
	sourcebooks: Sourcebook[];
	options: Options;
};

const ImbuementSheet = (props: ImbuementProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.imbuement.name || 'Unnamed Imbuement'}
			</HeaderText>
			<Field label='Applies to' value={props.imbuement.type} />
			<FeaturePanel
				feature={props.imbuement.feature}
				sourcebooks={props.sourcebooks}
				options={props.options}
				mode={PanelMode.Full}
			/>
		</>
	);
};

interface ItemProps {
	item: Item;
	sourcebooks: Sourcebook[];
	options: Options;
};

const ItemSheet = (props: ItemProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.item.name || 'Unnamed Item'}
			</HeaderText>
			<Markdown text={props.item.description} />
			{
				props.item.keywords.length > 0 ?
					<Field label='Keywords' value={<Flex gap={5}>{props.item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</Flex>} />
					: null
			}
			<Markdown text={props.item.effect} />
			{
				props.item.featuresByLevel
					.filter(lvl => lvl.features.length > 0)
					.map(lvl => (
						<>
							<HeaderText key={lvl.level}>Level {lvl.level.toString()}</HeaderText>
							{
								lvl.features.map(f => (
									<FeaturePanel
										key={f.id}
										feature={f}
										options={props.options}
										mode={PanelMode.Full}
									/>
								))
							}
						</>
					))
			}
		</>
	);
};

interface KitProps {
	kit: Kit;
	sourcebooks: Sourcebook[];
	options: Options;
};

const KitSheet = (props: KitProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.kit.name || 'Unnamed Kit'}
			</HeaderText>
			<Markdown text={props.kit.description} />
			{props.kit.armor.length > 0 ? <Field label='Armor' value={props.kit.armor.join(', ')} /> : null}
			{props.kit.weapon.length > 0 ? <Field label='Weapon' value={props.kit.weapon.join(', ')} /> : null}
			{props.kit.stamina > 0 ? <Field label='Stamina' value={`+${props.kit.stamina}`} /> : null}
			{props.kit.speed > 0 ? <Field label='Speed' value={`+${props.kit.speed}`} /> : null}
			{props.kit.stability > 0 ? <Field label='Stability' value={`+${props.kit.stability}`} /> : null}
			{
				props.kit.meleeDamage ?
					<Field label='Melee Damage' value={`+${props.kit.meleeDamage.tier1} / +${props.kit.meleeDamage.tier2} / +${props.kit.meleeDamage.tier3}`} />
					: null
			}
			{
				props.kit.rangedDamage ?
					<Field label='Ranged Damage' value={`+${props.kit.rangedDamage.tier1} / +${props.kit.rangedDamage.tier2} / +${props.kit.rangedDamage.tier3}`} />
					: null
			}
			{props.kit.meleeDistance > 0 ? <Field label='Melee Distance' value={`+${props.kit.meleeDistance}`} /> : null}
			{props.kit.rangedDistance > 0 ? <Field label='Ranged Distance' value={`+${props.kit.rangedDistance}`} /> : null}
			{props.kit.disengage > 0 ? <Field label='Disengage' value={`+${props.kit.disengage}`} /> : null}
			{
				props.kit.features.map(f => (
					<FeaturePanel key={f.id} feature={f} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
				))
			}
		</>
	);
};

interface MonsterGroupProps {
	monsterGroup: MonsterGroup;
	sourcebooks: Sourcebook[];
	options: Options;
};

const MonsterGroupSheet = (props: MonsterGroupProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.monsterGroup.name || 'Unnamed Monster Group'}
			</HeaderText>
			<Markdown text={props.monsterGroup.description} />
			{
				props.monsterGroup.information.map(i => (
					<div key={i.id}>
						<HeaderText>{i.name || 'Unnamed Information'}</HeaderText>
						<Markdown text={i.description} />
					</div>
				))
			}
			{
				props.monsterGroup.malice.length > 0 ?
					<>
						<HeaderText level={1}>Malice</HeaderText>
						<div className='ds-text'>
							At the start of any {props.monsterGroup.name}'s turn, you can spend malice to activate one of the following features.
						</div>
						{props.monsterGroup.malice.map(m =>
							<FeaturePanel
								key={m.id}
								feature={m}
								options={props.options}
								mode={PanelMode.Full}
								cost={m.type === FeatureType.MaliceAbility ? m.data.ability.cost : m.data.cost}
								repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
							/>
						)}
					</>
					: null
			}
			{
				props.monsterGroup.monsters.map(m =>
					<MonsterSheet key={m.id} monster={m} monsterGroup={props.monsterGroup} sourcebooks={props.sourcebooks} options={props.options} />
				)
			}
			{props.monsterGroup.addOns.length > 0 ? <HeaderText level={1}>Customization</HeaderText> : null}
			{
				props.monsterGroup.addOns.map(a =>
					<FeaturePanel key={a.id} feature={a} options={props.options} cost={a.data.cost} mode={PanelMode.Full} />
				)
			}
		</>
	);
};

interface MonsterProps {
	monster: Monster;
	monsterGroup: MonsterGroup;
	sourcebooks: Sourcebook[];
	options: Options;
};

const MonsterSheet = (props: MonsterProps) => {
	const speed = MonsterLogic.getSpeed(props.monster);
	const speedStr = speed.value.toString();

	const signatureBonus = MonsterLogic.getSignatureDamageBonus(props.monster);

	const conditions = MonsterLogic.getConditionImmunities(props.monster);
	const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
	const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);

	const features = MonsterLogic.getFeatures(props.monster).filter(f => (f.type === FeatureType.Text) || (f.type === FeatureType.AddOn));
	const abilities = MonsterLogic.getFeatures(props.monster).filter(f => f.type === FeatureType.Ability).map(f => f.data.ability);

	let rightOfTags = null;
	if (props.monster.role.organization === MonsterOrganizationType.Minion) {
		rightOfTags = (
			<Field label='EV' value={`${props.monster.encounterValue} for 4 minions`} />
		);
	} else if (props.monster.encounterValue > 0) {
		rightOfTags = (
			<Field label='EV' value={props.monster.encounterValue} />
		);
	}

	return (
		<>
			<HeaderText level={1}>
				{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}
			</HeaderText>
			<MonsterLabel monster={props.monster} />
			<Markdown text={props.monster.description} />
			<Flex align='center' justify='space-between'>
				<Flex gap={5}>{props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</Flex>
				{rightOfTags}
			</Flex>
			<StatsRow>
				<Field orientation='vertical' label='Size' value={FormatLogic.getSize(props.monster.size)} />
				<Field orientation='vertical' label='Speed' value={speedStr} />
				<Field orientation='vertical' label='Stamina' value={MonsterLogic.getStaminaDescription(props.monster)} />
				<Field orientation='vertical' label='Stability' value={MonsterLogic.getStability(props.monster)} />
				<Field orientation='vertical' label='Free Strike' value={MonsterLogic.getFreeStrikeDamage(props.monster)} />
			</StatsRow>
			<StatsRow>
				{
					[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
						.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(props.monster, ch)} />)
				}
			</StatsRow>
			{
				speed.modes.length > 0 ?
					<Field label='Movement' value={Format.capitalize(FormatLogic.getSpeedModes(speed.modes))} />
					: null
			}
			{
				immunities.length > 0 ?
					<Field label='Immunities' value={immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
					: null
			}
			{
				weaknesses.length > 0 ?
					<Field label='Weaknesses' value={weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
					: null
			}
			{
				conditions.length > 0 ?
					<Field label='Cannot Be' value={conditions.join(', ')} />
					: null
			}
			{
				props.monster.freeStrikeType !== DamageType.Damage ?
					<Field label='Free Strike Type' value={props.monster.freeStrikeType} />
					: null
			}
			{
				props.monster.role.organization === MonsterOrganizationType.Minion ?
					<Field label='Minion' value='On their turn, each minion can take only a move action and a main action, a move action and a maneuver, or two move actions.' />
					: null
			}
			{
				abilities.some(a => a.type.usage === AbilityUsage.VillainAction) ?
					<Field
						label='Villain Actions'
						value='This creature can use a villain action at the end of any other creature’s turn during combat. Each villain action can be used only once per encounter, and no more than one villain action can be used per round.'
					/>
					: null
			}
			{
				signatureBonus ?
					<Field label='Signature Ability Damage' value={`+${signatureBonus.tier1} / +${signatureBonus.tier2} / +${signatureBonus.tier3}`} />
					: null
			}
			{
				props.monster.withCaptain ?
					<Field label='With Captain' value={props.monster.withCaptain} />
					: null
			}
			{features.map(f => <Field key={f.id} label={f.name} value={<Markdown text={f.description} useSpan={true} />} />)}
			{
				abilities.length > 0 ?
					abilities.map(a => (
						<AbilityPanel key={a.id} ability={a} monster={props.monster} mode={PanelMode.Full} />
					))
					: null
			}
			{
				props.monster.retainer ?
					<>
						{
							props.monster.retainer.level4 && (props.monster.retainer.level < 4) ?
								<>
									<HeaderText level={1}>Level 4</HeaderText>
									<FeaturePanel key={props.monster.retainer.level4.id} feature={props.monster.retainer.level4}options={props.options} mode={PanelMode.Full} />
								</>
								: null
						}
						{
							props.monster.retainer.level7 && (props.monster.retainer.level < 7) ?
								<>
									<HeaderText level={1}>Level 7</HeaderText>
									<FeaturePanel key={props.monster.retainer.level7.id} feature={props.monster.retainer.level7}options={props.options} mode={PanelMode.Full} />
								</>
								: null
						}
						{
							props.monster.retainer.level10 && (props.monster.retainer.level < 10) ?
								<>
									<HeaderText level={1}>Level 10</HeaderText>
									<FeaturePanel key={props.monster.retainer.level10.id} feature={props.monster.retainer.level10}options={props.options} mode={PanelMode.Full} />
								</>
								: null
						}
					</>
					: null
			}
		</>
	);
};

interface PerkProps {
	perk: Perk;
	sourcebooks: Sourcebook[];
	options: Options;
};

const PerkSheet = (props: PerkProps) => {
	return (
		<FeaturePanel feature={props.perk} options={props.options} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
	);
};

interface ProjectProps {
	project: Project;
	sourcebooks: Sourcebook[];
	options: Options;
};

const ProjectSheet = (props: ProjectProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.project.name || 'Unnamed Project'}
			</HeaderText>
			<Markdown text={props.project.description} />
			{props.project.itemPrerequisites ? <Field label='Item Prerequisites' value={props.project.itemPrerequisites} /> : null}
			{props.project.source ? <Field label='Source' value={props.project.source} /> : null}
			<Field label='Characteristic' value={props.project.characteristic.length === 5 ? 'highest characteristic' : props.project.characteristic.join(' or ')} />
			<Field label='Goal' value={props.project.goal || '(varies)'} />
		</>
	);
};

interface SubclassProps {
	subclass: SubClass;
	sourcebooks: Sourcebook[];
	options: Options;
};

const SubclassSheet = (props: SubclassProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.subclass.name || 'Unnamed Subclass'}
			</HeaderText>
			<Markdown text={props.subclass.description} />
			{
				props.subclass.featuresByLevel
					.filter(lvl => lvl.features.length > 0)
					.map(lvl => (
						<Space key={lvl.level} orientation='vertical'>
							<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
							{
								lvl.features.map(f => (
									<FeaturePanel key={f.id} feature={f} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
								))
							}
						</Space>
					))
			}
		</>
	);
};

interface TerrainProps {
	terrain: Terrain;
	sourcebooks: Sourcebook[];
	options: Options;
};

const TerrainSheet = (props: TerrainProps) => {
	const getSection = (section: TerrainSection, index: number) => {
		return (
			<div key={index}>
				<Divider />
				{
					section.content.map(content => {
						switch (content.type) {
							case FeatureType.Text:
								return <Field key={content.id} label={content.name} value={<Markdown text={content.description} useSpan={true} />} />;
							case FeatureType.Ability:
								return <AbilityPanel key={content.id} ability={content.data.ability} mode={PanelMode.Full} />;
						}
					})
				}
			</div>
		);
	};

	const immunities = TerrainLogic.getDamageModifiers(props.terrain, DamageModifierType.Immunity);
	const weaknesses = TerrainLogic.getDamageModifiers(props.terrain, DamageModifierType.Weakness);

	return (
		<>
			<HeaderText level={1}>
				{props.terrain.name || 'Unnamed Ancestry'}
			</HeaderText>
			<Markdown text={props.terrain.description} />
			<TerrainLabel terrain={props.terrain} />
			<Flex align='center' justify='space-between'>
				<Tag>{props.terrain.category}</Tag>
				<Field label='EV' value={props.terrain.area ? `${props.terrain.encounterValue} per ${props.terrain.area}` : ((props.terrain.encounterValue === 0) ? '-' : props.terrain.encounterValue)} />
			</Flex>
			<div>
				<Field label='Size' value={typeof props.terrain.size === 'string' ? props.terrain.size : FormatLogic.getSize(props.terrain.size)} />
				<Field label='Stamina' value={TerrainLogic.getStaminaDescription(props.terrain)} />
				{
					props.terrain.direction ?
						<Field label='Direction' value={props.terrain.direction} />
						: null
				}
				{
					props.terrain.link ?
						<Field label='Link' value={props.terrain.link} />
						: null
				}
				{
					immunities.length > 0 ?
						<Field label='Immunities' value={immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
						: null
				}
				{
					weaknesses.length > 0 ?
						<Field label='Weaknesses' value={weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
						: null
				}
				{props.terrain.sections.map((section, n) => getSection(section, n))}
				{props.terrain.upgrades.length > 0 ? <Divider /> : null}
				{
					props.terrain.upgrades.map(upgrade => (
						<div key={upgrade.id}>
							{
								upgrade.cost >= 0 ?
									<HeaderText ribbon={<Pill>+{upgrade.cost} EV</Pill>}>{upgrade.label}</HeaderText>
									:
									<HeaderText ribbon={<Pill>{upgrade.cost} EV</Pill>}>{upgrade.label}</HeaderText>
							}

							{upgrade.text ? <div className='ds-text'>{upgrade.text}</div> : null}
							{upgrade.sections.map((section, n) => getSection(section, n))}
						</div>
					))
				}
			</div>
		</>
	);
};

interface TitleProps {
	title: Title;
	sourcebooks: Sourcebook[];
	options: Options;
};

const TitleSheet = (props: TitleProps) => {
	return (
		<>
			<HeaderText level={1}>
				{props.title.name || 'Unnamed Title'}
			</HeaderText>
			<Markdown text={props.title.description} />
			{
				props.title.prerequisites ?
					<Field label='Prerequisites' value={props.title.prerequisites} />
					: null
			}
			{
				props.title.features.map(f => (
					<FeaturePanel
						key={f.id}
						feature={f}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				))
			}
		</>
	);
};
