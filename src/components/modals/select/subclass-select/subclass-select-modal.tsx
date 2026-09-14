import { Alert, Divider, Space } from 'antd';
import { Analytics } from '@/utils/analytics';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { HeroClass } from '@/models/class';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './subclass-select-modal.scss';

interface Props {
	heroClass: HeroClass;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onSelect: (subClass: SubClass) => void;
}

export const SubClassSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const onSelect = (subclass: SubClass) => {
		Analytics.logElementSelected(subclass, 'Subclass');
		props.onSelect(subclass);
	};

	const subclassesFromThisClass = props.heroClass.subclasses
		.filter(sc => !sc.selected);

	const subclassesForThisClass = props.sourcebooks.flatMap(sb => sb.subclasses)
		.filter(sb => sb.classID === props.heroClass.id);

	const subclassesForNoClass = props.sourcebooks.flatMap(sb => sb.subclasses)
		.filter(sb => sb.classID === '');

	const subclassesFromOtherClasses = props.sourcebooks.flatMap(sb => sb.classes)
		.filter(c => c.id !== props.heroClass.id)
		.flatMap(c => c.subclasses);

	const subclassesForOtherClasses = props.sourcebooks.flatMap(sb => sb.subclasses)
		.filter(sb => (sb.classID !== '') && (sb.classID !== props.heroClass.id));

	const subclasses = Collections.sort([ ...subclassesFromThisClass, ...subclassesForThisClass ], sc => sc.name)
		.filter(l => Utils.textMatches([
			l.name,
			l.description
		], searchTerm));

	const customSubclasses = Collections.sort(subclassesForNoClass, sc => sc.name)
		.filter(l => Utils.textMatches([
			l.name,
			l.description
		], searchTerm));

	const otherSubclasses = Collections.sort([ ...subclassesFromOtherClasses, ...subclassesForOtherClasses ], sc => sc.name)
		.filter(l => Utils.textMatches([
			l.name,
			l.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='subclass-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							subclasses.map(sc => (
								<SelectablePanel
									key={sc.id}
									onSelect={() => onSelect(sc)}
								>
									<SubclassPanel subclass={sc} sourcebooks={props.sourcebooks} mode={PanelMode.Compact} />
								</SelectablePanel>
							))
						}
						{
							subclasses.length === 0 ?
								<Empty />
								: null
						}
						{
							customSubclasses.length > 0 ?
								<>
									<Divider />
									<Expander title='Homebrew subclasses'>
										<Space orientation='vertical' style={{ width: '100%' }}>
											{
												customSubclasses.map(sc => (
													<SelectablePanel
														key={sc.id}
														onSelect={() => onSelect(sc)}
													>
														<SubclassPanel subclass={sc} sourcebooks={props.sourcebooks} mode={PanelMode.Compact} />
													</SelectablePanel>
												))
											}
										</Space>
									</Expander>
								</>
								: null
						}
						{
							otherSubclasses.length > 0 ?
								<>
									<Divider />
									<Expander title='From other classes'>
										<Space orientation='vertical' style={{ width: '100%' }}>
											<Alert
												type='warning'
												showIcon={true}
												title='Selecting a subclass from a different class is typically against the rules.'
											/>
											{
												otherSubclasses.map(sc => (
													<SelectablePanel
														key={sc.id}
														onSelect={() => onSelect(sc)}
													>
														<SubclassPanel subclass={sc} sourcebooks={props.sourcebooks} mode={PanelMode.Compact} />
													</SelectablePanel>
												))
											}
										</Space>
									</Expander>
								</>
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
