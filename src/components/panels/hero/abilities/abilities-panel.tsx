import { Divider, Empty, Tag } from 'antd';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { useIsSmall } from '@/hooks/use-is-small';

import './abilities-panel.scss';

interface Props {
	title: string;
	abilities: { ability: Ability, source: string, level: number | undefined }[];
	hero: Hero;
	options: Options;
	onSelectAbility: (ability: Ability) => void;
}

export const AbilitiesPanel = (props: Props) => {
	const isSmall = useIsSmall();

	if (props.abilities.length === 0) {
		return null;
	}

	const getRow = (data: { ability: Ability, source: string }) => {
		return (
			<div key={data.ability.id} className='selectable-row clickable' onClick={() => props.onSelectAbility(data.ability)}>
				<div><b>{data.ability.name}</b></div>
				<div>{data.ability.distance.map(d => AbilityLogic.getDistance(d, data.ability, props.hero)).join(' or ')}</div>
				<div>{data.ability.target}</div>
				{props.options.showSources ? <Tag variant='outlined'>{data.source}</Tag> : null}
				{
					data.ability.cost === 'signature' ?
						<Pill>Signature</Pill>
						:
						(data.ability.cost > 0) ? <ResourcePill value={data.ability.cost} repeatable={data.ability.repeatable} /> : null
				}
				{data.ability.type.trigger ? <div>{data.ability.type.trigger}</div> : null}
			</div>
		);
	};

	const nonStandard = props.abilities.filter(a => a.source !== 'Standard');
	const standard = props.abilities.filter(a => a.source === 'Standard');

	const useRows = props.options.compactView;

	return (
		<ErrorBoundary>
			<div className='abilities-section'>
				{useRows ? <HeaderText level={props.options.compactView ? 3 : 1}>{props.title}</HeaderText> : null}
				{
					(nonStandard.length === 0) && (standard.length === 0) ?
						<Empty />
						: null
				}
				<div className={`abilities-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
					{
						nonStandard.map(a =>
							useRows ?
								getRow(a)
								:
								<SelectablePanel key={a.ability.id} style={isSmall ? undefined : { gridColumn: `span ${AbilityLogic.getPanelWidth(a.ability)}` }} onSelect={() => props.onSelectAbility(a.ability)}>
									<AbilityPanel
										ability={a.ability}
										hero={props.hero}
										options={props.options}
										mode={PanelMode.Full}
										tags={props.options.showSources ? [ a.level ? `${a.source} (level ${a.level})` : a.source ] : undefined}
									/>
								</SelectablePanel>
						)
					}
				</div>
				{
					(nonStandard.length > 0) && (standard.length > 0) ?
						<Divider />
						: null
				}
				<div className={`abilities-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
					{
						standard.map(a =>
							useRows ?
								getRow(a)
								:
								<SelectablePanel key={a.ability.id} style={{ gridColumn: `span ${AbilityLogic.getPanelWidth(a.ability)}` }} onSelect={() => props.onSelectAbility(a.ability)}>
									<AbilityPanel
										ability={a.ability}
										hero={props.hero}
										options={props.options}
										mode={PanelMode.Full}
										tags={props.options.showSources ? [ a.source ] : undefined}
									/>
								</SelectablePanel>
						)
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
