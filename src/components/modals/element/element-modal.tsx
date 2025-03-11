import { Button, Popover } from 'antd';
import { Ancestry } from '../../../models/ancestry';
import { AncestryPanel } from '../../panels/elements/ancestry-panel/ancestry-panel';
import { Career } from '../../../models/career';
import { CareerPanel } from '../../panels/elements/career-panel/career-panel';
import { ClassPanel } from '../../panels/elements/class-panel/class-panel';
import { Complication } from '../../../models/complication';
import { ComplicationPanel } from '../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../models/culture';
import { CulturePanel } from '../../panels/elements/culture-panel/culture-panel';
import { Domain } from '../../../models/domain';
import { DomainPanel } from '../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../models/element';
import { HeroClass } from '../../../models/class';
import { Item } from '../../../models/item';
import { ItemPanel } from '../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../models/kit';
import { KitPanel } from '../../panels/elements/kit-panel/kit-panel';
import { Modal } from '../modal/modal';
import { MonsterGroup } from '../../../models/monster';
import { MonsterGroupPanel } from '../../panels/elements/monster-group-panel/monster-group-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Perk } from '../../../models/perk';
import { PerkPanel } from '../../panels/elements/perk-panel/perk-panel';
import { ReactNode } from 'react';
import { SourcebookElementKind } from '../../../models/sourcebook';
import { Title } from '../../../models/title';
import { TitlePanel } from '../../panels/elements/title-panel/title-panel';
import { UploadOutlined } from '@ant-design/icons';

import './element-modal.scss';

interface Props {
	kind: SourcebookElementKind;
	element: Element;
	onClose: () => void;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const ElementModal = (props: Props) => {
	let panel: ReactNode | null = null;
	switch (props.kind) {
		case 'ancestry':
			panel = (
				<AncestryPanel
					ancestry={props.element as Ancestry}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'career':
			panel = (
				<CareerPanel
					career={props.element as Career}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'class':
			panel = (
				<ClassPanel
					heroClass={props.element as HeroClass}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'complication':
			panel = (
				<ComplicationPanel
					complication={props.element as Complication}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'culture':
			panel = (
				<CulturePanel
					culture={props.element as Culture}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'domain':
			panel = (
				<DomainPanel
					domain={props.element as Domain}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'item':
			panel = (
				<ItemPanel
					item={props.element as Item}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'kit':
			panel = (
				<KitPanel
					kit={props.element as Kit}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'monster-group':
			panel = (
				<MonsterGroupPanel
					monsterGroup={props.element as MonsterGroup}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'perk':
			panel = (
				<PerkPanel
					perk={props.element as Perk}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'title':
			panel = (
				<TitlePanel
					title={props.element as Title}
					mode={PanelMode.Full}
				/>
			);
			break;
	}

	try {
		return (
			<Modal
				toolbar={
					<>
						<Popover
							trigger='click'
							placement='bottom'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Button onClick={() => props.export('image')}>Export As Image</Button>
									<Button onClick={() => props.export('pdf')}>Export As PDF</Button>
									<Button onClick={() => props.export('json')}>Export As Data</Button>
								</div>
							)}
						>
							<Button icon={<UploadOutlined />}>
								Export
							</Button>
						</Popover>
					</>
				}
				content={
					<div className='element-modal'>
						{panel}
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
