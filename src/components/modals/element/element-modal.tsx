import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Career } from '@/models/career';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { Culture } from '@/models/culture';
import { CulturePanel } from '@/components/panels/elements/culture-panel/culture-panel';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Element } from '@/models/element';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { ImbuementPanel } from '@/components/panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { Kit } from '@/models/kit';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { Modal } from '@/components/modals/modal/modal';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterGroupPanel } from '@/components/panels/elements/monster-group-panel/monster-group-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';

import './element-modal.scss';

interface Props {
	category: string;
	element: Element;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
}

export const ElementModal = (props: Props) => {
	const getPanel = () => {
		switch (props.category) {
			case 'ancestry':
				return (
					<AncestryPanel
						ancestry={props.element as Ancestry}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'career':
				return (
					<CareerPanel
						career={props.element as Career}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'class':
				return (
					<ClassPanel
						heroClass={props.element as HeroClass}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'complication':
				return (
					<ComplicationPanel
						complication={props.element as Complication}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'culture':
				return (
					<CulturePanel
						culture={props.element as Culture}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'domain':
				return (
					<DomainPanel
						domain={props.element as Domain}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'imbuement':
				return (
					<ImbuementPanel
						imbuement={props.element as Imbuement}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'item':
				return (
					<ItemPanel
						item={props.element as Item}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'kit':
				return (
					<KitPanel
						kit={props.element as Kit}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'monster-group':
				return (
					<MonsterGroupPanel
						monsterGroup={props.element as MonsterGroup}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'perk':
				return (
					<PerkPanel
						perk={props.element as Perk}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'subclass':
				return (
					<SubclassPanel
						subclass={props.element as SubClass}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'terrain':
				return (
					<TerrainPanel
						terrain={props.element as Terrain}
						showCustomizations={true}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
					/>
				);
			case 'title':
				return (
					<TitlePanel
						title={props.element as Title}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
		}
	};

	return (
		<Modal
			content={
				<div className='element-modal'>
					{getPanel()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
