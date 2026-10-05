import { Button, Divider, Popover, Space, Tooltip } from 'antd';
import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { Collections } from '@/utils/collections';
import { Condition } from '@/models/condition';
import { ConditionLogic } from '@/logic/condition-logic';
import { ExtractedCondition } from '@/logic/condition-extraction-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { ReactNode } from 'react';
import { Utils } from '@/utils/utils';

import './condition-add-menu.scss';

interface Props {
	encounterConditions?: ExtractedCondition[];
	onAdd: (condition: Condition) => void;
	children: ReactNode;
}

export const ConditionAddMenu = (props: Props) => {
	const encounterConditions = props.encounterConditions || [];
	const owners = Collections.distinct(encounterConditions.map(c => c.owner), owner => owner);
	const standardConditions = Object.values(ConditionType).filter(c => (c !== ConditionType.Custom) && (c !== ConditionType.Quick));

	const addCondition = (type: ConditionType, text = '') => {
		props.onAdd({
			id: Utils.guid(),
			type: type,
			text: text,
			ends: ConditionEndType.UntilRemoved
		});
	};

	return (
		<Popover
			trigger='click'
			content={
				<Space orientation='vertical' className='condition-add-menu'>
					<div className='conditions-grid'>
						{standardConditions.map(c => <Button key={c} block={true} type='text' onClick={() => addCondition(c)}>{c}</Button>)}
					</div>
					<Divider />
					<div className='conditions-grid'>
						<Button block={true} type='text' onClick={() => addCondition(ConditionType.Quick, 'Surprised')}>Surprised</Button>
					</div>
					{
						owners.length > 0 ?
							<>
								<Divider />
								<div className='encounter-conditions'>
									{
										owners.map(owner => (
											<div key={owner}>
												<div className='ds-text dimmed-text'>{owner}</div>
												<div className='conditions-grid'>
													{
														encounterConditions
															.filter(c => c.owner === owner)
															.map((c, n) => (
																<Tooltip key={n} classNames={{ root: 'condition-rules-tooltip' }} title={<Markdown text={c.rules} />}>
																	<Button block={true} type='text' onClick={() => props.onAdd(ConditionLogic.createFromExtracted(c))}>{c.name}</Button>
																</Tooltip>
															))
													}
												</div>
											</div>
										))
									}
								</div>
							</>
							: null
					}
					<Divider />
					<div className='conditions-grid'>
						<Button block={true} type='text' onClick={() => addCondition(ConditionType.Custom)}>{ConditionType.Custom}</Button>
					</div>
				</Space>
			}
		>
			{props.children}
		</Popover>
	);
};
