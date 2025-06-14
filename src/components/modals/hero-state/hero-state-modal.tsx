import { Alert, Button, Divider, Drawer, Flex, Segmented, Space } from 'antd';
import { ArrowUpOutlined, CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureData } from '../../../models/feature';
import { Collections } from '../../../utils/collections';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Empty } from '../../controls/empty/empty';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroCustomizePanel } from '../../panels/hero-customize/hero-customize-panel';
import { HeroHealthPanel } from '../../panels/health/health-panel';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { Item } from '../../../models/item';
import { ItemPanel } from '../../panels/elements/item-panel/item-panel';
import { ItemSelectModal } from '../select/item-select/item-select-modal';
import { ItemType } from '../../../enums/item-type';
import { Modal } from '../modal/modal';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Project } from '../../../models/project';
import { ProjectPanel } from '../../panels/elements/project-panel/project-panel';
import { ProjectSelectModal } from '../select/project-select/project-select-modal';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	startPage: HeroStatePage;
	showEncounterControls: boolean;
	onClose: () => void;
	onChange: (hero: Hero) => void;
	onLevelUp?: () => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ page, setPage ] = useState<HeroStatePage>(props.startPage);
	const [ shopVisible, setShopVisible ] = useState<boolean>(false);
	const [ projectsVisible, setProjectsVisible ] = useState<boolean>(false);

	const getHeroSection = () => {
		const setHeroicResource = (featureID: string, value: number) => {
			const copy = Utils.copy(hero);
			HeroLogic.getFeatures(copy)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => f.data.value = value);
			setHero(copy);
			props.onChange(copy);
		};

		const setSurges = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.surges = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setVictories = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.victories = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setXP = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.xp = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setHeroTokens = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setRenown = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.renown = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setWealth = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.wealth = value;
			setHero(copy);
			props.onChange(copy);
		};

		const gainSurges = () => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens -= 1;
			copy.state.surges += 2;
			setHero(copy);
			props.onChange(copy);
		};

		const gainStamina = () => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens -= 2;
			copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(copy), 0);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ paddingTop: '20px', width: '100%' }}>
				<Flex gap={20}>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							HeroLogic.getFeatures(hero)
								.map(f => f.feature)
								.filter(f => f.type === FeatureType.HeroicResource)
								.map(f => (
									<NumberSpin
										label={f.name}
										value={f.data.value}
										min={f.data.canBeNegative ? undefined : 0}
										onChange={value => setHeroicResource(f.id, value)}
									/>
								))
						}
						<NumberSpin
							label='Victories'
							value={hero.state.victories}
							min={0}
							onChange={setVictories}
						/>
						<NumberSpin
							label='Renown'
							value={hero.state.renown}
							format={() => HeroLogic.getRenown(hero).toString()}
							onChange={setRenown}
						/>
					</Space>
					<Space direction='vertical' style={{ width: '100%' }}>
						<NumberSpin
							label='Surges'
							value={hero.state.surges}
							min={0}
							onChange={setSurges}
						/>
						<NumberSpin
							label='XP'
							value={hero.state.xp}
							min={0}
							onChange={setXP}
						/>
						<NumberSpin
							label='Wealth'
							value={hero.state.wealth}
							format={() => HeroLogic.getWealth(hero).toString()}
							onChange={setWealth}
						/>
					</Space>
				</Flex>
				{
					hero.state.surges > 0 ?
						<Alert
							type='info'
							message={
								<>
									<div>
										Spend <b>1 - 3 surges</b> to add {hero.class ? Math.max(...hero.class.characteristics.map(ch => ch.value)) : 0} damage per surge to one target.
									</div>
									{hero.state.surges >= 2 ? <div>Spend <b>2 surges</b> to increase an ability’s potency by 1 for a single target.</div> : null}
								</>
							}
						/>
						: null
				}
				{
					HeroLogic.canLevelUp(hero) ?
						<Alert
							type='info'
							showIcon={true}
							message='You have enough XP to level up.'
							action={props.onLevelUp ? <Button type='text' title='Level Up' icon={<ArrowUpOutlined />} onClick={props.onLevelUp} /> : null}
						/>
						: null
				}
				<Divider />
				<NumberSpin
					label='Hero Tokens'
					value={hero.state.heroTokens}
					min={0}
					onChange={setHeroTokens}
				/>
				<Alert
					type='info'
					message={
						<Space direction='vertical'>
							<div>
								Hero tokens are a resource shared by your party; they typically refresh at the beginning of each game session.
							</div>
							{
								hero.state.heroTokens > 0 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div>Spend a hero token to gain two surges.</div>
										<Button onClick={gainSurges}>+2 Surges</Button>
									</Flex>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div>
										Spend a hero token when you fail a saving throw to succeed on it instead.
									</div>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div>
										Spend a hero token when you fail a test (or succeed on a test with a consequence) to turn the failure into a success and to lose any consequence suffered.
									</div>
									: null
							}
							{
								hero.state.heroTokens >= 2 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div>Spend 2 hero tokens on your turn or whenever you take damage (no action required) to regain Stamina equal to your Recovery value without spending a Recovery.</div>
										<div>
											<Field
												orientation='vertical'
												label='Stamina'
												value={`${HeroLogic.getStamina(hero) - hero.state.staminaDamage} / ${HeroLogic.getStamina(hero)}`}
											/>
											<Button disabled={hero.state.staminaDamage === 0} onClick={gainStamina}>+{HeroLogic.getRecoveryValue(hero)} Stamina</Button>
										</div>
									</Flex>
									: null
							}
						</Space>
					}
				/>
			</Space>
		);
	};

	const getVitalsSection = () => {
		const onHeroChange = (h: Hero) => {
			setHero(h);
			props.onChange(h);
		};

		return (
			<HeroHealthPanel
				hero={hero}
				showEncounterControls={props.showEncounterControls}
				onChange={onHeroChange}
			/>
		);
	};

	const getRespiteSection = () => {
		const takeRespite = () => {
			const copy = Utils.copy(hero);
			HeroLogic.takeRespite(copy);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Respite</HeaderText>
				<div className='ds-text'>
					Taking a respite has the following effects:
				</div>
				<ul>
					<li>
						Your Stamina and Recoveries are reset (and any temporary Stamina goes away)
					</li>
					<li>
						Your Victories are turned into XP
					</li>
					<li>
						Any conditions affecting you are removed
					</li>
				</ul>
				<div className='ds-text'>
					During a respite you can take one respite action. Standard respite actions are:
				</div>
				<ul>
					<li>
						Make a project roll
					</li>
					<li>
						Change your kit / prayer / enchantment / augmentation / ward
					</li>
					<li>
						Attract followers (for every 3 renown, you can have 1 follower)
					</li>
				</ul>
				<Divider />
				<Button
					key='take-respite'
					block={true}
					className='tall-button'
					onClick={takeRespite}
				>
					<div>
						<div>Take a Respite</div>
						<div className='subtext'>
							24 hours of rest
						</div>
					</div>
				</Button>
			</Space>
		);
	};

	const getInventorySection = () => {
		const addItem = (item: Item) => {
			const copy = Utils.copy(hero);
			copy.state.inventory.push(item);
			setHero(copy);
			setShopVisible(false);
			props.onChange(copy);
		};

		const changeItem = (item: Item) => {
			const copy = Utils.copy(hero);
			const index = copy.state.inventory.findIndex(i => i.id === item.id);
			copy.state.inventory[index] = item;
			setHero(copy);
			props.onChange(copy);
		};

		const moveItem = (item: Item, direction: 'up' | 'down') => {
			const copy = Utils.copy(hero);
			const index = copy.state.inventory.findIndex(i => i.id === item.id);
			copy.state.inventory = Collections.move(copy.state.inventory, index, direction);
			setHero(copy);
			props.onChange(copy);
		};

		const deleteItem = (item: Item) => {
			const copy = Utils.copy(hero);
			copy.state.inventory = copy.state.inventory.filter(i => i.id !== item.id);
			setHero(copy);
			props.onChange(copy);
		};

		let warning = null;
		const leveled = hero.state.inventory.filter(i => [ ItemType.Leveled, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon ].includes(i.type));
		if (leveled.length > 3) {
			warning = (
				<Alert
					type='warning'
					showIcon={true}
					message='You can only use 3 leveled items at a time.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%', paddingBottom: '20px' }}>
				<HeaderText
					extra={
						<Button icon={<PlusOutlined />} onClick={() => setShopVisible(true)} />
					}
				>
					Inventory
				</HeaderText>
				{warning}
				{
					hero.state.inventory.map(item => (
						<Expander
							key={item.id}
							title={item.count === 1 ? item.name : `${item.name} (x${item.count})`}
							tags={[ item.type ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteItem(item); }} />
							]}
						>
							<ItemPanel
								item={item}
								options={props.options}
								hero={hero}
								mode={PanelMode.Full}
								onChange={changeItem}
							/>
						</Expander>
					))
				}
				{
					hero.state.inventory.length === 0 ?
						<Empty text='Your inventory is empty.' />
						: null
				}
				<Drawer open={shopVisible} onClose={() => setShopVisible(false)} closeIcon={null} width='500px'>
					<ItemSelectModal
						types={[ ItemType.Artifact, ItemType.Consumable, ItemType.ImbuedArmor, ItemType.ImbuedImplement, ItemType.ImbuedWeapon, ItemType.Leveled, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Trinket ]}
						sourcebooks={props.sourcebooks}
						options={props.options}
						hero={hero}
						onSelect={addItem}
						onClose={() => setShopVisible(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getProjectsSection = () => {
		const setProjectPoints = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.projectPoints = value;
			setHero(copy);
			props.onChange(copy);
		};

		const addProject = (project: Project) => {
			const projectCopy = Utils.copy(project);
			projectCopy.id = Utils.guid();
			projectCopy.progress = FactoryLogic.createProjectProgress();

			const copy = Utils.copy(hero);
			copy.state.projects.push(projectCopy);
			setHero(copy);
			setProjectsVisible(false);
			props.onChange(copy);
		};

		const changeProject = (project: Project) => {
			const copy = Utils.copy(hero);
			const index = copy.state.projects.findIndex(p => p.id === project.id);
			copy.state.projects[index] = project;
			setHero(copy);
			props.onChange(copy);
		};

		const moveProject = (project: Project, direction: 'up' | 'down') => {
			const copy = Utils.copy(hero);
			const index = copy.state.projects.findIndex(p => p.id === project.id);
			copy.state.projects = Collections.move(copy.state.projects, index, direction);
			setHero(copy);
			props.onChange(copy);
		};

		const deleteProject = (project: Project) => {
			const copy = Utils.copy(hero);
			copy.state.projects = copy.state.projects.filter(p => p.id !== project.id);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%', paddingBottom: '20px' }}>
				<HeaderText
					extra={
						<Button icon={<PlusOutlined />} onClick={() => setProjectsVisible(true)} />
					}
				>
					Projects
				</HeaderText>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					steps={[ 1, 10 ]}
					format={() => HeroLogic.getProjectPoints(hero).toString()}
					onChange={setProjectPoints}
				/>
				<Divider />
				{
					hero.state.projects.map(project => (
						<Expander
							key={project.id}
							title={project.name}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteProject(project); }} />
							]}
						>
							<ProjectPanel
								project={project}
								mode={PanelMode.Full}
								onChange={changeProject}
							/>
						</Expander>
					))
				}
				{
					hero.state.projects.length === 0 ?
						<Empty text='You have no projects underway.' />
						: null
				}
				<Drawer open={projectsVisible} onClose={() => setProjectsVisible(false)} closeIcon={null} width='500px'>
					<ProjectSelectModal sourcebooks={props.sourcebooks} onSelect={addProject} onClose={() => setProjectsVisible(false)} />
				</Drawer>
			</Space>
		);
	};

	const getCustomizeSection = () => {
		const addFeature = (feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.features.push(feature);
			setHero(heroCopy);
			props.onChange(heroCopy);
		};

		const deleteFeature = (feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.features = heroCopy.features.filter(f => f.id !== feature.id);
			setHero(heroCopy);
			props.onChange(heroCopy);
		};

		const setFeature = (featureID: string, feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			const index = heroCopy.features.findIndex(f => f.id === featureID);
			if (index !== -1) {
				heroCopy.features[index] = feature;
			}
			setHero(heroCopy);
			props.onChange(heroCopy);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const heroCopy = Utils.copy(hero);
			const feature = HeroLogic.getFeatures(heroCopy)
				.map(f => f.feature)
				.find(f => f.id === featureID);
			if (feature) {
				feature.data = data;
			}
			setHero(heroCopy);
			props.onChange(heroCopy);
		};

		return (
			<div style={{ paddingBottom: '20px' }}>
				<HeroCustomizePanel
					hero={hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
					addFeature={addFeature}
					setFeature={setFeature}
					setFeatureData={setFeatureData}
					deleteFeature={deleteFeature}
				/>
			</div>
		);
	};

	const getNotesSection = () => {
		const setNotes = (value: string) => {
			const copy = Utils.copy(hero);
			copy.state.notes = value;
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
				<HeaderText>Notes</HeaderText>
				<MultiLine
					style={{ flex: '1 1 0' }}
					label='Notes'
					value={hero.state.notes}
					showMarkdownPrompt={false}
					onChange={setNotes}
				/>
			</div>
		);
	};

	const getContent = () => {
		switch (page) {
			case HeroStatePage.Hero:
				return getHeroSection();
			case HeroStatePage.Vitals:
				return getVitalsSection();
			case HeroStatePage.Respite:
				return getRespiteSection();
			case HeroStatePage.Inventory:
				return getInventorySection();
			case HeroStatePage.Projects:
				return getProjectsSection();
			case HeroStatePage.Customize:
				return getCustomizeSection();
			case HeroStatePage.Notes:
				return getNotesSection();
		}
	};

	try {
		let pages: HeroStatePage[] = [];
		if (HeroLogic.getStamina(hero) !== 0) {
			pages = [
				HeroStatePage.Hero,
				HeroStatePage.Vitals,
				HeroStatePage.Respite,
				HeroStatePage.Inventory,
				HeroStatePage.Projects,
				HeroStatePage.Customize,
				HeroStatePage.Notes
			];
		} else {
			pages = [
				HeroStatePage.Vitals,
				HeroStatePage.Notes
			];
		}

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							name='tabs'
							options={pages}
							value={page}
							onChange={setPage}
						/>
					</div>
				}
				content={
					<div className='hero-state-modal'>
						{getContent()}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
