import { Button, Popover } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
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
import { Imbuement } from '../../../models/imbuement';
import { ImbuementPanel } from '../../panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '../../../models/item';
import { ItemPanel } from '../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../models/kit';
import { KitPanel } from '../../panels/elements/kit-panel/kit-panel';
import { Modal } from '../modal/modal';
import { MonsterGroup } from '../../../models/monster';
import { MonsterGroupPanel } from '../../panels/elements/monster-group-panel/monster-group-panel';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Perk } from '../../../models/perk';
import { PerkPanel } from '../../panels/elements/perk-panel/perk-panel';
import { SourcebookElementKind } from '../../../models/sourcebook';
import { SubClass } from '../../../models/subclass';
import { SubclassPanel } from '../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../models/terrain';
import { TerrainPanel } from '../../panels/elements/terrain-panel/terrain-panel';
import { Title } from '../../../models/title';
import { TitlePanel } from '../../panels/elements/title-panel/title-panel';

import './element-modal.scss';

interface Props {
	kind: SourcebookElementKind;
	element: Element;
	options: Options;
	onClose: () => void;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const ElementModal = (props: Props) => {
	try {
		const getPanel = () => {
			switch (props.kind) {
				case 'ancestry':
					return (
						<AncestryPanel
							ancestry={props.element as Ancestry}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'career':
					return (
						<CareerPanel
							career={props.element as Career}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'class':
					return (
						<ClassPanel
							heroClass={props.element as HeroClass}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'complication':
					return (
						<ComplicationPanel
							complication={props.element as Complication}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'culture':
					return (
						<CulturePanel
							culture={props.element as Culture}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'domain':
					return (
						<DomainPanel
							domain={props.element as Domain}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'imbuement':
					return (
						<ImbuementPanel
							imbuement={props.element as Imbuement}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'item':
					return (
						<ItemPanel
							item={props.element as Item}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'kit':
					return (
						<KitPanel
							kit={props.element as Kit}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'monster-group':
					return (
						<MonsterGroupPanel
							monsterGroup={props.element as MonsterGroup}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'perk':
					return (
						<PerkPanel
							perk={props.element as Perk}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'subclass':
					return (
						<SubclassPanel
							subclass={props.element as SubClass}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
				case 'terrain':
					return (
						<TerrainPanel
							terrain={props.element as Terrain}
							showCustomizations={true}
							mode={PanelMode.Full}
						/>
					);
				case 'title':
					return (
						<TitlePanel
							title={props.element as Title}
							options={props.options}
							mode={PanelMode.Full}
						/>
					);
			}
		};

		return (
			<Modal
				toolbar={
					<>
						<Popover
							trigger='click'
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
								<DownOutlined />
							</Button>
						</Popover>
					</>
				}
				content={
					<div className='element-modal'>
						{getPanel()}
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
