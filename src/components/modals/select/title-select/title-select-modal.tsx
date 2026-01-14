import { Alert, Button, Space } from 'antd';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { Empty } from '@/components/controls/empty/empty';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './title-select-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (title: Title) => void;
}

export const TitleSelectModal = (props: Props) => {
	const [ echelon, setEchelon ] = useState<number>(CreatureLogic.getEchelon(props.hero.class ? props.hero.class.level : 1));
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ selectedTitle, setSelectedTitle ] = useState<Title | null>(null);

	const selectTitle = (title: Title) => {
		const copy = Utils.copy(title);
		if (copy.features.length === 1) {
			copy.selectedFeatureID = copy.features[0].id;
			props.onSelect(copy);
		}
		setSelectedTitle(copy);
	};

	const selectFeature = (feature: Feature) => {
		if (selectedTitle) {
			const copy = Utils.copy(selectedTitle);
			copy.selectedFeatureID = feature.id;
			setSelectedTitle(copy);
			props.onSelect(copy);
		}
	};

	const customTitle = FactoryLogic.createTitle();
	customTitle.name = 'Custom Title';
	customTitle.echelon = echelon;
	customTitle.features.push(FactoryLogic.feature.create({ id: Utils.guid(), name: 'Custom Title', description: 'Details' }));

	const currentTitleIDs = HeroLogic.getTitles(props.hero).map(t => t.id);
	const echelonTitles = SourcebookLogic.getTitles(props.sourcebooks as Sourcebook[])
		.filter(t => t.echelon === echelon)
		.filter(t => !currentTitleIDs.includes(t.id));
	const sortedTitles = Collections.sort(echelonTitles, t => t.name);

	const titles = sortedTitles
		.filter(t => Utils.textMatches([
			t.name,
			t.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='title-select-modal'>
					{
						selectedTitle === null ?
							<Space orientation='vertical' style={{ width: '100%' }}>
								<NumberSpin label='Echelon' min={1} max={4} value={echelon} onChange={setEchelon} />
								{
									[ customTitle, ...titles ].map(t => (
										<SelectablePanel
											key={t.id}
											onSelect={() => selectTitle(t)}
										>
											<TitlePanel title={t} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} options={props.options} />
										</SelectablePanel>
									))
								}
							</Space>
							:
							<Space orientation='vertical' style={{ width: '100%' }}>
								<SelectablePanel
									action={
										<Button onClick={e => { e.stopPropagation(); setSelectedTitle(null); }}>Unselect</Button>
									}
								>
									<TitlePanel title={selectedTitle} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
								</SelectablePanel>
								<Alert
									type='info'
									showIcon={true}
									title='This title has multiple options; choose one of them.'
								/>
								{
									selectedTitle.features.map(f => (
										<SelectablePanel
											key={f.id}
											onSelect={() => selectFeature(f)}
										>
											<FeaturePanel feature={f} hero={props.hero} mode={PanelMode.Full} options={props.options} />
										</SelectablePanel>
									))
								}
								{
									selectedTitle.features.length === 0 ?
										<Empty />
										: null
								}
							</Space>
					}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
