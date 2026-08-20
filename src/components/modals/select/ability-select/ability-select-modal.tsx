import { Divider, Space } from 'antd';
import { useMemo, useState } from 'react';
import { Ability } from '@/models/ability';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '@/enums/ability-usage';
import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { RadioGroup } from '@/components/controls/radio-group/radio-group';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

import './ability-select-modal.scss';

interface Props {
	abilities: Ability[];
	hero?: Hero;
	showFilter?: boolean;
	onClose: () => void;
	onSelect: (ability: Ability) => void;
}

export const AbilitySelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ abilityType, setAbilityType ] = useState<AbilityUsage | null>(props.showFilter ? AbilityUsage.MainAction : null);
	const [ abilityCost, setAbilityCost ] = useState<number | 'signature' | null>(props.showFilter ? 'signature' : null);

	const abilities = useMemo(() => {
		return props.abilities
			.filter(a => Utils.textMatches([
				a.name,
				a.description,
				a.type.usage,
				...a.keywords,
				...a.sections.filter(s => s.type === 'text').map(s => s.text),
				...a.sections.filter(s => s.type === 'field').map(s => s.effect)
			], searchTerm))
			.filter(a => (abilityType === null) || (a.type.usage === abilityType))
			.filter(a => (abilityCost === null) || (a.cost === abilityCost));
	}, [ props.abilities, searchTerm, abilityType, abilityCost ]);

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='ability-select-modal'>
					{
						props.showFilter ?
							<>
								<Space orientation='vertical' style={{ width: '100%' }}>
									<Toggle label='Type' value={abilityType !== null} onChange={value => setAbilityType(value ? AbilityUsage.MainAction : null)} />
									{
										abilityType !== null ?
											<RadioGroup
												options={[ AbilityUsage.MainAction, AbilityUsage.Maneuver, AbilityUsage.Move, AbilityUsage.Trigger, AbilityUsage.VillainAction, AbilityUsage.ChampionAction, AbilityUsage.NoAction, AbilityUsage.Other ]}
												value={abilityType}
												onChange={setAbilityType}
											/>
											: null
									}
									<Toggle label='Signature' value={abilityCost === 'signature'} onChange={value => setAbilityCost(value ? 'signature' : null)} />
									<Toggle label='Cost' value={(abilityCost !== null) && (abilityCost !== 'signature')} onChange={value => setAbilityCost(value ? 3 : null)} />
									{
										(abilityCost !== null) && (abilityCost !== 'signature') ?
											<NumberSpin min={3} max={11} value={abilityCost} steps={[ 2 ]} onChange={setAbilityCost} />
											: null
									}
								</Space>
								<Divider />
							</>
							: null
					}
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							abilities.map(a => (
								<SelectablePanel
									key={a.id}
									onSelect={() => props.onSelect(a)}
								>
									<AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} />
								</SelectablePanel>
							))
						}
						{
							abilities.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
