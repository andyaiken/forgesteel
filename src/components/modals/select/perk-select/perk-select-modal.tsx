import { Alert, Divider, Space } from 'antd';
import { Expander } from '@/components/controls/expander/expander';
import { Analytics } from '@/utils/analytics';
import { Empty } from '@/components/controls/empty/empty';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './perk-select-modal.scss';

interface Props {
	perks: Perk[];
	hero: Hero;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onSelect: (perk: Perk) => void;
}

export const PerkSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const onSelect = (perk: Perk) => {
		Analytics.logElementSelected(perk, 'Perk');
		props.onSelect(perk);
	};

	const perks = props.perks
		.filter(p => Utils.textMatches([
			p.name,
			p.description
		], searchTerm));
	const otherPerks = SourcebookLogic.getPerks(props.sourcebooks)
		.filter(os => !props.perks.map(p => p.name).includes(os.name))
		.filter(os => Utils.textMatches([
			os.name,
			os.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='perk-select-modal'>
					{
						[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural, PerkList.Special ].map(list => {
							const subset = perks.filter(p => p.list === list);
							if (subset.length === 0) {
								return null;
							}

							return (
								<Space key={list} orientation='vertical' style={{ width: '100%' }}>
									<HeaderText level={1}>{list}</HeaderText>
									{
										subset.map((p, n) => (
											<SelectablePanel key={n} onSelect={() => onSelect(p)}>
												<PerkPanel perk={p} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
											</SelectablePanel>
										))
									}
								</Space>
							);
						})
					}
					{
						otherPerks.length > 0 ?
							<>
								<Divider />
								<Expander title='Other Perks'>
									<Space orientation='vertical' style={{ width: '100%' }}>
										<Alert
											type='warning'
											showIcon={true}
											title='Selecting a perk from outside the listed groups is typically against the rules.'
										/>
										{
											otherPerks.map((p, n) => (
												<SelectablePanel key={n} onSelect={() => props.onSelect(p)}>
													<PerkPanel perk={p} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
												</SelectablePanel>
											))
										}
									</Space>
								</Expander>
							</>
							: null
					}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
