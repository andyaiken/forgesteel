import { Alert, Button, Divider, Drawer, Flex, Segmented, Space } from 'antd';
import { ArrowUpOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Condition, Hero } from '../../../models/hero';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Collections } from '../../../utils/collections';
import { ConditionPanel } from '../../panels/condition/condition-panel';
import { ConditionSelectModal } from '../condition-select/condition-select-modal';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { HealthPanel } from '../../panels/health/health-panel';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { InventoryPanel } from '../../panels/inventory/inventory-panel';
import { Item } from '../../../models/item';
import { ItemSelectModal } from '../item-select/item-select-modal';
import { ItemType } from '../../../enums/item-type';
import { Modal } from '../modal/modal';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { Project } from '../../../models/project';
import { ProjectPanel } from '../../panels/elements/project-panel/project-panel';
import { ProjectSelectModal } from '../project-select/project-select-modal';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { talent } from '../../../data/classes/talent';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	startPage: HeroStatePage;
	onClose: () => void;
	onChange: (hero: Hero) => void;
	onLevelUp: () => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ page, setPage ] = useState<HeroStatePage>(props.startPage);
	const [ shopVisible, setShopVisible ] = useState<boolean>(false);
	const [ conditionsVisible, setConditionsVisible ] = useState<boolean>(false);
	const [ projectsVisible, setProjectsVisible ] = useState<boolean>(false);

	const getHeroSection = () => {
		const setHeroicResource = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.heroicResource = value;
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

		const startEncounter = () => {
			const copy = Utils.copy(hero);
			copy.state.heroicResource = copy.state.victories;
			setHero(copy);
			props.onChange(copy);
		};

		const endEncounter = () => {
			const copy = Utils.copy(hero);
			copy.state.heroicResource = 0;
			copy.state.victories += 1;
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin
					label={hero.class ? hero.class.heroicResource : 'Heroic Resource'}
					value={hero.state.heroicResource}
					min={hero.class && (hero.class.id === talent.id) ? undefined : 0}
					onChange={setHeroicResource}
				/>
				<NumberSpin
					label='Surges'
					value={hero.state.surges}
					min={0}
					onChange={setSurges}
				/>
				{
					hero.state.surges > 0 ?
						<div>
							<Alert
								style={{ margin: '10px 0' }}
								type='info'
								showIcon={true}
								message={`Spend 1 - 3 surges to add ${hero.class ? Math.max(...hero.class.characteristics.map(ch => ch.value)) : 0} damage per surge to one target.`}
							/>
							{
								(hero.state.surges >= 2) ?
									<Alert
										style={{ margin: '10px 0' }}
										type='info'
										showIcon={true}
										message='Spend 2 surges to increase an ability’s potency by 1 for a single target.'
									/>
									: null
							}
						</div>
						: null
				}
				<NumberSpin
					label='Victories'
					value={hero.state.victories}
					min={0}
					onChange={setVictories}
				/>
				<NumberSpin
					label='XP'
					value={hero.state.xp}
					min={0}
					onChange={setXP}
				/>
				{
					HeroLogic.canLevelUp(hero) ?
						<Alert
							style={{ margin: '10px 0' }}
							type='info'
							showIcon={true}
							message='You have enough XP to level up.'
							action={<Button type='text' title='Level Up' icon={<ArrowUpOutlined />} onClick={props.onLevelUp} />}
						/>
						: null
				}
				<Divider />
				<Flex align='center' justify='space-between' gap='5px'>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={startEncounter}
					>
						<div>
							<div>Start of Encounter</div>
							<div className='subtext'>
								Victories to {hero.class ? hero.class.heroicResource : 'Heroic Resource'}
							</div>
						</div>
					</Button>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={endEncounter}
					>
						<div>
							<div>End of Encounter</div>
							<div className='subtext'>
								Gain a Victory
							</div>
						</div>
					</Button>
				</Flex>
			</Space>
		);
	};

	const getVitalsSection = () => {
		const setStaminaDamage = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.staminaDamage = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setStaminaTemp = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.staminaTemp = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setRecoveriesUsed = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.recoveriesUsed = value;
			setHero(copy);
			props.onChange(copy);
		};

		const endRespite = () => {
			const copy = Utils.copy(hero);
			copy.state.staminaDamage = 0;
			copy.state.recoveriesUsed = 0;
			copy.state.xp = copy.state.victories;
			copy.state.victories = 0;
			setHero(copy);
			props.onChange(copy);
		};

		const spendRecovery = () => {
			const copy = Utils.copy(hero);
			copy.state.recoveriesUsed += 1;
			copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HealthPanel hero={hero} />
				<Divider />
				<NumberSpin
					label='Damage Taken'
					value={hero.state.staminaDamage}
					suffix={hero.state.staminaDamage > 0 ? `/ ${HeroLogic.getStamina(hero)}` : undefined}
					min={0}
					onChange={setStaminaDamage}
				/>
				<NumberSpin
					label='Recoveries Used'
					value={hero.state.recoveriesUsed}
					suffix={hero.state.recoveriesUsed > 0 ? `/ ${HeroLogic.getRecoveries(hero)}` : undefined}
					min={0}
					max={HeroLogic.getRecoveries(hero)}
					onChange={setRecoveriesUsed}
				/>
				{
					hero.state.staminaDamage >= (HeroLogic.getStamina(hero) / 2) ?
						<Alert
							style={{ margin: '10px 0' }}
							type='warning'
							showIcon={true}
							message='You are winded.'
						/>
						: null
				}
				<NumberSpin
					label='Temporary Stamina'
					value={hero.state.staminaTemp}
					min={0}
					onChange={setStaminaTemp}
				/>
				<Divider />
				<Flex align='center' justify='space-between' gap='5px'>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						disabled={(hero.state.staminaDamage === 0) || (hero.state.recoveriesUsed >= HeroLogic.getRecoveries(hero))}
						onClick={spendRecovery}
					>
						<div>
							<div>Spend a Recovery</div>
							<div className='subtext'>
								Regain {HeroLogic.getRecoveryValue(hero)} Stamina
							</div>
						</div>
					</Button>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={endRespite}
					>
						<div>
							<div>Take a Respite</div>
							<div className='subtext'>
								24 hours of rest
							</div>
						</div>
					</Button>
				</Flex>
			</Space>
		);
	};

	const getStatisticsSection = () => {
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

		const setProjectPoints = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.projectPoints = value;
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin
					label='Hero Tokens'
					value={hero.state.heroTokens}
					min={0}
					onChange={setHeroTokens}
				/>
				<NumberSpin
					label='Renown'
					value={hero.state.renown}
					min={0}
					onChange={setRenown}
				/>
				<NumberSpin
					label='Wealth'
					value={hero.state.wealth}
					min={1}
					onChange={setWealth}
				/>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					min={0}
					steps={[ 1, 10 ]}
					onChange={setProjectPoints}
				/>
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

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					hero.state.inventory.map(item => (
						<Expander
							key={item.id}
							title={item.count === 1 ? item.name : `${item.name} (x${item.count})`}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteItem(item); }} />
							]}
						>
							<InventoryPanel
								item={item}
								hero={hero}
								onChange={changeItem}
							/>
						</Expander>
					))
				}
				{
					hero.state.inventory.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='Your inventory is empty.'
						/>
						: null
				}
				<Button block={true} onClick={() => setShopVisible(true)}>Add a new item</Button>
				<Drawer open={shopVisible} closeIcon={null} width='500px'>
					<ItemSelectModal
						types={[ ItemType.Artifact, ItemType.Consumable, ItemType.Leveled, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Trinket ]}
						sourcebooks={props.sourcebooks}
						hero={hero}
						onSelect={addItem}
						onClose={() => setShopVisible(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getConditionsSection = () => {
		const addCondition = (type: ConditionType) => {
			const copy = Utils.copy(hero);
			copy.state.conditions.push({
				id: Utils.guid(),
				type: type,
				text: '',
				ends: ConditionEndType.EndOfTurn
			});
			setHero(copy);
			setConditionsVisible(false);
			props.onChange(copy);
		};

		const editCondition = (condition: Condition) => {
			const copy = Utils.copy(hero);
			const index = copy.state.conditions.findIndex(c => c.id === condition.id);
			if (index !== -1) {
				copy.state.conditions[index] = condition;
				setHero(copy);
				props.onChange(copy);
			}
		};

		const deleteCondition = (condition: Condition) => {
			const copy = Utils.copy(hero);
			copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					hero.state.conditions.map(c => (
						<ConditionPanel
							key={c.id}
							condition={c}
							onChange={editCondition}
							onDelete={deleteCondition}
						/>
					))
				}
				{
					hero.state.conditions.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='You are not affected by any conditions.'
						/>
						: null
				}
				<Button block={true} onClick={() => setConditionsVisible(true)}>Add a new condition</Button>
				<Drawer open={conditionsVisible} closeIcon={null} width='500px'>
					<ConditionSelectModal onSelect={addCondition} onClose={() => setConditionsVisible(false)} />
				</Drawer>
			</Space>
		);
	};

	const getProjectsSection = () => {
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
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					hero.state.projects.map(project => (
						<Expander
							key={project.id}
							title={project.name}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteProject(project); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='You have no projects underway.'
						/>
						: null
				}
				<Button block={true} onClick={() => setProjectsVisible(true)}>Add a new project</Button>
				<Drawer open={projectsVisible} closeIcon={null} width='500px'>
					<ProjectSelectModal sourcebooks={props.sourcebooks} onSelect={addProject} onClose={() => setProjectsVisible(false)} />
				</Drawer>
			</Space>
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
			<div style={{ height: '100%' }}>
				<MultiLine
					style={{ height: '100%' }}
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
			case HeroStatePage.Stats:
				return getStatisticsSection();
			case HeroStatePage.Inventory:
				return getInventorySection();
			case HeroStatePage.Conditions:
				return getConditionsSection();
			case HeroStatePage.Projects:
				return getProjectsSection();
			case HeroStatePage.Notes:
				return getNotesSection();
		}
	};

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							name='tabs'
							options={[
								HeroStatePage.Hero,
								HeroStatePage.Vitals,
								HeroStatePage.Stats,
								HeroStatePage.Inventory,
								HeroStatePage.Conditions,
								HeroStatePage.Projects,
								HeroStatePage.Notes
							]}
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
