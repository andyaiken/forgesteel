import { Alert, Button, Divider, Drawer, Flex, Space, Tabs } from 'antd';
import { ArrowUpOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Condition, Hero } from '../../../models/hero';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { ConditionPanel } from '../../panels/condition/condition-panel';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { HeroLogic } from '../../../logic/hero-logic';
import { InventoryPanel } from '../../panels/inventory-panel/inventory-panel';
import { Item } from '../../../models/item';
import { Modal } from '../modal/modal';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { Project } from '../../../models/project';
import { ProjectPanel } from '../../panels/elements/project-panel/project-panel';
import { ProjectsModal } from '../projects/projects-modal';
import { ShopModal } from '../shop/shop-modal';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { talent } from '../../../data/classes/talent';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	startPage: 'hero' | 'stats' | 'conditions' | 'customize';
	onChange: (hero: Hero) => void;
	onLevelUp: () => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)));
	const [ shopVisible, setShopVisible ] = useState<boolean>(false);
	const [ projectsVisible, setProjectsVisible ] = useState<boolean>(false);

	const getHeroSection = () => {
		const setHeroicResource = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.heroicResource = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setSurges = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.surges = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setVictories = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.victories = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setXP = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.xp = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setStaminaDamage = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.staminaDamage = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setRecoveriesUsed = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.recoveriesUsed = value;
			setHero(copy);
			props.onChange(copy);
		};

		const startEncounter = () => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.heroicResource = copy.state.victories;
			setHero(copy);
			props.onChange(copy);
		};

		const endEncounter = () => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.heroicResource = 0;
			copy.state.victories += 1;
			setHero(copy);
			props.onChange(copy);
		};

		const endRespite = () => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.staminaDamage = 0;
			copy.state.recoveriesUsed = 0;
			copy.state.xp = copy.state.victories;
			copy.state.victories = 0;
			setHero(copy);
			props.onChange(copy);
		};

		const spendRecovery = () => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.recoveriesUsed += 1;
			copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
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
							action={<Button title='Level Up' type='text' icon={<ArrowUpOutlined />} onClick={props.onLevelUp} />}
						/>
						: null
				}
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
				<Divider />
				<NumberSpin
					label='Damage Taken'
					value={hero.state.staminaDamage}
					min={0}
					format={value => value > 0 ? `${value} / ${HeroLogic.getStamina(hero)}` : value.toString()}
					onChange={setStaminaDamage}
				/>
				<NumberSpin
					label='Recoveries Used'
					value={hero.state.recoveriesUsed}
					min={0}
					max={HeroLogic.getRecoveries(hero)}
					format={value => value > 0 ? `${value} / ${HeroLogic.getRecoveries(hero)}` : value.toString()}
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
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.heroTokens = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setRenown = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.renown = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setWealth = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.wealth = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setProjectPoints = (value: number) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
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
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.inventory.push(item);
			setHero(copy);
			setShopVisible(false);
			props.onChange(copy);
		};

		const changeItem = (item: Item) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			const index = copy.state.inventory.findIndex(i => i.id === item.id);
			copy.state.inventory[index] = item;
			setHero(copy);
			props.onChange(copy);
		};

		const moveItem = (item: Item, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			const index = copy.state.inventory.findIndex(i => i.id ===  item.id);
			copy.state.inventory = Collections.move(copy.state.inventory, index, direction);
			setHero(copy);
			props.onChange(copy);
		};

		const deleteItem = (item: Item) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
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
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveItem(item, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteItem(item); }} />
							]}
						>
							<InventoryPanel
								item={item}
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
				<Drawer open={shopVisible} onClose={() => setShopVisible(false)} closeIcon={null} width='500px'>
					{shopVisible ? <ShopModal sourcebooks={props.sourcebooks} onSelect={addItem} /> : null}
				</Drawer>
			</Space>
		);
	};

	const getConditionsSection = () => {
		const addCondition = (type: ConditionType) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.conditions.push({
				id: Utils.guid(),
				type: type,
				ends: ConditionEndType.EndOfTurn,
				resistCharacteristic: Characteristic.Might
			});
			setHero(copy);
			props.onChange(copy);
		};

		const editCondition = (condition: Condition) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			const index = copy.state.conditions.findIndex(c => c.id === condition.id);
			if (index !== -1) {
				copy.state.conditions[index] = condition;
				setHero(copy);
				props.onChange(copy);
			}
		};

		const deleteCondition = (condition: Condition) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
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
				<DropdownButton
					label='Add a new condition'
					items={[
						ConditionType.Bleeding,
						ConditionType.Dazed,
						ConditionType.Frightened,
						ConditionType.Grabbed,
						ConditionType.Prone,
						ConditionType.Restrained,
						ConditionType.Slowed,
						ConditionType.Taunted,
						ConditionType.Weakened
					].map(ct => ({ key: ct, label: <div className='ds-text centered-text'>{ct}</div> }))}
					onClick={key => addCondition(key as ConditionType)}
				/>
			</Space>
		);
	};

	const getProjectsSection = () => {
		const addProject = (project: Project) => {
			const projectCopy = JSON.parse(JSON.stringify(project)) as Project;
			projectCopy.id = Utils.guid();
			projectCopy.progress = FactoryLogic.createProjectProgress();

			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			copy.state.projects.push(projectCopy);
			setHero(copy);
			setProjectsVisible(false);
			props.onChange(copy);
		};

		const changeProject = (project: Project) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			const index = copy.state.projects.findIndex(p => p.id === project.id);
			copy.state.projects[index] = project;
			setHero(copy);
			props.onChange(copy);
		};

		const moveProject = (project: Project, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
			const index = copy.state.projects.findIndex(p => p.id ===  project.id);
			copy.state.projects = Collections.move(copy.state.projects, index, direction);
			setHero(copy);
			props.onChange(copy);
		};

		const deleteProject = (project: Project) => {
			const copy = JSON.parse(JSON.stringify(hero)) as Hero;
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
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'down'); }} />,
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
				<Drawer open={projectsVisible} onClose={() => setProjectsVisible(false)} closeIcon={null} width='500px'>
					{projectsVisible ? <ProjectsModal sourcebooks={props.sourcebooks} onSelect={addProject} /> : null}
				</Drawer>
			</Space>
		);
	};

	try {
		return (
			<Modal
				content={
					<div className='hero-state-modal'>
						<Tabs
							items={[
								{
									key: 'hero',
									label: 'Hero',
									children: getHeroSection()
								},
								{
									key: 'stats',
									label: 'Statistics',
									children: getStatisticsSection()
								},
								{
									key: 'inventory',
									label: 'Inventory',
									children: getInventorySection()
								},
								{
									key: 'conditions',
									label: 'Conditions',
									children: getConditionsSection()
								},
								{
									key: 'projects',
									label: 'Projects',
									children: getProjectsSection()
								}
							]}
							defaultActiveKey={props.startPage}
						/>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
