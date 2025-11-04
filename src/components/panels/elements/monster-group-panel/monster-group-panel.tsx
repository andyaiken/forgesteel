import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureFlags } from '@/utils/feature-flags';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Segmented } from 'antd';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { useState } from 'react';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	options: Options;
	mode?: PanelMode;
	onSelectMonster?: (monster: Monster) => void;
}

export const MonsterGroupPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getOverview = () => {
		return (
			<>
				<Markdown text={props.monsterGroup.description} />
				{
					props.monsterGroup.information.length > 0 ?
						props.monsterGroup.information.map(i => (
							<div key={i.id}>
								<HeaderText>{i.name || 'Unnamed Information'}</HeaderText>
								<Markdown text={i.description} />
							</div>
						))
						: null
				}
			</>
		);
	};

	const getMalice = () => {
		if (props.monsterGroup.malice.length === 0) {
			return <Empty />;
		}

		return (
			<>
				<div className='ds-text'>
					At the start of any {props.monsterGroup.name}'s turn, you can spend malice to activate one of the following features.
				</div>
				<div className='malice'>
					{props.monsterGroup.malice.map(m =>
						<SelectablePanel key={m.id}>
							<FeaturePanel
								feature={m}
								options={props.options}
								mode={PanelMode.Full}
								cost={m.type === FeatureType.MaliceAbility ? m.data.ability.cost : m.data.cost}
								repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
							/>
						</SelectablePanel>
					)}
				</div>
			</>
		);
	};

	const getMonsters = () => {
		if (props.monsterGroup.monsters.length === 0) {
			return <Empty />;
		}

		return (
			<div className='monsters'>
				{
					props.monsterGroup.monsters.map(m =>
						<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
							<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
						</SelectablePanel>
					)
				}
			</div>
		);
	};

	const getCustomization = () => {
		if (props.monsterGroup.addOns.length === 0) {
			return <Empty />;
		}

		return (
			<div className='add-ons'>
				{
					props.monsterGroup.addOns.map(a =>
						<SelectablePanel key={a.id}>
							<FeaturePanel feature={a} options={props.options} cost={a.data.cost} mode={PanelMode.Full} />
						</SelectablePanel>
					)
				}
			</div>
		);
	};

	const getContent = () => {
		if (isInteractive) {
			let content = null;
			switch (page) {
				case 'overview':
					content = getOverview();
					break;
				case 'malice':
					content = getMalice();
					break;
				case 'monsters':
					content = getMonsters();
					break;
				case 'customization':
					content = getCustomization();
					break;
			}

			const options: { value: string, label: string }[] = [
				{ value: 'overview', label: 'Overview' }
			];
			if (props.monsterGroup.malice.length > 0) {
				options.push({ value: 'malice', label: 'Malice' });
			}
			options.push({ value: 'monsters', label: 'Monsters' });
			if (props.monsterGroup.addOns.length > 0) {
				options.push({ value: 'customization', label: 'Customization' });
			}

			return (
				<>
					<Segmented
						style={{ marginBottom: '20px' }}
						block={true}
						options={options}
						value={page}
						onChange={setPage}
					/>
					{content}
				</>
			);
		}

		return (
			<>
				{getOverview()}
				{props.monsterGroup.malice.length > 0 ? <HeaderText level={1}>Malice</HeaderText> : null}
				{getMalice()}
				{props.monsterGroup.monsters.length > 0 ? <HeaderText level={1}>Monsters</HeaderText> : null}
				{getMonsters()}
				{props.monsterGroup.addOns.length > 0 ? <HeaderText level={1}>Customization</HeaderText> : null}
				{getCustomization()}
			</>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='monster-group-panel compact'>
				<HeaderText level={1}>
					{props.monsterGroup.name || 'Unnamed Monster Group'}
				</HeaderText>
				<Markdown text={props.monsterGroup.description} />
			</div>
		);
	}

	let className = 'monster-group-panel';
	if (isInteractive) {
		className += ' interactive';
	}

	return (
		<ErrorBoundary>
			<div className={className} id={props.monsterGroup.id}>
				<HeaderText level={1}>
					{props.monsterGroup.name || 'Unnamed Monster Group'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
